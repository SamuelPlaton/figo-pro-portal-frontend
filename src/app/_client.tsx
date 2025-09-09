'use client';

import {
  HomeBreadcrumb,
  FigoAdvantagesSection,
  GoodiesSection,
  Hero,
  HowItWorksSection,
  FaqSection,
  PartnersOffers,
} from '@/app/(home)';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Loader } from '@/components';

export default function HomeCore() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>();

  useEffect(() => {
    const getIsAuthenticated = () => {
      return api.auth
        .isConnected()
        .then(response => setIsAuthenticated(response))
        .catch(() => setIsAuthenticated(false));
    };
    getIsAuthenticated();
  }, []);

  if (isAuthenticated === undefined) {
    return <Loader />;
  }

  return (
    <>
      <Hero businessName="Clinique vétérinaire Vétiroise" />
      <div className="root-spacing pr-0 pb-8">
        <HomeBreadcrumb />
      </div>
      <div className="root-spacing flex flex-col gap-12">
        <PartnersOffers isAuthenticated={isAuthenticated} />
        <GoodiesSection isAuthenticated={isAuthenticated} />
        <HowItWorksSection />
        <FigoAdvantagesSection />
        <FaqSection />
      </div>
    </>
  );
}
