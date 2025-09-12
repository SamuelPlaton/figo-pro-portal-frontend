'use client';

import { useRef, useState } from 'react';
import Script from 'next/script';
import { AutocompleteInput } from '@/components';
import { AddressForm } from '@/types';

type Option = {
  value: string;
  label: string;
  entity: google.maps.places.AutocompleteSuggestion;
};

interface PlacesAutocompleteProps {
  onSelect: (address: Partial<AddressForm>) => void;
  onInput?: (value: string) => void;
  mode: 'place' | 'address';
}

export default function PlacesAutocomplete({ onSelect, onInput, mode }: PlacesAutocompleteProps) {
  const [options, setOptions] = useState<Option[]>([]);
  const sessionTokenRef = useRef<google.maps.places.AutocompleteSessionToken | null>(null);

  const initAutocomplete = async (input: string) => {
    if (onInput) {
      onInput(input);
    }
    if (!input) {
      setOptions([]);
      return;
    }

    if (typeof window === 'undefined' || typeof google === 'undefined') return;

    const { AutocompleteSuggestion, AutocompleteSessionToken } = (await google.maps.importLibrary(
      'places',
    )) as google.maps.PlacesLibrary;

    if (!sessionTokenRef.current) {
      sessionTokenRef.current = new AutocompleteSessionToken();
    }

    const req: google.maps.places.AutocompleteRequest = {
      input,
      sessionToken: sessionTokenRef.current,
      region: 'fr',
      language: 'fr-FR',
      includedPrimaryTypes:
        mode === 'place' ? ['veterinary_care'] : ['street_address', 'route', 'locality'],
    };

    const { suggestions } = await AutocompleteSuggestion.fetchAutocompleteSuggestions(req);

    setOptions(
      suggestions.map(s => ({
        value: s.placePrediction?.placeId ?? '',
        label: s.placePrediction?.text?.toString?.() ?? '',
        entity: s,
      })),
    );
  };

  const handleSelect = async (placeId: string) => {
    const suggestion = options.find(o => o.value === placeId)?.entity;
    if (!suggestion) return;

    const prediction = suggestion.placePrediction;
    if (!prediction) return;

    const place = prediction.toPlace();
    await place.fetchFields({ fields: ['addressComponents', 'displayName'] });

    const getAddrComponent = (type: string) =>
      place.addressComponents?.find(a => a.types.includes(type))?.longText;

    const streetNumber = getAddrComponent('street_number');
    const route = getAddrComponent('route');

    sessionTokenRef.current = null;
    onSelect({
      street1: streetNumber && route ? streetNumber + ' ' + route : undefined,
      city: getAddrComponent('locality') ?? undefined,
      zip: getAddrComponent('postal_code') ?? undefined,
      company: place.displayName as string,
    });
  };

  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
        strategy="afterInteractive"
      />
      <AutocompleteInput
        name="places"
        placeholder={
          mode === 'place' ? 'Rechercher une clinique vétérinaire...' : 'Rechercher une adresse'
        }
        options={options}
        onAutocomplete={initAutocomplete}
        onSelect={handleSelect}
      />
    </>
  );
}
