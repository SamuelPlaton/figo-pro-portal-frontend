import { useForm } from 'react-hook-form';
import { Checkout, Order } from '@/types';
import { Button, Input, Select } from '@/components';
import { api } from '@/lib/api';
import { useToast } from '@/context/toast-context';
import { useAuth } from '@/context';

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
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      firstName: user?.address.first_name,
      lastName: user?.address.last_name,
      email: user?.email,
      street1: user?.address.street1,
      phoneIndicative: user?.address.phone_indicative,
      phoneNumber: user?.address.phone_number,
      company: user?.address.company,
      zip: user?.address.zip,
      city: user?.address.city,
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
      <span className="text-lg font-bold pr-6">Où devons-nous envoyer votre commande ?</span>
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
            className="pb-2"
            options={[{ value: '+33', label: '🇫🇷 +33' }]}
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
