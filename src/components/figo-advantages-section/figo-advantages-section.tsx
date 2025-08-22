import { Button } from '@/components';

export default function FigoAdvantagesSection() {
  return (
    <div id="advantages">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-8 gap-2">
        <h2>Les avantages Figo</h2>
        <Button
          label="En savoir plus"
          variant="ghost"
          size="lg"
          href="https://www.figo.fr/"
          target="_blank"
          appendIcon="externalLink"
        />
      </div>
      <div className="flex flex-col md:flex-row justify-between gap-4 md-h-[320px]">
        <div className="flex-1 rounded-2xl overflow-hidden">
          <img
            src="/assets/vet-illustration.png"
            alt="vet-illustration"
            className="w-full object-cover h-[200px] md:h-full"
          />
        </div>
        <div className="flex-1 bg-cyan rounded-xl p-6">
          <p className="font-semibold">Votre espace partenaire</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quasi.</p>
        </div>
        <div className="flex-1 bg-cream rounded-xl p-6">
          <p className="font-semibold">Votre espace partenaire</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quasi.</p>
        </div>
        <div className="flex-1 bg-primary text-white rounded-xl p-6">
          <p className="font-semibold">Votre espace partenaire</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quasi.</p>
        </div>
      </div>
    </div>
  );
}
