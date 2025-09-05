import { Icon } from '@/components';

export default function HeroAuth() {
  return (
    <div
      className="hidden md:block relative rounded-4xl overflow-hidden w-[480px] h-[600px]"
      style={{
        background:
          "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 31.29%, rgba(0, 0, 0, 0.90) 67.09%), url('/assets/vet-illustration-2.jpg') lightgray 0px -278.206px / 100% 147.977% no-repeat",
      }}
    >
      <div className="absolute bottom-0 px-8 py-10 text-white">
        <h2 className="mb-4">Créez un compte et profitez d&#39;avantages exclusifs</h2>
        <div className="flex flex-row gap-2">
          <Icon name={'figoCheck'} color="none" />
          <span>
            <b>500 crédits Figo offerts </b>dès l&#39;inscription
          </span>
        </div>
      </div>
    </div>
  );
}
