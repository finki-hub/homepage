import { useEffect, useState } from 'react';

import {
  DISCORD_INVITE_API_URL,
  DISCORD_URL,
  DISCORD_WIDGET_API_URL,
} from '../lib/constants.ts';

type DiscordInvite = {
  readonly approximate_member_count?: number;
};

type DiscordWidget = {
  readonly id: string;
  readonly instant_invite?: string;
  readonly members: readonly DiscordWidgetMember[];
  readonly name: string;
  readonly presence_count: number;
};

type DiscordWidgetMember = {
  readonly avatar_url: string;
  readonly id: string;
  readonly username: string;
};

const DISCORD_VISIBLE_MEMBERS_LIMIT = 7;
const DISCORD_REQUEST_TIMEOUT_MS = 10_000;

type DiscordRequestOptions = {
  readonly fetcher?: typeof fetch;
  readonly inviteSignal: AbortSignal;
  readonly timeoutMs?: number;
  readonly widgetSignal: AbortSignal;
};

const runWithTimeout = async <Result>(
  parentSignal: AbortSignal,
  operation: (signal: AbortSignal) => Promise<Result>,
  timeoutMs: number,
): Promise<Result> => {
  const controller = new AbortController();
  const abortRequest = () => {
    controller.abort();
  };

  if (parentSignal.aborted) {
    abortRequest();
  } else {
    parentSignal.addEventListener('abort', abortRequest, { once: true });
  }

  const timeout = setTimeout(abortRequest, timeoutMs);
  const request = (async () => operation(controller.signal))();
  const aborted = new Promise<never>((_resolve, reject) => {
    const rejectAborted = () => {
      reject(new Error('Discord request aborted'));
    };
    if (controller.signal.aborted) {
      rejectAborted();
    } else {
      controller.signal.addEventListener('abort', rejectAborted, {
        once: true,
      });
    }
  });

  try {
    return await Promise.race([request, aborted]);
  } finally {
    clearTimeout(timeout);
    parentSignal.removeEventListener('abort', abortRequest);
  }
};

type DiscordCommunityData = {
  readonly inviteCount: Promise<null | number>;
  readonly widget: DiscordWidget;
};

export const fetchDiscordCommunity = async ({
  fetcher = fetch,
  inviteSignal,
  timeoutMs = DISCORD_REQUEST_TIMEOUT_MS,
  widgetSignal,
}: DiscordRequestOptions): Promise<DiscordCommunityData> => {
  const inviteCount = (async (): Promise<null | number> => {
    try {
      return await runWithTimeout(
        inviteSignal,
        async (signal) => {
          const response = await fetcher(DISCORD_INVITE_API_URL, { signal });
          if (!response.ok) {
            return null;
          }

          try {
            const inviteData = (await response.json()) as DiscordInvite;
            const memberCount = inviteData.approximate_member_count;
            return typeof memberCount === 'number' &&
              Number.isFinite(memberCount)
              ? memberCount
              : null;
          } catch {
            return null;
          }
        },
        timeoutMs,
      );
    } catch {
      return null;
    }
  })();

  const widget = await runWithTimeout(
    widgetSignal,
    async (signal) => {
      const response = await fetcher(DISCORD_WIDGET_API_URL, { signal });
      if (!response.ok) {
        throw new Error('Discord widget request failed');
      }

      return (await response.json()) as DiscordWidget;
    },
    timeoutMs,
  );

  return {
    inviteCount,
    widget,
  };
};

const getRandomMembers = (
  members: readonly DiscordWidgetMember[],
  count: number,
) => {
  const shuffledMembers = [...members];
  const randomValues = new Uint32Array(shuffledMembers.length);
  crypto.getRandomValues(randomValues);

  for (let index = shuffledMembers.length - 1; index > 0; index -= 1) {
    const randomValue = randomValues[index] ?? 0;
    const randomIndex = randomValue % (index + 1);
    const currentMember = shuffledMembers[index];
    const randomMember = shuffledMembers[randomIndex];

    if (!currentMember || !randomMember) {
      continue;
    }

    shuffledMembers[index] = randomMember;
    shuffledMembers[randomIndex] = currentMember;
  }

  return shuffledMembers.slice(0, count);
};

export const useDiscordCommunity = () => {
  const [widget, setWidget] = useState<DiscordWidget | null>(null);
  const [visibleMembers, setVisibleMembers] = useState<
    readonly DiscordWidgetMember[]
  >([]);
  const [totalMembersCount, setTotalMembersCount] = useState<null | number>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const widgetController = new AbortController();
    const inviteController = new AbortController();
    let isMounted = true;

    const loadCommunity = async () => {
      try {
        const { inviteCount, widget: widgetData } = await fetchDiscordCommunity(
          {
            inviteSignal: inviteController.signal,
            widgetSignal: widgetController.signal,
          },
        );

        if (!isMounted) {
          return;
        }

        setWidget(widgetData);
        setVisibleMembers(
          getRandomMembers(widgetData.members, DISCORD_VISIBLE_MEMBERS_LIMIT),
        );
        setTotalMembersCount(null);
        setHasError(false);

        const updateInviteCount = async () => {
          const count = await inviteCount;
          if (isMounted) {
            setTotalMembersCount(count);
          }
        };
        void updateInviteCount();
      } catch {
        inviteController.abort();

        if (!isMounted || widgetController.signal.aborted) {
          return;
        }

        setWidget(null);
        setVisibleMembers([]);
        setTotalMembersCount(null);
        setHasError(true);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadCommunity();

    return () => {
      isMounted = false;
      widgetController.abort();
      inviteController.abort();
    };
  }, []);

  return {
    extraMembersCount: Math.max(
      (widget?.members.length ?? 0) - visibleMembers.length,
      0,
    ),
    hasError,
    inviteUrl: widget?.instant_invite ?? DISCORD_URL,
    isLoading,
    onlineCount: widget?.presence_count ?? null,
    totalMembersCount,
    visibleMembers,
  };
};
