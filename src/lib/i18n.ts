export type Language = 'en' | 'mk';

export const translations = {
  en: {
    // Common
    backToTop: 'Back to top',
    // Brand
    brand: 'FINKI Hub',
    // Community
    community: {
      discordTitle: 'Discord',
      features: [
        'Information commands (/help, /faq, /link, /prompt)',
        'Announcements from bulletin board, SIC, ads, and more',
        'Channels for all subjects and relevant topics',
        'Easy contact with Student Parliament',
      ],
      joinButton: 'Join Us',
      subtitle: 'Connect with other students of FINKI',
      title: 'Discord Community',
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
        '© 2026 FINKI Hub. Independent student platform. All rights reserved.',
      madeWith: 'Made with ❤️ for students of FINKI',
    },
    // Hero
    hero: {
      badge1: 'Student Initiative',
      badge2: 'Open Source',
      badge3: 'For the Community',
      cta: 'View Projects',
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
    // Projects
    projects: {
      detailsButton: 'Tech Stack',
      items: [
        {
          description:
            'The core system - scrapes public FINKI pages and structures data.',
          details:
            'Automated collection of announcements, schedules, news, and other public information from FINKI websites.',
          name: 'finki-scraper',
          tags: ['Node.js', 'TypeScript'],
        },
        {
          description:
            'Discord bot with commands for quick access to information and notifications.',
          details:
            'Use /help, /faq, /link, /prompt commands. Receive notifications for bulletin board, SIC, and internships.',
          name: 'finki-discord-bot',
          tags: ['Node.js', 'TypeScript', 'discord.js'],
        },
        {
          description:
            'RAG-based chatbot for intelligent answers to questions.',
          details:
            'Uses retrieval-augmented generation to answer questions based on collected data.',
          name: 'finki-chat-bot',
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
      discordTitle: 'Дискорд',
      features: [
        'Информациони команди (/help, /faq, /link, /prompt)',
        'Соопштенија од огласна табла, СИЦ, огласи и друго',
        'Канали за сите предмети и релевантни теми',
        'Лесен констакт со ФСС',
      ],
      joinButton: 'Приклучи се',
      subtitle: 'Поврзи се со други студенти од ФИНКИ',
      title: 'Дискорд заедница',
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
        '© 2026 ФИНКИ Хаб. Независна студентска платформа. Сите права се задржани.',
      madeWith: 'Направено со ❤️ за студентите на ФИНКИ',
    },
    // Hero
    hero: {
      badge1: 'Студентска иницијатива',
      badge2: 'Open Source',
      badge3: 'За заедницата',
      cta: 'Погледни проекти',
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
    // Projects
    projects: {
      detailsButton: 'Технологии',
      items: [
        {
          description:
            'Јадрото на системот - скенира јавни ФИНКИ страници и структурира податоци.',
          details:
            'Автоматизирано собирање на огласи, распоред, вести и други јавни информации од веб страниците на ФИНКИ.',
          name: 'finki-scraper',
          tags: ['Node.js', 'TypeScript'],
        },
        {
          description:
            'Дискорд бот со команди за брз пристап до информации и нотификации.',
          details:
            'Користи /help, /faq, /link, /prompt команди. Прима нотификации за огласна табла, SIC и пракси.',
          name: 'finki-discord-bot',
          tags: ['Node.js', 'TypeScript', 'discord.js'],
        },
        {
          description:
            'RAG-базиран chatbot за интелигентни одговори на прашања.',
          details:
            'Користи retrieval-augmented generation за да одговара на прашања базирани на собраните податоци.',
          name: 'finki-chat-bot',
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
