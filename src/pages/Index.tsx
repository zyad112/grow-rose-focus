import React, { useEffect } from 'react';
import { AppProvider, useApp } from '@/contexts/AppContext';
import Header from '@/components/layout/Header';
import RoseDisplay from '@/components/layout/RoseDisplay';
import Sidebar from '@/components/layout/Sidebar';

// Main component wrapped with provider
const IndexContent: React.FC = () => {
  const { state } = useApp();
  const { vipLevel } = state;

  // Request notification permission
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  // Get VIP theme background with enhanced Ultra level
  const getVipBackground = () => {
    if (!state.isVipActive) return 'bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 dark:from-rose-950 dark:via-pink-950 dark:to-purple-950';
    
    const backgrounds = {
      1: 'bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 dark:from-emerald-950 dark:via-green-950 dark:to-teal-950',
      2: 'bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50 dark:from-blue-950 dark:via-indigo-950 dark:to-cyan-950',
      3: 'bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 dark:from-orange-950 dark:via-red-950 dark:to-yellow-950',
      4: 'bg-gradient-to-br from-gray-50 via-slate-50 to-zinc-50 dark:from-gray-950 dark:via-slate-950 dark:to-zinc-950',
      5: 'bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50 dark:from-purple-950 dark:via-violet-950 dark:to-indigo-950',
      6: 'bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 dark:from-amber-950 dark:via-yellow-950 dark:to-orange-950',
      7: 'bg-gradient-to-br from-pink-50 via-rose-50 to-fuchsia-50 dark:from-pink-950 dark:via-rose-950 dark:to-fuchsia-950',
      8: 'bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden', // Ultra dark professional
    };
    
    return backgrounds[vipLevel as keyof typeof backgrounds] || backgrounds[1];
  };

  return (
    <div className={`min-h-screen transition-all duration-1000 ${getVipBackground()}`}>
      {/* Ultra VIP 8 Animated Background */}
      {vipLevel === 8 && (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5 animate-ultra-glow"></div>
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-cyber-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-hologram"></div>
          <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-pink-500/10 rounded-full blur-2xl animate-ultra-glow"></div>
        </div>
      )}
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <Header />
        
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto px-4">
          <RoseDisplay />
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

// Main Index component with provider
const Index: React.FC = () => {
  return (
    <AppProvider>
      <IndexContent />
    </AppProvider>
  );
};

export default React.memo(Index);