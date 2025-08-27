'use client';
import { usePathname } from 'next/navigation';
import { ROUTES } from '@/types';

export default function Footer() {
  const pathname = usePathname();

  const isAuthenticationRoute = [ROUTES.SIGNIN, ROUTES.SIGNUP].includes(pathname as ROUTES);
  const noFooterRoutes = [ROUTES.ORDER, ROUTES.CHECKOUT];
  if (noFooterRoutes.includes(pathname as ROUTES)) return null;

  const vanillaFooter = (
    <footer className="w-full text-center pb-8 pt-10 lg:pb-16 lg:pt-20 text-neutral-low">
      <span>© 2025 Figo partenaire 1Health. Tous droits réservés.</span>
    </footer>
  );
  const authenticationFooterArgs = [
    { title: "500 crédits Figo offerts dès l'inscription", description: 'Lorem Ipsum' },
    { title: "500 crédits Figo offerts dès l'inscription", description: 'Lorem Ipsum' },
    { title: "500 crédits Figo offerts dès l'inscription", description: 'Lorem Ipsum' },
    { title: "500 crédits Figo offerts dès l'inscription", description: 'Lorem Ipsum' },
  ];
  const authenticationFooter = (
    <footer className="w-full bg-cream py-10 px-20 flex flex-row gap-4 justify-between">
      {authenticationFooterArgs.map(({ title, description }, key) => (
        <div className="flex flex-col gap-2" key={key}>
          <span className="text-lg font-bold text-primary">{title}</span>
          <span className="text-neutral-low">{description}</span>
        </div>
      ))}
    </footer>
  );
  return isAuthenticationRoute ? authenticationFooter : vanillaFooter;
}
