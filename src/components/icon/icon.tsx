import React from 'react';
import ArrowLeftIcon from '@/components/icon/icons/arrow-left.svg';
import ArrowRightIcon from '@/components/icon/icons/arrow-right.svg';
import BurgerMenuIcon from '@/components/icon/icons/burger-menu.svg';
import ExternalLinkIcon from '@/components/icon/icons/external-link.svg';
import FigoCheckIcon from '@/components/icon/icons/figo-check.svg';

export type IconName = 'arrowLeft' | 'arrowRight' | 'externalLink' | 'burgerMenu' | 'figoCheck';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number;
  color?: string;
}

const icons: Record<IconName, React.FC<React.SVGProps<SVGSVGElement>>> = {
  arrowLeft: ArrowLeftIcon,
  arrowRight: ArrowRightIcon,
  burgerMenu: BurgerMenuIcon,
  externalLink: ExternalLinkIcon,
  figoCheck: FigoCheckIcon,
};

export default function Icon({ name, size = 24, color = 'currentColor', ...props }: IconProps) {
  const SvgIcon = icons[name];
  if (!SvgIcon) return null;

  return <SvgIcon width={size} height={size} fill={color} {...props} />;
}
