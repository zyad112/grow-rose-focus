import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, MessageCircle, Code, Heart, Star, Phone } from 'lucide-react';

const DeveloperInfo = () => {
  const handleWhatsAppContact = () => {
    const phoneNumber = '+201006982102';
    const message = 'السلام عليكم، أريد التواصل معك بخصوص تطبيق zd flower 🌺';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-rose-50/50 to-pink-50/50 dark:from-rose-950/30 dark:to-pink-950/30 border-rose-200/50 dark:border-rose-800/50 backdrop-blur-sm shadow-rose">
      <div className="space-y-6">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <User className="w-6 h-6 text-rose-500" />
            <h3 className="text-xl font-bold text-foreground font-arabic">
              معلومات المطور
            </h3>
          </div>
        </div>

        <div className="space-y-4">
          {/* Developer Name */}
          <div className="text-center p-4 bg-gradient-rose/10 rounded-xl border border-rose-200/30">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Code className="w-5 h-5 text-rose-500" />
              <Badge variant="secondary" className="bg-rose-100 dark:bg-rose-900 text-rose-800 dark:text-rose-100">
                مطور التطبيق
              </Badge>
            </div>
            <h4 className="text-lg font-bold text-foreground font-arabic mb-1">
              زياد حسن محمد عبد الرحمن
            </h4>
            <p className="text-sm text-muted-foreground font-arabic">
              مطور تطبيقات الجوال والويب
            </p>
          </div>

          {/* Contact Button */}
          <div className="space-y-3">
            <Button
              onClick={handleWhatsAppContact}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-arabic"
              size="lg"
            >
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-5 h-5" />
                <span>تواصل معي عبر واتساب</span>
              </div>
            </Button>
            
            <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
              <Phone className="w-3 h-3" />
              <span className="font-mono">+201006982102</span>
            </div>
          </div>

          {/* App Info */}
          <div className="space-y-3">
            <div className="p-3 bg-gradient-nature/10 rounded-lg border border-green-200/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium font-arabic">تطبيق zd flower</span>
                <div className="flex items-center space-x-1">
                  {[1,2,3,4,5].map((star) => (
                    <Star key={star} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
              <p className="text-xs text-muted-foreground font-arabic">
                تطبيق مبتكر لتحسين التركيز والإنتاجية من خلال زراعة الأزهار الافتراضية
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 bg-muted/50 rounded text-center">
                <div className="font-semibold text-foreground">النسخة</div>
                <div className="text-muted-foreground">1.0.0</div>
              </div>
              <div className="p-2 bg-muted/50 rounded text-center">
                <div className="font-semibold text-foreground">التحديث</div>
                <div className="text-muted-foreground">2024</div>
              </div>
            </div>
          </div>

          {/* Appreciation */}
          <div className="text-center p-4 bg-gradient-sunset/10 rounded-xl border border-golden/20">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Heart className="w-4 h-4 text-rose-500" />
              <span className="text-sm font-medium font-arabic">شكراً لاستخدام التطبيق</span>
            </div>
            <p className="text-xs text-muted-foreground font-arabic">
              أتمنى أن يساعدك هذا التطبيق في تحقيق أهدافك وزيادة تركيزك
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DeveloperInfo;