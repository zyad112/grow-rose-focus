import { useEffect, useRef } from 'react';

export const usePerformance = (componentName: string) => {
  const renderStart = useRef(performance.now());
  const mountTime = useRef<number | null>(null);

  useEffect(() => {
    // Component mounted
    mountTime.current = performance.now();
    const mountDuration = mountTime.current - renderStart.current;
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`${componentName} mounted in ${mountDuration.toFixed(2)}ms`);
    }

    return () => {
      // Component unmounted
      const unmountTime = performance.now();
      const lifetimeDuration = unmountTime - (mountTime.current || renderStart.current);
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`${componentName} lived for ${lifetimeDuration.toFixed(2)}ms`);
      }
    };
  }, [componentName]);

  const logRender = () => {
    const renderEnd = performance.now();
    const renderDuration = renderEnd - renderStart.current;
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`${componentName} rendered in ${renderDuration.toFixed(2)}ms`);
    }
    
    renderStart.current = performance.now();
  };

  useEffect(() => {
    logRender();
  });

  return { logRender };
};