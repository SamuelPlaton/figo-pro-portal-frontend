import { Product } from '@/types';
import { Button, Icon } from '@/components';

interface ProductItemProps {
  onClick: () => void;
  product: Product;
  isAlreadyAdded: boolean;
}

export default function ProductItem({ onClick, product, isAlreadyAdded }: ProductItemProps) {
  const getDisplayDate = (date: string) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };
  return (
    <div className="flex flex-col gap-4 w-[260px]">
      <div
        className={`overflow-hidden relative bg-[#FDF5ED] p-8 rounded-2xl h-[260px] ${product.conditions.reorder_date && 'border border-neutral-lower'}`}
      >
        <img
          src={`/assets/products/${product.reference}.png`}
          alt={product.label}
          className={`${product.conditions.reorder_date && 'blur-xs'}`}
        />
        {product.conditions.reorder_date && (
          <div className="absolute top-0 left-0 w-full h-full bg-white opacity-90 flex flex-col items-center p-8">
            <Icon name="clock" size={32} color="#475569" />
            <span className="text-primary text-center">
              Un délai est nécessaire entre deux commandes. Vous pourrez commander à nouveau à
              partir du <b>{getDisplayDate(product.conditions.reorder_date)}</b>
            </span>
          </div>
        )}
      </div>
      <div>
        <div className="font-bold flex flex-row justify-between items-center gap-2 mb-2">
          <span>{product.label}</span>
          {product.price ? (
            <div className="flex flex-row gap-1">
              <Icon name="figoCoin" width={20} height={25} style={{ color: '#475569' }} />
              <span>{product.price}</span>
            </div>
          ) : (
            <span>Gratuit</span>
          )}
        </div>
        <span className="text-gray">Quantité : {product.count}</span>
        {isAlreadyAdded ? (
          <Button label="Ajouté" className="mt-4" variant="outline" prependIcon="check" />
        ) : (
          <Button
            className="mt-4"
            label="Ajouter au panier"
            onClick={onClick}
            disabled={!product.conditions.can_order}
            appendIcon="plus"
            variant="outline"
          />
        )}
      </div>
    </div>
  );
}
