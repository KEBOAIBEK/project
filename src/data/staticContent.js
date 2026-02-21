/**
 * Static content data for resources and info pages.
 *
 * Separated from API service to follow SRP — static data
 * does not belong in an HTTP client module.
 */

export const resources = [
  {
    id: 'protect-yourself',
    icon: 'shield',
    iconColor: 'green',
    title: "O'zingizni qanday himoya qilish",
    description:
      "Pul o'tkazishdan yoki shaxsiy ma'lumotlarni baham ko'rishdan oldin har doim manbalarni tasdiqlang.",
    link: '/info/protect-yourself',
  },
  {
    id: 'what-to-do',
    icon: 'alert',
    iconColor: 'red',
    title: "Aldangan bo'lsangiz nima qilish kerak",
    description:
      "Shoshilmasdan bankkangizga xabar bering va rasmiylarga shikoyat qiling.",
    link: '/info/what-to-do',
  },
  {
    id: 'official-sources',
    icon: 'info',
    iconColor: 'blue',
    title: 'Rasmiy manbalar',
    description:
      "Rasmiy hukumat va moliyaviy tashkilotlardan so'nggi firibgarlik ogohlantirishlaridan xabardor bo'ling.",
    link: '/info/official-sources',
  },
];

export const infoPages = {
  'protect-yourself': {
    title: "O'zingizni himoya qilish",
    subtitle: 'Firibgarlardan saqlanishning 5 ta oltin qoidasi.',
    icon: 'shield',
    rules: [
      {
        title: '1. Hech qachon SMS kodni bermang',
        content:
          "Banklar, to'lov tizimlari yoki davlat organlari hech qachon sizdan SMS orqali kelgan tasdiqlash kodini so'ramaydi. Agar kimdir 'xatolik bo'ldi', 'bloklandi' yoki 'yutuq yutdingiz' deb kodni so'rasa – bu firibgar.",
      },
      {
        title: '2. Shubhali havolalarni ochmang',
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
        title: '5. Tezkor qaror qabul qilmang',
        content:
          'Firibgarlar odatda "tez harakat qiling", "faqat bugun" deb bosim o\'tkazadi. Har qanday moliyaviy qarorni xotirjam holda qabul qiling.',
      },
    ],
  },
  'what-to-do': {
    title: "Aldangan bo'lsangiz nima qilish kerak",
    subtitle: "Firibgarlik qurboni bo'lsangiz quyidagi qadamlarni bajaring.",
    icon: 'alert',
    rules: [
      {
        title: '1. Darhol bankingizga xabar bering',
        content:
          "Agar pul o'tkazgan bo'lsangiz, darhol bankingizning call-markaziga qo'ng'iroq qiling va tranzaksiyani bloklashni so'rang.",
      },
      {
        title: "2. Parollarni o'zgartiring",
        content:
          "Agar login yoki parol ma'lumotlarini bergan bo'lsangiz, darhol barcha bog'liq akkauntlarning parollarini o'zgartiring.",
      },
      {
        title: '3. Dalillarni saqlang',
        content:
          "Suhbat skrinshoti, tranzaksiya tarixi, telefon raqami va boshqa ma'lumotlarni saqlang. Bu kelajakda tergov uchun kerak bo'ladi.",
      },
      {
        title: '4. Rasmiy shikoyat yozing',
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
  'official-sources': {
    title: 'Rasmiy manbalar',
    subtitle: 'Ishonchli axborot manbalari va yordam xizmatlari.',
    icon: 'info',
    sources: [
      {
        name: 'IIV Kiberxavfsizlik markazi',
        description: "Kiberjinoyatlar bo'yicha shikoyat qoldirish uchun",
        contact: '1102',
      },
      {
        name: 'Markaziy bank (CBU)',
        description: "Moliyaviy firibgarliklar haqida ma'lumot",
        contact: 'cbu.uz',
      },
      {
        name: 'UZINFOCOM',
        description: "Raqamli xavfsizlik bo'yicha maslahatlar",
        contact: 'uzinfocom.uz',
      },
      {
        name: 'Prokuratura portali',
        description: 'Onlayn shikoyat yuborish',
        contact: 'prokuratura.uz',
      },
    ],
  },
};
