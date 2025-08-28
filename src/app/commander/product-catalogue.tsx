import { Checkout, Product } from '@/types';
import { ProductItem, ProductItemSkeleton } from '@/app/commander';

interface ProductCatalogueProps {
  products?: Product[];
  checkout: Checkout;
  onAddProduct: (product: Product) => void;
}

export default function ProductCatalogue({
  products,
  checkout,
  onAddProduct,
}: ProductCatalogueProps) {
  return (
    <div className="root-spacing">
      {/* HEADER */}
      <p className="font-bold text-2xl text-primary mb-1">
        Sélectionnez les supports que vous souhaitez commander :
      </p>
      <p>
        Passez commande pour tous les flyers, affiches et PLV disponibles pour votre établissement.
      </p>
      {/* PRODUCT LIST */}
      <div className="mt-8 flex flex-row gap-8">
        {products ? (
          products?.map((product, key) => (
            <ProductItem
              key={key}
              onClick={() => onAddProduct(product)}
              product={product}
              isAlreadyAdded={checkout.items.some(item => item.id === product.id)}
            />
          ))
        ) : (
          <ProductItemSkeleton />
        )}
      </div>
    </div>
  );
}
