import React from 'react';
import { ROUTES } from '@/types';
import { Button } from '@/components';
import Head from 'next/head';

const NotFoundPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Figo – 404</title>
        <meta name="description" content="Page non trouvée" />
      </Head>
      <div className="my-16 flex flex-col items-center gap-16 text-center">
        <h1 className="mb-4 text-6xl font-semibold text-primary">ERREUR 404</h1>
        <h2 className="text-xl font-medium">La page que vous recherchez n&#39;existe pas.</h2>
        <Button href={ROUTES.HOME} size="lg" label="Accueil" />
      </div>
    </>
  );
};

export default NotFoundPage;
