'use client';

import { Button, Icon, Input, Select } from '@/components';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { PlacesAutocomplete, ProgressBar } from '@/app/sign-up/local-components/index';
import { AddressForm, ROUTES } from '@/types';
import { useRouter } from 'next/navigation';
import { useToast } from '@/context/toast-context';
import { api } from '@/lib/api';
import { useAuth } from '@/context';
import { AxiosError } from 'axios';

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

type PasswordFormData = {
  password?: string;
  confirmPassword?: string;
};

const SignUpForm = () => {
  const router = useRouter();
  const { addToast } = useToast();
  const { isAuthenticated, authUser, refreshAuth } = useAuth();
  // todo: remove
  useEffect(() => {
    console.log('ONBOARDING EFFECT', { isAuthenticated, authUser });
  }, [isAuthenticated, authUser]);
  const [autocompleteMode, setAutocompleteMode] = useState<'place' | 'address'>('place');
  const [addressData, setAddressData] = useState<AddressFormData>();
  const [passwordData, setPasswordData] = useState<PasswordFormData>();
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
  } = useForm<ContactFormData>({
    defaultValues: {
      email: authUser?.email,
    },
  });

  const {
    register: passwordFormRegister,
    handleSubmit: submitPasswordForm,
    formState: { isSubmitting: isPasswordFormSubmitting, errors: passwordFormErrors },
  } = useForm<PasswordFormData>();

  const {
    register: identityFormRegister,
    handleSubmit: submitIdentityForm,
    formState: { isSubmitting: isIdentityFormSubmitting },
  } = useForm<IdentityFormData>();

  const onAddressChange = (address: Partial<AddressForm>) => {
    if (address.street1)
      setAddressFormValue('street1', address.street1 ?? '', { shouldValidate: true });
    if (address.zip) setAddressFormValue('zip', address.zip ?? '', { shouldValidate: true });
    if (address.city) setAddressFormValue('city', address.city ?? '', { shouldValidate: true });
    if (address.company) setAddressFormValue('company', address.company, { shouldValidate: true });
    setAddressData(address as AddressFormData);
  };
  const onAddressEmpty = () => {
    setAddressFormValue('street1', '', { shouldValidate: true });
    setAddressFormValue('zip', '', { shouldValidate: true });
    setAddressFormValue('city', '', { shouldValidate: true });
    setAddressFormValue('company', '', { shouldValidate: true });
    setAddressData(undefined);
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
    const increment = authUser?.email ? 2 : 1; // if auth user already defined, skip password step
    setCurrentStep(currentStep + increment);
  };

  const onSubmitPasswordForm = async (data: PasswordFormData) => {
    setPasswordData(data);
    setCurrentStep(currentStep + 1);
  };

  const onSubmitIdentityForm = async (data: IdentityFormData) => {
    if (!contactData || !addressData || (!passwordData && !authUser)) {
      addToast('Informations manquantes aux étapes précédentes', 'error');
      return;
    }
    // Auth0 Register for Username-Password Auth, skipped for SSO Auth
    let authExternalId = authUser?.sub ?? '';
    if (!authUser && passwordData?.password) {
      try {
        const authRes = await api.auth.signup({
          email: contactData?.email as string,
          password: passwordData?.password,
          given_name: data.firstName ? data.firstName : undefined,
          family_name: data.lastName ? data.lastName : undefined,
          name: data.firstName
            ? `${data.firstName}${data.lastName ? ` ${data.lastName}` : ''}`
            : undefined,
          phone_number: contactData?.phoneNumber
            ? `${contactData.phoneIndicative} ${contactData.phoneNumber}`
            : undefined,
        });

        authExternalId = `auth0|${authRes.data._id}`;
      } catch (error) {
        let accountAlreadyExist = false;
        if (error instanceof AxiosError) {
          const { message, code } = error.response?.data.error;
          accountAlreadyExist = message === 'NOT_PRIMARY_ACCOUNT' || code === 'invalid_signup';
        }
        addToast(
          accountAlreadyExist ? 'Un compte existe déjà pour cet email' : '',
          'error',
          'Une erreur est survenue',
        );
        return;
      }
    }

    // Save User in Database
    return api.users
      .postUser({
        externalId: authExternalId,
        email: contactData.email,
        address: {
          ...addressData,
          ...contactData,
        },
      })
      .then(async () => {
        await refreshAuth();
        addToast(
          !authUser ? 'Vous pouvez désormais vous connecter' : '',
          'success',
          'Compte crée avec succès',
        );
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
      <ProgressBar progress={currentStep * 20} />
      {/** STEP 1: ADDRESS */}
      <form
        onSubmit={submitAddressForm(() => setCurrentStep(currentStep + 1))}
        className={`flex flex-col gap-4 ${currentStep !== 1 && 'hidden'}`}
      >
        <div className="flex flex-col items-start gap-4">
          <span className="font-bold text-lg">
            Dans quel établissement vétérinaire exercez-vous ?
          </span>
          <PlacesAutocomplete
            onSelect={onAddressChange}
            onInput={onAddressEmpty}
            mode={autocompleteMode}
          />
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
              disabled={!!authUser?.email}
            />
          </div>
          <div className="flex flex-row items-end justify-between gap-2">
            <Select
              className="pb-2"
              options={[{ value: '+33', label: '🇫🇷 +33' }]}
              label="N° de téléphone* :"
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
      {/** STEP 3: PASSWORD */}
      {currentStep === 3 && (
        <form
          onSubmit={submitPasswordForm(onSubmitPasswordForm)}
          className="flex flex-col gap-4 pb-4"
        >
          <div className="flex flex-col items-start gap-4">
            <span className="font-bold text-lg">Créez votre mot de passe</span>
            <span className="text-neutral-low">Il servira à sécuriser votre compte.</span>
            <Input
              label="Mot de passe* :"
              type="password"
              className="w-full"
              error={passwordFormErrors.password?.message}
              {...passwordFormRegister('password', {
                required: 'Le mot de passe est obligatoire',
                validate: {
                  minLength: v => (v ?? '').length >= 8 || '8 caractères minimum',
                  hasUppercase: v => /[A-Z]/.test(v ?? '') || 'Une majuscule minimum',
                  hasNumber: v => /\d/.test(v ?? '') || 'Au moins un chiffre',
                  hasSpecial: v =>
                    /[!@#$%^&*(),;.?":{}|<>]/.test(v ?? '') || 'Au moins un caractère spécial',
                },
              })}
            />
            <Input
              label="Confirmer le mot de passe* :"
              type="password"
              className="w-full"
              error={passwordFormErrors.confirmPassword?.message}
              {...passwordFormRegister('confirmPassword', {
                required: 'La confirmation est obligatoire',
                validate: (value, formValues) =>
                  value === formValues.password || 'Les mots de passe ne correspondent pas',
              })}
            />
          </div>
          <NavigationSection label="Continuer" loading={isPasswordFormSubmitting} />
        </form>
      )}
      {/** STEP 4: IDENTITY (FIRST NAME / LAST NAME) */}
      {currentStep === 4 && (
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
};

export default SignUpForm;
