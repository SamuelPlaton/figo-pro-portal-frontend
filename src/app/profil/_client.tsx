'use client';
import { withAuthGuard } from '@/guards';
import { useAuth } from '@/context';

const ProfilCore = () => {
  const { user } = useAuth();
  return (
    <div className="root-spacing flex flex-col justify-center gap-4 my-10">
      <h1 className="mb-8">Mon profil</h1>
      <div className="flex flex-row gap-2">
        <span className="font-bold">Email :</span>
        <span>{user?.email}</span>
      </div>
      <div className="flex flex-row gap-2">
        <span className="font-bold">Adresse :</span>
        <span>
          {user?.address.street1}, {user?.address.zip} {user?.address.city}
        </span>
      </div>
      <div className="flex flex-row gap-2">
        <span className="font-bold">Profil validé :</span>
        <span>{user?.validated_at ? 'OUI' : 'NON'}</span>
      </div>
      <div className="flex flex-row gap-2">
        <span className="font-bold">Code promotionnel :</span>
        <span>{user?.promo_code ?? 'Non défini'}</span>
      </div>
    </div>
  );
};

export default withAuthGuard(ProfilCore);
