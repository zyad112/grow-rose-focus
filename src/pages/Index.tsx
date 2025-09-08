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
import { useToast } from '@/hooks/use-toast';
import { playGrowthSound, playSuccessSound } from '@/utils/sounds';

const Index = () => {
  const [roseStage, setRoseStage] = useState(0);
  const [isDead, setIsDead] = useState(false);
  const [isGrowing, setIsGrowing] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);
  const [totalFocusTime, setTotalFocusTime] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [rosesGrown, setRosesGrown] = useState(0);
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
      
      // Show growth messages
      const messages = [
        'البذرة زُرعت! 🌱',
        'البراعم الملونة تظهر! 🌿',
        'الأوراق الزاهية تنمو! 🍃',
        'البرعم الجميل يتكون! 🌺',
        'الزهرة المتألقة تتفتح! 🌸✨'
      ];
      
      toast({
        title: messages[newStage],
        description: 'استمر في التركيز!',
        duration: 2000,
      });
      
      // Play growth sound
      playGrowthSound();
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
    
    // Play success sound
    playSuccessSound();
    
    // Browser notification
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('zd flower', {
        body: 'مبروك! زهرتك الجميلة اكتمل نموها 🌸✨',
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
            <div className="absolute inset-0 blur-2xl bg-gradient-sunset opacity-30 scale-110"></div>
            <h1 className="relative text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 font-arabic">
              <span className="inline-block bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 bg-clip-text text-transparent animate-pulse">
                🌺 zd flower ✨
              </span>
            </h1>
            <div className="absolute -top-2 -right-2 text-2xl animate-bounce">🌸</div>
            <div className="absolute -bottom-1 -left-2 text-xl animate-pulse">🌿</div>
          </div>
          
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed font-arabic px-4">
            ادرس أو اعمل واترك هاتفك لتنمو زهرتك الجميلة. كلما زاد وقت التركيز، 
            تتطور زهرتك إلى ألوان أزهى وأشكال أجمل!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto px-4">
          {/* Rose Display - Main Focus */}
          <div className="lg:col-span-2">
            <Card className="p-8 bg-card/80 backdrop-blur-sm border-border shadow-garden">
              <Rose 
                stage={roseStage} 
                isDead={isDead} 
                isGrowing={isGrowing}
              />
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
              <TabsList className="grid w-full grid-cols-5 mb-4 text-xs">
                <TabsTrigger value="stats" className="text-xs font-arabic px-1">📊</TabsTrigger>
                <TabsTrigger value="challenges" className="text-xs font-arabic px-1">🏆</TabsTrigger>
                <TabsTrigger value="vip" className="text-xs font-arabic px-1">👑</TabsTrigger>
                <TabsTrigger value="developer" className="text-xs font-arabic px-1">👨‍💻</TabsTrigger>
                <TabsTrigger value="settings" className="text-xs font-arabic px-1">⚙️</TabsTrigger>
              </TabsList>
              
              <TabsContent value="stats">
                <Stats
                  completedSessions={completedSessions}
                  totalFocusTime={totalFocusTime}
                  longestStreak={longestStreak}
                  rosesGrown={rosesGrown}
                />
              </TabsContent>
              
              <TabsContent value="challenges">
                <Challenges
                  completedSessions={completedSessions}
                  totalFocusTime={totalFocusTime}
                  rosesGrown={rosesGrown}
                />
              </TabsContent>
              
              <TabsContent value="vip">
                <VipAccess />
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
        <div className="text-center mt-16 space-y-4">
          <div className="p-6 bg-gradient-nature/10 backdrop-blur-sm rounded-2xl border border-garden/20 max-w-md mx-auto">
            <p className="text-sm text-muted-foreground font-arabic leading-relaxed">
              💡 نصيحة: ضع هاتفك بعيداً واترك زهورك تنمو في هدوء وجمال
            </p>
          </div>
          <div className="text-xs text-muted-foreground font-arabic">
            🌸 zd flower - رحلتك نحو التركيز والإنتاجية
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;