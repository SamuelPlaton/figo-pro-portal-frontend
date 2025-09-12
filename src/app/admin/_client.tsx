'use client';

import { useForm } from 'react-hook-form';
import { Button, Input, Select } from '@/components';
import { withAuthGuard } from '@/guards';
import { api } from '@/lib/api';
import { useToast } from '@/context';

type FormData = { email: string; promoCode?: string; validate: string };

const AdminPageCore = () => {
  const { addToast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  // todo: guard ADMIN Back && Front (Roles in Auth0 or DB ?)
  // todo: guard validated account Back & Front
  const onSubmit = async (data: FormData) => {
    return api.users
      .updateUser({ ...data, validate: data.validate === 'true' })
      .then(() => {
        reset();
        addToast('Utilisateur mis à jour', 'success', 'Succès !');
      })
      .catch(error => {
        addToast(
          error.response?.status === 404 ? 'Utilisateur inconnu' : 'Contactez le support',
          'error',
          'Erreur',
        );
      });
  };

  return (
    <div className="root-spacing">
      <h1 className="mb-8">Panneau d&#39;administration</h1>
      <h2 className="mb-4">Mettre à jour un compte</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input
          placeholder="Adresse e-mail"
          label="Email"
          type="email"
          error={errors.email?.message}
          {...register('email', { required: 'Ce champ est requis' })}
        />
        <Input placeholder="ABCDE" label="Code promotionnel" {...register('promoCode')} />
        <Select
          label="Profil validé ?"
          options={[
            { value: 'true', label: 'Oui' },
            { value: 'false', label: 'Non' },
          ]}
          {...register('validate')}
        />
        <Button type="submit" label="Valider" loading={isSubmitting} />
      </form>
    </div>
  );
};

export default withAuthGuard(AdminPageCore);
