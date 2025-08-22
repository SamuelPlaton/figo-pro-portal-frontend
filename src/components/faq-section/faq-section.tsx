'use client';

import { useState } from 'react';
import { Collapsible, TabList } from '@/components';

export default function FaqSection() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const tabOptions = [{ label: 'Ambassadeur' }, { label: 'Filleul' }];
  const questions = [
    [
      {
        label: 'Comment créer mon compte en tant que vétérinaire ou ASV ?',
        content: <span>Answer here</span>,
      },
      {
        label: 'Comment partager mon lien personnalisé ou QR code ?',
        content: <span>Answer here</span>,
      },
      {
        label: 'Que gagne mon établissement si mes clients souscrivent via mon lien ?',
        content: <span>Answer here</span>,
      },
    ],
    [
      {
        label:
          'Comment les propriétaires d’animaux peuvent-ils souscrire via mon QR code ou mon lien personnalisé ?',
        content: <span>Answer here</span>,
      },
      {
        label: 'Quels avantages promotionnels reçoivent-ils en passant par mon parrainage ?',
        content: <span>Answer here</span>,
      },
      {
        label:
          'Les propriétaires d’animaux peuvent-ils assurer plusieurs animaux via ce processus ?',
        content: <span>Answer here</span>,
      },
    ],
  ];
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-8 gap-2">
        <h2>Toutes les questions que vous vous posez</h2>
        <TabList options={tabOptions} onChange={setActiveTab} />
      </div>
      <div>
        {questions[activeTab].map(({ label, content }, index) => (
          <Collapsible key={index} label={label} className="py-4 border-b border-bd-low">
            {content}
          </Collapsible>
        ))}
      </div>
    </div>
  );
}
