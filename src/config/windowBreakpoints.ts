export type Breakpoint = 'laptop' | 'tablet' | 'mobile' | 'mobile_s';

export const BREAKPOINTS = {
  laptop: 1440,
  tablet: 1023,
  mobile: 767,
  mobile_s: 480,
} satisfies Record<Breakpoint, number>;
