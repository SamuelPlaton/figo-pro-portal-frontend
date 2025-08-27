import { IconProps } from '@/components/icon/icon';

export default function CheckIcon({ size, color, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      {...props}
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.7071 4.29289C24.0976 4.68342 24.0976 5.31658 23.7071 5.70711L9.70711 19.7071C9.31658 20.0976 8.68342 20.0976 8.29289 19.7071L1.29289 12.7071C0.902369 12.3166 0.902369 11.6834 1.29289 11.2929C1.68342 10.9024 2.31658 10.9024 2.70711 11.2929L9 17.5858L22.2929 4.29289C22.6834 3.90237 23.3166 3.90237 23.7071 4.29289Z"
        fill={color}
      />
    </svg>
  );
}
