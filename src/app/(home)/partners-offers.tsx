'use client';

import { OfflineOverlay } from '@/app/(home)/index';

interface PartnersOffersProps {
  isAuthenticated: boolean;
}
export default function PartnersOffers({ isAuthenticated }: PartnersOffersProps) {
  return (
    <div id="partners-offers">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-8 gap-4">
        <h2 className="flex-grow">Offres réservées aux partenaires</h2>
      </div>
      <div className="relative">
        {!isAuthenticated && (
          <OfflineOverlay label="profiter des avantages réservées aux partenaires" />
        )}
        <div className="w-full bg-cream-light p-8 rounded-4xl h-[300px]" />
      </div>
    </div>
  );
}
