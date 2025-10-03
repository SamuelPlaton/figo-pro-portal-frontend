import type { Metadata } from 'next';

import '@/style/globals.css';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Footer, Header } from '@/components';
import { AuthProvider, ToastProvider } from '@/context';
import { DrawerProvider } from '@/context/drawer-context';
import { LinkSharingDrawer } from '@/app/(home)';
import { OnboardingGuard } from '@/guards';

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
              <OnboardingGuard>
                <Header />
                <main className="flex-grow">{children}</main>
                <LinkSharingDrawer />
                <Footer />
              </OnboardingGuard>
            </DrawerProvider>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
