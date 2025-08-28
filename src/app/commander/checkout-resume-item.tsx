import { Product } from '@/types';
import { Icon } from '@/components';
import clsx from 'clsx';

interface CheckoutResumeItemProps {
  product?: Product;
  className?: string;
  onRemove?: () => void;
}

export default function CheckoutResumeItem({
  product,
  className,
  onRemove,
}: CheckoutResumeItemProps) {
  if (!product) return null;
  const classNames = clsx('flex flex-row gap-4 justify-between max-w-[600px]', className);
  return (
    <div className={classNames}>
      <div className={`overflow-hidden relative bg-[#FDF5ED] p-2 rounded-2xl h-[100px]`}>
        <img
          src={`/assets/products/${product.external_reference}.png`}
          alt={product.label}
          className="h-full"
        />
      </div>
      <div className="flex flex-col justify-between gap-1 flex-grow">
        <span className="font-bold">{product.label}</span>
        <span className="text-neutral-low">Quantité : {product.quantity}</span>
      </div>
      <div className="flex flex-col justify-between">
        {product.price ? (
          <div className="flex flex-row gap-1 font-bold">
            <Icon name="figoCoin" />
            <span>{product.price}</span>
          </div>
        ) : (
          <span className="font-bold">Gratuit</span>
        )}
        {onRemove && (
          <span className="text-primary underline text-lg cursor-pointer" onClick={onRemove}>
            Retirer
          </span>
        )}
      </div>
    </div>
  );
}
