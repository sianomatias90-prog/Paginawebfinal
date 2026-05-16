import { useEffect, useState } from 'react';
import { resolveImageUrl } from '../lib/productImages';

interface ResolvedImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
}

export default function ResolvedImage({ src, alt, className, loading = 'lazy' }: ResolvedImageProps) {
  const [resolved, setResolved] = useState('');

  useEffect(() => {
    let active = true;
    resolveImageUrl(src).then(url => {
      if (active) setResolved(url);
    });
    return () => {
      active = false;
    };
  }, [src]);

  if (!resolved) {
    return <div className={`bg-[#1a1a24] animate-pulse ${className ?? ''}`} aria-hidden />;
  }

  return <img src={resolved} alt={alt} className={className} loading={loading} />;
}
