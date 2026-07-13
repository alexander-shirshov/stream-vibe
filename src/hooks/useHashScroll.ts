import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { scrollToHash } from '@/utils/hashScroll';

export function useHashScroll(refreshKey?: unknown): void {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) return;

    return scrollToHash(hash);
  }, [pathname, hash, refreshKey]);
}
