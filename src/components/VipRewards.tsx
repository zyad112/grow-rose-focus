import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Crown, Star, Sparkles, Award, Trophy, Gem } from 'lucide-react';

interface VipRewardsProps {
  completedSessions: number;
  totalFocusTime: number;
  rosesGrown: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  requirement: number;
  progress: number;
  isCompleted: boolean;
  reward: string;
  color: string;
}

const VipRewards = ({ completedSessions, totalFocusTime, rosesGrown }: VipRewardsProps) => {
  const [unlockedRewards, setUnlockedRewards] = useState<string[]>([]);
  const [showAnimation, setShowAnimation] = useState<string | null>(null);

  // VIP Achievements System
  const achievements: Achievement[] = [
    {
      id: 'diamond_focus',
      title: '👑 تركيز الماس',
      description: 'أكمل 50 جلسة تركيز',
      icon: Crown,
      requirement: 50,
      progress: completedSessions,
      isCompleted: completedSessions >= 50,
      reward: 'تأثيرات بصرية متطورة',
      color: 'from-blue-500 to-purple-600'
    },
    {
      id: 'golden_gardener',
      title: '🌟 البستاني الذهبي',
      description: 'ازرع 100 زهرة',
      icon: Star,
      requirement: 100,
      progress: rosesGrown,
      isCompleted: rosesGrown >= 100,
      reward: 'زهور ذهبية خاصة',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 'master_of_time',
      title: '⚡ سيد الوقت',
      description: 'اقضِ 1000 دقيقة في التركيز',
      icon: Sparkles,
      requirement: 1000,
      progress: totalFocusTime,
      isCompleted: totalFocusTime >= 1000,
      reward: 'أصوات VIP متقدمة',
      color: 'from-green-500 to-teal-500'
    },
    {
      id: 'legendary_focus',
      title: '🏆 التركيز الأسطوري',
      description: 'اقضِ 5000 دقيقة في التركيز',
      icon: Trophy,
      requirement: 5000,
      progress: totalFocusTime,
      isCompleted: totalFocusTime >= 5000,
      reward: 'مضاعفة النقاط VIP',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'royal_master',
      title: '💎 السيد الملكي',
      description: 'أكمل 200 جلسة تركيز',
      icon: Gem,
      requirement: 200,
      progress: completedSessions,
      isCompleted: completedSessions >= 200,
      reward: 'شارة VIP الملكية',
      color: 'from-indigo-500 to-purple-600'
    }
  ];

  // Check for new achievements
  useEffect(() => {
    achievements.forEach(achievement => {
      if (achievement.isCompleted && !unlockedRewards.includes(achievement.id)) {
        setUnlockedRewards(prev => [...prev, achievement.id]);
        setShowAnimation(achievement.id);
        setTimeout(() => setShowAnimation(null), 3000);
      }
    });
  }, [completedSessions, totalFocusTime, rosesGrown]);

  const vipLevel = Math.floor(completedSessions / 10) + 1;
  const nextLevelProgress = (completedSessions % 10) * 10;

  return (
    <div className="space-y-6">
      {/* VIP Level Display */}
      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/50 dark:to-pink-950/50 border-2 border-purple-200 dark:border-purple-800">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-2">
            <Crown className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-purple-700 dark:text-purple-300 font-arabic">
            مستوى VIP {vipLevel}
          </CardTitle>
          <CardDescription className="font-arabic">
            المستوى التالي: {Math.ceil((completedSessions + 1) / 10) * 10} جلسة
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={nextLevelProgress} className="mb-2" />
          <p className="text-sm text-center text-muted-foreground font-arabic">
            {10 - (completedSessions % 10)} جلسة متبقية للمستوى التالي
          </p>
        </CardContent>
      </Card>

      {/* Achievements Grid */}
      <div className="grid gap-4">
        <h3 className="text-lg font-bold text-center font-arabic text-purple-700 dark:text-purple-300">
          🏆 إنجازات VIP المتقدمة
        </h3>
        
        {achievements.map((achievement) => {
          const Icon = achievement.icon;
          const progressPercent = Math.min((achievement.progress / achievement.requirement) * 100, 100);
          
          return (
            <Card 
              key={achievement.id}
              className={`relative overflow-hidden transition-all duration-500 ${
                achievement.isCompleted 
                  ? 'bg-gradient-to-r ' + achievement.color + ' text-white shadow-lg scale-105' 
                  : 'bg-card/80 backdrop-blur-sm hover:shadow-md'
              } ${showAnimation === achievement.id ? 'animate-pulse' : ''}`}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div className={`p-3 rounded-full ${
                    achievement.isCompleted 
                      ? 'bg-white/20' 
                      : 'bg-gradient-to-r ' + achievement.color + ' text-white'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold font-arabic">{achievement.title}</h4>
                      {achievement.isCompleted && (
                        <Badge variant="secondary" className="bg-white/20 text-white border-white/20">
                          مكتمل ✨
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-sm opacity-90 font-arabic">{achievement.description}</p>
                    
                    <div className="space-y-1">
                      <Progress value={progressPercent} className="h-2" />
                      <div className="flex justify-between text-xs opacity-75 font-arabic">
                        <span>{achievement.progress} / {achievement.requirement}</span>
                        <span>{Math.round(progressPercent)}%</span>
                      </div>
                    </div>
                    
                    <div className="text-xs font-arabic opacity-80">
                      💎 المكافأة: {achievement.reward}
                    </div>
                  </div>
                </div>
              </CardContent>
              
              {/* Achievement Animation */}
              {showAnimation === achievement.id && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 animate-pulse" />
                  <div className="absolute top-2 right-2 text-2xl animate-bounce">🎉</div>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* VIP Benefits */}
      <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/50 dark:to-yellow-950/50 border-2 border-amber-200 dark:border-amber-800">
        <CardHeader>
          <CardTitle className="text-center font-arabic text-amber-700 dark:text-amber-300">
            🌟 مميزات VIP الحصرية
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm font-arabic">
            <div className="text-center p-2 bg-white/50 dark:bg-black/20 rounded-lg">
              <div className="text-2xl mb-1">🌸</div>
              <div>زهور حقيقية</div>
            </div>
            <div className="text-center p-2 bg-white/50 dark:bg-black/20 rounded-lg">
              <div className="text-2xl mb-1">🎵</div>
              <div>أصوات متطورة</div>
            </div>
            <div className="text-center p-2 bg-white/50 dark:bg-black/20 rounded-lg">
              <div className="text-2xl mb-1">✨</div>
              <div>تأثيرات بصرية</div>
            </div>
            <div className="text-center p-2 bg-white/50 dark:bg-black/20 rounded-lg">
              <div className="text-2xl mb-1">📊</div>
              <div>إحصائيات متقدمة</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VipRewards;