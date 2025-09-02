import type { Metadata } from 'next';
import '@/style/globals.css';
import { Footer, Header } from '@/components';
import { ToastProvider } from '@/context/toast-context';

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
        <ToastProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
