import { useEffect, useState } from 'react';
import { resolveImageUrl } from './productImages';

export function useValidImages(urls: string[]): string[] {
  const key = urls.join('|');
  const [valid, setValid] = useState<string[]>(() => (urls.length ? [urls[0]] : []));

  useEffect(() => {
    if (!urls.length) {
      setValid([]);
      return;
    }

    let cancelled = false;

    (async () => {
      const loaded: string[] = [];
      for (const url of urls) {
        const src = await resolveImageUrl(url);
        if (!src) continue;
        await new Promise<void>(resolve => {
          const img = new Image();
          img.onload = () => {
            loaded.push(src);
            resolve();
          };
          img.onerror = () => resolve();
          img.src = src;
        });
      }
      if (!cancelled) {
        const fallback = await resolveImageUrl(urls[0]);
        setValid(loaded.length > 0 ? loaded : fallback ? [fallback] : []);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [key]);

  return valid;
}
