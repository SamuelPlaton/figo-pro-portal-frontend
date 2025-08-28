import { CloudPrinterOrder, Product } from '@/types';
import { CheckoutResumeItem, ProductItem } from '@/app/commander/index';

interface CheckoutSuccessProps {
  products: Product[];
  order: CloudPrinterOrder;
}

// todo: change reference from uuid to increasing int
// todo: add "Sous-Total"
// todo: set text as neutral low
export default function CheckoutSuccess({ products, order }: CheckoutSuccessProps) {
  return (
    <div className="flex flex-col">
      <span className="md:text-lg font-bold">Merci pour votre commande !</span>
      <span className="mb-4">
        Vos supports de communication vont être préparés et expédiés prochainement
      </span>
      <div className="flex flex-row gap-1 pb-4">
        <span>Numéro de commande :</span>
        <span className="font-bold text-primary">{order.reference}</span>
      </div>
      <div className="mb-4">
        {order.items.map((item, key) => (
          <CheckoutResumeItem
            key={key}
            product={products.find(p => item.reference === p.external_reference)}
            className="py-4 border-y border-neutral-lower"
          />
        ))}
      </div>
      <div className="flex flex-col">
        <span className="font-bold mb-2">Informations de livraison</span>
        <span>
          {order.addresses[0].firstname} {order.addresses[0].lastname}
        </span>
        <span>{order.addresses[0].company}</span>
        <span>{order.addresses[0].street1}</span>
        <span>
          {order.addresses[0].zip}, {order.addresses[0].city}
        </span>
      </div>
    </div>
  );
}
