'use client';

import Script from 'next/script';
import { useRef, useState } from 'react';
import { AutocompleteInput } from '@/components';
import { AddressForm } from '@/types';

import AutocompleteSuggestion = google.maps.places.AutocompleteSuggestion;
import PlacePrediction = google.maps.places.PlacePrediction;
import AutocompleteRequest = google.maps.places.AutocompleteRequest;

type Option = { value: string; label: string; entity: AutocompleteSuggestion };

interface AddressesAutocompleteProps {
  onSelect: (address: Partial<AddressForm>) => void;
}

export default function AddressesAutocomplete({ onSelect }: AddressesAutocompleteProps) {
  const [options, setOptions] = useState<Option[]>([]);
  const sessionTokenRef = useRef<google.maps.places.AutocompleteSessionToken | null>(null);

  const handleAutocomplete = async (input: string) => {
    if (!input) {
      setOptions([]);
      return;
    }

    if (typeof google === 'undefined' || !google.maps?.importLibrary) {
      console.warn('Google Maps JS non chargé');
      return;
    }

    const { AutocompleteSuggestion, AutocompleteSessionToken } = (await google.maps.importLibrary(
      'places',
    )) as unknown as google.maps.PlacesLibrary;

    if (!sessionTokenRef.current) {
      sessionTokenRef.current = new AutocompleteSessionToken();
    }

    const req: AutocompleteRequest = {
      input,
      sessionToken: sessionTokenRef.current,
      region: 'fr',
      language: 'fr-FR',
      includedPrimaryTypes: ['street_address', 'route', 'locality'], // 🔑 types adresses
    };

    const { suggestions } = await AutocompleteSuggestion.fetchAutocompleteSuggestions(req);

    const opts: Option[] = suggestions.map((s: AutocompleteSuggestion) => {
      const pp = s.placePrediction as PlacePrediction;
      return { value: pp.placeId, label: pp.text?.toString?.(), entity: s };
    });
    setOptions(opts);
  };

  const handleSelect = async (placeId: string) => {
    const suggestion = options.find(o => o.value === placeId)?.entity;
    if (!suggestion) return;

    const prediction = suggestion.placePrediction;
    if (!prediction) return;

    const place = prediction.toPlace();
    await place.fetchFields({
      fields: ['addressComponents', 'formattedAddress'],
    });

    const addressComponents = place.addressComponents;
    if (!addressComponents) return;

    const getAddr = (type: string) => addressComponents.find(a => a.types.includes(type))?.longText;

    const streetNumber = getAddr('street_number');
    const route = getAddr('route');
    const city = getAddr('locality');
    const zip = getAddr('postal_code');

    sessionTokenRef.current = null;

    onSelect({
      street1: [streetNumber, route].filter(Boolean).join(' ') || undefined,
      city: city ?? undefined,
      zip: zip ?? undefined,
    });
  };

  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
        strategy="beforeInteractive"
      />

      <AutocompleteInput
        name="address"
        placeholder="Saisissez votre adresse..."
        options={options}
        onAutocomplete={handleAutocomplete}
        onSelect={handleSelect}
      />
    </>
  );
}
