import {
  HomeBreadcrumb,
  FigoAdvantagesSection,
  GoodiesSection,
  Hero,
  HowItWorksSection,
  FaqSection,
} from '@/app/(home)';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Figo - Portail vétérinaire',
  description: 'Accédez à votre portail professionnel',
};

export default function Home() {
  return (
    <>
      <Hero businessName="Clinique vétérinaire Vétiroise" />
      <div className="root-spacing pr-0 pb-8">
        <HomeBreadcrumb />
      </div>
      <div className="root-spacing flex flex-col gap-12">
        <GoodiesSection />
        <HowItWorksSection />
        <FigoAdvantagesSection />
        <FaqSection />
      </div>
    </>
  );
}
