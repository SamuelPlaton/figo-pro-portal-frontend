'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { IconName } from '@/components/icon/icon';
import { Icon, Spinner } from '@/components';

export interface ButtonProps {
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  variant?: 'outline' | 'primary' | 'ghost';
  appendIcon?: IconName;
  prependIcon?: IconName;
  href?: string;
  target?: string;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  loading?: boolean;
}
export default function Button({
  label,
  size = 'md',
  onClick,
  variant = 'primary',
  appendIcon,
  prependIcon,
  href,
  target,
  className,
  type = 'button',
  disabled = false,
  loading = false,
}: ButtonProps) {
  const classNames = clsx(
    [buttonClassNames.global],
    [buttonClassNames.sizes[size]],
    [buttonClassNames.variants[variant]],
    { 'border-neutral-lower! bg-neutral-lower! text-gray! cursor-default!': disabled },
    className,
  );

  const imageSizes = {
    sm: 20,
    md: 20,
    lg: 24,
  };

  const content = loading ? (
    <Spinner />
  ) : (
    <>
      {prependIcon && <Icon name={prependIcon} size={imageSizes[size]} />}
      {label && <span>{label}</span>}
      {appendIcon && <Icon name={appendIcon} size={imageSizes[size]} />}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classNames} target={target}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classNames} disabled={disabled || loading}>
      {content}
    </button>
  );
}

const buttonClassNames = {
  global:
    'rounded-full font-bold flex flex-row justify-center items-center gap-2 cursor-pointer min-h-6',
  sizes: {
    sm: 'px-4 py-2 min-h-[40px]',
    md: 'px-4 py-2.5 min-h-[44px]',
    lg: 'px-6 py-3 min-h-[48px]',
  },
  variants: {
    primary: 'bg-primary text-white',
    outline: 'text-primary bg-white border border-gray',
    ghost: 'text-primary bg-transparent p-0!',
  },
};
