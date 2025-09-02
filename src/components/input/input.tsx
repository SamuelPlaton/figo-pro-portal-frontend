import clsx from 'clsx';
import React from 'react';

interface InputProps {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  type?: string;
  autoComplete?: string;
  error?: string;
  className?: string;
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
  ...props
}: InputProps) {
  const classNames = clsx(
    'border border-gray rounded-2xl px-3 py-3.5 w-full',
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

  return (
    <div className={className}>
      {label && (
        <label htmlFor={name} className={labelClassNames}>
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        className={classNames}
        placeholder={placeholder}
        required={required}
        type={type}
        autoComplete={disabled ? 'off' : autoComplete}
        disabled={disabled}
        {...props}
      />
    </div>
  );
}
