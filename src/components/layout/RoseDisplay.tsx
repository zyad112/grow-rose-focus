import React from 'react';
import { Card } from '@/components/ui/card';
import Rose from '@/components/Rose';
import VipRose from '@/components/VipRose';
import { useApp } from '@/contexts/AppContext';

const RoseDisplay: React.FC = () => {
  const { state } = useApp();
  const { roseStage, isDead, isGrowing, isVipActive, vipLevel } = state;

  return (
    <div className="lg:col-span-2">
      <Card className="p-6 lg:p-8 bg-gradient-to-br from-white/90 to-pink-50/90 dark:from-gray-900/90 dark:to-purple-950/90 backdrop-blur-md border-2 border-pink-200/50 dark:border-purple-800/50 shadow-2xl relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-10 -right-10 w-20 h-20 bg-pink-200/30 dark:bg-pink-800/30 rounded-full animate-pulse"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-200/20 dark:bg-purple-800/20 rounded-full animate-bounce"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-radial from-pink-100/10 to-transparent dark:from-pink-900/10 animate-spin opacity-50"></div>
        </div>
        
        {/* VIP Enhancement Indicator */}
        {isVipActive && (
          <div className="absolute top-4 right-4 z-10">
            <div className={`${vipLevel === 8 ? 'bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 animate-cyber-pulse border-2 border-cyan-400/50' : 'bg-gradient-to-r from-amber-500 to-yellow-500 animate-pulse border-2 border-white/50'} text-white px-4 py-2 rounded-full text-sm font-bold shadow-2xl flex items-center space-x-2 rtl:space-x-reverse`}>
              <span>{vipLevel === 8 ? '🚀' : '👑'}</span>
              <span className="font-arabic">{vipLevel === 8 ? 'ULTRA PRO' : 'VIP Premium'}</span>
              <span>{vipLevel === 8 ? '⚡' : '✨'}</span>
            </div>
          </div>
        )}
        
        <div className="relative z-10">
          {isVipActive ? (
            <VipRose 
              stage={roseStage} 
              isDead={isDead} 
              isGrowing={isGrowing}
              vipLevel={vipLevel}
            />
          ) : (
            <Rose 
              stage={roseStage} 
              isDead={isDead} 
              isGrowing={isGrowing}
            />
          )}
        </div>
      </Card>
    </div>
  );
};

export default React.memo(RoseDisplay);