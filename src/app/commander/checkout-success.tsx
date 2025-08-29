import { CloudPrinterOrder, Product } from '@/types';
import { CheckoutResumeItem, CheckoutTotalPrice } from '@/app/commander/index';

interface CheckoutSuccessProps {
  products: Product[];
  order: CloudPrinterOrder;
}

// todo: change reference from uuid to increasing int
// todo: add "Sous-Total"
// todo: set text as neutral low
export default function CheckoutSuccess({ products, order }: CheckoutSuccessProps) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-lg font-bold">Merci pour votre commande !</span>
      <span className="text-neutral-low mb-4">
        Vos supports de communication vont être préparés et expédiés prochainement
      </span>
      <div className="flex flex-row gap-1 pb-4">
        <span className="text-neutral-low">Numéro de commande :</span>
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
      <div className="font-bold flex flex-row justify-between gap-2 mb-6">
        <span>Sous total</span>
        <CheckoutTotalPrice order={order} products={products} />
      </div>
      <div className="flex flex-col text-neutral-low">
        <span className="font-bold mb-2 text-black">Informations de livraison</span>
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
