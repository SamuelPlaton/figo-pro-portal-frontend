interface TabListItemProps {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}
export default function TabListItem({ label, onClick, isActive = false }: TabListItemProps) {
  const getTabClassNames = () => {
    return `cursor-pointer border-b-2 ${isActive ? 'text-neutral-low border-[#334155]' : 'border-b-transparent'}`;
  };

  return (
    <button type="button" onClick={onClick} className={getTabClassNames()} aria-selected={isActive}>
      {label}
    </button>
  );
}
