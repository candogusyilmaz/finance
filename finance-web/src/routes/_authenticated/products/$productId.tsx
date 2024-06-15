import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from 'react-query';
import { api } from 'src/api/axios';

export const Route = createFileRoute('/_authenticated/products/$productId')({
  component: Product,
  parseParams: (rawParams) => ({
    productId: Number.parseInt(rawParams.productId)
  })
});

function Product() {
  const { productId } = Route.useParams();
  const query = useQuery({
    queryKey: ['products', productId],
    queryFn: async () => {
      return (await api.get(`/products/${productId}`)).data;
    }
  });

  return <pre>as</pre>;
}
