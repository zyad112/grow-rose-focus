import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Crown, 
  Zap, 
  Target, 
  TrendingUp, 
  Award,
  Star,
  Flame,
  Clock,
  Calendar,
  Trophy
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface VipStatsProps {
  completedSessions: number;
  totalFocusTime: number;
  longestStreak: number;
  rosesGrown: number;
}

const VipStats = ({ completedSessions, totalFocusTime, longestStreak, rosesGrown }: VipStatsProps) => {
  const focusHours = Math.floor(totalFocusTime / 60);
  const focusMinutes = totalFocusTime % 60;
  
  // VIP Calculations
  const efficiency = completedSessions > 0 ? Math.min((completedSessions / (completedSessions + 1)) * 100, 100) : 0;
  const masterLevel = Math.floor(completedSessions / 10) + 1;
  const nextLevelProgress = (completedSessions % 10) * 10;
  const productivity = Math.min(totalFocusTime / 25, 100);
  
  const achievements = [
    { 
      name: 'مبتدئ الأزهار', 
      unlocked: completedSessions >= 1, 
      icon: '🌱', 
      description: 'أول جلسة تركيز' 
    },
    { 
      name: 'بستاني ماهر', 
      unlocked: completedSessions >= 5, 
      icon: '🌿', 
      description: '5 جلسات مكتملة' 
    },
    { 
      name: 'خبير الأزهار', 
      unlocked: completedSessions >= 15, 
      icon: '🌺', 
      description: '15 جلسة مكتملة' 
    },
    { 
      name: 'سيد البستنة', 
      unlocked: completedSessions >= 30, 
      icon: '🏆', 
      description: '30 جلسة مكتملة' 
    },
    { 
      name: 'إمبراطور الأزهار', 
      unlocked: completedSessions >= 50, 
      icon: '👑', 
      description: '50 جلسة مكتملة' 
    },
    { 
      name: 'محافظ على التركيز', 
      unlocked: longestStreak >= 7, 
      icon: '🔥', 
      description: 'سلسلة 7 أيام' 
    },
  ];

  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const totalAchievements = achievements.length;

  return (
    <div className="space-y-6">
      {/* VIP Header */}
      <Card className="p-6 bg-gradient-to-br from-amber-50/80 to-yellow-50/80 dark:from-amber-950/50 dark:to-yellow-950/50 border-amber-200/50 dark:border-amber-800/50 backdrop-blur-sm shadow-vip">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Crown className="w-6 h-6 text-amber-500" />
            <h3 className="text-xl font-bold text-foreground font-arabic">
              إحصائيات متقدمة
            </h3>
          </div>
          <Badge variant="secondary" className="bg-gradient-to-r from-amber-100 to-yellow-100 dark:from-amber-800 dark:to-yellow-800 text-amber-800 dark:text-amber-100">
            المستوى {masterLevel}
          </Badge>
        </div>

        {/* Master Level Progress */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground font-arabic">التقدم للمستوى التالي</span>
            <span className="text-amber-600 font-semibold">{nextLevelProgress}%</span>
          </div>
          <Progress 
            value={nextLevelProgress} 
            className="h-3 bg-amber-100 dark:bg-amber-900"
          />
        </div>
      </Card>

      {/* Advanced Metrics */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950 dark:to-green-950 border-emerald-200/50 dark:border-emerald-800/50">
          <div className="flex items-center space-x-2 mb-2">
            <Zap className="w-5 h-5 text-emerald-500" />
            <span className="text-sm font-medium font-arabic">الكفاءة</span>
          </div>
          <div className="text-2xl font-bold text-emerald-600 mb-1">
            {efficiency.toFixed(1)}%
          </div>
          <Progress value={efficiency} className="h-2 bg-emerald-100 dark:bg-emerald-900" />
        </Card>

        <Card className="p-4 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950 dark:to-violet-950 border-purple-200/50 dark:border-purple-800/50">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="w-5 h-5 text-purple-500" />
            <span className="text-sm font-medium font-arabic">الإنتاجية</span>
          </div>
          <div className="text-2xl font-bold text-purple-600 mb-1">
            {productivity.toFixed(0)}%
          </div>
          <Progress value={productivity} className="h-2 bg-purple-100 dark:bg-purple-900" />
        </Card>
      </div>

      {/* Detailed Statistics */}
      <Card className="p-6 bg-card/95 backdrop-blur-sm border-border shadow-garden">
        <h4 className="text-lg font-semibold text-foreground mb-4 font-arabic flex items-center space-x-2">
          <Target className="w-5 h-5" />
          <span>تفاصيل الأداء</span>
        </h4>
        
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-arabic">وقت التركيز</span>
              </div>
              <div className="text-right">
                <div className="font-semibold">{focusHours}س {focusMinutes}د</div>
                <div className="text-xs text-muted-foreground">إجمالي</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Flame className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-arabic">أطول سلسلة</span>
              </div>
              <div className="text-right">
                <div className="font-semibold">{longestStreak}</div>
                <div className="text-xs text-muted-foreground">يوم</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-green-500" />
                <span className="text-sm font-arabic">الجلسات</span>
              </div>
              <div className="text-right">
                <div className="font-semibold">{completedSessions}</div>
                <div className="text-xs text-muted-foreground">مكتملة</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Trophy className="w-4 h-4 text-pink-500" />
                <span className="text-sm font-arabic">الأزهار</span>
              </div>
              <div className="text-right">
                <div className="font-semibold">{rosesGrown}</div>
                <div className="text-xs text-muted-foreground">نمت</div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Achievements */}
      <Card className="p-6 bg-card/95 backdrop-blur-sm border-border shadow-garden">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold text-foreground font-arabic flex items-center space-x-2">
            <Award className="w-5 h-5" />
            <span>الإنجازات</span>
          </h4>
          <Badge variant="outline" className="text-xs">
            {unlockedAchievements.length}/{totalAchievements}
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 gap-3">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className={cn(
                "flex items-center space-x-3 p-3 rounded-lg border transition-all",
                achievement.unlocked 
                  ? "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-green-200 dark:border-green-800" 
                  : "bg-muted/30 border-muted-foreground/20 opacity-60"
              )}
            >
              <div className="text-2xl">{achievement.icon}</div>
              <div className="flex-1">
                <div className="font-semibold font-arabic text-sm">{achievement.name}</div>
                <div className="text-xs text-muted-foreground">{achievement.description}</div>
              </div>
              {achievement.unlocked && (
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default VipStats;