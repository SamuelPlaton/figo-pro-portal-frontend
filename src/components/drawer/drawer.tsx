import { Icon } from '@/components';

interface DrawerProps {
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
}

export default function Drawer({ children, isOpen, onClose, className }: DrawerProps) {
  return (
    <div
      className={`fixed z-10 top-0 right-0 h-full w-screen bg-white shadow-lg transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } p-6`}
    >
      <div className="flex">
        <div className="bg-neutral-lowest rounded-full p-2 ml-auto">
          <Icon name="x" onClick={onClose} size={12} />
        </div>
      </div>
      <div className={className}>{children}</div>
    </div>
  );
}
