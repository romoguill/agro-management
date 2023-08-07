import { MasterDataEntities } from '@/ts/interfaces';
import MasterDataCard, {
  MasterDataCardProps,
} from '../../components/MasterDataCard';

function MasterData() {
  const options: MasterDataCardProps[] = [
    {
      title: MasterDataEntities.SUPPLIERS,
      description:
        'Suppliers details such as contact details, their products and payment info',
      link: 'suppliers',
    },
    {
      title: MasterDataEntities.PRODUCTS,
      description:
        'Product description, suppliers that provide them and parameters used for the app',
      link: 'products',
    },
    {
      title: MasterDataEntities.CURRENCIES,
      description:
        'Currencies availables with their conversion rate and other variables',
      link: 'currencies',
    },
    {
      title: MasterDataEntities.FARM_PLOTS,
      description: 'Manage and create new plots of land to be used',
      link: 'plots',
    },
    {
      title: MasterDataEntities.AGRICULTIRE,
      description: 'Details about crops',
      link: 'crops',
    },
  ];

  return (
    <section className='grid gap-4 auto-rows-[1fr] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-6 mt-5'>
      {options.map((option) => (
        <MasterDataCard key={option.title} {...option} />
      ))}
    </section>
  );
}
export default MasterData;
