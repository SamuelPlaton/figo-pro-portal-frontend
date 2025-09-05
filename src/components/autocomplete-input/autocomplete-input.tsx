'use client';

import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components';

interface AutocompleteOption {
  value: string;
  label: string;
}

interface AutocompleteInputProps {
  onAutocomplete: (value: string) => void;
  onSelect: (value: string) => void;
  name: string;
  placeholder?: string;
  options?: AutocompleteOption[];
}

export default function AutocompleteInput({
  onAutocomplete,
  onSelect,
  name,
  placeholder,
  options = [],
}: AutocompleteInputProps) {
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Close list on outside click
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    setOpen(true);
    onAutocomplete(newValue);
  };

  const handleSelect = (option: AutocompleteOption) => {
    setValue(option.label);
    setOpen(false);
    onSelect(option.value);
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      <Input
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        autoComplete="off"
        appendIcon="searchLoop"
      />
      {open && options.length > 0 && (
        <ul className="absolute z-10 mt-1 w-full border border-gray rounded-lg bg-white shadow">
          {options.map(opt => (
            <li
              key={opt.value}
              className="p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelect(opt)}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
