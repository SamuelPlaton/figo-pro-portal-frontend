'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface DrawerContextType {
  openDrawer: (id: string) => void;
  closeDrawer: (id: string) => void;
  isDrawerOpen: (id: string) => boolean;
}

const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

export function DrawerProvider({ children }: { children: ReactNode }) {
  const [openDrawers, setOpenDrawers] = useState<Record<string, boolean>>({});
  const pathname = usePathname();

  const openDrawer = (id: string) => {
    setOpenDrawers(prev => ({ ...prev, [id]: true }));
  };

  const closeDrawer = (id: string) => {
    setOpenDrawers(prev => ({ ...prev, [id]: false }));
  };

  const isDrawerOpen = (id: string) => openDrawers[id];

  // Fermer tous les drawers au changement de page
  useEffect(() => {
    setOpenDrawers({});
  }, [pathname]);

  return (
    <DrawerContext.Provider value={{ openDrawer, closeDrawer, isDrawerOpen }}>
      {children}
    </DrawerContext.Provider>
  );
}

export function useDrawer() {
  const ctx = useContext(DrawerContext);
  if (!ctx) throw new Error('useDrawer must be used within a DrawerProvider');
  return ctx;
}
