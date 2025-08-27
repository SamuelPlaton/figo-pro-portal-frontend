import type { Metadata } from 'next';
import '@/style/globals.css';
import { Footer, Header } from '@/components';

export const metadata: Metadata = {
  title: 'Figo - Portail vétérinaire',
  description: 'Figo - Portail vétérinaire',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
