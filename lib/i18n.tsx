"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type Language = "ru" | "en";

export const translations = {
  ru: {
    nav: {
      home: "Главная",
      about: "Обо мне",
      services: "Услуги",
      products: "Продукты",
      contact: "Связаться",
    },
    hero: {
      tag: "Автоматизация · Технологии · Рост",
      title: "Строю цифровую инфраструктуру",
      titleAccent: "которая работает на вас",
      subtitle: "От умных чат-ботов до выхода на рынок США. Я создаю системы, которые снижают издержки, ускоряют рост и освобождают ваше время.",
      cta: "Посмотреть услуги",
      ctaSecondary: "Написать мне",
      features: [
        "Меньше ручного труда и ошибок",
        "Прозрачные, управляемые процессы",
        "Технологии, которые зарабатывают",
      ],
      stats: [
        { value: 50, suffix: "+", label: "клиентов по миру" },
        { value: 5, suffix: "+", label: "лет опыта" },
        { value: 100, suffix: "%", label: "завершённых проектов" },
      ],
    },
    about: {
      tag: "Обо мне",
      name: "Владислав Людвиг",
      subtitle: "Предприниматель, технолог, строитель систем",
      story: [
        "Я начал этот путь, когда понял простую вещь: большинство предпринимателей тонут в рутине не потому что они плохо работают — а потому что у них нет правильных инструментов. Я решил стать тем, кто эти инструменты создаёт.",
        "За 5+ лет я помог десяткам компаний в Европе, США и СНГ выстроить автоматизацию, запустить чат-ботов, создать продающие сайты и зарегистрировать бизнес в США. Мой фокус — результаты, а не «процесс ради процесса».",
        "Сегодня я иду дальше: строю собственные продукты — PayFlow и Linkme — которые сделают международные платежи и цифровое присутствие доступными для каждого.",
      ],
      quote: "Технологии должны освобождать время и приносить деньги — а не создавать новые головоломки.",
      stats: [
        { value: 50, suffix: "+", label: "Клиентов" },
        { value: 5, suffix: "+", label: "Лет опыта" },
        { value: 100, suffix: "%", label: "Выполненных проектов" },
        { value: 3, suffix: "", label: "Континента" },
      ],
      bullets: [
        {
          title: "Автоматизация и интеграции",
          desc: "Связываю CRM, таблицы и API в единую систему. Автоматические отчёты, уведомления, синхронизация данных — чтобы команда занималась делом.",
        },
        {
          title: "Чат-боты и AI-ассистенты",
          desc: "Умные боты для Telegram, WhatsApp и сайтов. Обрабатывают заявки, квалифицируют лиды и поддерживают клиентов 24/7.",
        },
        {
          title: "Сайты и лендинги",
          desc: "Быстрые, продающие сайты с чистым дизайном — оптимизированные под конверсию и SEO с первого дня.",
        },
        {
          title: "Международная инфраструктура",
          desc: "Регистрация LLC/Corp в США, подключение платёжных сервисов, организационная база для глобального бизнеса.",
        },
      ],
      bulletsTitle: "Что я делаю",
      workflow: {
        title: "Как я работаю",
        steps: [
          "Короткий бриф — фиксируем цель и ожидаемый результат",
          "План + бюджет — по этапам, без неприятных сюрпризов",
          "Прототип / демо — показываю на практике до старта",
          "Внедрение — подключение, тесты, запуск",
          "Передача — документация + поддержка при необходимости",
        ],
      },
    },
    services: {
      tag: "Услуги",
      title: "Что я создаю",
      subtitle: "Комплексные решения для предпринимателей, которые хотят расти без хаоса.",
      items: [
        {
          id: "automation",
          title: "Автоматизация бизнеса",
          short: "Скрипты и workflow, которые экономят десятки часов.",
          full: "Анализирую ваши процессы и строю автоматизацию под реальные задачи: от обработки заявок до отчётности и интеграций между сервисами. Результат — меньше человеческого фактора, выше скорость, полная прозрачность.",
          gradient: "from-blue-500 to-cyan-500",
          icon: "Zap",
        },
        {
          id: "chatbots",
          title: "Умные чат-боты",
          short: "Боты для продаж, поддержки и онбординга 24/7.",
          full: "Чат-боты, которые не просто отвечают — они продают, квалифицируют лиды, проводят онбординг и снижают нагрузку на команду. Интеграция с CRM, платёжными системами и внутренними сервисами.",
          gradient: "from-violet-500 to-purple-500",
          icon: "Bot",
        },
        {
          id: "websites",
          title: "Премиальные сайты",
          short: "Дизайн + конверсия + скорость.",
          full: "Проектирую сайты как инструменты продаж: продуманная структура, сильные тексты, высокая скорость и адаптация под все устройства. Дизайн строит доверие, логика — конверсию.",
          gradient: "from-emerald-500 to-teal-500",
          icon: "Globe",
        },
        {
          id: "uscompany",
          title: "Регистрация компаний в США",
          short: "LLC / Corp под ключ со всей документацией.",
          full: "Помогаю выбрать оптимальную структуру и штат, сопровождаю весь процесс регистрации и получения EIN. Вы получаете легальный и работающий инструмент для международного бизнеса.",
          gradient: "from-orange-500 to-red-500",
          icon: "Building2",
        },
        {
          id: "banking",
          title: "Счета в банках США",
          short: "Бизнес-счета для американских компаний.",
          full: "Сопровождаю открытие счетов в банках и финтех-платформах США. Помогаю избежать типичных отказов и выстроить полноценную финансовую инфраструктуру для работы с международными клиентами.",
          gradient: "from-amber-500 to-yellow-500",
          icon: "CreditCard",
        },
      ],
      learnMore: "Подробнее",
      close: "Закрыть",
      contact: "Обсудить проект",
    },
    products: {
      tag: "Продукты",
      title: "Будущие продукты",
      subtitle: "Строю собственные сервисы, которые решают реальные проблемы рынка.",
      comingSoon: "Скоро",
      items: [
        {
          id: "payflow",
          name: "PayFlow",
          tagline: "Международные платежи для России",
          desc: "Сервис для оплаты зарубежных подписок и сервисов напрямую из России. Минимальная комиссия, курс ЦБ на дату покупки — без скрытых наценок.",
          features: [
            "Оплата Netflix, Spotify, Adobe и 500+ сервисов",
            "Курс ЦБ на дату транзакции",
            "Минимальная комиссия рынка",
            "Моментальное подтверждение",
            "Поддержка 24/7",
          ],
          gradient: "from-blue-600 to-indigo-600",
          accentColor: "#3b7cf4",
          icon: "Wallet",
          status: "coming_soon",
        },
        {
          id: "linkme",
          name: "Linkme",
          tagline: "Умный мультилинк с AI",
          desc: "Персональная страница для всех ваших ссылок. С донатилкой, AI-описанием профиля и гибкими тарифами. Ваш цифровой адрес в интернете.",
          features: [
            "До 3 ссылок бесплатно / 5 / 20 в тарифах",
            "Встроенная донатилка",
            "AI-генерация описания профиля",
            "Аналитика переходов",
            "Кастомный дизайн",
          ],
          gradient: "from-violet-600 to-pink-600",
          accentColor: "#8b5cf6",
          icon: "Link2",
          status: "coming_soon",
        },
      ],
    },
    testimonials: {
      tag: "Отзывы",
      title: "Что говорят клиенты",
      items: [
        {
          name: "Sarah Jenkins",
          role: "Основатель e-commerce",
          date: "15.01.2026",
          text: "Владислав взял на себя весь процесс регистрации компании в США — от выбора штата до EIN и открытия счёта. Чёткая коммуникация на каждом этапе, всё сделано за несколько недель.",
        },
        {
          name: "Michael Chen",
          role: "CEO tech-стартапа",
          date: "28.01.2026",
          text: "Нужен был Telegram-бот с умной маршрутизацией обращений. Результат превзошёл ожидания: время ответа сократилось на 60%, логика бота продумана до мелочей.",
        },
        {
          name: "Елена Волкова",
          role: "Владелица digital-агентства",
          date: "03.02.2026",
          text: "До работы с Владиславом мы тратили 20 часов в неделю на ручную отчётность. Теперь всё автоматизировано и занимает минуты. Это реально изменило наш рабочий процесс.",
        },
        {
          name: "David Miller",
          role: "SaaS-предприниматель",
          date: "10.02.2026",
          text: "Старый сайт выглядел неплохо, но не конвертировал. После редизайна — заметный рост регистраций. Быстро, солидно, с фокусом на бизнес-цели.",
        },
      ],
    },
    cta: {
      title: "Готовы начать?",
      subtitle: "Оставьте заявку — я свяжусь с вами в течение 24 часов и мы обсудим ваш проект.",
      button: "Оставить заявку",
    },
    contact: {
      tag: "Контакт",
      title: "Давайте поговорим",
      subtitle: "Расскажите о своём проекте — и я предложу конкретное решение.",
      form: {
        name: "Ваше имя",
        namePlaceholder: "Иван Иванов",
        email: "Email",
        emailPlaceholder: "ivan@company.com",
        message: "О проекте",
        messagePlaceholder: "Расскажите что нужно сделать: автоматизация, бот, сайт, регистрация компании...",
        submit: "Отправить заявку",
        successTitle: "Заявка отправлена!",
        successDesc: "Я получил ваше сообщение и свяжусь в течение 24 часов.",
        errorDesc: "Что-то пошло не так. Попробуйте ещё раз или напишите напрямую.",
      },
      channels: {
        title: "Или напишите напрямую",
        telegram: "@wladislaw_le",
        email: "mail@vladislavliudvig.com",
        instagram: "@wladislaw_le",
        whatsapp: "Написать в WhatsApp",
      },
      quote: "Лучшее время начать — сейчас.",
    },
    chat: {
      title: "Чем могу помочь?",
      subtitle: "AI-ассистент Владислава",
      placeholder: "Напишите ваш вопрос...",
      typing: "печатает...",
      welcome: "Привет! Я Alex — AI-ассистент Владислава. Расскажите, что вас интересует: автоматизация, чат-бот, сайт или выход на рынок США?",
      open: "Написать",
    },
    footer: {
      tagline: "Цифровая инфраструктура для бизнеса нового поколения.",
      company: "Willen LLC",
      address: "1910 Thomes Ave., Cheyenne, WY 82001",
      ein: "EIN: 42-1778898",
      nav: "Навигация",
      rights: "© 2026 Vladislav Liudvig. Все права защищены.",
    },
    common: {
      switchLang: "EN",
      readMore: "Читать далее",
      allServices: "Все услуги",
    },
  },

  en: {
    nav: {
      home: "Home",
      about: "About",
      services: "Services",
      products: "Products",
      contact: "Contact",
    },
    hero: {
      tag: "Automation · Technology · Growth",
      title: "Building digital infrastructure",
      titleAccent: "that works for you",
      subtitle: "From intelligent chatbots to US company formation. I create systems that cut costs, accelerate growth, and free your time.",
      cta: "Explore Services",
      ctaSecondary: "Get in Touch",
      features: [
        "Less manual work and errors",
        "Transparent, manageable processes",
        "Technology that generates revenue",
      ],
      stats: [
        { value: 50, suffix: "+", label: "global clients" },
        { value: 5, suffix: "+", label: "years of experience" },
        { value: 100, suffix: "%", label: "completed projects" },
      ],
    },
    about: {
      tag: "About Me",
      name: "Vladislav Liudvig",
      subtitle: "Entrepreneur, Technologist, Systems Builder",
      story: [
        "I started this journey when I realized something simple: most entrepreneurs drown in routine not because they work poorly — but because they lack the right tools. I decided to become the person who builds those tools.",
        "Over 5+ years, I've helped dozens of companies across Europe, the USA, and CIS build automation, launch chatbots, create high-converting websites, and register US businesses. My focus is results, not process for process's sake.",
        "Today I'm going further: building my own products — PayFlow and Linkme — to make international payments and digital presence accessible to everyone.",
      ],
      quote: "Technology should free your time and generate money — not create new headaches.",
      stats: [
        { value: 50, suffix: "+", label: "Clients" },
        { value: 5, suffix: "+", label: "Years Experience" },
        { value: 100, suffix: "%", label: "Projects Completed" },
        { value: 3, suffix: "", label: "Continents" },
      ],
      bullets: [
        {
          title: "Automation & Integrations",
          desc: "I connect CRM, spreadsheets, and APIs into unified systems. Automated reports, instant notifications, data sync — so your team focuses on what matters.",
        },
        {
          title: "Chatbots & AI Assistants",
          desc: "Smart bots for Telegram, WhatsApp, and websites. They handle inquiries, qualify leads, and support clients around the clock — no extra headcount needed.",
        },
        {
          title: "Websites & Landing Pages",
          desc: "Fast, conversion-focused websites with clean design — optimized for advertising and SEO from day one.",
        },
        {
          title: "International Infrastructure",
          desc: "Full US LLC/Corp registration support, payment processing setup, and the organizational foundation to operate globally.",
        },
      ],
      bulletsTitle: "What I Do",
      workflow: {
        title: "How I Work",
        steps: [
          "Quick brief — we define the goal and expected result",
          "Plan + budget — step by step, no surprises",
          "Prototype / demo — I show it in practice before we start",
          "Implementation — setup, tests, launch",
          "Handoff — documentation + support as needed",
        ],
      },
    },
    services: {
      tag: "Services",
      title: "What I Build",
      subtitle: "End-to-end solutions for entrepreneurs who want to grow without chaos.",
      items: [
        {
          id: "automation",
          title: "Business Automation",
          short: "Scripts and workflows that save dozens of hours.",
          full: "I analyze your processes and build automation for real business tasks: from lead processing to reporting and service integrations. Result — less human error, higher speed, full transparency.",
          gradient: "from-blue-500 to-cyan-500",
          icon: "Zap",
        },
        {
          id: "chatbots",
          title: "Intelligent Chatbots",
          short: "Bots for sales, support, and onboarding 24/7.",
          full: "Chatbots that don't just answer — they sell, qualify leads, onboard, and reduce team load. Integrated with CRM, payments, and internal systems.",
          gradient: "from-violet-500 to-purple-500",
          icon: "Bot",
        },
        {
          id: "websites",
          title: "Premium Websites",
          short: "Design + conversion + speed.",
          full: "I design websites as sales tools: thoughtful structure, strong copy, fast loading, and responsive across all devices. Design builds trust, logic builds conversion.",
          gradient: "from-emerald-500 to-teal-500",
          icon: "Globe",
        },
        {
          id: "uscompany",
          title: "US Business Formation",
          short: "LLC / Corp turnkey with full documentation.",
          full: "I help choose the optimal structure and state, guide the full registration process, and handle EIN acquisition. You get a legal, functional tool for international business.",
          gradient: "from-orange-500 to-red-500",
          icon: "Building2",
        },
        {
          id: "banking",
          title: "US Banking Solutions",
          short: "Business bank accounts for US companies.",
          full: "I guide account opening at US banks and fintech platforms. I help avoid typical rejections and build full financial infrastructure for international operations.",
          gradient: "from-amber-500 to-yellow-500",
          icon: "CreditCard",
        },
      ],
      learnMore: "Learn More",
      close: "Close",
      contact: "Discuss Project",
    },
    products: {
      tag: "Products",
      title: "Upcoming Products",
      subtitle: "Building my own services that solve real market problems.",
      comingSoon: "Coming Soon",
      items: [
        {
          id: "payflow",
          name: "PayFlow",
          tagline: "International Payments for Russia",
          desc: "A service for paying foreign subscriptions and services directly from Russia. Minimal commission, CBR rate on purchase date — no hidden markups.",
          features: [
            "Pay for Netflix, Spotify, Adobe & 500+ services",
            "CBR exchange rate on transaction date",
            "Lowest market commission",
            "Instant confirmation",
            "24/7 support",
          ],
          gradient: "from-blue-600 to-indigo-600",
          accentColor: "#3b7cf4",
          icon: "Wallet",
          status: "coming_soon",
        },
        {
          id: "linkme",
          name: "Linkme",
          tagline: "Smart Multi-Link with AI",
          desc: "Your personal page for all your links. With a built-in donation feature, AI-generated profile bio, and flexible plans. Your digital address on the internet.",
          features: [
            "Up to 3 links free / 5 / 20 in plans",
            "Built-in donation widget",
            "AI-generated profile description",
            "Click analytics",
            "Custom design",
          ],
          gradient: "from-violet-600 to-pink-600",
          accentColor: "#8b5cf6",
          icon: "Link2",
          status: "coming_soon",
        },
      ],
    },
    testimonials: {
      tag: "Reviews",
      title: "What Clients Say",
      items: [
        {
          name: "Sarah Jenkins",
          role: "E-commerce Founder",
          date: "15.01.2026",
          text: "Vladislav handled the entire US company registration — from choosing the state to EIN and bank account. Clear communication at every step, done in a few weeks.",
        },
        {
          name: "Michael Chen",
          role: "Tech Startup CEO",
          date: "28.01.2026",
          text: "We needed a Telegram bot with smart inquiry routing. The result exceeded expectations: response times dropped 60%, and the bot logic is incredibly well thought out.",
        },
        {
          name: "Elena Volkova",
          role: "Digital Agency Owner",
          date: "03.02.2026",
          text: "Before working with Vladislav, our team spent 20 hours a week on manual reporting. Now it's all automated and takes minutes. A real game-changer for our workflow.",
        },
        {
          name: "David Miller",
          role: "SaaS Entrepreneur",
          date: "10.02.2026",
          text: "Our old site looked decent but wasn't converting. After the redesign, sign-ups noticeably increased. Fast, premium, built with real business goals in mind.",
        },
      ],
    },
    cta: {
      title: "Ready to start?",
      subtitle: "Submit a request — I'll reach out within 24 hours to discuss your project.",
      button: "Submit a Request",
    },
    contact: {
      tag: "Contact",
      title: "Let's Talk",
      subtitle: "Tell me about your project and I'll offer a concrete solution.",
      form: {
        name: "Your Name",
        namePlaceholder: "John Doe",
        email: "Email",
        emailPlaceholder: "john@company.com",
        message: "About Your Project",
        messagePlaceholder: "Tell me what you need: automation, bot, website, US company registration...",
        submit: "Send Request",
        successTitle: "Request Sent!",
        successDesc: "I got your message and will respond within 24 hours.",
        errorDesc: "Something went wrong. Please try again or write directly.",
      },
      channels: {
        title: "Or reach out directly",
        telegram: "@wladislaw_le",
        email: "mail@vladislavliudvig.com",
        instagram: "@wladislaw_le",
        whatsapp: "Write on WhatsApp",
      },
      quote: "The best time to start is now.",
    },
    chat: {
      title: "How can I help?",
      subtitle: "Vladislav's AI Assistant",
      placeholder: "Ask me anything...",
      typing: "typing...",
      welcome: "Hi! I'm Alex — Vladislav's AI assistant. What are you looking for: automation, a chatbot, a website, or expanding to the US market?",
      open: "Chat",
    },
    footer: {
      tagline: "Digital infrastructure for the next generation of business.",
      company: "Willen LLC",
      address: "1910 Thomes Ave., Cheyenne, WY 82001",
      ein: "EIN: 42-1778898",
      nav: "Navigation",
      rights: "© 2026 Vladislav Liudvig. All rights reserved.",
    },
    common: {
      switchLang: "RU",
      readMore: "Read more",
      allServices: "All services",
    },
  },
} as const;

export type Translations = typeof translations.ru;

const I18nContext = createContext<{
  lang: Language;
  setLang: (l: Language) => void;
  t: Translations;
} | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("ru");
  return (
    <I18nContext.Provider value={{ lang, setLang, t: translations[lang] as unknown as Translations }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
