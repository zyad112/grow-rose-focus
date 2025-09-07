import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { TrendingUp, Clock, Target, Flower } from 'lucide-react';

interface StatsProps {
  completedSessions: number;
  totalFocusTime: number;
  longestStreak: number;
  rosesGrown: number;
}

const Stats = ({ completedSessions, totalFocusTime, longestStreak, rosesGrown }: StatsProps) => {
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours > 0) {
      return `${hours}س ${mins}د`;
    }
    return `${mins}د`;
  };

  const statsData = [
    {
      icon: Target,
      label: 'الجلسات المكتملة',
      value: completedSessions.toString(),
      color: 'text-rose',
      bgColor: 'bg-rose/10',
    },
    {
      icon: Clock,
      label: 'إجمالي وقت التركيز',
      value: formatTime(totalFocusTime),
      color: 'text-garden',
      bgColor: 'bg-garden/10',
    },
    {
      icon: TrendingUp,
      label: 'أطول مسلسل',
      value: longestStreak.toString() + ' يوم',
      color: 'text-golden',
      bgColor: 'bg-golden/10',
    },
    {
      icon: Flower,
      label: 'الأزهار المزروعة',
      value: rosesGrown.toString(),
      color: 'text-rose-light',
      bgColor: 'bg-rose-light/10',
    },
  ];

  return (
    <Card className="p-6 bg-card border-border shadow-garden">
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-bold text-foreground mb-2">
            إحصائياتك 📊
          </h3>
          <p className="text-sm text-muted-foreground">
            تتبع تقدمك في رحلة التركيز
          </p>
        </div>

        <Separator className="bg-border" />

        <div className="grid grid-cols-2 gap-4">
          {statsData.map((stat, index) => (
            <div
              key={index}
              className={`
                p-4 rounded-xl transition-all duration-300 hover:scale-105
                ${stat.bgColor} border border-transparent hover:border-current
              `}
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg bg-background/50 ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    {stat.label}
                  </p>
                  <p className={`text-lg font-bold ${stat.color} truncate`}>
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Motivational Messages */}
        <div className="text-center p-4 bg-gradient-sunset/10 rounded-xl border border-golden/20">
          <div className="text-sm text-foreground">
            {completedSessions === 0 && (
              <p>🌱 ابدأ أول جلسة تركيز وازرع أول زهرة!</p>
            )}
            {completedSessions > 0 && completedSessions < 5 && (
              <p>🌿 أحسنت! استمر في الزراعة</p>
            )}
            {completedSessions >= 5 && completedSessions < 10 && (
              <p>🌺 رائع! حديقتك تنمو بجمال</p>
            )}
            {completedSessions >= 10 && (
              <p>🌸 مبدع! أصبحت خبير زراعة الأزهار</p>
            )}
          </div>
        </div>

        {/* Progress Visualization */}
        {rosesGrown > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>حديقة الأزهار</span>
              <span>{rosesGrown} زهرة</span>
            </div>
            <div className="flex space-x-1">
              {Array.from({ length: Math.min(rosesGrown, 10) }).map((_, i) => (
                <div
                  key={i}
                  className="w-4 h-4 bg-gradient-rose rounded-full animate-pulse-soft"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
              {rosesGrown > 10 && (
                <span className="text-xs text-muted-foreground self-center">
                  +{rosesGrown - 10}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default Stats;