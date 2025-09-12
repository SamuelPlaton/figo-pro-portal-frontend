'use client';

import clsx from 'clsx';
import React, { ChangeEvent, useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

export interface SelectOption {
  label: string;
  value: string;
}
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  label?: string;
  error?: string;
  className?: string;
}

export default React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, onChange, onBlur, name, label, error, className, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    const classNames = clsx(
      'appearance-none border border-gray rounded-2xl px-3 py-3.5 pr-8 w-full',
      { 'hover:border-neutral-low': !props.disabled },
      {
        'focus:border-neutral-low focus:shadow-[0_0_0_3px_#B3C1C5] focus:outline-none':
          !props.disabled,
      },
      { 'bg-neutral-lower': props.disabled },
      {
        'border-red-500 hover:border-red-400 focus:border-red-300 focus:shadow-[0_0_0_3px_#ffa2a2]':
          !!error,
      },
      { 'mt-1': label },
    );

    const labelClassNames = clsx('font-bold text-primary mb-2', {
      'text-[#94A3B8]': props.disabled,
    });

    return (
      <div className={clsx('w-max-content', className)}>
        {label && (
          <label htmlFor={name} className={labelClassNames}>
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            name={name}
            className={classNames}
            onChange={e => {
              onChange?.(e); // appelle le handler RHF si présent
              setIsOpen(false);
            }}
            onBlur={onBlur}
            onFocus={() => setIsOpen(true)}
            {...props}
          >
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            {isOpen ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
          </div>
        </div>
      </div>
    );
  },
);
