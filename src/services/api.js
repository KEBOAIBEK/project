// API Service for Antifraud Platform
// Real API integration with JWT authentication

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://164.68.123.58:8080';

// Token management - uses 'token' key from localStorage
let authToken = localStorage.getItem('token') || null;

export const setAuthToken = (token) => {
  authToken = token;
  if (token) {
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
  }
};

export const getAuthToken = () => {
  // Always get fresh token from localStorage
  return localStorage.getItem('token');
};

export const isAuthenticated = () => !!localStorage.getItem('token');

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (response.status === 401 || response.status === 403) {
    // Token expired or unauthorized - clear token
    // Don't throw for public endpoints, just return empty data
    console.warn('API returned 401/403 - may need authentication');
  }
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

// Helper function for making requests
const apiRequest = async (endpoint, options = {}) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  // Add auth token if available - always get fresh from localStorage
  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    return handleResponse(response);
  } catch (error) {
    console.error('API Request failed:', error);
    throw error;
  }
};

// ============================================
// Auth API
// ============================================

/**
 * Login to get JWT token
 * POST /auth/login
 * @param {string} username 
 * @param {string} password 
 */
export const login = async (username, password) => {
  const response = await apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
  
  if (response.token) {
    setAuthToken(response.token);
  }
  
  return response;
};

export const logout = () => {
  setAuthToken(null);
};

// ============================================
// Reports API
// ============================================

/**
 * Get all reports with pagination
 * POST /reports/getAll
 * @param {number} page - Page number (0-indexed)
 * @param {number} size - Items per page
 * @returns {Promise<{page, size, pageTotal, total, items: ReportResponseDTO[]}>}
 */
export const getReports = async (page = 0, size = 10) => {
  return apiRequest('/reports/getAll', {
    method: 'POST',
    body: JSON.stringify({ page, size }),
  });
};

/**
 * Get a single report by ID
 * GET /reports/getById/{id}
 * @param {number|string} id - Report ID
 */
export const getReportById = async (id) => {
  return apiRequest(`/reports/getById/${id}`, {
    method: 'GET',
  });
};

/**
 * Create a new fraud report
 * POST /reports/create
 * @param {Object} reportData - { title, description, tagIds, reportType, reportStatus }
 * ReportType: PHONE | EMAIL | TELEGRAM
 * ReportStatus: SUCCESS | LIE | INSPECTION | UNKNOWN | SUSPICIOUS
 */
export const createReport = async (reportData) => {
  return apiRequest('/reports/create', {
    method: 'POST',
    body: JSON.stringify(reportData),
  });
};

/**
 * Update an existing report
 * POST /reports/update/{id}
 * @param {number|string} id - Report ID
 * @param {Object} reportData - Updated report data
 */
export const updateReport = async (id, reportData) => {
  return apiRequest(`/reports/update/${id}`, {
    method: 'POST',
    body: JSON.stringify(reportData),
  });
};

// ============================================
// Tags API
// ============================================

/**
 * Get all tags with pagination
 * POST /tag/getAll
 */
export const getTags = async (page = 0, size = 50) => {
  return apiRequest('/tag/getAll', {
    method: 'POST',
    body: JSON.stringify({ page, size }),
  });
};

/**
 * Get tag by ID
 * GET /tag/getById/{id}
 */
export const getTagById = async (id) => {
  return apiRequest(`/tag/getById/${id}`, {
    method: 'GET',
  });
};

// ============================================
// Comments API
// ============================================

/**
 * Get all comments with pagination
 * POST /comment/getAll
 */
export const getComments = async (page = 0, size = 20) => {
  return apiRequest('/comment/getAll', {
    method: 'POST',
    body: JSON.stringify({ page, size }),
  });
};

/**
 * Create a comment
 * POST /comment/create
 * @param {Object} commentData - { comment, reportId }
 */
export const createComment = async (commentData) => {
  return apiRequest('/comment/create', {
    method: 'POST',
    body: JSON.stringify(commentData),
  });
};

// ============================================
// Search (client-side filtering)
// ============================================

/**
 * Search reports by query (filters from getAll results)
 * @param {string} query - Search query
 * @param {string} type - Type filter (PHONE, EMAIL, TELEGRAM)
 */
export const searchReports = async (query, type = null) => {
  try {
    const response = await getReports(0, 100);
    const reports = response.items || [];
    
    const queryLower = query.toLowerCase();
    let results = reports.filter(report => 
      report.title?.toLowerCase().includes(queryLower) ||
      report.description?.toLowerCase().includes(queryLower)
    );
    
    if (type && type !== 'all') {
      results = results.filter(r => r.reportType === type.toUpperCase());
    }
    
    return results;
  } catch (error) {
    console.error('Search failed:', error);
    return [];
  }
};

// ============================================
// Transform Functions
// ============================================

/**
 * Transform API response to match frontend expected format
 */
export const transformReport = (report) => {
  const reportTypeMap = {
    'PHONE': 'Phone',
    'EMAIL': 'Email',
    'TELEGRAM': 'Telegram'
  };
  
  const statusMap = {
    'SUCCESS': 'verified',
    'LIE': 'fraud',
    'INSPECTION': 'pending',
    'UNKNOWN': 'unknown',
    'SUSPICIOUS': 'suspicious'
  };

  const trustScoreMap = {
    'SUCCESS': 90,
    'LIE': 5,
    'INSPECTION': 50,
    'UNKNOWN': 40,
    'SUSPICIOUS': 20
  };

  return {
    id: report.id,
    type: reportTypeMap[report.reportType] || report.reportType || 'Phone',
    identifier: report.title || 'Unknown',
    category: report.reportStatus || 'UNKNOWN',
    status: statusMap[report.reportStatus] || 'suspicious',
    description: report.description || '',
    reportCount: report.likes || 1,
    trustScore: trustScoreMap[report.reportStatus] || 30,
    timeAgo: formatTimeAgo(report.createdAt),
    fullDescription: report.description || '',
    reporter: report.createdBy?.userName || report.createdBy?.firstName || 'Anonymous',
    reportDate: report.createdAt?.split('T')[0] || new Date().toISOString().split('T')[0],
    evidenceImages: [],
    tagIds: report.tagIds || [],
    information: {
      category: reportTypeMap[report.reportType] || 'Unknown',
      platform: reportTypeMap[report.reportType] || 'Unknown',
      firstReported: report.createdAt?.split('T')[0] || 'N/A',
      totalLoss: 'N/A',
    },
    weeklyReports: 0,
    createdAt: report.createdAt,
    updatedAt: report.updatedAt,
  };
};

/**
 * Format date to relative time
 */
const formatTimeAgo = (dateString) => {
  if (!dateString) return 'Recently';
  
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  
  if (diffMins < 60) return `${diffMins} daqiqa oldin`;
  if (diffHours < 24) return `${diffHours} soat oldin`;
  if (diffDays < 7) return `${diffDays} kun oldin`;
  return date.toLocaleDateString('uz-UZ');
};

// ============================================
// Static Data (Resources and Info Pages)
// ============================================

export const resources = [
  {
    id: "protect-yourself",
    icon: "shield",
    iconColor: "green",
    title: "O'zingizni qanday himoya qilish",
    description: "Pul o'tkazishdan yoki shaxsiy ma'lumotlarni baham ko'rishdan oldin har doim manbalarni tasdiqlang.",
    link: "/info/protect-yourself",
  },
  {
    id: "what-to-do",
    icon: "alert",
    iconColor: "red",
    title: "Aldangan bo'lsangiz nima qilish kerak",
    description: "Shoshilmasdan bankkangizga xabar bering va rasmiylarga shikoyat qiling.",
    link: "/info/what-to-do",
  },
  {
    id: "official-sources",
    icon: "info",
    iconColor: "blue",
    title: "Rasmiy manbalar",
    description: "Rasmiy hukumat va moliyaviy tashkilotlardan so'nggi firibgarlik ogohlantirishlaridan xabardor bo'ling.",
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
        content: "Banklar, to'lov tizimlari yoki davlat organlari hech qachon sizdan SMS orqali kelgan tasdiqlash kodini so'ramaydi. Agar kimdir 'xatolik bo'ldi', 'bloklandi' yoki 'yutuq yutdingiz' deb kodni so'rasa – bu firibgar.",
      },
      {
        title: "2. Shubhali havolalarni ochmang",
        content: "Telegram, SMS yoki email orqali kelgan notanish havolalarni (ayniqsa 'yutuqli o'yinlar', 'davlat yordami') ochmang. Rasmiy sayt manzilini har doim tekshiring (masalan, my.gov.uz, click.uz).",
      },
      {
        title: "3. Shaxsiy ma'lumotlarni himoya qiling",
        content: "Pasport seriyasi, karta raqami, CVV yoki parollarni hech kimga bermang. Haqiqiy xodimlar bu ma'lumotlarni so'ramaydi.",
      },
      {
        title: "4. Tekshirib ko'ring",
        content: "Notanish raqam yoki akkauntdan xabar kelsa – avval Antifraud platformasida tekshiring. Yoki rasmiy telefon orqali tashkilotga qo'ng'iroq qiling.",
      },
      {
        title: "5. Tezkor qaror qabul qilmang",
        content: 'Firibgarlar odatda "tez harakat qiling", "faqat bugun" deb bosim o\'tkazadi. Har qanday moliyaviy qarorni xotirjam holda qabul qiling.',
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
        content: "Agar pul o'tkazgan bo'lsangiz, darhol bankingizning call-markaziga qo'ng'iroq qiling va tranzaksiyani bloklashni so'rang.",
      },
      {
        title: "2. Parollarni o'zgartiring",
        content: "Agar login yoki parol ma'lumotlarini bergan bo'lsangiz, darhol barcha bog'liq akkauntlarning parollarini o'zgartiring.",
      },
      {
        title: "3. Dalillarni saqlang",
        content: "Suhbat skrinshoti, tranzaksiya tarixi, telefon raqami va boshqa ma'lumotlarni saqlang. Bu kelajakda tergov uchun kerak bo'ladi.",
      },
      {
        title: "4. Rasmiy shikoyat yozing",
        content: "IIV kiberxavfsizlik bo'limiga (1102) yoki prokuraturaga ariza yozing. Dalillarni ilova qiling.",
      },
      {
        title: "5. Antifraud'ga xabar bering",
        content: "Boshqalarni ogohlantirish uchun firibgarni bizning platformamizda xabar bering. Bu boshqa odamlarni himoya qilishga yordam beradi.",
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

// Default export with all API functions
export default {
  // Auth
  login,
  logout,
  isAuthenticated,
  setAuthToken,
  getAuthToken,
  
  // Reports
  getReports,
  getReportById,
  createReport,
  updateReport,
  searchReports,
  transformReport,
  
  // Tags
  getTags,
  getTagById,
  
  // Comments
  getComments,
  createComment,
  
  // Static data
  resources,
  infoPages,
};
