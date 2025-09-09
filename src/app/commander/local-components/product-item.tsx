import { Product } from '@/types';
import { Button, Icon } from '@/components';

interface ProductItemProps {
  onClick: () => void;
  product: Product;
  isAlreadyAdded: boolean;
}

export default function ProductItem({ onClick, product, isAlreadyAdded }: ProductItemProps) {
  const cannotReorder = product.applied_rules && !product.applied_rules.can_order;
  return (
    <div className="flex flex-col basis-full md:basis-auto gap-4 min-w-[260px]">
      <div
        className={`w-full overflow-hidden relative bg-cream-light p-8 rounded-2xl h-[260px] ${cannotReorder && 'border border-neutral-lower'}`}
      >
        <img
          src={`/assets/products/${product.external_reference}.png`}
          alt={product.label}
          className={`max-h-full max-w-full m-auto ${cannotReorder && 'blur-xs'}`}
        />
        {cannotReorder && (
          <div className="absolute top-0 left-0 w-full h-full bg-white opacity-90 flex flex-col items-center justify-center p-8 gap-4">
            <Icon name="clock" size={32} color="#475569" />
            <span className="text-primary text-center">
              {product.applied_rules?.message ?? 'Commande impossible'}
            </span>
          </div>
        )}
      </div>
      <div>
        <div className="font-bold flex flex-row justify-between items-center gap-2 mb-2">
          <span>{product.label}</span>
          {product.price ? (
            <div className="flex flex-row gap-1">
              <Icon name="figoCoin" />
              <span>{product.price}</span>
            </div>
          ) : (
            <span>Gratuit</span>
          )}
        </div>
        <span className="text-gray text-sm">Quantité : {product.quantity}</span>
        {isAlreadyAdded ? (
          <Button label="Ajouté" className="mt-4" variant="outline" prependIcon="check" />
        ) : (
          <Button
            className="mt-4"
            label="Ajouter au panier"
            onClick={onClick}
            disabled={cannotReorder}
            appendIcon="plus"
            variant="outline"
          />
        )}
      </div>
    </div>
  );
}
