import clsx from 'clsx';
import React from 'react';
import { IconName } from '@/components/icon/icon';
import { Icon } from '@/components';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  type?: string;
  autoComplete?: string;
  error?: string;
  className?: string;
  appendIcon?: IconName;
}

export default function Input({
  name,
  label,
  placeholder,
  required = false,
  disabled = false,
  type = 'text',
  autoComplete = 'off',
  error,
  className,
  appendIcon,
  ...props
}: InputProps) {
  const [controlledType, setControlledType] = React.useState(type);

  const classNames = clsx(
    'border border-gray rounded-2xl px-3 py-3.5 w-full',
    { 'pl-10': appendIcon },
    { 'pr-10': type === 'password' },
    { 'hover:border-neutral-low': !disabled },
    { 'focus:border-neutral-low focus:shadow-[0_0_0_3px_#B3C1C5] focus:outline-none': !disabled },
    { 'bg-neutral-lower': disabled },
    {
      'border-red-500 hover:border-red-400 focus:border-red-300 focus:shadow-[0_0_0_3px_#ffa2a2]':
        !!error,
    },
    { 'mt-1': label },
  );

  const labelClassNames = clsx('font-bold text-primary mb-2', { 'text-[#94A3B8]': disabled });
  const parentClassNames = clsx('relative pb-2', className);

  return (
    <div className={parentClassNames}>
      {label && (
        <label htmlFor={name} className={labelClassNames}>
          {label}
        </label>
      )}
      <div className="relative">
        {appendIcon && (
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
            <Icon name={appendIcon} className="w-5 h-5" />
          </span>
        )}
        <input
          id={name}
          name={name}
          className={classNames}
          placeholder={placeholder}
          required={required}
          type={controlledType}
          autoComplete={disabled ? 'off' : autoComplete}
          disabled={disabled}
          {...props}
        />
        {type === 'password' && (
          <span
            className="absolute inset-y-0 right-3 flex items-center text-gray-400 cursor-pointer"
            onClick={() => setControlledType(controlledType === 'password' ? 'text' : 'password')}
          >
            <Icon
              name={controlledType === 'password' ? 'eye' : 'eyeOff'}
              color="#01313D"
              size={20}
            />
          </span>
        )}
      </div>
      <div className="text-red-500 text-sm flex flex-row items-center gap-2 mt-1 absolute left-0 -bottom-3">
        {error && (
          <>
            <Icon name={'alertTriangle'} size={14} />
            <span>{error}</span>
          </>
        )}
      </div>
    </div>
  );
}
