import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import roseStage0 from '@/assets/rose-stage-0.jpg';
import roseStage1 from '@/assets/rose-stage-1.jpg';
import roseStage2 from '@/assets/rose-stage-2.jpg';
import roseStage3 from '@/assets/rose-stage-3.jpg';
import roseStage4 from '@/assets/rose-stage-4.jpg';
import roseDead from '@/assets/rose-dead.jpg';

interface VipRoseProps {
  stage: number;
  isDead: boolean;
  isGrowing: boolean;
}

const VipRose = ({ stage, isDead, isGrowing }: VipRoseProps) => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; color: string }>>([]);
  const [glowIntensity, setGlowIntensity] = useState(0);

  const roseImages = [roseStage0, roseStage1, roseStage2, roseStage3, roseStage4];
  const currentImage = isDead ? roseDead : roseImages[stage] || roseStage0;

  // VIP enhanced particles effect
  useEffect(() => {
    if (isGrowing && stage > 0) {
      const colors = ['#ec4899', '#f59e0b', '#10b981', '#8b5cf6', '#ef4444'];
      const newParticles = Array.from({ length: 12 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)]
      }));
      setParticles(newParticles);
      
      setTimeout(() => setParticles([]), 3000);
    }
  }, [isGrowing, stage]);

  // VIP glow effect
  useEffect(() => {
    if (stage > 0) {
      setGlowIntensity(stage * 0.2 + 0.3);
    }
  }, [stage]);

  const getStageMessage = () => {
    const vipMessages = [
      '🌱 البذرة المباركة تنبت',
      '🌿 البراعم الذهبية تظهر', 
      '🍃 الأوراق الماسية تتألق',
      '🌺 البرعم الملكي يتكون',
      '🌸✨ الزهرة الإمبراطورية تتفتح'
    ];
    return vipMessages[stage] || vipMessages[0];
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* VIP Glow Background */}
      <div 
        className="absolute inset-0 rounded-full blur-3xl animate-pulse"
        style={{
          background: `radial-gradient(circle, rgba(236, 72, 153, ${glowIntensity}) 0%, rgba(245, 158, 11, ${glowIntensity * 0.7}) 50%, transparent 70%)`,
          transform: 'scale(1.2)',
        }}
      />

      {/* Main Rose Container */}
      <div className={cn(
        "relative aspect-square rounded-3xl overflow-hidden shadow-2xl transition-all duration-1000",
        "border-4 border-gradient-to-r from-amber-300 via-rose-300 to-purple-300",
        "bg-gradient-to-br from-rose-50/90 to-pink-50/90 dark:from-rose-950/90 dark:to-pink-950/90",
        isGrowing && "animate-pulse scale-105",
        isDead && "grayscale"
      )}>
        
        {/* Enhanced Image */}
        <img
          src={currentImage}
          alt={isDead ? "زهرة ذابلة" : getStageMessage()}
          className={cn(
            "w-full h-full object-cover transition-all duration-1000",
            "hover:scale-110 transform",
            !isDead && stage > 0 && "filter brightness-110 contrast-110 saturate-125"
          )}
          style={{
            filter: !isDead ? `hue-rotate(${stage * 15}deg) brightness(${1 + stage * 0.1})` : undefined
          }}
        />

        {/* VIP Particles Overlay */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-2 h-2 rounded-full animate-ping opacity-75"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              backgroundColor: particle.color,
              animation: 'sparkle 3s ease-out forwards'
            }}
          />
        ))}

        {/* VIP Border Effect */}
        <div className="absolute inset-0 border-4 border-transparent bg-gradient-to-r from-amber-400 via-rose-400 to-purple-400 rounded-3xl">
          <div className="w-full h-full bg-gradient-to-br from-background/90 to-background/70 rounded-2xl m-1" />
        </div>

        {/* Stage Indicator */}
        <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
          {isDead ? '💀' : `✨ ${stage + 1}/5`}
        </div>

        {/* VIP Crown for advanced stages */}
        {stage >= 3 && !isDead && (
          <div className="absolute top-2 left-2 text-2xl animate-bounce">
            👑
          </div>
        )}
      </div>

      {/* Stage Description */}
      <div className="text-center mt-4 space-y-2">
        <h3 className="text-lg font-bold text-foreground font-arabic">
          {isDead ? "الزهرة ذبلت 😢" : getStageMessage()}
        </h3>
        
        {!isDead && stage > 0 && (
          <div className="flex justify-center space-x-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-500",
                  i <= stage 
                    ? "bg-gradient-to-r from-amber-400 to-rose-400 shadow-lg animate-pulse" 
                    : "bg-gray-300 dark:bg-gray-700"
                )}
              />
            ))}
          </div>
        )}
      </div>

      {/* VIP Achievement Badge */}
      {stage === 4 && !isDead && (
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-xl animate-pulse">
          🏆 إنجاز ملكي
        </div>
      )}
    </div>
  );
};

// Add sparkle animation
const style = document.createElement('style');
style.textContent = `
  @keyframes sparkle {
    0% { 
      opacity: 1; 
      transform: scale(0) rotate(0deg); 
    }
    50% { 
      opacity: 1; 
      transform: scale(1) rotate(180deg); 
    }
    100% { 
      opacity: 0; 
      transform: scale(0) rotate(360deg); 
    }
  }
`;
document.head.appendChild(style);

export default VipRose;