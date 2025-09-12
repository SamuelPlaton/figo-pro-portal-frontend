'use client';

import clsx from 'clsx';
import { Button } from '@/components';
import { useToast, useDrawer, useAuth } from '@/context';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

interface PromoTrackingCardProps {
  className?: string;
  promoCode: string;
}

export default function PromoTrackingCard({ className, promoCode }: PromoTrackingCardProps) {
  const { addToast } = useToast();
  const { openDrawer } = useDrawer();

  const handleCopy = async () => {
    await navigator.clipboard.writeText('https://' + getPromoLink());
    addToast('Lien copié dans le presse-papier', 'success');
  };

  const getPromoLink = () => {
    return `www.figo.fr/${promoCode}`;
  };

  const containerClassNames = clsx(
    'bg-white shadow-lg rounded-xl p-8 flex flex-row items-center justify-center w-fit',
    className,
  );
  return (
    <div className={containerClassNames}>
      {/* Promo code share section */}
      <div>
        <span className="text-primary font-semibold">Votre lien unique</span>
        <div className="rounded-2xl border border-gray flex flex-row justify-between gap-4 items-center p-3 mt-1">
          <span>{getPromoLink()}</span>
          <button className="underline cursor-pointer" onClick={handleCopy}>
            Copier
          </button>
        </div>
        <Button
          label={'Partager'}
          onClick={() => openDrawer('link-sharing')}
          className="mt-2 w-full"
          size="lg"
        />
      </div>
    </div>
  );
}
