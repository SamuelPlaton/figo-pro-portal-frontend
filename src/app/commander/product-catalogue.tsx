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
    <div className="root-spacing mb-24">
      {/* HEADER */}
      <p className="font-bold text-2xl text-primary mb-1">
        Sélectionnez les supports que vous souhaitez commander :
      </p>
      <p className="text-neutral-low">
        Passez commande pour tous les flyers, affiches et PLV disponibles pour votre établissement.
      </p>
      {/* PRODUCT LIST */}
      <div className="mt-8 flex flex-row flex-wrap gap-8">
        {products
          ? products.map((product, key) => (
              <ProductItem
                key={key}
                onClick={() => onAddProduct(product)}
                product={product}
                isAlreadyAdded={checkout.items.some(item => item.id === product.id)}
              />
            ))
          : Array.from({ length: 7 }).map((_, i) => <ProductItemSkeleton key={i} />)}
      </div>
    </div>
  );
}
