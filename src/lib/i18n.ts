export type Language = 'en' | 'mk';

export const translations = {
  en: {
    // Common
    backToTop: 'Back to top',
    // Brand
    brand: 'FINKI Hub',
    // Community
    community: {
      activeMembers: 'Active members',
      channelsEmpty: 'No public channels are visible right now.',
      description:
        'Get quick updates, find the right subject channel, and stay connected with the student community in one place.',
      discordTitle: 'Discord',
      features: [
        'Information commands (/help, /faq, /link, /prompt)',
        'Announcements from bulletin board, SIC, ads, and more',
        'Channels for all subjects and relevant topics',
        'Easy contact with Student Parliament',
      ],
      joinButton: 'Join Us',
      liveDescription:
        'See who is around and which public channels are visible right now.',
      liveTitle: 'Live server widget',
      membersShownLabel: 'Members shown',
      noMembers: 'No visible members right now.',
      onlineLabel: 'Online now',
      openButton: 'Open in Discord',
      publicChannelsLabel: 'Public channels',
      subtitle: 'The main student server for everything around FINKI',
      title: 'Discord Community',
      totalMembersLabel: 'Members',
      voiceChannels: 'Voice channels',
      widgetError:
        'Live Discord data is temporarily unavailable. The invite link still works.',
      widgetLoading: 'Loading Discord activity...',
    },
    // Contributions
    contribute: {
      description:
        'Have an idea, found a bug, or want to add new functionality? Contribute to our projects on GitHub!',
      githubButton: 'View on GitHub',
      subtitle: 'Help us improve the platform',
      title: 'Contributions Welcome',
    },
    discord: 'Discord',
    // Footer
    footer: {
      copyright:
        '© {year} FINKI Hub. Independent student platform. All rights reserved.',
      madeWith: 'Made with ❤️ for students of FINKI',
    },
    // Hero
    hero: {
      badge1: 'Student Initiative',
      badge2: 'Open Source',
      badge3: 'For the Community',
      cta: 'Explore Platforms',
      ctaSecondary: 'Join Discord',
      subtitle:
        'A student initiative building tools and resources for students of FINKI. By students, for students.',
      title: 'FINKI Hub',
      titleAccent: 'independent student organization',
    },
    // Header
    nav: {
      community: 'Community',
      contribute: 'Contribute',
      platforms: 'Platforms',
      projects: 'Projects',
    },
    // Quick Overview
    overview: {
      cards: [
        {
          description:
            'An independent initiative led by students for students. Not officially affiliated with FINKI.',
          title: 'Student Organization',
        },
        {
          description:
            'We create useful tools and resources to make studying and staying informed easier.',
          title: 'Tools & Resources',
        },
        {
          description:
            'Active community with bots, subject channels, and direct communication.',
          title: 'Discord Community',
        },
        {
          description:
            'Stay up to date with the latest news, announcements, and events from FINKI.',
          title: 'Latest Information',
        },
      ],
      title: 'At a Glance',
    },
    // Platforms
    platforms: {
      items: [
        {
          description:
            'Browse detailed information about FINKI courses — syllabi, materials, and more.',
          name: 'Предмети',
          url: 'https://predmeti.finki-hub.com',
        },
        {
          description:
            'Explore completed diploma theses, search by topic, mentor, or year.',
          name: 'Дипломски',
          url: 'https://diplomski.finki-hub.com',
        },
        {
          description:
            'Watch recorded lectures and study sessions for FINKI courses.',
          name: 'Снимки',
          url: 'https://snimki.finki-hub.com',
        },
      ],
      subtitle: 'Web platforms built for students of FINKI',
      title: 'Platforms',
      visitButton: 'Visit',
    },
    // Projects
    projects: {
      detailsButton: 'Tech Stack',
      items: [
        {
          description:
            'The core system - scrapes public FINKI pages and structures data.',
          details:
            'Automated collection of announcements, schedules, news, and other public information from FINKI websites.',
          name: 'services-scraper',
          tags: ['Node.js', 'TypeScript'],
        },
        {
          description:
            'Discord bot with commands for quick access to information and notifications.',
          details:
            'Use /help, /faq, /link, /prompt commands. Receive notifications for bulletin board, SIC, and internships.',
          name: 'discord-bot',
          tags: ['Node.js', 'TypeScript', 'discord.js'],
        },
        {
          description:
            'RAG-based chatbot for intelligent answers to questions.',
          details:
            'Uses retrieval-augmented generation to answer questions based on collected data.',
          name: 'chat-bot',
          tags: ['Python', 'FastAPI', 'LangChain'],
        },
      ],
      moreProjects: 'View all projects on GitHub',
      repoButton: 'Repo',
      subtitle: 'Main tools built by the community',
      title: 'Projects',
    },
  },
  mk: {
    // Common
    backToTop: 'Врати се горе',
    // Brand
    brand: 'ФИНКИ Хаб',
    // Community
    community: {
      activeMembers: 'Активни членови',
      channelsEmpty: 'Моментално нема видливи јавни канали.',
      description:
        'Следи важни известувања, најди го точниот канал за предмет и остани поврзан со студентската заедница на едно место.',
      discordTitle: 'Дискорд',
      features: [
        'Информациони команди (/help, /faq, /link, /prompt)',
        'Соопштенија од огласна табла, СИЦ, огласи и друго',
        'Канали за сите предмети и релевантни теми',
        'Лесен контакт со ФСС',
      ],
      joinButton: 'Приклучи се',
      liveDescription:
        'Види кој е активен и кои јавни канали се видливи во моментот.',
      liveTitle: 'Преглед на серверот во живо',
      membersShownLabel: 'Прикажани членови',
      noMembers: 'Моментално нема видливи членови.',
      onlineLabel: 'Онлајн',
      openButton: 'Отвори во Дискорд',
      publicChannelsLabel: 'Јавни канали',
      subtitle: 'Главниот студентски сервер за сè поврзано со ФИНКИ',
      title: 'Дискорд заедница',
      totalMembersLabel: 'Членови',
      voiceChannels: 'Гласовни канали',
      widgetError:
        'Податоците во живо од Дискорд моментално не се достапни. Линкот за покана сe уште работи.',
      widgetLoading: 'Се вчитува Discord активноста...',
    },
    // Contributions
    contribute: {
      description:
        'Имаш идеја, најде баг или сакаш да додадеш нова функционалност? Придонеси на нашите проекти на GitHub!',
      githubButton: 'Погледни на GitHub',
      subtitle: 'Помогни ни да ја подобриме платформата',
      title: 'Придонеси се добредојдени',
    },
    discord: 'Дискорд',
    // Footer
    footer: {
      copyright:
        '© {year} ФИНКИ Хаб. Независна студентска платформа. Сите права се задржани.',
      madeWith: 'Направено со ❤️ за студентите на ФИНКИ',
    },
    // Hero
    hero: {
      badge1: 'Студентска иницијатива',
      badge2: 'Open Source',
      badge3: 'За заедницата',
      cta: 'Истражи платформи',
      ctaSecondary: 'Приклучи се на Дискорд',
      subtitle:
        'Студентска иницијатива која гради алатки и ресурси за студентите на ФИНКИ. Од студенти, за студенти.',
      title: 'ФИНКИ Хаб',
      titleAccent: 'независна студентска организација',
    },
    // Header
    nav: {
      community: 'Заедница',
      contribute: 'Придонеси',
      platforms: 'Платформи',
      projects: 'Проекти',
    },
    // Quick Overview
    overview: {
      cards: [
        {
          description:
            'Независна иницијатива водена од студенти за студенти. Не сме официјално поврзани со ФИНКИ.',
          title: 'Студентска организација',
        },
        {
          description:
            'Создаваме корисни алатки и ресурси за полесно студирање и информирање.',
          title: 'Алатки и ресурси',
        },
        {
          description:
            'Активна заедница со ботови, канали по предмети и директна комуникација.',
          title: 'Дискорд заедница',
        },
        {
          description:
            'Биди во тек со најновите вести, огласи и настани од ФИНКИ.',
          title: 'Најнови информации',
        },
      ],
      title: 'На кратко',
    },
    // Platforms
    platforms: {
      items: [
        {
          description:
            'Прегледај детални информации за предметите на ФИНКИ — наставни програми, материјали и повеќе.',
          name: 'Предмети',
          url: 'https://predmeti.finki-hub.com',
        },
        {
          description:
            'Истражи завршени дипломски работи, пребарувај по тема, ментор или година.',
          name: 'Дипломски',
          url: 'https://diplomski.finki-hub.com',
        },
        {
          description:
            'Гледај снимени предавања и сесии за учење за предметите на ФИНКИ.',
          name: 'Снимки',
          url: 'https://snimki.finki-hub.com',
        },
      ],
      subtitle: 'Веб платформи создадени за студентите на ФИНКИ',
      title: 'Платформи',
      visitButton: 'Посети',
    },
    // Projects
    projects: {
      detailsButton: 'Технологии',
      items: [
        {
          description:
            'Јадрото на системот - скенира јавни ФИНКИ страници и структурира податоци.',
          details:
            'Автоматизирано собирање на огласи, распоред, вести и други јавни информации од веб страниците на ФИНКИ.',
          name: 'services-scraper',
          tags: ['Node.js', 'TypeScript'],
        },
        {
          description:
            'Дискорд бот со команди за брз пристап до информации и нотификации.',
          details:
            'Користи /help, /faq, /link, /prompt команди. Прима нотификации за огласна табла, SIC и пракси.',
          name: 'discord-bot',
          tags: ['Node.js', 'TypeScript', 'discord.js'],
        },
        {
          description:
            'RAG-базиран chatbot за интелигентни одговори на прашања.',
          details:
            'Користи retrieval-augmented generation за да одговара на прашања базирани на собраните податоци.',
          name: 'chat-bot',
          tags: ['Python', 'FastAPI', 'LangChain'],
        },
      ],
      moreProjects: 'Погледни ги сите проекти на GitHub',
      repoButton: 'Repo',
      subtitle: 'Главни алатки создадени од заедницата',
      title: 'Проекти',
    },
  },
} as const;

export type Translations = typeof translations.mk;
