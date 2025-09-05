'use client';

import Script from 'next/script';
import { useRef, useState } from 'react';
import { AutocompleteInput } from '@/components';
import AutocompleteSuggestion = google.maps.places.AutocompleteSuggestion;
import PlacePrediction = google.maps.places.PlacePrediction;
import AutocompleteRequest = google.maps.places.AutocompleteRequest;
import { AddressForm } from '@/types';

type Option = { value: string; label: string; entity: AutocompleteSuggestion };

interface PlacesAutocompleteProps {
  onSelect: (address: Partial<AddressForm>) => void;
  mode: 'place' | 'address';
}

export default function PlacesAutocomplete({ onSelect, mode }: PlacesAutocompleteProps) {
  const [options, setOptions] = useState<Option[]>([]);
  // Google Session Token
  const sessionTokenRef = useRef<google.maps.places.AutocompleteSessionToken | null>(null);

  const handleAutocomplete = async (input: string) => {
    if (!input) {
      setOptions([]);
      return;
    }

    // Make sure lib is loaded
    if (typeof google === 'undefined' || !google.maps?.importLibrary) {
      console.warn('Google Maps JS non chargé');
      return;
    }

    const { AutocompleteSuggestion, AutocompleteSessionToken } = (await google.maps.importLibrary(
      'places',
    )) as unknown as google.maps.PlacesLibrary;

    if (!sessionTokenRef.current) sessionTokenRef.current = new AutocompleteSessionToken();

    const req: AutocompleteRequest = {
      input,
      sessionToken: sessionTokenRef.current,
      region: 'fr',
      language: 'fr-FR',
      includedPrimaryTypes:
        mode === 'place' ? ['veterinary_care'] : ['street_address', 'route', 'locality'],
    };

    const { suggestions } = await AutocompleteSuggestion.fetchAutocompleteSuggestions(req);

    // mapper les suggestions pour ton UI et garder la suggestion brute pour fetchFields()
    const opts: Option[] = suggestions.map((s: AutocompleteSuggestion) => {
      const pp = s.placePrediction as PlacePrediction;
      return { value: pp.placeId, label: pp.text?.toString?.(), entity: s };
    });
    setOptions(opts);
  };

  // When the user click on a selection
  const handleSelect = async (placeId: string) => {
    const suggestion = options.find(o => o.value === placeId)?.entity;
    if (!suggestion) return;

    const prediction = suggestion.placePrediction;
    if (!prediction) return;

    const place = prediction.toPlace();
    await place.fetchFields({
      fields: ['addressComponents', 'displayName'],
    });
    const addressComponents = place.addressComponents;
    if (!addressComponents) return;
    const getAddrComponent = (type: string) =>
      addressComponents.find(a => a.types.includes(type))?.longText;
    const streetNumber = getAddrComponent('street_number');
    const route = getAddrComponent('route');
    const city = getAddrComponent('locality');
    const zip = getAddrComponent('postal_code');

    sessionTokenRef.current = null;
    onSelect({
      street1: streetNumber && route ? streetNumber + ' ' + route : undefined,
      city: city ?? undefined,
      zip: zip ?? undefined,
      company: place.displayName as string,
    });
  };

  return (
    <>
      {/* load Google Maps JS API (libraries=places) */}
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
        strategy="beforeInteractive"
      />
      <AutocompleteInput
        name="places"
        placeholder={
          mode === 'place' ? 'Rechercher une clinique vétérinaire...' : 'Rechercher une adresse'
        }
        options={options}
        onAutocomplete={handleAutocomplete}
        onSelect={handleSelect}
      />
    </>
  );
}
