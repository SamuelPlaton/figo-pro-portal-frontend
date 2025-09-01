import {
  HomeBreadcrumb,
  FigoAdvantagesSection,
  GoodiesSection,
  Hero,
  HowItWorksSection,
  FaqSection,
} from '@/app/(home)';

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
