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
  const [vipLevel, setVipLevel] = useState(() => {
    return parseInt(localStorage.getItem('vipLevel') || '0');
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

  const handleVipUnlock = (level: number) => {
    setIsVipActive(true);
    setVipLevel(level);
    playVipLevelUp();
  };

  // Get VIP theme background with enhanced Ultra level
  const getVipBackground = () => {
    if (!isVipActive) return 'bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 dark:from-rose-950 dark:via-pink-950 dark:to-purple-950';
    
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

  // Get VIP welcome message
  const getVipWelcomeMessage = () => {
    const messages = {
      1: '🌲 مرحباً بك في عالم الغابة السحرية - استمتع بأزهار الطبيعة الخلابة',
      2: '⭐ مرحباً بك في عالم النجوم السماوية - اكتشف أزهار الكون اللامتناهي',  
      3: '🔥 مرحباً بك في عالم نار العنقاء - اشعل شغفك مع أزهار النار المقدسة',
      4: '💎 مرحباً بك في عالم كريستال الماس - تألق مع أزهار الكريستال النقي',
      5: '🌙 مرحباً بك في عالم ظلال الفراغ - استكشف أزهار الظلام الغامضة',
      6: '⚡ مرحباً بك في عالم عجلة الزمن - سافر عبر الزمن مع أزهار الخلود',
      7: '👑 مرحباً بك في عالم القوة الملكية - ارتق إلى مستوى الملوك مع أزهار السلطان',
      8: '🚀 مرحباً بك في المستوى الخارق الاحترافي - تجربة مستقبلية متقدمة مع +50 ميزة فائقة التطور وواجهة سايبر احترافية',
    };
    
    return messages[vipLevel as keyof typeof messages] || messages[1];
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
        {/* Header */}
        <div className="text-center mb-8 px-4">
          {/* Ultra Professional Logo for VIP 8 */}
          {vipLevel === 8 ? (
            <div className="relative mb-6">
              <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-60 scale-150 animate-ultra-glow"></div>
              <div className="absolute inset-0 blur-xl bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 opacity-40 scale-125 animate-cyber-pulse"></div>
              <h1 className="relative text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 font-arabic">
                <span className="inline-block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-hologram drop-shadow-2xl">
                  🚀 ZD FLOWER ULTRA PRO ⚡
                </span>
              </h1>
              <div className="absolute -top-6 -right-6 text-4xl animate-cyber-pulse drop-shadow-lg">🌟</div>
              <div className="absolute -bottom-4 -left-6 text-3xl animate-hologram drop-shadow-lg">⚡</div>
              <div className="absolute top-1/2 -right-10 text-2xl animate-ultra-glow opacity-70">🚀</div>
              <div className="absolute top-1/4 -left-10 text-2xl animate-bounce opacity-60">💎</div>
            </div>
          ) : (
            /* Regular Logo */
            <div className="relative mb-6">
              <div className="absolute inset-0 blur-3xl bg-gradient-sunset opacity-40 scale-125 animate-pulse"></div>
              <div className="absolute inset-0 blur-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-20 scale-110 animate-ping"></div>
              <h1 className="relative text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 font-arabic">
                <span className="inline-block bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 bg-clip-text text-transparent animate-pulse drop-shadow-2xl">
                  🌺 zd flower {isVipActive && `- VIP ${vipLevel}`} ✨
                </span>
              </h1>
              <div className="absolute -top-4 -right-4 text-3xl animate-bounce drop-shadow-lg">🌸</div>
              <div className="absolute -bottom-2 -left-4 text-2xl animate-pulse drop-shadow-lg">🌿</div>
              <div className="absolute top-1/2 -right-8 text-xl animate-spin opacity-70">💫</div>
              <div className="absolute top-1/4 -left-8 text-lg animate-bounce opacity-60">🦋</div>
            </div>
          )}
          
          {/* Enhanced Professional Description */}
          <div className={`relative ${vipLevel === 8 ? 'bg-gradient-to-r from-gray-900/95 via-purple-900/90 to-gray-900/95 border-cyan-400/50' : 'bg-gradient-to-r from-white/80 to-pink-50/80 dark:from-gray-900/80 dark:to-purple-950/80 border-pink-200/50 dark:border-purple-800/50'} backdrop-blur-sm rounded-2xl p-6 border shadow-xl`}>
            {vipLevel === 8 && (
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl animate-ultra-glow"></div>
            )}
            <p className={`relative text-base sm:text-lg ${vipLevel === 8 ? 'text-cyan-100' : 'text-muted-foreground'} max-w-2xl mx-auto leading-relaxed font-arabic px-4`}>
              {isVipActive ? getVipWelcomeMessage() : '🌸 ادرس أو اعمل واترك هاتفك لتنمو زهرتك الجميلة. كلما زاد وقت التركيز، تتطور زهرتك إلى ألوان أزهى وأشكال أجمل! انضم لعضوية VIP للحصول على زهور حقيقية وميزات متقدمة! ✨'}
            </p>
            <div className="relative mt-4 flex justify-center space-x-4 rtl:space-x-reverse">
              <div className={`flex items-center space-x-1 rtl:space-x-reverse text-sm ${vipLevel === 8 ? 'text-cyan-300' : 'text-purple-600 dark:text-purple-400'}`}>
                <span>{vipLevel === 8 ? '⚡' : '🎯'}</span>
                <span className="font-arabic">{vipLevel === 8 ? 'قوة خارقة' : 'تركيز'}</span>
              </div>
              <div className={`flex items-center space-x-1 rtl:space-x-reverse text-sm ${vipLevel === 8 ? 'text-purple-300' : 'text-green-600 dark:text-green-400'}`}>
                <span>{vipLevel === 8 ? '🚀' : '🌱'}</span>
                <span className="font-arabic">{vipLevel === 8 ? 'تطور متقدم' : 'نمو'}</span>
              </div>
              <div className={`flex items-center space-x-1 rtl:space-x-reverse text-sm ${vipLevel === 8 ? 'text-pink-300' : 'text-pink-600 dark:text-pink-400'}`}>
                <span>{vipLevel === 8 ? '💎' : '✨'}</span>
                <span className="font-arabic">{vipLevel === 8 ? 'إنجاز فائق' : 'إنجاز'}</span>
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
                  onVipUnlock={handleVipUnlock}
                  vipLevel={vipLevel}
                />
              </TabsContent>
              
              <TabsContent value="developer">
                <DeveloperInfo />
              </TabsContent>
              
              <TabsContent value="settings">
                <Settings onReset={handleResetData} vipLevel={vipLevel} />
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