import { HeroAuth, SignUpForm } from '@/components';

export default function Login() {
  return (
    <div className="root-spacing flex flex-row justify-center gap-8 my-10">
      <HeroAuth />
      <SignUpForm />
    </div>
  );
}
