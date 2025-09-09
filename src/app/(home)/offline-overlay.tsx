import { Button } from '@/components';
import { ROUTES } from '@/types';

interface OfflineOverlayProps {
  label: string;
}
export default function OfflineOverlay({ label }: OfflineOverlayProps) {
  return (
    <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center backdrop-blur-sm bg-gradient-to-b to-white p-8">
      <span className="text-center">
        Pour <b>{label}</b>
      </span>
      <span className="mb-4">merci de vous identifier :</span>
      <Button
        className="w-64"
        variant="outline"
        label="Se connecter"
        size="lg"
        href={ROUTES.SIGNIN}
      />
    </div>
  );
}
