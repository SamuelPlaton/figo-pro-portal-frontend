'use client';
import { Button, Loader } from '@/components';
import { Product, ROUTES } from '@/types';
import { OfflineOverlay, OrderHistoryDrawer } from '@/app/(home)/index';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import Link from 'next/link';
import { FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface GoodiesSectionProps {
  isAuthenticated: boolean;
}
export default function GoodiesSection({ isAuthenticated }: GoodiesSectionProps) {
  const [isOrderHistoryOpen, setIsOrderHistoryOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>();

  useEffect(() => {
    if (isAuthenticated) {
      api.products.getProducts().then(response => setProducts(response.data));
    }
  }, [isAuthenticated]);

  const breakpoints = {
    0: { spaceBetween: 16, slidesPerView: 1.2 },
    700: { spaceBetween: 16, slidesPerView: 2.1 },
    1050: { spaceBetween: 16, slidesPerView: 3.1 },
  };

  return (
    <div id="goodies">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-8 gap-4">
        <h2 className="flex-grow">Nos Goodies Figo</h2>
        {isAuthenticated && (
          <div className="w-full md:w-auto flex flex-row gap-6 items-center justify-between">
            <span
              className="font-bold underline cursor-pointer"
              onClick={() => setIsOrderHistoryOpen(true)}
            >
              Voir l&#39;historique des commandes
            </span>
            <Button label="Commander" size="lg" href={ROUTES.ORDER} />
          </div>
        )}
      </div>
      <div className="relative flex flex-col md:flex-row justify-between gap-4 md-h-[340px]">
        {/** UNAUTHENTICATED : DISPLAY MOCK BLOCKS AND OFFLINE OVERLAY */}
        {!isAuthenticated && (
          <>
            <OfflineOverlay label="commander gratuitement nos affiches, flyers et goodies" />
            <div className="bg-cream-light p-8 rounded-4xl h-[340px] w-[340px]" />
            <div className="bg-cream-light p-8 rounded-4xl h-[340px] w-[340px] hidden md:block" />
            <div className="bg-cream-light p-8 rounded-4xl h-[340px] w-[340px] hidden md:block" />
          </>
        )}
        {/** LOADING : DISPLAY LOADER */}
        {isAuthenticated && !products && <Loader />}
        {/** AUTHENTICATED : DISPLAY GOODIES */}
        {isAuthenticated && products && (
          <Swiper
            className="swiper-container w-full"
            modules={[FreeMode]}
            freeMode={true}
            pagination={{ enabled: false }}
            breakpoints={breakpoints}
          >
            {products.map(product => (
              <SwiperSlide key={product.id}>
                <Link
                  className="bg-cream-light flex flex-col flex-wrap p-8 rounded-4xl h-[340px] w-[340px]"
                  href={ROUTES.ORDER}
                >
                  <img
                    src={`/assets/products/${product.external_reference}.png`}
                    alt={product.label}
                    className="flex-grow w-3/4 m-auto p-4"
                  />
                  <span>{product.label}</span>
                </Link>
              </SwiperSlide>
            ))}
            {Array.from({ length: 2 }, (_, i) => i).map(index => (
              <SwiperSlide key={index}>
                <Link
                  className="bg-cream-light flex items-center justify-center flex-wrap p-8 rounded-4xl h-[340px] w-[340px]"
                  href={ROUTES.ORDER}
                >
                  <span className="text-2xl">A venir</span>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
      {isAuthenticated && (
        <OrderHistoryDrawer
          onClose={() => setIsOrderHistoryOpen(false)}
          isOpen={isOrderHistoryOpen}
        />
      )}
    </div>
  );
}
