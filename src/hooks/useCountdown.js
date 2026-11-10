import { useEffect, useState } from 'react';

const calc = (target) => {
  const diff = Math.max(0, target - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    done: diff === 0,
  };
};

export function useCountdown(isoTarget) {
  const target = new Date(isoTarget).getTime();
  const [left, setLeft] = useState(() => calc(target));

  useEffect(() => {
    const id = setInterval(() => setLeft(calc(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  return left;
}
