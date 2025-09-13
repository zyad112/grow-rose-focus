import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

// VIP Level 1 - Forest Theme
import vipLevel1Stage0 from '@/assets/vip-level1-stage-0.jpg';
import vipLevel1Stage1 from '@/assets/vip-level1-stage-1.jpg';
import vipLevel1Stage2 from '@/assets/vip-level1-stage-2.jpg';
import vipLevel1Stage3 from '@/assets/vip-level1-stage-3.jpg';
import vipLevel1Stage4 from '@/assets/vip-level1-stage-4.jpg';
import vipLevel1Dead from '@/assets/vip-level1-dead.jpg';

// VIP Level 2 - Celestial Theme
import vipLevel2Stage0 from '@/assets/vip-level2-stage-0.jpg';
import vipLevel2Stage1 from '@/assets/vip-level2-stage-1.jpg';
import vipLevel2Stage2 from '@/assets/vip-level2-stage-2.jpg';
import vipLevel2Stage3 from '@/assets/vip-level2-stage-3.jpg';
import vipLevel2Stage4 from '@/assets/vip-level2-stage-4.jpg';
import vipLevel2Dead from '@/assets/vip-level2-dead.jpg';

// VIP Level 7 - Divine Theme
import vipLevel7Stage0 from '@/assets/vip-level7-stage-0.jpg';
import vipLevel7Stage1 from '@/assets/vip-level7-stage-1.jpg';
import vipLevel7Stage4 from '@/assets/vip-level7-stage-4.jpg';

// VIP Level 8 - Ultra Theme
import vipLevel8Stage0 from '@/assets/vip-level8-stage-0.jpg';
import vipLevel8Stage1 from '@/assets/vip-level8-stage-1.jpg';
import vipLevel8Stage4 from '@/assets/vip-level8-stage-4.jpg';
import vipLevel8Dead from '@/assets/vip-level8-dead.jpg';

// Fallback to regular rose images
import roseStage0 from '@/assets/rose-stage-0.jpg';
import roseStage1 from '@/assets/rose-stage-1.jpg';
import roseStage2 from '@/assets/rose-stage-2.jpg';
import roseStage3 from '@/assets/rose-stage-3.jpg';
import roseStage4 from '@/assets/rose-stage-4.jpg';
import roseDeadImage from '@/assets/rose-dead.jpg';

interface VipRoseProps {
  stage: number;
  isDead: boolean;
  isGrowing: boolean;
  vipLevel?: number;
}

const VipRose = ({ stage, isDead, isGrowing, vipLevel = 1 }: VipRoseProps) => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; color: string }>>([]);
  const [glowIntensity, setGlowIntensity] = useState(0);

  // VIP Flower Images by Level
  const getVipImages = (level: number) => {
    const vipSets = {
      1: [vipLevel1Stage0, vipLevel1Stage1, vipLevel1Stage2, vipLevel1Stage3, vipLevel1Stage4],
      2: [vipLevel2Stage0, vipLevel2Stage1, vipLevel2Stage2, vipLevel2Stage3, vipLevel2Stage4],
      7: [vipLevel7Stage0, vipLevel7Stage1, roseStage2, roseStage3, vipLevel7Stage4], // Mix with fallbacks
      8: [vipLevel8Stage0, vipLevel8Stage1, roseStage2, roseStage3, vipLevel8Stage4], // Ultra level
    };
    
    return vipSets[level as keyof typeof vipSets] || [roseStage0, roseStage1, roseStage2, roseStage3, roseStage4];
  };

  const getVipDeadImage = (level: number) => {
    const deadImages = {
      1: vipLevel1Dead,
      2: vipLevel2Dead,
      8: vipLevel8Dead,
    };
    
    return deadImages[level as keyof typeof deadImages] || roseDeadImage;
  };

  const roseImages = getVipImages(vipLevel);
  const currentImage = isDead ? getVipDeadImage(vipLevel) : roseImages[stage] || roseImages[0];

  // Enhanced VIP particles effect based on level
  useEffect(() => {
    if (isGrowing && stage >= 0) {
      const levelColors = {
        1: ['#10b981', '#34d399', '#6ee7b7', '#a7f3d0'], // Forest greens
        2: ['#3b82f6', '#60a5fa', '#93c5fd', '#dbeafe'], // Celestial blues
        3: ['#f97316', '#fb923c', '#fed7aa', '#fef3c7'], // Phoenix oranges
        4: ['#f3f4f6', '#e5e7eb', '#d1d5db', '#9ca3af'], // Crystal grays
        5: ['#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe'], // Void purples
        6: ['#f59e0b', '#fbbf24', '#fcd34d', '#fde68a'], // Time golds
        7: ['#ec4899', '#f472b6', '#f9a8d4', '#fce7f3'], // Divine pinks
        8: ['#00ffff', '#ff00ff', '#00ff00', '#ffff00', '#ff0080', '#8000ff', '#ff8000', '#0080ff'], // Ultra cyber rainbow
      };
      
      const colors = levelColors[vipLevel as keyof typeof levelColors] || levelColors[1];
      const particleCount = vipLevel === 8 ? 50 : 15 + vipLevel * 3; // Massive particles for Ultra level
      
      const newParticles = Array.from({ length: particleCount }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)]
      }));
      setParticles(newParticles);
      
      setTimeout(() => setParticles([]), 3000 + vipLevel * 500); // Longer duration for higher levels
    }
  }, [isGrowing, stage, vipLevel]);

  // Enhanced VIP glow effect based on level
  useEffect(() => {
    if (stage >= 0) {
      setGlowIntensity(0.1 + stage * 0.15 + vipLevel * 0.05); // Enhanced glow based on level
    }
  }, [stage, vipLevel]);

  const getStageMessage = () => {
    const levelMessages = {
      1: [ // Forest Theme
        '🌱 بذرة الغابة السحرية تنبت',
        '🌿 براعم الطبيعة الخضراء تظهر', 
        '🍃 أوراق الغابة المقدسة تتألق',
        '🌺 برعم الطبيعة الساحر يتكون',
        '🌸✨ زهرة الغابة الأسطورية تتفتح'
      ],
      2: [ // Celestial Theme
        '⭐ بذرة النجوم الكونية تنبت',
        '🌟 براعم المجرة الزرقاء تظهر',
        '💫 أوراق السماء المضيئة تتألق',
        '🌌 برعم الكون السحري يتكون',
        '✨🌸 زهرة النجوم الإلهية تتفتح'
      ],
      7: [ // Divine Theme
        '🌈 بذرة القوة الملكية تنبت',
        '👼 براعم السماء المقدسة تظهر',
        '✨ أوراق الملائكة تتألق',
        '🕊️ برعم الجنة يتكون',
        '🌸🌈 زهرة القوة الملكية تتفتح'
      ],
      8: [ // Ultra Theme
        '🚀 بذرة المستقبل الخارقة تنبت في العالم السايبراني',
        '⚡ براعم الذكاء الاصطناعي المتطورة تنمو بقوة خارقة',
        '💎 أوراق الهولوجرام الكمية تتألق بطاقة لا محدودة',
        '🌌 برعم الواقع الافتراضي المتقدم يتشكل بروعة',
        '🌸🚀 الزهرة الخارقة المستقبلية تتفتح - إنجاز أسطوري!'
      ]
    };
    
    const messages = levelMessages[vipLevel as keyof typeof levelMessages] || levelMessages[1];
    return messages[stage] || messages[0];
  };

  const getThemeClasses = () => {
    const themes = {
      1: 'from-emerald-500/20 to-green-500/20', // Forest
      2: 'from-blue-500/20 to-indigo-500/20', // Celestial
      3: 'from-orange-500/20 to-red-500/20', // Phoenix
      4: 'from-gray-500/20 to-slate-500/20', // Crystal
      5: 'from-purple-500/20 to-violet-500/20', // Void
      6: 'from-amber-500/20 to-yellow-500/20', // Time
      7: 'from-pink-500/20 to-rose-500/20', // Divine
      8: 'from-cyan-500/20 to-purple-500/20', // Ultra
    };
    
    return themes[vipLevel as keyof typeof themes] || themes[1];
  };

  const getLevelIcon = () => {
    const icons = {
      1: '🌲', 2: '⭐', 3: '🔥', 4: '💎', 5: '🌙', 6: '⚡', 7: '👑', 8: '🚀'
    };
    return icons[vipLevel as keyof typeof icons] || '🌸';
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Enhanced VIP Glow Background */}
      <div 
        className={`absolute inset-0 rounded-full blur-3xl animate-pulse pointer-events-none z-0`}
        style={{
          background: `radial-gradient(circle, ${getThemeClasses().split(' ')[0].replace('from-', '').replace('/20', '/40')} 0%, ${getThemeClasses().split(' ')[1].replace('to-', '').replace('/20', '/20')} 50%, transparent 70%)`,
          transform: 'scale(1.3)',
        }}
      />

      {/* Main Rose Container */}
      <div className={cn(
        "relative aspect-square rounded-3xl overflow-hidden shadow-2xl transition-all duration-1000",
        "border-4 border-gradient-to-r from-amber-300 via-rose-300 to-purple-300",
        `bg-gradient-to-br ${getThemeClasses()}`,
        isGrowing && "animate-pulse scale-105",
        isDead && "grayscale"
      )}>
        
        {/* Enhanced VIP Image */}
        <img
          src={currentImage}
          alt={isDead ? `زهرة ذابلة VIP مستوى ${vipLevel}` : getStageMessage()}
          loading="eager"
          decoding="async"
          className={cn(
            "relative z-10 w-full h-full object-cover transition-all duration-1000",
            "hover:scale-110 transform",
            !isDead && stage >= 0 && "filter brightness-125 contrast-125 saturate-150",
            isGrowing && "animate-pulse scale-105"
          )}
          style={{
            filter: !isDead ? `hue-rotate(${stage * 15 + vipLevel * 10}deg) brightness(${1.1 + stage * 0.1 + vipLevel * 0.05}) saturate(${1.2 + stage * 0.1})` : 'grayscale(100%)',
            boxShadow: !isDead && stage > 0 ? `0 0 40px rgba(236, 72, 153, ${0.3 + stage * 0.1 + vipLevel * 0.05})` : undefined
          }}
          onError={(e) => {
            console.error('VIP Rose image failed to load:', currentImage);
            (e.currentTarget as HTMLImageElement).onerror = null;
            const fallbacks = [roseStage0, roseStage1, roseStage2, roseStage3, roseStage4];
            e.currentTarget.src = isDead ? roseDeadImage : (fallbacks[stage] || roseStage0);
          }}
        />

        {/* VIP Particles Overlay */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute z-20 w-2 h-2 rounded-full animate-ping opacity-75"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              backgroundColor: particle.color,
              animation: `sparkle ${2 + Math.random() * 2}s ease-out forwards`
            }}
          />
        ))}

        {/* VIP Level Badge */}
        <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
          {isDead ? '💀' : `${getLevelIcon()} VIP-${vipLevel}`}
        </div>

        {/* Stage Progress */}
        <div className="absolute top-4 left-4 bg-black/20 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs">
          {isDead ? '0/5' : `${stage + 1}/5`}
        </div>

        {/* Ultra VIP Effects */}
        {vipLevel === 8 && stage >= 2 && !isDead && (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 animate-ultra-glow pointer-events-none"></div>
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-4xl animate-hologram">
              🚀✨
            </div>
            <div className="absolute bottom-2 right-2 text-2xl animate-cyber-pulse">
              ⚡💎
            </div>
            <div className="absolute bottom-2 left-2 text-2xl animate-bounce">
              🌌🔮
            </div>
          </>
        )}

        {/* VIP Crown for other levels */}
        {stage >= 3 && !isDead && vipLevel !== 8 && (
          <div className={`absolute top-2 left-1/2 transform -translate-x-1/2 text-3xl animate-bounce`}>
            {vipLevel >= 5 ? '👑' : vipLevel >= 3 ? '💎' : '⭐'}
          </div>
        )}
      </div>

      {/* Stage Description */}
      <div className="text-center mt-4 space-y-2">
        <h3 className="text-lg font-bold text-foreground font-arabic">
          {isDead ? "الزهرة ذبلت 😢" : getStageMessage()}
        </h3>
        
        {!isDead && stage >= 0 && (
          <div className="flex justify-center space-x-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-500",
                  i <= stage 
                    ? `bg-gradient-to-r ${getThemeClasses()} shadow-lg animate-pulse` 
                    : "bg-gray-300 dark:bg-gray-700"
                )}
              />
            ))}
          </div>
        )}
      </div>

      {/* Ultra Achievement Badge */}
      {stage === 4 && !isDead && (
        <div className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 z-30 ${vipLevel === 8 ? 'bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500 animate-cyber-pulse border-2 border-cyan-300/50 ultra-text' : 'bg-gradient-to-r from-purple-600 to-pink-600 animate-pulse'} text-white px-6 py-3 rounded-2xl text-sm font-bold shadow-2xl`}>
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <span className="text-lg">{getLevelIcon()}</span>
            <span className="font-arabic">{vipLevel === 8 ? 'إنجاز فائق - مستوى الخارق الاحترافي' : `إنجاز VIP مستوى ${vipLevel}`}</span>
            {vipLevel === 8 && <span className="text-lg animate-hologram">🚀⚡</span>}
          </div>
        </div>
      )}
    </div>
  );
};

export default VipRose;