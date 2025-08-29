import { PromoTrackingCard } from '@/app/(home)';

interface HeroProps {
  businessName: string;
}

export default function Hero({ businessName }: HeroProps) {
  return (
    <div
      id="hero"
      className="bg-cream root-spacing flex flex-col items-center gap-4 pt-12 pb-8 mb-24"
    >
      <h2 className="w-full font-primary">{businessName}</h2>
      <span className="w-full text-primary text-lg">Bienvenue dans votre espace partenaire</span>
      <PromoTrackingCard promoCode="123456789" className="-mb-24" />
    </div>
  );
}
