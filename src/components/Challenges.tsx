import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Calendar, Target, Flame } from 'lucide-react';

interface Challenge {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  reward: string;
  type: 'daily' | 'weekly' | 'monthly';
  icon: any;
}

const Challenges = ({ completedSessions, totalFocusTime, rosesGrown }: {
  completedSessions: number;
  totalFocusTime: number;
  rosesGrown: number;
}) => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);

  useEffect(() => {
    const today = new Date();
    const dailyChallenges: Challenge[] = [
      {
        id: 'daily-focus',
        title: 'تركيز يومي',
        description: 'أكمل 3 جلسات تركيز اليوم',
        target: 3,
        current: Math.min(completedSessions, 3),
        reward: 'زهرة ذهبية 🌻',
        type: 'daily',
        icon: Target,
      },
      {
        id: 'daily-time',
        title: 'ساعة ذهبية',
        description: 'ركز لمدة 60 دقيقة اليوم',
        target: 60,
        current: Math.min(totalFocusTime, 60),
        reward: 'تاج الأزهار 👑',
        type: 'daily',
        icon: Calendar,
      },
      {
        id: 'streak-master',
        title: 'سيد التتابع',
        description: 'حافظ على تتابع 7 أيام',
        target: 7,
        current: Math.min(rosesGrown, 7),
        reward: 'حديقة سحرية 🌈',
        type: 'weekly',
        icon: Flame,
      },
    ];

    setChallenges(dailyChallenges);
  }, [completedSessions, totalFocusTime, rosesGrown]);

  const getProgressPercentage = (challenge: Challenge) => {
    return Math.min((challenge.current / challenge.target) * 100, 100);
  };

  const isCompleted = (challenge: Challenge) => {
    return challenge.current >= challenge.target;
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'daily': return 'bg-rose text-rose-foreground';
      case 'weekly': return 'bg-golden text-golden-foreground';
      case 'monthly': return 'bg-garden text-garden-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className="p-6 bg-card/95 backdrop-blur-sm border-border shadow-garden">
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-bold text-foreground mb-2 font-arabic">
            التحديات اليومية 🏆
          </h3>
          <p className="text-sm text-muted-foreground">
            أكمل التحديات واحصل على مكافآت رائعة
          </p>
        </div>

        <div className="space-y-4">
          {challenges.map((challenge) => (
            <div
              key={challenge.id}
              className={`
                p-4 rounded-xl transition-all duration-300 border-2
                ${isCompleted(challenge) 
                  ? 'bg-gradient-sunset/20 border-golden shadow-glow animate-pulse-soft' 
                  : 'bg-muted/30 border-border hover:border-rose'
                }
              `}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`
                    p-2 rounded-lg transition-colors
                    ${isCompleted(challenge) ? 'bg-golden text-white' : 'bg-background'}
                  `}>
                    <challenge.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground font-arabic">
                      {challenge.title}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {challenge.description}
                    </p>
                  </div>
                </div>
                <Badge className={getTypeColor(challenge.type)} variant="secondary">
                  {challenge.type === 'daily' && 'يومي'}
                  {challenge.type === 'weekly' && 'أسبوعي'}
                  {challenge.type === 'monthly' && 'شهري'}
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    التقدم: {challenge.current}/{challenge.target}
                  </span>
                  <span className="font-medium text-foreground">
                    {Math.round(getProgressPercentage(challenge))}%
                  </span>
                </div>
                <Progress 
                  value={getProgressPercentage(challenge)} 
                  className="h-2 bg-muted"
                />
                {isCompleted(challenge) && (
                  <div className="flex items-center justify-center space-x-2 text-golden animate-bounce">
                    <Trophy className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      مكتمل! المكافأة: {challenge.reward}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center p-4 bg-gradient-nature/10 rounded-xl border border-garden/20">
          <p className="text-sm text-foreground font-arabic">
            💫 كلما أكملت تحديات أكثر، كلما نمت حديقتك بشكل أجمل!
          </p>
        </div>
      </div>
    </Card>
  );
};

export default Challenges;