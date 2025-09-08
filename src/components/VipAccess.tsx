import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Crown, Lock, Unlock, Sparkles, Star, Gem } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface VipAccessProps {
  onVipUnlock?: () => void;
}

const VipAccess = ({ onVipUnlock }: VipAccessProps) => {
  const [code, setCode] = useState('');
  const [isVip, setIsVip] = useState(() => {
    return localStorage.getItem('vipAccess') === 'true';
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const VIP_CODE = 'ZYAD10102007';
  
  const handleVerify = async () => {
    setIsLoading(true);
    
    // Simulate verification process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (code === VIP_CODE) {
      setIsVip(true);
      localStorage.setItem('vipAccess', 'true');
      onVipUnlock?.();
      
      toast({
        title: '🎉 مبروك! تم فتح الميزات المتقدمة',
        description: 'أصبح بإمكانك الوصول لجميع الميزات الحصرية',
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

  const vipFeatures = [
    { icon: <Sparkles className="w-4 h-4" />, name: 'أزهار حصرية متحركة' },
    { icon: <Star className="w-4 h-4" />, name: 'إحصائيات متقدمة مفصلة' },
    { icon: <Gem className="w-4 h-4" />, name: 'أصوات طبيعية عالية الجودة' },
    { icon: <Crown className="w-4 h-4" />, name: 'تحديات خاصة وجوائز' },
  ];

  if (isVip) {
    return (
      <Card className="p-6 bg-gradient-to-br from-amber-50/50 to-yellow-50/50 dark:from-amber-950/30 dark:to-yellow-950/30 border-amber-200/50 dark:border-amber-800/50 backdrop-blur-sm shadow-glow">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <Crown className="w-6 h-6 text-amber-500" />
            <Badge variant="secondary" className="bg-gradient-to-r from-amber-100 to-yellow-100 dark:from-amber-800 dark:to-yellow-800 text-amber-800 dark:text-amber-100 px-3 py-1">
              <Unlock className="w-3 h-3 mr-1" />
              عضو مميز VIP
            </Badge>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-foreground font-arabic">
              🌟 الميزات المتقدمة مفعلة
            </h3>
            
            <div className="grid grid-cols-1 gap-2 text-sm">
              {vipFeatures.map((feature, index) => (
                <div key={index} className="flex items-center justify-center space-x-2 text-muted-foreground">
                  <span className="text-amber-500">{feature.icon}</span>
                  <span className="font-arabic">{feature.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-gradient-sunset/10 rounded-lg border border-amber-200/30">
            <p className="text-xs text-muted-foreground font-arabic">
              ✨ استمتع بتجربة حصرية مع الأزهار المتقدمة
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-card/95 backdrop-blur-sm border-border shadow-garden">
      <div className="space-y-6">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <Crown className="w-6 h-6 text-amber-500" />
            <h3 className="text-xl font-bold text-foreground font-arabic">
              الوصول المتقدم
            </h3>
          </div>
          <p className="text-sm text-muted-foreground">
            أدخل الكود الخاص للوصول للميزات الحصرية
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="vip-code" className="text-sm font-medium font-arabic">
              كود الوصول المتقدم
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

        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-foreground font-arabic text-center">
            الميزات المتقدمة المتاحة:
          </h4>
          
          <div className="grid grid-cols-1 gap-2">
            {vipFeatures.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2 p-2 bg-muted/50 rounded-lg">
                <span className="text-muted-foreground">{feature.icon}</span>
                <span className="text-sm text-muted-foreground font-arabic">{feature.name}</span>
                <Lock className="w-3 h-3 text-muted-foreground ml-auto" />
              </div>
            ))}
          </div>
        </div>

        <div className="p-3 bg-amber-50/50 dark:bg-amber-950/20 rounded-lg border border-amber-200/30">
          <p className="text-xs text-center text-muted-foreground font-arabic">
            🔐 الميزات المتقدمة محمية بكود أمان خاص
          </p>
        </div>
      </div>
    </Card>
  );
};

export default VipAccess;