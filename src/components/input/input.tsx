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
}

export default function Input({
  name,
  label,
  placeholder,
  required = false,
  disabled = false,
  type = 'text',
  autoComplete = 'off',
  ...props
}: InputProps) {
  const getFormattedPlaceholder = () => {
    if (required && placeholder && placeholder.length > 0) {
      return `${placeholder}*`;
    }
    return placeholder;
  };

  const classNames = clsx(
    'border border-gray rounded-2xl px-3 py-3.5 w-full',
    { 'hover:border-neutral-low': !disabled },
    { 'focus:border-neutral-low focus:shadow-[0_0_0_3px_#B3C1C5] focus:outline-none': !disabled },
    { 'bg-neutral-lower': disabled },
    { 'mt-1': label },
  );

  const labelClassNames = clsx('font-bold mb-2', { 'text-[#94A3B8]': disabled });

  return (
    <div>
      {label && (
        <label htmlFor={name} className={labelClassNames}>
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        className={classNames}
        placeholder={getFormattedPlaceholder()}
        required={required}
        type={type}
        autoComplete={disabled ? 'off' : autoComplete}
        disabled={disabled}
        {...props}
      />
    </div>
  );
}
