import { useState, useEffect } from 'react';
import Rose from '@/components/Rose';
import Timer from '@/components/Timer';
import Stats from '@/components/Stats';
import Challenges from '@/components/Challenges';
import Settings from '@/components/Settings';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import VipAccess from '@/components/VipAccess';
import DeveloperInfo from '@/components/DeveloperInfo';
import VipRose from '@/components/VipRose';
import VipStats from '@/components/VipStats';
import VipRewards from '@/components/VipRewards';
import { useToast } from '@/hooks/use-toast';
import { playGrowthSound, playSuccessSound } from '@/utils/sounds';
import { playVipGrowthSound, playVipSuccessSound, playVipNotification, playVipLevelUp } from '@/utils/vipSounds';

const Index = () => {
  const [roseStage, setRoseStage] = useState(0);
  const [isDead, setIsDead] = useState(false);
  const [isGrowing, setIsGrowing] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);
  const [totalFocusTime, setTotalFocusTime] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [rosesGrown, setRosesGrown] = useState(0);
  const [isVipActive, setIsVipActive] = useState(() => {
    return localStorage.getItem('vipAccess') === 'true';
  });
  const { toast } = useToast();

  // Request notification permission and load stats from localStorage
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }

    const savedStats = localStorage.getItem('focusRoseStats');
    if (savedStats) {
      const stats = JSON.parse(savedStats);
      setCompletedSessions(stats.completedSessions || 0);
      setTotalFocusTime(stats.totalFocusTime || 0);
      setLongestStreak(stats.longestStreak || 0);
      setRosesGrown(stats.rosesGrown || 0);
    }
  }, []);

  // Save stats to localStorage
  const saveStats = (newStats: any) => {
    localStorage.setItem('focusRoseStats', JSON.stringify(newStats));
  };

  const handleResetData = () => {
    localStorage.removeItem('focusRoseStats');
    setCompletedSessions(0);
    setTotalFocusTime(0);
    setLongestStreak(0);
    setRosesGrown(0);
    setRoseStage(0);
    setIsDead(false);
    setIsGrowing(false);
  };

  const handleTimerTick = (secondsRemaining: number, totalSeconds: number) => {
    const progress = (totalSeconds - secondsRemaining) / totalSeconds;
    const newStage = Math.min(Math.floor(progress * 5), 4);
    
    if (newStage > roseStage && !isDead) {
      setRoseStage(newStage);
      setIsGrowing(true);
      
      // Enhanced VIP growth messages
      const messages = isVipActive ? [
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
        description: isVipActive ? 'استمر في التركيز، أيها الملك! 👑' : 'استمر في التركيز!',
        duration: 2000,
      });
      
      // Play growth sound (VIP or regular)
      if (isVipActive) {
        playVipGrowthSound();
        
        // VIP level up notification for certain stages
        if (newStage === 2 || newStage === 4) {
          setTimeout(() => playVipLevelUp(), 500);
        }
      } else {
        playGrowthSound();
      }
      
      // Auto-stop growing animation after 2 seconds
      setTimeout(() => setIsGrowing(false), 2000);
    }
  };

  const handleTimerComplete = () => {
    setRoseStage(4);
    setIsGrowing(true);
    
    // Update stats
    const newStats = {
      completedSessions: completedSessions + 1,
      totalFocusTime: totalFocusTime + 25, // Assuming 25-minute sessions
      longestStreak: Math.max(longestStreak, completedSessions + 1),
      rosesGrown: rosesGrown + 1,
    };
    
    setCompletedSessions(newStats.completedSessions);
    setTotalFocusTime(newStats.totalFocusTime);
    setLongestStreak(newStats.longestStreak);
    setRosesGrown(newStats.rosesGrown);
    saveStats(newStats);
    
    toast({
      title: 'مبروك! 🎉',
      description: 'زهرتك الجميلة مكتملة النمو! إنجاز رائع',
      duration: 4000,
    });
    
    // Play success sound (VIP or regular)
    if (isVipActive) {
      playVipSuccessSound();
      setTimeout(() => playVipNotification(), 1000);
    } else {
      playSuccessSound();
    }
    
    if ('Notification' in window && Notification.permission === 'granted') {
      const notificationTitle = isVipActive ? '👑 zd flower VIP' : 'zd flower';
      const notificationBody = isVipActive 
        ? 'مبروك! زهرتك الملكية اكتمل نموها بأبهى صورة 🌸✨👑'
        : 'مبروك! زهرتك الجميلة اكتمل نموها 🌸✨';
        
      new Notification(notificationTitle, {
        body: notificationBody,
        icon: '/favicon.ico'
      });
    }
    
    // Reset for next session after celebration
    setTimeout(() => {
      setRoseStage(0);
      setIsDead(false);
      setIsGrowing(false);
    }, 3000);
  };

  const handleTimerAbandoned = () => {
    setIsDead(true);
    setIsGrowing(false);
    
    toast({
      title: 'أوه لا! 😢',
      description: 'زهرتك ذبلت... لا تيأس، ابدأ من جديد!',
      variant: 'destructive',
      duration: 3000,
    });
    
    // Reset after showing dead state
    setTimeout(() => {
      setRoseStage(0);
      setIsDead(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-nature">
      <div className="container mx-auto px-4 py-8">
      {/* Header */}
        <div className="text-center mb-8 px-4">
          {/* Decorative App Name */}
          <div className="relative mb-6">
            <div className="absolute inset-0 blur-3xl bg-gradient-sunset opacity-40 scale-125 animate-pulse"></div>
            <div className="absolute inset-0 blur-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-20 scale-110 animate-ping"></div>
            <h1 className="relative text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 font-arabic">
              <span className="inline-block bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 bg-clip-text text-transparent animate-pulse drop-shadow-2xl">
                🌺 zd flower ✨
              </span>
            </h1>
            <div className="absolute -top-4 -right-4 text-3xl animate-bounce drop-shadow-lg">🌸</div>
            <div className="absolute -bottom-2 -left-4 text-2xl animate-pulse drop-shadow-lg">🌿</div>
            <div className="absolute top-1/2 -right-8 text-xl animate-spin opacity-70">💫</div>
            <div className="absolute top-1/4 -left-8 text-lg animate-bounce opacity-60">🦋</div>
          </div>
          
          <div className="relative bg-gradient-to-r from-white/80 to-pink-50/80 dark:from-gray-900/80 dark:to-purple-950/80 backdrop-blur-sm rounded-2xl p-6 border border-pink-200/50 dark:border-purple-800/50 shadow-xl">
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed font-arabic px-4">
              🌸 ادرس أو اعمل واترك هاتفك لتنمو زهرتك الجميلة. كلما زاد وقت التركيز، 
              تتطور زهرتك إلى ألوان أزهى وأشكال أجمل! انضم لعضوية VIP للحصول على زهور حقيقية وميزات متقدمة! ✨
            </p>
            <div className="mt-4 flex justify-center space-x-4 rtl:space-x-reverse">
              <div className="flex items-center space-x-1 rtl:space-x-reverse text-sm text-purple-600 dark:text-purple-400">
                <span>🎯</span>
                <span className="font-arabic">تركيز</span>
              </div>
              <div className="flex items-center space-x-1 rtl:space-x-reverse text-sm text-green-600 dark:text-green-400">
                <span>🌱</span>
                <span className="font-arabic">نمو</span>
              </div>
              <div className="flex items-center space-x-1 rtl:space-x-reverse text-sm text-pink-600 dark:text-pink-400">
                <span>✨</span>
                <span className="font-arabic">إنجاز</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto px-4">
          {/* Rose Display - Main Focus */}
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
                  <div className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-2xl animate-pulse flex items-center space-x-2 rtl:space-x-reverse border-2 border-white/50">
                    <span>👑</span>
                    <span className="font-arabic">VIP Premium</span>
                    <span>✨</span>
                  </div>
                </div>
              )}
              
              <div className="relative z-10">
                {isVipActive ? (
                  <VipRose 
                    stage={roseStage} 
                    isDead={isDead} 
                    isGrowing={isGrowing}
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

          {/* Controls and Features Sidebar */}
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
                <TabsTrigger value="developer" className="text-xs font-arabic px-1">👨‍💻</TabsTrigger>
                <TabsTrigger value="settings" className="text-xs font-arabic px-1">⚙️</TabsTrigger>
              </TabsList>
              
              <TabsContent value="stats">
                {isVipActive ? (
                  <VipStats
                    completedSessions={completedSessions}
                    totalFocusTime={totalFocusTime}
                    longestStreak={longestStreak}
                    rosesGrown={rosesGrown}
                  />
                ) : (
                  <Stats
                    completedSessions={completedSessions}
                    totalFocusTime={totalFocusTime}
                    longestStreak={longestStreak}
                    rosesGrown={rosesGrown}
                  />
                )}
              </TabsContent>
              
              <TabsContent value="challenges">
                <Challenges
                  completedSessions={completedSessions}
                  totalFocusTime={totalFocusTime}
                  rosesGrown={rosesGrown}
                />
              </TabsContent>
              
              <TabsContent value="rewards">
                {isVipActive ? (
                  <VipRewards
                    completedSessions={completedSessions}
                    totalFocusTime={totalFocusTime}
                    rosesGrown={rosesGrown}
                  />
                ) : (
                  <div className="text-center p-8 bg-card/80 backdrop-blur-sm rounded-lg border border-border">
                    <div className="text-4xl mb-4">🔒</div>
                    <p className="text-muted-foreground font-arabic">
                      المكافآت المتقدمة متاحة فقط لأعضاء VIP
                    </p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="vip">
                <VipAccess 
                  onVipUnlock={() => {
                    setIsVipActive(true);
                    playVipLevelUp();
                  }} 
                />
              </TabsContent>
              
              <TabsContent value="developer">
                <DeveloperInfo />
              </TabsContent>
              
              <TabsContent value="settings">
                <Settings onReset={handleResetData} />
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 space-y-6">
          <div className="relative">
            <div className="absolute inset-0 blur-xl bg-gradient-to-r from-pink-300/30 via-purple-300/30 to-indigo-300/30 animate-pulse"></div>
            <div className="relative p-8 bg-gradient-to-br from-white/80 to-pink-50/80 dark:from-gray-900/80 dark:to-purple-950/80 backdrop-blur-md rounded-3xl border-2 border-pink-200/50 dark:border-purple-800/50 shadow-2xl max-w-lg mx-auto">
              <div className="flex items-center justify-center space-x-3 rtl:space-x-reverse mb-4">
                <span className="text-3xl animate-bounce">💡</span>
                <h3 className="text-xl font-bold font-arabic bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  نصائح للنجاح
                </h3>
                <span className="text-3xl animate-pulse">✨</span>
              </div>
              <p className="text-sm text-muted-foreground font-arabic leading-relaxed">
                📱 ضع هاتفك بعيداً واترك زهورك تنمو في هدوء وجمال
                <br />
                🎯 ركز على مهمة واحدة في كل مرة
                <br />
                👑 فعّل عضوية VIP للحصول على زهور حقيقية وميزات متقدمة
              </p>
            </div>
          </div>
          
          <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse text-sm text-muted-foreground font-arabic">
            <span className="animate-pulse">🌸</span>
            <span>zd flower</span>
            <span>-</span>
            <span>رحلتك نحو التركيز والإنتاجية</span>
            <span className="animate-bounce">🌺</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;