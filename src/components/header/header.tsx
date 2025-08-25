'use client';

import Image from 'next/image';
import { Button, MobileNavigation } from '@/components';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/types';

export default function Header() {
  const router = useRouter();

  return (
    <div className="flex flex-row justify-between m-4 md:mx-20 md:my-6">
      <div
        className="flex flex-row items-center gap-2 cursor-pointer"
        onClick={() => router.push(ROUTES.HOME)}
      >
        <Image
          src="/assets/figo-short-logo.svg"
          alt="figo-logo"
          width={34}
          height={40}
          className="md:hidden"
        />
        <Image
          src="/assets/figo-logo.svg"
          alt="figo-logo"
          width={77}
          height={31}
          className="hidden md:block"
        />
        <span className="text-sm md:text-md">en partenariat avec</span>
        <Image src="/assets/1health-logo.svg" alt="1health-logo" width={83} height={21} />
      </div>
      {/* Desktop/Tablet navigation */}
      <div className="flex-row gap-6 hidden md:flex">
        <Button
          size="sm"
          variant="outline"
          onClick={() => console.log('contact')}
          label="Nous contacter"
        />
        <Button size="sm" variant="primary" onClick={() => console.log('share')} label="Partager" />
      </div>
      {/* Mobile navigation */}
      <MobileNavigation />
    </div>
  );
}
