import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Crown, Lock, Unlock, Sparkles, Star, Gem, Zap, Shield, Diamond } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface VipAccessProps {
  onVipUnlock?: (level: number) => void;
  vipLevel?: number;
}

const VIP_CODES = {
  'ZYAD10102007': { level: 1, name: 'الغابة السحرية', theme: 'forest' },
  'ZYAD10102008': { level: 2, name: 'النجوم السماوية', theme: 'celestial' },
  'ZYAD10102009': { level: 3, name: 'نار العنقاء', theme: 'phoenix' },
  'ZYAD10102010': { level: 4, name: 'كريستال الماس', theme: 'crystal' },
  'ZYAD10102011': { level: 5, name: 'ظلال الفراغ', theme: 'void' },
  'ZYAD10102012': { level: 6, name: 'عجلة الزمن', theme: 'time' },
  'ZYAD10102013': { level: 7, name: 'القوة الملكية', theme: 'divine' },
  'ZYAD10102007PRO': { level: 8, name: 'المستوى الخارق', theme: 'ultra' }
};

const VipAccess = ({ onVipUnlock, vipLevel = 0 }: VipAccessProps) => {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const currentVipData = vipLevel > 0 ? Object.values(VIP_CODES).find(vip => vip.level === vipLevel) : null;
  
  const handleVerify = async () => {
    setIsLoading(true);
    
    // Simulate verification process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const vipData = VIP_CODES[code as keyof typeof VIP_CODES];
    
    if (vipData) {
      const previousLevel = vipLevel;
      
      // Save VIP level to localStorage
      localStorage.setItem('vipLevel', vipData.level.toString());
      localStorage.setItem('vipAccess', 'true');
      onVipUnlock?.(vipData.level);
      
      // Different messages based on whether it's an upgrade, downgrade, or first time
      let title = '';
      let description = '';
      
      if (previousLevel === 0) {
        // First time activation
        title = `🎉 مبروك! تم فتح ${vipData.name}`;
        description = `أصبحت عضو VIP مستوى ${vipData.level} - ${vipData.name}`;
      } else if (vipData.level > previousLevel) {
        // Upgrade
        title = `🚀 ترقية رائعة! انتقلت إلى ${vipData.name}`;
        description = `تم الترقية من المستوى ${previousLevel} إلى المستوى ${vipData.level}`;
      } else if (vipData.level < previousLevel) {
        // Downgrade
        title = `🔄 تم التغيير إلى ${vipData.name}`;
        description = `انتقلت من المستوى ${previousLevel} إلى المستوى ${vipData.level}`;
      } else {
        // Same level
        title = `✅ أنت بالفعل في ${vipData.name}`;
        description = `المستوى ${vipData.level} مُفعل حالياً`;
      }
      
      toast({
        title,
        description,
        duration: 4000,
      });
      
      setCode('');
    } else {
      toast({
        title: '❌ كود خاطئ',
        description: 'الرجاء التحقق من الكود والمحاولة مرة أخرى',
        variant: 'destructive',
        duration: 3000,
      });
    }
    
    setIsLoading(false);
  };

  const getVipFeatures = (level: number) => {
    const allFeatures = [
      { icon: <Sparkles className="w-4 h-4" />, name: 'أزهار الغابة السحرية', level: 1 },
      { icon: <Star className="w-4 h-4" />, name: 'أزهار النجوم السماوية', level: 2 },
      { icon: <Zap className="w-4 h-4" />, name: 'أزهار نار العنقاء', level: 3 },
      { icon: <Diamond className="w-4 h-4" />, name: 'أزهار كريستال الماس', level: 4 },
      { icon: <Shield className="w-4 h-4" />, name: 'أزهار ظلال الفراغ', level: 5 },
      { icon: <Gem className="w-4 h-4" />, name: 'أزهار عجلة الزمن', level: 6 },
      { icon: <Crown className="w-4 h-4" />, name: 'أزهار القوة الملكية', level: 7 },
      { icon: <Crown className="w-4 h-4 text-purple-500" />, name: '🚀 الواجهة الاحترافية الخارقة', level: 8 },
      { icon: <Sparkles className="w-4 h-4 text-cyan-500" />, name: '🎨 ١٦ سمة تفاعلية متطورة', level: 8 },
      { icon: <Star className="w-4 h-4 text-gold-500" />, name: '⚡ تأثيرات بصرية ثلاثية الأبعاد', level: 8 },
      { icon: <Zap className="w-4 h-4 text-electric-500" />, name: '🌈 انتقالات سينمائية سلسة', level: 8 },
      { icon: <Diamond className="w-4 h-4 text-diamond-500" />, name: '🎵 مكتبة أصوات احترافية', level: 8 },
      { icon: <Shield className="w-4 h-4 text-shield-500" />, name: '📊 تحليلات متقدمة وذكية', level: 8 },
    ];
    
    return allFeatures.filter(feature => feature.level <= level);
  };

  const getThemeClasses = (theme: string) => {
    const themes = {
      forest: 'from-emerald-50/50 to-green-50/50 dark:from-emerald-950/30 dark:to-green-950/30 border-emerald-200/50 dark:border-emerald-800/50',
      celestial: 'from-blue-50/50 to-indigo-50/50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-200/50 dark:border-blue-800/50',
      phoenix: 'from-orange-50/50 to-red-50/50 dark:from-orange-950/30 dark:to-red-950/30 border-orange-200/50 dark:border-orange-800/50',
      crystal: 'from-gray-50/50 to-slate-50/50 dark:from-gray-950/30 dark:to-slate-950/30 border-gray-200/50 dark:border-gray-800/50',
      void: 'from-purple-50/50 to-violet-50/50 dark:from-purple-950/30 dark:to-violet-950/30 border-purple-200/50 dark:border-purple-800/50',
      time: 'from-amber-50/50 to-yellow-50/50 dark:from-amber-950/30 dark:to-yellow-950/30 border-amber-200/50 dark:border-amber-800/50',
      divine: 'from-pink-50/50 to-rose-50/50 dark:from-pink-950/30 dark:to-rose-950/30 border-pink-200/50 dark:border-pink-800/50',
      ultra: 'from-gradient-cyber-start/50 to-gradient-cyber-end/50 dark:from-gradient-cyber-start/80 dark:to-gradient-cyber-end/80 border-cyan-400/50 dark:border-purple-400/50 shadow-ultra-glow'
    };
    return themes[theme as keyof typeof themes] || themes.forest;
  };

  return (
    <Card className={`p-6 ${vipLevel > 0 && currentVipData ? `bg-gradient-to-br ${getThemeClasses(currentVipData.theme)} shadow-glow` : 'bg-card/95 shadow-garden'} backdrop-blur-sm border-border`}>
      <div className="space-y-6">
        {/* Current VIP Status - Show if VIP is active */}
        {vipLevel > 0 && currentVipData && (
          <div className="text-center space-y-4 p-4 bg-gradient-to-r from-amber-50/50 to-yellow-50/50 dark:from-amber-950/30 dark:to-yellow-950/30 rounded-lg border border-amber-200/50 dark:border-amber-800/50">
            <div className="flex items-center justify-center space-x-2">
              <Crown className="w-6 h-6 text-amber-500" />
              <Badge variant="secondary" className="bg-gradient-to-r from-amber-100 to-yellow-100 dark:from-amber-800 dark:to-yellow-800 text-amber-800 dark:text-amber-100 px-3 py-1">
                <Unlock className="w-3 h-3 mr-1" />
                VIP مستوى {vipLevel}
              </Badge>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-foreground font-arabic">
                🌟 {currentVipData.name} مُفعل حالياً
              </h3>
              
              <div className="grid grid-cols-1 gap-2 text-sm max-h-32 overflow-y-auto">
                {getVipFeatures(vipLevel).slice(0, 4).map((feature, index) => (
                  <div key={index} className="flex items-center justify-center space-x-2 text-muted-foreground">
                    <span className="text-amber-500">{feature.icon}</span>
                    <span className="font-arabic text-xs">{feature.name}</span>
                  </div>
                ))}
                {getVipFeatures(vipLevel).length > 4 && (
                  <div className="text-xs text-muted-foreground text-center">
                    +{getVipFeatures(vipLevel).length - 4} ميزة إضافية
                  </div>
                )}
              </div>
            </div>

            {/* Level Progress */}
            <div className="space-y-2">
              <div className="flex justify-center space-x-1">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full transition-all duration-500 ${
                      i < vipLevel 
                        ? (i === 7 ? "bg-gradient-to-r from-cyan-400 to-purple-600 shadow-ultra-glow animate-pulse border border-white/50" : "bg-gradient-to-r from-amber-400 to-rose-400 shadow-lg animate-pulse")
                        : "bg-gray-300 dark:bg-gray-700"
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                المستوى {vipLevel} من 8 {vipLevel === 8 && '🚀 ULTRA'}
              </p>
            </div>
          </div>
        )}

        {/* VIP Code Input - Always show */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <Crown className="w-6 h-6 text-amber-500" />
            <h3 className="text-xl font-bold text-foreground font-arabic">
              {vipLevel > 0 ? 'تغيير المستوى VIP' : 'الوصول المتقدم VIP'}
            </h3>
          </div>
          <p className="text-sm text-muted-foreground">
            {vipLevel > 0 ? 'أدخل كود مستوى آخر للانتقال إليه' : 'أدخل الكود الخاص للوصول للمستويات الحصرية'}
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="vip-code" className="text-sm font-medium font-arabic">
              كود المستوى VIP {vipLevel > 0 && '(الجديد)'}
            </Label>
            <Input
              id="vip-code"
              type="password"
              placeholder="أدخل الكود الخاص..."
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              className="text-center font-mono tracking-widest"
              maxLength={15}
            />
          </div>

          <Button
            onClick={handleVerify}
            disabled={!code.trim() || isLoading}
            className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-arabic"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>جاري التحقق...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Lock className="w-4 h-4" />
                <span>{vipLevel > 0 ? 'تغيير المستوى' : 'تحقق من الكود'}</span>
              </div>
            )}
          </Button>
        </div>

        {/* Available VIP Levels */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-foreground font-arabic text-center">
            مستويات VIP المتاحة:
          </h4>
          
          <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto">
            {Object.values(VIP_CODES).map((vipData, index) => (
              <div key={index} className={`flex items-center space-x-2 p-2 rounded-lg transition-all ${vipData.level === vipLevel ? 'bg-amber-100 dark:bg-amber-900/30 border border-amber-300 dark:border-amber-700' : 'bg-muted/50'}`}>
                <Crown className={`w-4 h-4 ${vipData.level === vipLevel ? 'text-amber-600' : 'text-amber-500'}`} />
                <div className="flex-1">
                  <span className="text-sm font-medium font-arabic">{vipData.name}</span>
                  <div className="text-xs text-muted-foreground">
                    مستوى {vipData.level} {vipData.level === 8 && '🚀 ULTRA'}
                  </div>
                </div>
                {vipData.level === vipLevel ? (
                  <Unlock className="w-3 h-3 text-amber-600" />
                ) : (
                  <Lock className="w-3 h-3 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="p-3 bg-amber-50/50 dark:bg-amber-950/20 rounded-lg border border-amber-200/30">
          <p className="text-xs text-center text-muted-foreground font-arabic">
            {vipLevel > 0 ? '🔄 يمكنك تغيير المستوى في أي وقت بإدخال كود آخر' : '🔐 كل مستوى VIP يحتوي على أزهار وخلفيات حصرية مختلفة'}
          </p>
        </div>
      </div>
    </Card>
  );

  return (
    <Card className="p-6 bg-card/95 backdrop-blur-sm border-border shadow-garden">
      <div className="space-y-6">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <Crown className="w-6 h-6 text-amber-500" />
            <h3 className="text-xl font-bold text-foreground font-arabic">
              الوصول المتقدم VIP
            </h3>
          </div>
          <p className="text-sm text-muted-foreground">
            أدخل الكود الخاص للوصول للمستويات الحصرية
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="vip-code" className="text-sm font-medium font-arabic">
              كود المستوى VIP
            </Label>
            <Input
              id="vip-code"
              type="password"
              placeholder="أدخل الكود الخاص..."
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              className="text-center font-mono tracking-widest"
              maxLength={12}
            />
          </div>

          <Button
            onClick={handleVerify}
            disabled={!code.trim() || isLoading}
            className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-arabic"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>جاري التحقق...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Lock className="w-4 h-4" />
                <span>تحقق من الكود</span>
              </div>
            )}
          </Button>
        </div>

        {/* Available VIP Levels */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-foreground font-arabic text-center">
            مستويات VIP المتاحة:
          </h4>
          
          <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto">
            {Object.values(VIP_CODES).map((vipData, index) => (
              <div key={index} className="flex items-center space-x-2 p-2 bg-muted/50 rounded-lg">
                <Crown className="w-4 h-4 text-amber-500" />
                <div className="flex-1">
                  <span className="text-sm font-medium font-arabic">{vipData.name}</span>
                  <div className="text-xs text-muted-foreground">مستوى {vipData.level}</div>
                </div>
                <Lock className="w-3 h-3 text-muted-foreground" />
              </div>
            ))}
          </div>
        </div>

        <div className="p-3 bg-amber-50/50 dark:bg-amber-950/20 rounded-lg border border-amber-200/30">
          <p className="text-xs text-center text-muted-foreground font-arabic">
            🔐 كل مستوى VIP يحتوي على أزهار وخلفيات حصرية مختلفة
          </p>
        </div>
      </div>
    </Card>
  );
};

export default VipAccess;