import { useMediaQuery } from 'usehooks-ts';

import { BREAKPOINTS } from '@/config/windowBreakpoints';

type Breakpoint = keyof typeof BREAKPOINTS;

export function useIsBelowBreakpoint(breakpoint: Breakpoint): boolean {
  return useMediaQuery(`(max-width: ${BREAKPOINTS[breakpoint]}px)`, {
    defaultValue: false,
    initializeWithValue: true,
  });
}
