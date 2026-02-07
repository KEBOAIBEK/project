// Mock data for the Antifraud Platform
// This will be replaced with API calls later

export const reports = [
  {
    id: 1,
    type: "Phone",
    identifier: "+998 90 123 45 67",
    category: "FIRIBGARLIK",
    status: "fraud",
    description: "This number is associated with fake job offers.",
    reportCount: 47,
    trustScore: 12,
    timeAgo: "30 minutes ago",
    icon: "phone",
  },
  {
    id: 2,
    type: "Telegram",
    identifier: "@crypto_invest_uz",
    category: "FIRIBGARLIK",
    status: "fraud",
    description:
      "Fake cryptocurrency investment scheme promising 200% returns.",
    reportCount: 89,
    trustScore: 5,
    timeAgo: "1 hour ago",
    icon: "telegram",
  },
  {
    id: 3,
    type: "Website",
    identifier: "loans-express-uz.com",
    category: "SHUBHALI",
    status: "suspicious",
    description: "Suspicious lending website collecting personal data.",
    reportCount: 12,
    trustScore: 35,
    timeAgo: "2 hours ago",
    icon: "website",
  },
  {
    id: 4,
    type: "Phone",
    identifier: "+998 71 234 56 78",
    category: "FIRIBGARLIK",
    status: "fraud",
    description:
      'Posing as bank security calling about "suspicious transactions".',
    reportCount: 156,
    trustScore: 3,
    timeAgo: "3 hours ago",
    icon: "phone",
  },
  {
    id: 5,
    type: "Telegram",
    identifier: "@quick_money_bot",
    category: "SHUBHALI",
    status: "suspicious",
    description: "Bot claims to offer easy money making opportunities.",
    reportCount: 23,
    trustScore: 28,
    timeAgo: "4 hours ago",
    icon: "telegram",
  },
  {
    id: 6,
    type: "Website",
    identifier: "bank-kapital-support.net",
    category: "FIRIBGARLIK",
    status: "fraud",
    description: "Phishing website imitating Kapital Bank.",
    reportCount: 234,
    trustScore: 2,
    timeAgo: "5 hours ago",
    icon: "website",
  },
];

export const reportDetails = {
  2: {
    id: 2,
    type: "Telegram",
    identifier: "@crypto_invest_uz",
    category: "FIRIBGARLIK",
    status: "fraud",
    trustScore: 5,
    totalReports: 89,
    lastReported: "1 hour ago",
    weeklyReports: 12,
    reporter: "Anonymous User",
    reportDate: "2026-02-07",
    fullDescription:
      'This channel promotes a "guaranteed" investment strategy. I sent $100 as a test, and they showed a fake dashboard with profits. When I tried to withdraw, they asked for a 20% commission fee. After paying that, they blocked me.',
    evidenceImages: [
      "/placeholder-evidence-1.jpg",
      "/placeholder-evidence-2.jpg",
    ],
    information: {
      category: "Telegram",
      platform: "Telegram Channel",
      firstReported: "2026-01-15",
      totalLoss: "$12,500+",
    },
  },
};

export const resources = [
  {
    id: "protect-yourself",
    icon: "shield",
    iconColor: "green",
    title: "O'zingizni qanday himoya qilish",
    description:
      "Pul o'tkazishdan yoki shaxsiy ma'lumotlarni baham ko'rishdan oldin har doim manbalarni tasdiqlang.",
    link: "/info/protect-yourself",
  },
  {
    id: "what-to-do",
    icon: "alert",
    iconColor: "red",
    title: "Aldangan bo'lsangiz nima qilish kerak",
    description:
      "Shoshilmasdan bankkangizga xabar bering va rasmiylarga shikoyat qiling.",
    link: "/info/what-to-do",
  },
  {
    id: "official-sources",
    icon: "info",
    iconColor: "blue",
    title: "Rasmiy manbalar",
    description:
      "Rasmiy hukumat va moliyaviy tashkilotlardan so'nggi firibgarlik ogohlantirishlaridan xabardor bo'ling.",
    link: "/info/official-sources",
  },
];

export const infoPages = {
  "protect-yourself": {
    title: "O'zingizni himoya qilish",
    subtitle: "Firibgarlardan saqlanishning 5 ta oltin qoidasi.",
    icon: "shield",
    rules: [
      {
        title: "1. Hech qachon SMS kodni bermang",
        content:
          "Banklar, to'lov tizimlari yoki davlat organlari hech qachon sizdan SMS orqali kelgan tasdiqlash kodini so'ramaydi. Agar kimdir 'xatolik bo'ldi', 'bloklandi' yoki 'yutuq yutdingiz' deb kodni so'rasa – bu firibgar.",
      },
      {
        title: "2. Shubhali havolalarni ochmang",
        content:
          "Telegram, SMS yoki email orqali kelgan notanish havolalarni (ayniqsa 'yutuqli o'yinlar', 'davlat yordami') ochmang. Rasmiy sayt manzilini har doim tekshiring (masalan, my.gov.uz, click.uz).",
      },
      {
        title: "3. Shaxsiy ma'lumotlarni himoya qiling",
        content:
          "Pasport seriyasi, karta raqami, CVV yoki parollarni hech kimga bermang. Haqiqiy xodimlar bu ma'lumotlarni so'ramaydi.",
      },
      {
        title: "4. Tekshirib ko'ring",
        content:
          "Notanish raqam yoki akkauntdan xabar kelsa – avval Antifraud platformasida tekshiring. Yoki rasmiy telefon orqali tashkilotga qo'ng'iroq qiling.",
      },
      {
        title: "5. Tezkor qaror qabul qilmang",
        content:
          'Firibgarlar odatda "tez harakat qiling", "faqat bugun" deb bosim o\'tkazadi. Har qanday moliyaviy qarorni xotirjam holda qabul qiling.',
      },
    ],
  },
  "what-to-do": {
    title: "Aldangan bo'lsangiz nima qilish kerak",
    subtitle: "Firibgarlik qurboni bo'lsangiz quyidagi qadamlarni bajaring.",
    icon: "alert",
    rules: [
      {
        title: "1. Darhol bankingizga xabar bering",
        content:
          "Agar pul o'tkazgan bo'lsangiz, darhol bankingizning call-markaziga qo'ng'iroq qiling va tranzaksiyani bloklashni so'rang.",
      },
      {
        title: "2. Parollarni o'zgartiring",
        content:
          "Agar login yoki parol ma'lumotlarini bergan bo'lsangiz, darhol barcha bog'liq akkauntlarning parollarini o'zgartiring.",
      },
      {
        title: "3. Dalillarni saqlang",
        content:
          "Suhbat skrinshoti, tranzaksiya tarixi, telefon raqami va boshqa ma'lumotlarni saqlang. Bu kelajakda tergov uchun kerak bo'ladi.",
      },
      {
        title: "4. Rasmiy shikoyat yozing",
        content:
          "IIV kiberxavfsizlik bo'limiga (1102) yoki prokuraturaga ariza yozing. Dalillarni ilova qiling.",
      },
      {
        title: "5. Antifraud'ga xabar bering",
        content:
          "Boshqalarni ogohlantirish uchun firibgarni bizning platformamizda xabar bering. Bu boshqa odamlarni himoya qilishga yordam beradi.",
      },
    ],
  },
  "official-sources": {
    title: "Rasmiy manbalar",
    subtitle: "Ishonchli axborot manbalari va yordam xizmatlari.",
    icon: "info",
    sources: [
      {
        name: "IIV Kiberxavfsizlik markazi",
        description: "Kiberjinoyatlar bo'yicha shikoyat qoldirish uchun",
        contact: "1102",
      },
      {
        name: "Markaziy bank (CBU)",
        description: "Moliyaviy firibgarliklar haqida ma'lumot",
        contact: "cbu.uz",
      },
      {
        name: "UZINFOCOM",
        description: "Raqamli xavfsizlik bo'yicha maslahatlar",
        contact: "uzinfocom.uz",
      },
      {
        name: "Prokuratura portali",
        description: "Onlayn shikoyat yuborish",
        contact: "prokuratura.uz",
      },
    ],
  },
};

export const stats = {
  weeklyReports: 5,
  totalReports: 1247,
  verifiedFrauds: 892,
  protectedUsers: "10K+",
};
