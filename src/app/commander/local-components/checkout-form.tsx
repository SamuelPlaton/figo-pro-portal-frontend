import { useForm } from 'react-hook-form';
import { Checkout, Order, User } from '@/types';
import { Button, Input, Select } from '@/components';
import { api } from '@/lib/api';
import { useToast } from '@/context/toast-context';

interface CheckoutFormProps {
  checkout: Checkout;
  onSuccess: (order: Order) => void;
}

type FormData = {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phoneIndicative: string;
  phoneNumber: string;
  street1: string;
  city: string;
  zip: string;
};

export default function CheckoutForm({ checkout, onSuccess }: CheckoutFormProps) {
  const { addToast } = useToast();
  // todo: retrieve user from api
  const user: User = {
    id: '6fba0bb9-fa6d-4112-8ac7-0ed67ef66592',
    email: 'platonsam02@gmail.com',
    phone_indicative: '+41',
    phone_number: '627871699',
    address: {
      id: '6fba0bb9-fa6d-4112-8ac7-0ed67ef66592',
      first_name: 'Samuel',
      last_name: 'Platon',
      street1: '7 Rue des Salicornes',
      street2: 'Appartement A5',
      zip: '44200',
      city: 'Nantes',
    },
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      firstName: user.address.first_name,
      lastName: user.address.last_name,
      email: user.email,
      street1: user.address.street1,
      phoneIndicative: user.phone_indicative,
      phoneNumber: user.phone_number,
      zip: user.address.zip,
      city: user.address.city,
    },
  });

  const onSubmit = async (data: FormData) => {
    return api.orders
      .postOrder({
        address: data,
        items: checkout.items,
      })
      .then(response => {
        onSuccess(response.data.data);
        addToast(
          'Votre commande a bien été enregistrée et sera bientôt traitée.',
          'success',
          'Commande validée',
        );
      })
      .catch(() => {
        addToast('Une erreur est survenue, veuillez réessayer', 'error');
      });
  };

  return (
    <div className="flex flex-grow flex-col gap-1">
      <span className="text-lg font-bold">Où devons-nous envoyer votre commande ?</span>
      <span className="mb-4 text-neutral-low">Information de livraison</span>
      <form className="flex flex-grow flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Prénom"
          placeholder="Ex: Marie"
          autoComplete="given-name"
          error={errors.firstName?.message}
          {...register('firstName', { required: 'Ce champ est requis' })}
        />
        <Input
          label="Nom"
          placeholder="Ex: Dupont"
          autoComplete="family-name"
          error={errors.lastName?.message}
          {...register('lastName', { required: 'Ce champ est requis' })}
        />
        <Input
          label="Nom de la clinique"
          placeholder="Ex: Clinique du chat bleu"
          autoComplete="organization"
          error={errors.company?.message}
          {...register('company', { required: 'Ce champ est requis' })}
        />
        <Input
          label="Adresse email"
          placeholder="cliniqueduchatbleu@gmail.com"
          autoComplete="email"
          error={errors.email?.message}
          {...register('email', { required: 'Ce champ est requis' })}
        />
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
            error={errors.phoneIndicative?.message}
            {...register('phoneIndicative', { required: 'Ce champ est requis' })}
          />
          <Input
            placeholder="06 12 34 56 78"
            autoComplete="tel"
            error={errors.phoneNumber?.message}
            {...register('phoneNumber', { required: 'Ce champ est requis' })}
            className="flex-grow"
          />
        </div>

        <Input
          label="Adresse"
          placeholder="Ex: 12 rue des vétérinaires"
          autoComplete="address-line1"
          error={errors.street1?.message}
          {...register('street1', { required: 'Ce champ est requis' })}
        />
        <Input
          label="Ville"
          placeholder="Ex: Paris"
          autoComplete="address-level2"
          error={errors.city?.message}
          {...register('city', { required: 'Ce champ est requis' })}
        />
        <Input
          label="Code postal"
          placeholder="Ex: 75012"
          autoComplete="postal-code"
          error={errors.zip?.message}
          {...register('zip', { required: 'Ce champ est requis' })}
        />
        <div className="flex flex-grow items-end gap-4">
          <Button
            className="h-fit w-full"
            type="submit"
            label="Passer la commande"
            size="lg"
            appendIcon="package"
            loading={isSubmitting}
          />
        </div>
      </form>
    </div>
  );
}
