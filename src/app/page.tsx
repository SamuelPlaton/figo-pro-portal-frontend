import {
  Breadcrumb,
  FigoAdvantagesSection,
  Hero,
  HowItWorksSection,
  FaqSection,
} from '@/components';

export default function Home() {
  return (
    <>
      <Hero businessName="Clinique vétérinaire Vétiroise" />
      <div className="root-spacing pr-0 pb-8">
        <Breadcrumb />
      </div>
      <div className="root-spacing flex flex-col gap-12">
        <HowItWorksSection />
        <FigoAdvantagesSection />
        <FaqSection />
      </div>
    </>
  );
}
