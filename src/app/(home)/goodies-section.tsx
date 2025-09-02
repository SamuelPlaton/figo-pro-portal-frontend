'use client';
import { Button } from '@/components';
import { ROUTES } from '@/types';
import { OfflineOverlay, OrderHistoryDrawer } from '@/app/(home)/index';
import { useState } from 'react';

export default function GoodiesSection() {
  const [isOrderHistoryOpen, setIsOrderHistoryOpen] = useState(false);

  const isAuthenticated = false;
  return (
    <div id="goodies">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-8 gap-4">
        <h2 className="flex-grow">Nos Goodies Figo</h2>
        {isAuthenticated && (
          <div className="w-full md:w-auto flex flex-row gap-2 items-center justify-between">
            <span
              className="font-bold underline cursor-pointer"
              onClick={() => setIsOrderHistoryOpen(true)}
            >
              Voir l&#39;historique des commandes
            </span>
            <Button label="Commander" size="lg" href={ROUTES.ORDER} />
          </div>
        )}
      </div>
      <div className="relative flex flex-col md:flex-row justify-between gap-4 md-h-[320px]">
        {!isAuthenticated && (
          <OfflineOverlay label="commander gratuitement nos affiches, flyers et goodies" />
        )}
        <span>Todo</span>
      </div>
      <OrderHistoryDrawer
        onClose={() => setIsOrderHistoryOpen(false)}
        isOpen={isOrderHistoryOpen}
      />
    </div>
  );
}
