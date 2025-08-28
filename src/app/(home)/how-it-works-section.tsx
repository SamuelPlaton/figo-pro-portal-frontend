'use client';
import { useState } from 'react';
import { TabList } from '@/components';
import Image from 'next/image';

export default function HowItWorksSection() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const tabOptions = [{ label: 'Ambassadeur' }, { label: 'Filleul' }];
  const wording: string[][] = [
    [
      'Commandez gratuitement vos affiches, flyers, chevalets et goodies personnalisés',
      'Partagez simplement l’assurance santé animale dans votre clinique ou en ligne (SMS, email, QR code, lien personnalisé)',
      'Offrez à vos clients un accès facilité aux soins et contribuez au bien-être des animaux',
    ],
    [
      'Ils scannent votre QR code ou cliquent sur votre lien personnalisé',
      'Ils souscrivent en ligne en quelques clics et profitent de l’offre exclusive',
      'Ils bénéficient d’une assurance adaptée et d’un accès simplifié aux soins pour leur animal',
    ],
  ];
  const getStepDisplay = (index: number) => {
    return (
      <div className="flex flex-row md:flex-col gap-4 items-start md:items-center justify-start md:justify-center">
        <span className="rounded-full bg-primary w-14 h-14 p-4 text-white text-lg font-bold">
          0{index + 1}
        </span>
        <span className="md:text-center">{wording[activeTab][index]}</span>
      </div>
    );
  };
  return (
    <div id="how-it-works">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-8 gap-2">
        <h2>Comment ca marche ?</h2>
        <TabList options={tabOptions} onChange={setActiveTab} />
      </div>
      <div className="flex flex-col items-start md:flex-row gap-2 md:gap-4 h-[240px] md:h-[280px] lg:h-[240px] xl:h-[200px]">
        <div className="flex-1">{getStepDisplay(0)}</div>
        <Image
          src="/assets/curved-arrow.png"
          alt="arrow"
          width={64}
          height={64}
          className="hidden md:block pt-12"
        />
        <div className="flex-1">{getStepDisplay(1)}</div>
        <Image
          src="/assets/curved-arrow.png"
          alt="arrow"
          width={64}
          height={64}
          className="-scale-y-100 hidden md:block pb-12"
        />
        <div className="flex-1">{getStepDisplay(2)}</div>
      </div>
    </div>
  );
}
