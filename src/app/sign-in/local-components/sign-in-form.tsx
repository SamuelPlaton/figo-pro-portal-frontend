'use client';

import { Button, Input } from '@/components';
import { useForm } from 'react-hook-form';
import { api } from '@/lib/api';
import { useToast } from '@/context/toast-context';
import { ROUTES } from '@/types';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context';

type FormData = { password: string; email: string };

const SignInForm = () => {
  const { refreshAuth } = useAuth();
  const { addToast } = useToast();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    return api.auth
      .login(data)
      .then(async () => {
        addToast('Connexion réussie', 'success');
        await refreshAuth();
        router.push(ROUTES.HOME);
      })
      .catch(error => {
        if (error.status === 403) {
          addToast('Email ou mot de passe invalide', 'error');
        } else {
          addToast('Une erreur est survenue', 'error');
        }
      });
  };
  // todo: SSO
  // todo: make the singular header interface (Remove "En partenariat avec 1Health")
  // todo: make the burger menu (and drawers who overrides)
  // todo: make the profile dropdown
  // todo: assert a link exist for Figo Promo Code redirection (see w/ Emeline)
  // todo: use Image Next JS
  // todo: select ONLY FRENCH
  // todo: fix mobile breadcrumb
  // todo: add empty products
  // todo: home: goodies -> Click (rendre cards cliquables)
  return (
    <div className="flex-grow flex flex-col justify-center gap-4 max-w-[392px]">
      <span className="text-lg font-bold">Se connecter</span>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input
          placeholder="Adresse e-mail"
          type="email"
          autoComplete="email"
          error={errors.email?.message}
          {...register('email', { required: 'Ce champ est requis' })}
        />
        <Input
          placeholder="Mot de passe"
          type="password"
          autoComplete="password"
          error={errors.password?.message}
          {...register('password', { required: 'Ce champ est requis' })}
        />
        <Button type="submit" label="Se connecter" loading={isSubmitting} />
      </form>
      <span className="text-neutral-low text-center my-6">- Ou se connecter avec -</span>
      <Button label={"S'inscrire avec Google"} variant="outline" />
      <Button label={"S'inscrire avec Microsoft"} variant="outline" />
      <Button label={'Créer un compte'} variant="outline" href={ROUTES.SIGNUP} />
    </div>
  );
};

export default SignInForm;
