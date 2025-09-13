// App Constants
export const APP_CONFIG = {
  name: 'ZD Flower',
  version: '2.0.0',
  description: 'تطبيق التركيز الأحدث والأقوى',
  author: 'ZD Developer',
  defaultSessionDuration: 25, // minutes
  maxSessions: 100,
  autoSaveInterval: 30000, // 30 seconds
} as const;

// VIP Levels Configuration
export const VIP_LEVELS = {
  1: { name: 'الغابة السحرية', theme: 'forest', color: 'emerald' },
  2: { name: 'النجوم السماوية', theme: 'celestial', color: 'blue' },
  3: { name: 'نار العنقاء', theme: 'phoenix', color: 'orange' },
  4: { name: 'كريستال الماس', theme: 'crystal', color: 'gray' },
  5: { name: 'ظلال الفراغ', theme: 'void', color: 'purple' },
  6: { name: 'عجلة الزمن', theme: 'time', color: 'amber' },
  7: { name: 'القوة الملكية', theme: 'divine', color: 'pink' },
  8: { name: 'المستوى الخارق', theme: 'ultra', color: 'cyber' },
} as const;

// Achievement System
export const ACHIEVEMENTS = {
  FIRST_SESSION: { id: 'first_session', name: 'البذرة الأولى', description: 'أكمل أول جلسة تركيز' },
  STREAK_3: { id: 'streak_3', name: 'ثلاثة أيام متتالية', description: 'حافظ على التركيز لثلاثة أيام متتالية' },
  STREAK_7: { id: 'streak_7', name: 'أسبوع كامل', description: 'حافظ على التركيز لأسبوع كامل' },
  SESSIONS_10: { id: 'sessions_10', name: 'عشرة جلسات', description: 'أكمل عشرة جلسات تركيز' },
  SESSIONS_50: { id: 'sessions_50', name: 'خمسون جلسة', description: 'أكمل خمسين جلسة تركيز' },
  TOTAL_TIME_100: { id: 'total_time_100', name: 'مئة ساعة', description: 'اجمع مئة ساعة من التركيز' },
  VIP_UNLOCK: { id: 'vip_unlock', name: 'العضوية المميزة', description: 'فعل عضوية VIP' },
  ULTRA_LEVEL: { id: 'ultra_level', name: 'المستوى الخارق', description: 'وصل للمستوى الخارق 8' },
} as const;

// Storage Keys
export const STORAGE_KEYS = {
  STATS: 'focusRoseStats',
  VIP_ACCESS: 'vipAccess',
  VIP_LEVEL: 'vipLevel',
  SETTINGS: 'appSettings',
  ACHIEVEMENTS: 'userAchievements',
} as const;

// Theme Colors
export const THEME_COLORS = {
  forest: ['emerald', 'green', 'teal'],
  celestial: ['blue', 'indigo', 'cyan'],
  phoenix: ['orange', 'red', 'yellow'],
  crystal: ['gray', 'slate', 'zinc'],
  void: ['purple', 'violet', 'indigo'],
  time: ['amber', 'yellow', 'orange'],
  divine: ['pink', 'rose', 'fuchsia'],
  ultra: ['cyan', 'purple', 'pink'],
} as const;

// Animation Durations (in milliseconds)
export const ANIMATION_DURATIONS = {
  fast: 200,
  normal: 300,
  slow: 500,
  extra_slow: 1000,
} as const;

// Notification Messages
export const NOTIFICATION_MESSAGES = {
  SESSION_COMPLETE: 'مبروك! اكتملت جلسة التركيز بنجاح 🌸',
  SESSION_ABANDONED: 'لا تيأس! يمكنك البدء من جديد 💪',
  VIP_UNLOCKED: 'مبروك! تم تفعيل عضوية VIP 👑',
  ACHIEVEMENT_UNLOCKED: 'إنجاز جديد! 🏆',
} as const;