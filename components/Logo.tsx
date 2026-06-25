'use client';

import Image from 'next/image';

/** Your existing primary logo file — sizing only, no recreation */
const LOGO = {
  src: '/logo.png',
  width: 1248,
  height: 832,
} as const;

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero' | 'heroMobile';
  priority?: boolean;
}

const sizes: Record<NonNullable<LogoProps['size']>, string> = {
  sm: 'h-9 w-auto max-w-[140px]',
  md: 'h-11 w-auto max-w-[170px]',
  lg: 'h-12 w-auto max-w-[190px]',
  xl: 'h-14 w-auto max-w-[220px]',
  hero: 'w-[min(420px,38vw)] h-auto',
  heroMobile: 'w-full max-w-[300px] h-auto',
};

export default function Logo({
  className = '',
  size = 'md',
  priority = false,
}: LogoProps) {
  return (
    <Image
      src={LOGO.src}
      alt="Peculiar AI Labs"
      width={LOGO.width}
      height={LOGO.height}
      priority={priority}
      className={`shrink-0 object-contain ${sizes[size]} ${className}`}
    />
  );
}