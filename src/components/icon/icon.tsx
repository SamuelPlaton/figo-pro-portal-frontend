import React from 'react';
import ArrowLeftIcon from '@/components/icon/icons/arrow-left';
import ArrowRightIcon from '@/components/icon/icons/arrow-right.svg';
import BurgerMenuIcon from '@/components/icon/icons/burger-menu.svg';
import CheckIcon from '@/components/icon/icons/check';
import ClockIcon from '@/components/icon/icons/clock';
import ExternalLinkIcon from '@/components/icon/icons/external-link.svg';
import FigoCheckIcon from '@/components/icon/icons/figo-check.svg';
import FigoCoinIcon from '@/components/icon/icons/figo-coin.svg';
import PlusIcon from '@/components/icon/icons/plus.svg';
import ShoppingCartIcon from '@/components/icon/icons/shopping-cart';
import XIcon from '@/components/icon/icons/x';

export type IconName =
  | 'arrowLeft'
  | 'arrowRight'
  | 'burgerMenu'
  | 'check'
  | 'clock'
  | 'externalLink'
  | 'figoCheck'
  | 'figoCoin'
  | 'plus'
  | 'shoppingCart'
  | 'x';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number;
  color?: string;
}

const icons: Record<IconName, React.FC<IconProps>> = {
  arrowLeft: ArrowLeftIcon,
  arrowRight: ArrowRightIcon,
  burgerMenu: BurgerMenuIcon,
  check: CheckIcon,
  clock: ClockIcon,
  externalLink: ExternalLinkIcon,
  figoCheck: FigoCheckIcon,
  figoCoin: FigoCoinIcon,
  plus: PlusIcon,
  shoppingCart: ShoppingCartIcon,
  x: XIcon,
};

export default function Icon({ name, size = 24, color = 'currentColor', ...props }: IconProps) {
  const SvgIcon = icons[name];
  if (!SvgIcon) return null;
  return (
    <SvgIcon
      name={name}
      size={size}
      width={size}
      height={size}
      color={color}
      fill={color}
      {...props}
    />
  );
}
