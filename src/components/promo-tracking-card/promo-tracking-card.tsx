'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { Button } from '@/components';

interface PromoTrackingCardProps {
  promoCode: string;
  className?: string;
}

export default function PromoTrackingCard({ promoCode, className }: PromoTrackingCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText('https://' + getPromoLink());
    setCopied(true);
    setTimeout(() => setCopied(false), 200);
  };

  const getPromoLink = () => {
    return `www.figo.fr/${promoCode}`;
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Mon super site',
          text: 'Viens voir ce site, il est génial !',
          url: 'https://' + getPromoLink(),
        });
      } catch (err) {
        console.log('Sharing failed', err);
      }
    } else {
      alert("Le partage n'est pas supporté par votre navigateur.");
    }
  };

  const containerClassNames = clsx(
    'bg-white shadow-lg rounded-xl p-8 flex flex-row items-center justify-center w-fit',
    className,
  );
  return (
    <div className={containerClassNames}>
      {/* Promo code share section */}
      <div className="">
        <span className="text-primary font-semibold">Votre lien unique</span>
        <div className="rounded-2xl border border-gray flex flex-row justify-between gap-4 items-center p-3 mt-1">
          <span>{getPromoLink()}</span>
          <button
            className={`underline cursor-pointer ${copied ? 'font-semibold' : ''}`}
            onClick={handleCopy}
          >
            Copier
          </button>
        </div>
        <Button label={'Partager'} onClick={handleShare} className="mt-2 w-full" size="lg" />
      </div>
    </div>
  );
}
