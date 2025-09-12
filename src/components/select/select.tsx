'use client';

import clsx from 'clsx';
import React, { ChangeEvent, useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

export interface SelectOption {
  label: string;
  value: string;
}
interface SelectProps {
  options: SelectOption[];
  onChange: (event: ChangeEvent) => void;
  disabled?: boolean;
  name: string;
  label?: string;
  error?: string;
  className?: string;
}
export default function Select({
  options,
  onChange,
  disabled,
  name,
  label,
  error,
  className,
  ...props
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const classNames = clsx(
    'appearance-none border border-gray rounded-2xl px-3 py-3.5 pr-8 w-full',
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
  const handleChange = (event: ChangeEvent) => {
    setIsOpen(false);
    onChange(event);
  };
  const parentClassName = clsx('w-max-content', className);

  return (
    <div className={parentClassName}>
      {label && (
        <label htmlFor={name} className={labelClassNames}>
          {label}
        </label>
      )}
      <div className="relative">
        <select
          className={classNames}
          onChange={e => handleChange(e)}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setIsOpen(false)}
          {...props}
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {/* Chevron custom */}
        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
          {isOpen ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
        </div>
      </div>
    </div>
  );
}
