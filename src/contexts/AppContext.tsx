import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { playGrowthSound, playSuccessSound } from '@/utils/sounds';
import { playVipGrowthSound, playVipSuccessSound, playVipNotification, playVipLevelUp } from '@/utils/vipSounds';
import { useToast } from '@/hooks/use-toast';

interface AppState {
  roseStage: number;
  isDead: boolean;
  isGrowing: boolean;
  completedSessions: number;
  totalFocusTime: number;
  longestStreak: number;
  rosesGrown: number;
  isVipActive: boolean;
  vipLevel: number;
  currentStreak: number;
  lastSessionDate: string | null;
  achievements: string[];
  sessionHistory: SessionRecord[];
}

interface SessionRecord {
  id: string;
  date: string;
  duration: number;
  completed: boolean;
  vipLevel: number;
}

type AppAction =
  | { type: 'TICK_TIMER'; payload: { secondsRemaining: number; totalSeconds: number } }
  | { type: 'COMPLETE_TIMER' }
  | { type: 'ABANDON_TIMER' }
  | { type: 'UNLOCK_VIP'; payload: { level: number } }
  | { type: 'RESET_DATA' }
  | { type: 'LOAD_STATE'; payload: Partial<AppState> }
  | { type: 'SET_GROWING'; payload: boolean };

const initialState: AppState = {
  roseStage: 0,
  isDead: false,
  isGrowing: false,
  completedSessions: 0,
  totalFocusTime: 0,
  longestStreak: 0,
  rosesGrown: 0,
  isVipActive: false,
  vipLevel: 0,
  currentStreak: 0,
  lastSessionDate: null,
  achievements: [],
  sessionHistory: []
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'TICK_TIMER': {
      const { secondsRemaining, totalSeconds } = action.payload;
      const progress = (totalSeconds - secondsRemaining) / totalSeconds;
      const newStage = Math.min(Math.floor(progress * 5), 4);
      
      if (newStage > state.roseStage && !state.isDead) {
        return { ...state, roseStage: newStage, isGrowing: true };
      }
      return state;
    }
    
    case 'COMPLETE_TIMER': {
      const now = new Date();
      const today = now.toDateString();
      const isConsecutiveDay = state.lastSessionDate 
        ? new Date(state.lastSessionDate).getTime() + 86400000 >= now.getTime()
        : false;
      
      const newStreak = isConsecutiveDay ? state.currentStreak + 1 : 1;
      const newSession: SessionRecord = {
        id: Date.now().toString(),
        date: now.toISOString(),
        duration: 25,
        completed: true,
        vipLevel: state.vipLevel
      };

      return {
        ...state,
        roseStage: 4,
        isGrowing: true,
        completedSessions: state.completedSessions + 1,
        totalFocusTime: state.totalFocusTime + 25,
        longestStreak: Math.max(state.longestStreak, newStreak),
        rosesGrown: state.rosesGrown + 1,
        currentStreak: newStreak,
        lastSessionDate: today,
        sessionHistory: [...state.sessionHistory, newSession].slice(-50) // Keep last 50 sessions
      };
    }
    
    case 'ABANDON_TIMER':
      return { ...state, isDead: true, isGrowing: false };
    
    case 'UNLOCK_VIP':
      return { 
        ...state, 
        isVipActive: true, 
        vipLevel: action.payload.level 
      };
    
    case 'RESET_DATA':
      return { ...initialState };
    
    case 'LOAD_STATE':
      return { ...state, ...action.payload };
    
    case 'SET_GROWING':
      return { ...state, isGrowing: action.payload };
    
    default:
      return state;
  }
}

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  handleTimerTick: (secondsRemaining: number, totalSeconds: number) => void;
  handleTimerComplete: () => void;
  handleTimerAbandoned: () => void;
  handleVipUnlock: (level: number) => void;
  handleResetData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const { toast } = useToast();

  // Load saved state on mount
  useEffect(() => {
    const savedStats = localStorage.getItem('focusRoseStats');
    const savedVip = localStorage.getItem('vipAccess') === 'true';
    const savedLevel = parseInt(localStorage.getItem('vipLevel') || '0');
    
    if (savedStats) {
      const stats = JSON.parse(savedStats);
      dispatch({ 
        type: 'LOAD_STATE', 
        payload: { 
          ...stats, 
          isVipActive: savedVip, 
          vipLevel: savedLevel 
        } 
      });
    } else {
      dispatch({ 
        type: 'LOAD_STATE', 
        payload: { 
          isVipActive: savedVip, 
          vipLevel: savedLevel 
        } 
      });
    }
  }, []);

  // Save state to localStorage
  useEffect(() => {
    const { isVipActive, vipLevel, ...statsToSave } = state;
    localStorage.setItem('focusRoseStats', JSON.stringify(statsToSave));
    localStorage.setItem('vipAccess', isVipActive.toString());
    localStorage.setItem('vipLevel', vipLevel.toString());
  }, [state]);

  const handleTimerTick = (secondsRemaining: number, totalSeconds: number) => {
    const prevStage = state.roseStage;
    dispatch({ type: 'TICK_TIMER', payload: { secondsRemaining, totalSeconds } });
    
    // Check if stage changed to show growth message
    const progress = (totalSeconds - secondsRemaining) / totalSeconds;
    const newStage = Math.min(Math.floor(progress * 5), 4);
    
    if (newStage > prevStage && !state.isDead) {
      const messages = state.isVipActive ? [
        '🌱✨ البذرة الملكية المباركة تنبت!',
        '🌿👑 البراعم الذهبية الفاخرة تظهر!',
        '🍃💎 الأوراق الماسية الزاهية تنمو!',
        '🌺🏆 البرعم الإمبراطوري الجميل يتكون!',
        '🌸👑✨ الزهرة الملكية المتألقة تتفتح!'
      ] : [
        'البذرة زُرعت! 🌱',
        'البراعم الملونة تظهر! 🌿',
        'الأوراق الزاهية تنمو! 🍃',
        'البرعم الجميل يتكون! 🌺',
        'الزهرة المتألقة تتفتح! 🌸✨'
      ];
      
      toast({
        title: messages[newStage],
        description: state.isVipActive ? 'استمر في التركيز، أيها الملك! 👑' : 'استمر في التركيز!',
        duration: 2000,
      });
      
      if (state.isVipActive) {
        playVipGrowthSound();
        if (newStage === 2 || newStage === 4) {
          setTimeout(() => playVipLevelUp(), 500);
        }
      } else {
        playGrowthSound();
      }
      
      setTimeout(() => dispatch({ type: 'SET_GROWING', payload: false }), 2000);
    }
  };

  const handleTimerComplete = () => {
    dispatch({ type: 'COMPLETE_TIMER' });
    
    toast({
      title: 'مبروك! 🎉',
      description: 'زهرتك الجميلة مكتملة النمو! إنجاز رائع',
      duration: 4000,
    });
    
    if (state.isVipActive) {
      playVipSuccessSound();
      setTimeout(() => playVipNotification(), 1000);
    } else {
      playSuccessSound();
    }
    
    // Send notification if permission granted
    if ('Notification' in window && Notification.permission === 'granted') {
      const notificationTitle = state.isVipActive ? '👑 zd flower VIP' : 'zd flower';
      const notificationBody = state.isVipActive 
        ? 'مبروك! زهرتك الملكية اكتمل نموها بأبهى صورة 🌸✨👑'
        : 'مبروك! زهرتك الجميلة اكتمل نموها 🌸✨';
        
      new Notification(notificationTitle, {
        body: notificationBody,
        icon: '/favicon.ico'
      });
    }
    
    // Reset for next session
    setTimeout(() => {
      dispatch({ type: 'LOAD_STATE', payload: { roseStage: 0, isDead: false, isGrowing: false } });
    }, 3000);
  };

  const handleTimerAbandoned = () => {
    dispatch({ type: 'ABANDON_TIMER' });
    
    toast({
      title: 'أوه لا! 😢',
      description: 'زهرتك ذبلت... لا تيأس، ابدأ من جديد!',
      variant: 'destructive',
      duration: 3000,
    });
    
    setTimeout(() => {
      dispatch({ type: 'LOAD_STATE', payload: { roseStage: 0, isDead: false } });
    }, 2000);
  };

  const handleVipUnlock = (level: number) => {
    dispatch({ type: 'UNLOCK_VIP', payload: { level } });
    playVipLevelUp();
  };

  const handleResetData = () => {
    dispatch({ type: 'RESET_DATA' });
    localStorage.removeItem('focusRoseStats');
    localStorage.removeItem('vipAccess');
    localStorage.removeItem('vipLevel');
  };

  const contextValue: AppContextType = {
    state,
    dispatch,
    handleTimerTick,
    handleTimerComplete,
    handleTimerAbandoned,
    handleVipUnlock,
    handleResetData
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};