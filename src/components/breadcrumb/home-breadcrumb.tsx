'use client';
import { TabListItem } from '@/components';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';

export default function HomeBreadcrumb() {
  const [activeBreadcrumb, setActiveBreadcrumb] = useState<number>(0);
  const breadcrumbOptions = [
    {
      label: 'Accueil',
      value: 'hero',
    },
    {
      label: 'Comment ca marche ?',
      value: 'how-it-works',
    },
    {
      label: 'Avantages',
      value: 'advantages',
    },
  ];

  const handleNavigate = (index: number) => {
    const id = breadcrumbOptions[index].value;
    const el = document.getElementById(id);

    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setActiveBreadcrumb(index);
  };

  const breakpoints = {
    0: { spaceBetween: 4 },
    750: { spaceBetween: 16 },
  };

  return (
    <Swiper
      modules={[FreeMode]}
      className="swiper-container"
      freeMode={true}
      slidesPerView="auto"
      breakpoints={breakpoints}
    >
      {breadcrumbOptions.map((option, index) => (
        <SwiperSlide key={index} className="w-auto">
          <TabListItem
            label={option.label}
            isActive={activeBreadcrumb === index}
            onClick={() => handleNavigate(index)}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
