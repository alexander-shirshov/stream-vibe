import type { DeviceCardProps } from '@/components/DeviceCard/DeviceCard';
import Phone from '@/assets/icons/devices/phone.svg?react';
import Console from '@/assets/icons/devices/console.svg?react';
import Laptop from '@/assets/icons/devices/laptop.svg?react';
import Tablet from '@/assets/icons/devices/tablet.svg?react';
import Tv from '@/assets/icons/devices/tv.svg?react';
import Vr from '@/assets/icons/devices/vr.svg?react';

export const deviceItems: DeviceCardProps[] = [
  {
    device: 'smartphone',
    icon: Phone,
  },
  {
    device: 'console',
    icon: Console,
  },
  {
    device: 'laptop',
    icon: Laptop,
  },
  {
    device: 'tablet',
    icon: Tablet,
  },
  {
    device: 'tv',
    icon: Tv,
  },
  {
    device: 'vr',
    icon: Vr,
  },
];
