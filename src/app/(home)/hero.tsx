'use client';

import { PromoTrackingCard } from '@/app/(home)';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/context';

interface HeroProps {
  businessName: string;
}

export default function Hero({ businessName }: HeroProps) {
  const { user } = useAuth();
  const [promoCode, setPromoCode] = useState<string | null>();
  const searchParams = useSearchParams();

  useEffect(() => {
    const param = searchParams.get('promo');
    if (param) setPromoCode(param);

    if (user && user.promo_code && !param) {
      setPromoCode(user.promo_code);
    }
  }, [searchParams, user]);

  return (
    <div
      id="hero"
      className="bg-cream root-spacing flex flex-col items-center gap-4 pt-12 pb-8 mb-24"
    >
      <h2 className="w-full font-primary">{businessName}</h2>
      <span className="w-full text-primary text-lg">Bienvenue dans votre espace partenaire</span>
      {promoCode && <PromoTrackingCard className="-mb-24" promoCode={promoCode} />}
    </div>
  );
}
