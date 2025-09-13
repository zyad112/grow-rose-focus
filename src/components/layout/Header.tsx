import React from 'react';
import { useApp } from '@/contexts/AppContext';

const Header: React.FC = () => {
  const { state } = useApp();
  const { isVipActive, vipLevel } = state;

  const getVipWelcomeMessage = () => {
    const messages = {
      1: '🌲 مرحباً بك في عالم الغابة السحرية - استمتع بأزهار الطبيعة الخلابة',
      2: '⭐ مرحباً بك في عالم النجوم السماوية - اكتشف أزهار الكون اللامتناهي',  
      3: '🔥 مرحباً بك في عالم نار العنقاء - اشعل شغفك مع أزهار النار المقدسة',
      4: '💎 مرحباً بك في عالم كريستال الماس - تألق مع أزهار الكريستال النقي',
      5: '🌙 مرحباً بك في عالم ظلال الفراغ - استكشف أزهار الظلام الغامضة',
      6: '⚡ مرحباً بك في عالم عجلة الزمن - سافر عبر الزمن مع أزهار الخلود',
      7: '👑 مرحباً بك في عالم القوة الملكية - ارتق إلى مستوى الملوك مع أزهار السلطان',
      8: '🚀 مرحباً بك في المستوى الخارق الاحترافي - تجربة مستقبلية متقدمة مع +50 ميزة فائقة التطور وواجهة سايبر احترافية',
    };
    
    return messages[vipLevel as keyof typeof messages] || messages[1];
  };

  return (
    <header className="text-center mb-8 px-4">
      {/* Ultra Professional Logo for VIP 8 */}
      {vipLevel === 8 ? (
        <div className="relative mb-6">
          <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-60 scale-150 animate-ultra-glow"></div>
          <div className="absolute inset-0 blur-xl bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 opacity-40 scale-125 animate-cyber-pulse"></div>
          <h1 className="relative text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 font-arabic">
            <span className="inline-block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-hologram drop-shadow-2xl">
              🚀 ZD FLOWER ULTRA PRO ⚡
            </span>
          </h1>
          <div className="absolute -top-6 -right-6 text-4xl animate-cyber-pulse drop-shadow-lg">🌟</div>
          <div className="absolute -bottom-4 -left-6 text-3xl animate-hologram drop-shadow-lg">⚡</div>
          <div className="absolute top-1/2 -right-10 text-2xl animate-ultra-glow opacity-70">🚀</div>
          <div className="absolute top-1/4 -left-10 text-2xl animate-bounce opacity-60">💎</div>
        </div>
      ) : (
        /* Regular Logo */
        <div className="relative mb-6">
          <div className="absolute inset-0 blur-3xl bg-gradient-sunset opacity-40 scale-125 animate-pulse"></div>
          <div className="absolute inset-0 blur-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-20 scale-110 animate-ping"></div>
          <h1 className="relative text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 font-arabic">
            <span className="inline-block bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 bg-clip-text text-transparent animate-pulse drop-shadow-2xl">
              🌺 zd flower {isVipActive && `- VIP ${vipLevel}`} ✨
            </span>
          </h1>
          <div className="absolute -top-4 -right-4 text-3xl animate-bounce drop-shadow-lg">🌸</div>
          <div className="absolute -bottom-2 -left-4 text-2xl animate-pulse drop-shadow-lg">🌿</div>
          <div className="absolute top-1/2 -right-8 text-xl animate-spin opacity-70">💫</div>
          <div className="absolute top-1/4 -left-8 text-lg animate-bounce opacity-60">🦋</div>
        </div>
      )}
      
      {/* Enhanced Professional Description */}
      <div className={`relative ${vipLevel === 8 ? 'bg-gradient-to-r from-gray-900/95 via-purple-900/90 to-gray-900/95 border-cyan-400/50' : 'bg-gradient-to-r from-white/80 to-pink-50/80 dark:from-gray-900/80 dark:to-purple-950/80 border-pink-200/50 dark:border-purple-800/50'} backdrop-blur-sm rounded-2xl p-6 border shadow-xl`}>
        {vipLevel === 8 && (
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl animate-ultra-glow"></div>
        )}
        <p className={`relative text-base sm:text-lg ${vipLevel === 8 ? 'text-cyan-100' : 'text-muted-foreground'} max-w-2xl mx-auto leading-relaxed font-arabic px-4`}>
          {isVipActive ? getVipWelcomeMessage() : '🌸 ادرس أو اعمل واترك هاتفك لتنمو زهرتك الجميلة. كلما زاد وقت التركيز، تتطور زهرتك إلى ألوان أزهى وأشكال أجمل! انضم لعضوية VIP للحصول على زهور حقيقية وميزات متقدمة! ✨'}
        </p>
        <div className="relative mt-4 flex justify-center space-x-4 rtl:space-x-reverse">
          <div className={`flex items-center space-x-1 rtl:space-x-reverse text-sm ${vipLevel === 8 ? 'text-cyan-300' : 'text-purple-600 dark:text-purple-400'}`}>
            <span>{vipLevel === 8 ? '⚡' : '🎯'}</span>
            <span className="font-arabic">{vipLevel === 8 ? 'قوة خارقة' : 'تركيز'}</span>
          </div>
          <div className={`flex items-center space-x-1 rtl:space-x-reverse text-sm ${vipLevel === 8 ? 'text-purple-300' : 'text-green-600 dark:text-green-400'}`}>
            <span>{vipLevel === 8 ? '🚀' : '🌱'}</span>
            <span className="font-arabic">{vipLevel === 8 ? 'تطور متقدم' : 'نمو'}</span>
          </div>
          <div className={`flex items-center space-x-1 rtl:space-x-reverse text-sm ${vipLevel === 8 ? 'text-pink-300' : 'text-pink-600 dark:text-pink-400'}`}>
            <span>{vipLevel === 8 ? '💎' : '✨'}</span>
            <span className="font-arabic">{vipLevel === 8 ? 'إنجاز فائق' : 'إنجاز'}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default React.memo(Header);