'use client';
import { useState } from 'react';
import { TabListItem } from '@/components';

interface TabOption {
  label: string;
  value?: string;
}
interface TabListProps {
  options: TabOption[];
  controlActiveTab?: number;
  onChange: (value: number) => void;
}

export default function TabList({ options, onChange, controlActiveTab }: TabListProps) {
  const [activeTab, setActiveTab] = useState<number>(controlActiveTab ?? 0);

  const handleChange = (index: number) => {
    if (!controlActiveTab) {
      setActiveTab(index);
    }
    onChange(index);
  };

  return (
    <div className="flex flex-row items-center gap-4">
      {options.map(({ label }, index) => (
        <TabListItem
          key={index}
          label={label}
          onClick={() => handleChange(index)}
          isActive={activeTab === index}
        />
      ))}
    </div>
  );
}
