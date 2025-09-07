import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Play, Pause, Square, Settings } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface TimerProps {
  onTick: (secondsRemaining: number, totalSeconds: number) => void;
  onComplete: () => void;
  onAbandoned: () => void;
}

const Timer = ({ onTick, onComplete, onAbandoned }: TimerProps) => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && (minutes > 0 || seconds > 0)) {
      intervalRef.current = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
          onTick(minutes * 60 + seconds - 1, totalSeconds);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
          onTick((minutes - 1) * 60 + 59, totalSeconds);
        }
      }, 1000);
    } else if (isRunning && minutes === 0 && seconds === 0) {
      setIsRunning(false);
      onComplete();
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, minutes, seconds, onTick, onComplete, totalSeconds]);

  const startTimer = () => {
    if (!isRunning && (minutes > 0 || seconds > 0)) {
      setIsRunning(true);
      setTotalSeconds(minutes * 60 + seconds);
    }
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const stopTimer = () => {
    if (isRunning && (minutes < totalSeconds / 60 || seconds < totalSeconds % 60)) {
      onAbandoned();
    }
    setIsRunning(false);
    setMinutes(Math.floor(totalSeconds / 60));
    setSeconds(totalSeconds % 60);
  };

  const formatTime = (min: number, sec: number) => {
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = () => {
    const currentTotalSeconds = minutes * 60 + seconds;
    return ((totalSeconds - currentTotalSeconds) / totalSeconds) * 100;
  };

  return (
    <Card className="p-6 bg-card border-border shadow-garden">
      <div className="flex flex-col items-center space-y-6">
        {/* Timer Display */}
        <div className="relative">
          <div className="text-6xl font-bold text-foreground font-mono tracking-wider text-center">
            {formatTime(minutes, seconds)}
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4 w-64 h-3 bg-muted rounded-full overflow-hidden shadow-inner">
            <div 
              className="h-full bg-gradient-rose transition-all duration-1000 ease-out rounded-full shadow-glow"
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>
          
          {/* Progress percentage */}
          <div className="mt-2 text-center text-sm text-muted-foreground font-arabic">
            {Math.round(getProgressPercentage())}% مكتمل
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-4">
          {!isRunning ? (
              <Button
                onClick={startTimer}
                disabled={minutes === 0 && seconds === 0}
                className="bg-gradient-rose hover:bg-gradient-sunset text-white px-8 py-3 rounded-xl shadow-rose transition-all duration-300 hover:scale-105 font-arabic"
              >
                <Play className="w-5 h-5 mr-2" />
                ابدأ التركيز
              </Button>
          ) : (
            <Button
              onClick={pauseTimer}
              variant="outline"
              className="border-rose text-rose hover:bg-rose hover:text-white px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105 font-arabic"
            >
              <Pause className="w-5 h-5 mr-2" />
              توقف
            </Button>
          )}

          <Button
            onClick={stopTimer}
            variant="outline"
            className="border-destructive text-destructive hover:bg-destructive hover:text-white px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 font-arabic"
          >
            <Square className="w-4 h-4 mr-2" />
            إيقاف
          </Button>

          <Button
            onClick={() => setShowSettings(!showSettings)}
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground"
          >
            <Settings className="w-5 h-5" />
          </Button>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="w-full max-w-sm space-y-4 p-4 bg-muted/50 rounded-xl">
            <Label className="text-sm font-medium text-foreground">
              اضبط مدة التركيز
            </Label>
            <div className="flex items-center space-x-2">
              <div className="flex-1">
                <Label htmlFor="minutes" className="text-xs text-muted-foreground">
                  دقائق
                </Label>
                <Input
                  id="minutes"
                  type="number"
                  min="1"
                  max="120"
                  value={Math.floor(totalSeconds / 60)}
                  onChange={(e) => {
                    const newMinutes = parseInt(e.target.value) || 1;
                    setTotalSeconds(newMinutes * 60);
                    setMinutes(newMinutes);
                    setSeconds(0);
                  }}
                  disabled={isRunning}
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        )}

        {/* Warning Message */}
        {isRunning && (
          <div className="text-center text-sm text-muted-foreground bg-accent/20 p-4 rounded-lg border border-accent/30 animate-pulse-soft">
            <p className="font-medium text-accent-foreground font-arabic">
              🌸 لا تترك التطبيق وإلا ستذبل زهرتك الجميلة!
            </p>
            <p className="text-xs mt-1 font-arabic">
              ابق مركزاً واتركها تنمو بألوان زاهية
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default Timer;