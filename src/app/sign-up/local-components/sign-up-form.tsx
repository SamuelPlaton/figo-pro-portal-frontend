'use client';

import { Button, Icon, Input, Select } from '@/components';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { PlacesAutocomplete, ProgressBar } from '@/app/sign-up/local-components/index';
import { AddressForm, ROUTES } from '@/types';
import { useRouter } from 'next/navigation';
import { useToast } from '@/context/toast-context';
import { api } from '@/lib/api';

type AddressFormData = {
  street1: string;
  city: string;
  zip: string;
  company: string;
};

type ContactFormData = {
  email: string;
  phoneIndicative: string;
  phoneNumber: string;
};

type IdentityFormData = {
  firstName?: string;
  lastName?: string;
};

export default function SignUpForm() {
  const router = useRouter();
  const { addToast } = useToast();
  const [autocompleteMode, setAutocompleteMode] = useState<'place' | 'address'>('place');
  const [addressData, setAddressData] = useState<AddressFormData>();
  const [contactData, setContactData] = useState<ContactFormData>();
  const [currentStep, setCurrentStep] = useState<number>(1);

  const {
    handleSubmit: submitAddressForm,
    setValue: setAddressFormValue,
    watch: watchAddressForm,
    formState: { isSubmitting: isAddressFormSubmitting },
  } = useForm<AddressFormData>();

  const {
    register: contactFormRegister,
    handleSubmit: submitContactForm,
    formState: { errors: contactFormErrors, isSubmitting: isContactFormSubmitting },
  } = useForm<ContactFormData>();

  const {
    register: identityFormRegister,
    handleSubmit: submitIdentityForm,
    formState: { isSubmitting: isIdentityFormSubmitting },
  } = useForm<IdentityFormData>();

  // todo: handle set autocomplete empty
  // todo: password strength
  // todo: favicon !!!
  const onAddressChange = (address: Partial<AddressForm>) => {
    if (address.street1)
      setAddressFormValue('street1', address.street1 ?? '', { shouldValidate: true });
    if (address.zip) setAddressFormValue('zip', address.zip ?? '', { shouldValidate: true });
    if (address.city) setAddressFormValue('city', address.city ?? '', { shouldValidate: true });
    if (address.company) setAddressFormValue('company', address.company, { shouldValidate: true });
    setAddressData(address as AddressFormData);
  };

  // disable button management on address step
  const handleDisabled = () => {
    const [street1, city, zip] = watchAddressForm(['street1', 'city', 'zip']);
    if (currentStep === 1 && (!street1 || !city || !zip)) {
      return true;
    }
    return false;
  };

  const onSubmitContactForm = async (data: ContactFormData) => {
    setContactData(data);
    setCurrentStep(currentStep + 1);
  };

  const onSubmitIdentityForm = async (data: IdentityFormData) => {
    if (!contactData || !addressData) {
      addToast("Informations d'adresse ou de contact manquantes", 'error');
      return;
    }
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({
        email: contactData?.email as string,
        password: 'SAmuel..07012000',
        given_name: data.firstName ? data.firstName : undefined,
        family_name: data.lastName ? data.lastName : undefined,
        name: data.firstName
          ? `${data.firstName}${data.lastName ? ` ${data.lastName}` : ''}`
          : undefined,
        phone_number: contactData?.phoneNumber
          ? `${contactData.phoneIndicative} ${contactData.phoneNumber}`
          : undefined,
      }),
    });
    const resBody = await res.json();
    console.log('BODY', resBody);
    if (res.status >= 400) {
      addToast(
        resBody?.error.code === 'invalid_signup' ? 'Un compte existe déjà pour cet email' : '',
        'error',
        'Une erreur est survenue',
      );
      return;
    }
    return api.users
      .postUser({
        externalId: resBody._id as string,
        email: contactData.email,
        address: {
          ...addressData,
          ...contactData,
        },
      })
      .then(() => {
        addToast('Vous pouvez désormais vous connecter', 'success', 'Compte crée avec succès');
        router.push(ROUTES.SIGNIN);
      })
      .catch(() => {
        addToast('Veuillez contacter le support', 'error', 'Une erreur est survenue');
      });
  };

  type NavigationSectionProps = {
    label: string;
    loading?: boolean;
  };

  const NavigationSection: React.FC<NavigationSectionProps> = ({
    label,
    loading = true,
  }: NavigationSectionProps) => (
    <div className="flex flex-row gap-4">
      <Button
        prependIcon="arrowLeft"
        className="p-3.5! border-primary"
        disabled={currentStep <= 1}
        onClick={() => setCurrentStep(currentStep - 1)}
        variant="outline"
        size="lg"
      />
      <Button
        appendIcon="arrowRight"
        className="flex-grow"
        disabled={handleDisabled()}
        label={label}
        type="submit"
        size="lg"
        loading={loading}
      />
    </div>
  );
  return (
    <div className="flex-grow flex flex-col gap-4 max-w-[392px] md:mt-12">
      <Icon name="x" onClick={() => router.push(ROUTES.SIGNIN)} className="ml-auto" size={12} />
      <ProgressBar progress={10 + currentStep * 20} /> {/* 30 - 50 - 70 */}
      {/** STEP 1: ADDRESS */}
      <form
        onSubmit={submitAddressForm(() => setCurrentStep(currentStep + 1))}
        className={`flex flex-col gap-4 ${currentStep !== 1 && 'hidden'}`}
      >
        <div className="flex flex-col items-start gap-4">
          <span className="font-bold text-lg">
            Dans quel établissement vétérinaire exercez-vous ?
          </span>
          <PlacesAutocomplete onSelect={onAddressChange} mode={autocompleteMode} />
          <Button
            variant="ghost"
            label={
              autocompleteMode === 'place'
                ? 'Rechercher une adresse'
                : 'Rechercher un établissement'
            }
            appendIcon="arrowRight"
            onClick={() => setAutocompleteMode(mode => (mode === 'place' ? 'address' : 'place'))}
            className="mt-2 underline"
          />
        </div>
        <NavigationSection label="Suivant" loading={isAddressFormSubmitting} />
      </form>
      {/** STEP 2: CONTACT INFORMATION (EMAIL / PHONE) */}
      {currentStep === 2 && (
        <form onSubmit={submitContactForm(onSubmitContactForm)} className="flex flex-col gap-4">
          <div className="flex flex-col items-start gap-4">
            <span className="font-bold text-lg">
              Finalisons votre inscription en quelques secondes
            </span>
            <span className="text-neutral-low">
              Un membre de l’équipe Figo vous contactera pour confirmer vos informations et activer
              votre compte.
            </span>
            <Input
              label="Adresse email* :"
              placeholder="exemple@figo.fr"
              error={contactFormErrors.email?.message}
              className="w-full"
              {...contactFormRegister('email', { required: 'Ce champ est requis' })}
            />
          </div>
          <div className="flex flex-row items-end justify-between gap-2">
            <Select
              options={[
                { value: '+33', label: '🇫🇷 +33' },
                { value: '+32', label: '🇧🇪 +32' },
                { value: '+41', label: '🇨🇭 +41' },
                { value: '+352', label: '🇱🇺 +352' },
                { value: '+377', label: '🇲🇨 +377' },
                { value: '+1', label: '🇨🇦 +1' },
                { value: '+213', label: '🇩🇿 +213' },
                { value: '+212', label: '🇲🇦 +212' },
                { value: '+216', label: '🇹🇳 +216' },
                { value: '+221', label: '🇸🇳 +221' },
              ]}
              label="N° de téléphone"
              error={contactFormErrors.phoneIndicative?.message}
              {...contactFormRegister('phoneIndicative', { required: 'Ce champ est requis' })}
            />
            <Input
              placeholder="06 12 34 56 78"
              autoComplete="tel"
              error={contactFormErrors.phoneNumber?.message}
              {...contactFormRegister('phoneNumber', { required: 'Ce champ est requis' })}
              className="flex-grow"
            />
          </div>
          <div className="flex flex-row text-neutral-low gap-2">
            <div className="mt-2">
              <Icon name="lock" size={16} />
            </div>
            <span>
              En communiquant mes coordonnées, j’accepte d’être contacté(e) par un membre Figo afin
              de valider ma souscription.
            </span>
          </div>
          <NavigationSection label="Valider mes coordonnées" loading={isContactFormSubmitting} />
        </form>
      )}
      {/** STEP 3: IDENTITY (FIRST NAME / LAST NAME) */}
      {currentStep === 3 && (
        <form onSubmit={submitIdentityForm(onSubmitIdentityForm)} className="flex flex-col gap-4">
          <div className="flex flex-col items-start gap-4">
            <span className="font-bold text-lg">Facilitez notre prise de contact</span>
            <span className="text-neutral-low">
              Indiquez votre nom pour que notre équipe puisse personnaliser nos échanges.
              (Facultatif)
            </span>
            <Input
              label="Nom"
              placeholder="Exemple : Dupont (Optionnel)"
              className="w-full"
              autoComplete="family-name"
              {...identityFormRegister('lastName')}
            />
            <Input
              label="Prénom"
              placeholder="Exemple : Marie (Optionnel)"
              className="w-full"
              autoComplete="given-name"
              {...identityFormRegister('firstName')}
            />
          </div>
          <NavigationSection label="Continuer" loading={isIdentityFormSubmitting} />
        </form>
      )}
    </div>
  );
}
