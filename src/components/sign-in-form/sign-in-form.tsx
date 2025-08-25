'use client';

import { Button, Input } from '@/components';
import { useForm } from 'react-hook-form';

type FormData = { password: string; email: string };

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    console.log('DATA', data);
  };

  return (
    <div className="flex-grow flex flex-col justify-center gap-4 max-w-[392px]">
      <span className="text-lg font-bold">Se connecter</span>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input
          placeholder="Adresse e-mail"
          required
          type="email"
          autoComplete="email"
          {...register('email', { required: true })}
        />
        <Input
          placeholder="Mot de passe"
          required
          type="password"
          autoComplete="password"
          {...register('password', { required: true })}
        />
        <Button type="submit" label="Se connecter" />
      </form>
      <span className="text-neutral-low text-center my-6">- Ou se connecter avec -</span>
      <Button label={"S'inscrire avec Google"} variant="outline" />
      <Button label={"S'inscrire avec Microsoft"} variant="outline" />
      <Button label={'Créer un compte'} variant="outline" />
    </div>
  );
}
