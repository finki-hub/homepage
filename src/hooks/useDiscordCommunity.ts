import { useEffect, useState } from 'react';

import {
  DISCORD_INVITE_API_URL,
  DISCORD_URL,
  DISCORD_WIDGET_API_URL,
} from '@/lib/constants';

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

const getRandomMembers = (
  members: readonly DiscordWidgetMember[],
  count: number,
) => {
  const shuffledMembers = [...members];

  for (let index = shuffledMembers.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
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
    const controller = new AbortController();
    let isMounted = true;

    const loadCommunity = async () => {
      try {
        const [widgetResponse, inviteResponse] = await Promise.allSettled([
          fetch(DISCORD_WIDGET_API_URL, {
            signal: controller.signal,
          }),
          fetch(DISCORD_INVITE_API_URL, {
            signal: controller.signal,
          }),
        ]);

        if (widgetResponse.status !== 'fulfilled' || !widgetResponse.value.ok) {
          throw new Error('Discord widget request failed');
        }

        const widgetData = (await widgetResponse.value.json()) as DiscordWidget;

        if (!isMounted) {
          return;
        }

        let nextTotalMembersCount: null | number = null;

        if (inviteResponse.status === 'fulfilled' && inviteResponse.value.ok) {
          const inviteData =
            (await inviteResponse.value.json()) as DiscordInvite;

          nextTotalMembersCount = inviteData.approximate_member_count ?? null;
        }

        setWidget(widgetData);
        setVisibleMembers(
          getRandomMembers(widgetData.members, DISCORD_VISIBLE_MEMBERS_LIMIT),
        );
        setTotalMembersCount(nextTotalMembersCount);
        setHasError(false);
      } catch {
        if (!isMounted || controller.signal.aborted) {
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
      controller.abort();
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
