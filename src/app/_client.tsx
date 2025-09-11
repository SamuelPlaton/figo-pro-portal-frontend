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
import { useAuth } from '@/context';

export default function HomeCore() {
  const { isAuthenticated } = useAuth();

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
