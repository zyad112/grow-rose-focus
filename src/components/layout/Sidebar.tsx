import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Timer from '@/components/Timer';
import Stats from '@/components/Stats';
import Challenges from '@/components/Challenges';
import VipRewards from '@/components/VipRewards';
import VipAccess from '@/components/VipAccess';
import Settings from '@/components/Settings';
import DeveloperInfo from '@/components/DeveloperInfo';
import VipStats from '@/components/VipStats';
import { useApp } from '@/contexts/AppContext';

const Sidebar: React.FC = () => {
  const { state, handleTimerTick, handleTimerComplete, handleTimerAbandoned, handleVipUnlock, handleResetData } = useApp();
  const { isVipActive } = state;

  return (
    <div className="space-y-6">
      {/* Timer Controls */}
      <Timer
        onTick={handleTimerTick}
        onComplete={handleTimerComplete}
        onAbandoned={handleTimerAbandoned}
      />

      {/* Tabs for additional features */}
      <Tabs defaultValue="stats" className="w-full">
        <TabsList className="grid w-full grid-cols-6 mb-4 text-xs">
          <TabsTrigger value="stats" className="text-xs font-arabic px-1">📊</TabsTrigger>
          <TabsTrigger value="challenges" className="text-xs font-arabic px-1">🏆</TabsTrigger>
          <TabsTrigger value="rewards" className="text-xs font-arabic px-1">💎</TabsTrigger>
          <TabsTrigger value="vip" className="text-xs font-arabic px-1">👑</TabsTrigger>
          <TabsTrigger value="settings" className="text-xs font-arabic px-1">⚙️</TabsTrigger>
          <TabsTrigger value="dev" className="text-xs font-arabic px-1">👨‍💻</TabsTrigger>
        </TabsList>

        <TabsContent value="stats" className="mt-4">
          {isVipActive ? (
            <VipStats 
              completedSessions={state.completedSessions}
              totalFocusTime={state.totalFocusTime}
              longestStreak={state.longestStreak}
              rosesGrown={state.rosesGrown}
            />
          ) : (
            <Stats 
              completedSessions={state.completedSessions}
              totalFocusTime={state.totalFocusTime}
              longestStreak={state.longestStreak}
              rosesGrown={state.rosesGrown}
            />
          )}
        </TabsContent>

        <TabsContent value="challenges" className="mt-4">
          <Challenges 
            completedSessions={state.completedSessions}
            totalFocusTime={state.totalFocusTime}
            rosesGrown={state.rosesGrown}
          />
        </TabsContent>

        <TabsContent value="rewards" className="mt-4">
          <VipRewards 
            completedSessions={state.completedSessions}
            totalFocusTime={state.totalFocusTime}
            rosesGrown={state.rosesGrown}
          />
        </TabsContent>

        <TabsContent value="vip" className="mt-4">
          <VipAccess onVipUnlock={handleVipUnlock} />
        </TabsContent>

        <TabsContent value="settings" className="mt-4">
          <Settings onReset={handleResetData} />
        </TabsContent>

        <TabsContent value="dev" className="mt-4">
          <DeveloperInfo />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default React.memo(Sidebar);