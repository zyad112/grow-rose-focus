import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Settings as SettingsIcon, Volume2, Palette, Bell, RotateCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SettingsProps {
  onReset: () => void;
}

const Settings = ({ onReset }: SettingsProps) => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [soundVolume, setSoundVolume] = useState([50]);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [theme, setTheme] = useState('nature');
  const [autoStart, setAutoStart] = useState(false);
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
          </p>
        </div>
      </div>
    </Card>
  );
};

export default Settings;