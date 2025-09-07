import { useState, useEffect } from 'react';
import Rose from '@/components/Rose';
import Timer from '@/components/Timer';
import Stats from '@/components/Stats';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

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
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4 bg-gradient-sunset bg-clip-text text-transparent">
            🌺 zd flower
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            ادرس أو اعمل واترك هاتفك لتنمو زهرتك الجميلة. كلما زاد وقت التركيز، 
            تتطور زهرتك إلى ألوان أزهى وأشكال أجمل!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
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

          {/* Controls and Stats Sidebar */}
          <div className="space-y-6">
            {/* Timer Controls */}
            <Timer
              onTick={handleTimerTick}
              onComplete={handleTimerComplete}
              onAbandoned={handleTimerAbandoned}
            />

            {/* Stats */}
            <Stats
              completedSessions={completedSessions}
              totalFocusTime={totalFocusTime}
              longestStreak={longestStreak}
              rosesGrown={rosesGrown}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-sm text-muted-foreground">
          <p>
            💡 نصيحة: ضع هاتفك بعيداً واترك زهورك تنمو في هدوء وجمال
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;