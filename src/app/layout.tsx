import type { Metadata } from 'next';
import '@/style/globals.css';
import { Footer, Header } from '@/components';
import { AuthProvider, ToastProvider } from '@/context';
import { DrawerProvider } from '@/context/drawer-context';
import { LinkSharingDrawer } from '@/app/(home)';

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
          <AuthProvider>
            <DrawerProvider>
              <Header />
              <main className="flex-grow">{children}</main>
              <LinkSharingDrawer />
              <Footer />
            </DrawerProvider>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
