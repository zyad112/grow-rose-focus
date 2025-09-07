import { useEffect, useState } from 'react';
import stage0 from '@/assets/rose-stage-0.jpg';
import stage1 from '@/assets/rose-stage-1.jpg';
import stage2 from '@/assets/rose-stage-2.jpg';
import stage3 from '@/assets/rose-stage-3.jpg';
import stage4 from '@/assets/rose-stage-4.jpg';
import roseDead from '@/assets/rose-dead.jpg';

interface RoseProps {
  stage: number;
  isDead: boolean;
  isGrowing: boolean;
}

const Rose = ({ stage, isDead, isGrowing }: RoseProps) => {
  const [showTransition, setShowTransition] = useState(false);

  const roseImages = [stage0, stage1, stage2, stage3, stage4];
  const currentImage = isDead ? roseDead : roseImages[Math.min(stage, 4)];

  useEffect(() => {
    if (isGrowing && stage > 0) {
      setShowTransition(true);
      const timer = setTimeout(() => setShowTransition(false), 800);
      return () => clearTimeout(timer);
    }
  }, [isGrowing, stage]);

  const getStageMessage = () => {
    if (isDead) return "الوردة ذبلت... ابدأ من جديد 🥀";
    
    switch (stage) {
      case 0: return "ازرع بذرة التركيز 🌱";
      case 1: return "البراعم تنمو! 🌿";
      case 2: return "الأوراق تكبر 🍃";
      case 3: return "البرعم يتفتح 🌹";
      case 4: return "وردتك مزهرة! أحسنت 🌹✨";
      default: return "ازرع بذرة التركيز";
    }
  };

  const getProgressPercentage = () => {
    if (isDead) return 0;
    return Math.min((stage / 4) * 100, 100);
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Rose Container */}
      <div className="relative">
        <div className={`
          w-80 h-60 rounded-2xl overflow-hidden shadow-rose bg-gradient-garden
          transition-all duration-700 ease-out
          ${isDead ? 'animate-wither grayscale' : ''}
          ${showTransition ? 'animate-grow' : ''}
          ${stage === 4 && !isDead ? 'animate-bloom shadow-glow' : ''}
        `}>
          <img
            src={currentImage}
            alt={`Rose stage ${stage}`}
            className="w-full h-full object-cover transition-all duration-500"
          />
          
          {/* Magical particles effect for blooming */}
          {stage === 4 && !isDead && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-4 left-4 w-2 h-2 bg-golden rounded-full animate-float opacity-70"></div>
              <div className="absolute top-8 right-6 w-1 h-1 bg-golden-light rounded-full animate-pulse-soft"></div>
              <div className="absolute bottom-6 left-8 w-1.5 h-1.5 bg-rose rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
            </div>
          )}
        </div>

        {/* Progress Ring */}
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
          <div className="relative w-12 h-12">
            <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="hsl(var(--muted))"
                strokeWidth="2"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="hsl(var(--rose-pink))"
                strokeWidth="2"
                strokeDasharray={`${getProgressPercentage()}, 100`}
                className="transition-all duration-700 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-semibold text-foreground">
                {Math.round(getProgressPercentage())}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stage Message */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2 animate-pulse-soft">
          {getStageMessage()}
        </h2>
        <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
          <span>المرحلة {stage + 1} من 5</span>
        </div>
      </div>
    </div>
  );
};

export default Rose;