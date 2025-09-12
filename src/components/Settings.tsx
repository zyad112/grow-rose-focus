import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Settings as SettingsIcon, Volume2, Palette, Bell, RotateCcw, Sparkles, Monitor, Smartphone, Tablet, Zap, Crown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SettingsProps {
  onReset: () => void;
  vipLevel?: number;
  onThemeChange?: (theme: string) => void;
}

const Settings = ({ onReset, vipLevel = 0, onThemeChange }: SettingsProps) => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [soundVolume, setSoundVolume] = useState([50]);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [theme, setTheme] = useState('nature');
  const [autoStart, setAutoStart] = useState(false);
  const [particleEffects, setParticleEffects] = useState(true);
  const [animations, setAnimations] = useState(true);
  const [screenMode, setScreenMode] = useState('auto');
  const [customColors, setCustomColors] = useState(false);
  const [advancedFeatures, setAdvancedFeatures] = useState(false);
  const { toast } = useToast();

  const handleReset = () => {
    onReset();
    toast({
      title: 'تم إعادة التعيين 🔄',
      description: 'تم مسح جميع البيانات بنجاح',
      duration: 3000,
    });
  };

  const playTestSound = () => {
    if (soundEnabled) {
      // Create a simple notification sound
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(soundVolume[0] / 100 * 0.3, audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    }
  };

  return (
    <Card className="p-6 bg-card/95 backdrop-blur-sm border-border shadow-garden">
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-bold text-foreground mb-2 font-arabic flex items-center justify-center space-x-2">
            <SettingsIcon className="w-5 h-5" />
            <span>الإعدادات</span>
          </h3>
          <p className="text-sm text-muted-foreground">
            خصص تجربتك في زراعة الأزهار
          </p>
        </div>

        <div className="space-y-6">
          {/* Sound Settings */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground flex items-center space-x-2 font-arabic">
              <Volume2 className="w-4 h-4" />
              <span>الصوت والإشعارات</span>
            </h4>
            
            <div className="space-y-4 pr-6">
              <div className="flex items-center justify-between">
                <Label htmlFor="sound" className="text-sm font-medium">
                  تفعيل الأصوات
                </Label>
                <Switch
                  id="sound"
                  checked={soundEnabled}
                  onCheckedChange={setSoundEnabled}
                />
              </div>

              {soundEnabled && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">مستوى الصوت</Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={playTestSound}
                      className="text-xs"
                    >
                      اختبار
                    </Button>
                  </div>
                  <Slider
                    value={soundVolume}
                    onValueChange={setSoundVolume}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                  <div className="text-xs text-muted-foreground text-center">
                    {soundVolume[0]}%
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between">
                <Label htmlFor="notifications" className="text-sm font-medium">
                  إشعارات المتصفح
                </Label>
                <Switch
                  id="notifications"
                  checked={notificationsEnabled}
                  onCheckedChange={setNotificationsEnabled}
                />
              </div>
            </div>
          </div>

          {/* Theme Settings */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground flex items-center space-x-2 font-arabic">
              <Palette className="w-4 h-4" />
              <span>المظهر</span>
            </h4>
            
            <div className="space-y-3 pr-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  موضوع الألوان
                </Label>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nature">الطبيعة الخضراء 🌿</SelectItem>
                    <SelectItem value="sunset">غروب الشمس 🌅</SelectItem>
                    <SelectItem value="ocean">المحيط الأزرق 🌊</SelectItem>
                    <SelectItem value="royal">الأرجواني الملكي 👑</SelectItem>
                    {vipLevel >= 1 && <SelectItem value="forest">الغابة السحرية 🌲</SelectItem>}
                    {vipLevel >= 2 && <SelectItem value="celestial">النجوم السماوية ⭐</SelectItem>}
                    {vipLevel >= 3 && <SelectItem value="phoenix">نار العنقاء 🔥</SelectItem>}
                    {vipLevel >= 4 && <SelectItem value="crystal">كريستال الماس 💎</SelectItem>}
                    {vipLevel >= 5 && <SelectItem value="void">ظلال الفراغ 🌙</SelectItem>}
                    {vipLevel >= 6 && <SelectItem value="time">عجلة الزمن ⚡</SelectItem>}
                    {vipLevel >= 7 && <SelectItem value="divine">القوة الملكية 👑</SelectItem>}
                    {vipLevel >= 8 && <SelectItem value="ultra">المستوى الخارق 🚀</SelectItem>}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="auto-start" className="text-sm font-medium">
                  بدء تلقائي للجلسة التالية
                </Label>
                <Switch
                  id="auto-start"
                  checked={autoStart}
                  onCheckedChange={setAutoStart}
                />
              </div>

              {/* VIP Level 8 Ultra Features */}
              {vipLevel >= 8 && (
                <>
                  <div className="mt-6 p-4 bg-gradient-to-r from-cyan-50/50 to-purple-50/50 dark:from-cyan-950/30 dark:to-purple-950/30 rounded-lg border border-cyan-200/50 dark:border-purple-800/50">
                    <div className="flex items-center space-x-2 mb-3">
                      <Crown className="w-4 h-4 text-purple-600" />
                      <Badge variant="secondary" className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white">
                        المستوى الخارق
                      </Badge>
                    </div>
                    
                    <div className="space-y-4">
                      {/* Screen Mode Selection */}
                      <div className="space-y-2">
                        <Label className="text-sm font-medium flex items-center space-x-2">
                          <Monitor className="w-4 h-4" />
                          <span>وضع العرض المتطور</span>
                        </Label>
                        <Select value={screenMode} onValueChange={setScreenMode}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="auto">تلقائي ذكي 🤖</SelectItem>
                            <SelectItem value="desktop">سطح المكتب 🖥️</SelectItem>
                            <SelectItem value="tablet">الجهاز اللوحي 📱</SelectItem>
                            <SelectItem value="mobile">الهاتف المحمول 📱</SelectItem>
                            <SelectItem value="cinema">وضع السينما 🎬</SelectItem>
                            <SelectItem value="minimal">البساطة الاحترافية ✨</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Advanced Visual Effects */}
                      <div className="flex items-center justify-between">
                        <Label htmlFor="particle-effects" className="text-sm font-medium flex items-center space-x-2">
                          <Sparkles className="w-4 h-4" />
                          <span>التأثيرات البصرية المتقدمة</span>
                        </Label>
                        <Switch
                          id="particle-effects"
                          checked={particleEffects}
                          onCheckedChange={setParticleEffects}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="animations" className="text-sm font-medium flex items-center space-x-2">
                          <Zap className="w-4 h-4" />
                          <span>الانتقالات السينمائية</span>
                        </Label>
                        <Switch
                          id="animations"
                          checked={animations}
                          onCheckedChange={setAnimations}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="custom-colors" className="text-sm font-medium">
                          ألوان مخصصة احترافية
                        </Label>
                        <Switch
                          id="custom-colors"
                          checked={customColors}
                          onCheckedChange={setCustomColors}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="advanced-features" className="text-sm font-medium">
                          ميزات متقدمة (AI مساعد، تحليلات ذكية)
                        </Label>
                        <Switch
                          id="advanced-features"
                          checked={advancedFeatures}
                          onCheckedChange={setAdvancedFeatures}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Reset Data */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground flex items-center space-x-2 font-arabic">
              <RotateCcw className="w-4 h-4" />
              <span>إعادة التعيين</span>
            </h4>
            
            <div className="pr-6">
              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-sm text-muted-foreground mb-3">
                  سيتم مسح جميع الإحصائيات والتقدم المحفوظ. هذا الإجراء لا يمكن التراجع عنه.
                </p>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleReset}
                  className="w-full"
                >
                  مسح جميع البيانات
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center p-4 bg-gradient-sunset/10 rounded-xl border border-golden/20">
          <p className="text-xs text-muted-foreground font-arabic">
            💡 تذكر: الإعدادات محفوظة محلياً في متصفحك
            {vipLevel >= 8 && ' | 🚀 المستوى الخارق: ميزات احترافية لا محدودة'}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default Settings;