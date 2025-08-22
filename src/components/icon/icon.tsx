import React from 'react';
import Image from 'next/image';
import BurgerMenuIcon from '@/components/icon/icons/burger-menu.svg';
import ExternalLinkIcon from '@/components/icon/icons/external-link.svg';

export type IconName = 'externalLink' | 'burgerMenu'; // liste de tous tes icônes

interface IconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  name: IconName;
  size?: number;
  color?: string;
}

const icons: Record<IconName, { src: string }> = {
  burgerMenu: BurgerMenuIcon,
  externalLink: ExternalLinkIcon,
};

export default function Icon({ name, size = 24, ...props }: IconProps) {
  const icon = icons[name];
  if (!icon) return null;
  // @ts-expect-error avoid TS type error on props
  return <Image src={icon.src} width={size} height={size} alt={name} {...props} />;
}
