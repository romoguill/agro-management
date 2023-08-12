import BreadCrumb from '@/components/BreadCrumb';
import CreateSupplierForm from '@/components/MasterData/CreateSupplierForm';

function SupplierDetail() {
  return (
    <div>
      <BreadCrumb
        location='Detail'
        mainLevelName='Master Data'
        mainLevelPath='master-data'
      />

      <section className='mt-5'>
        <CreateSupplierForm />
      </section>
    </div>
  );
}

export default SupplierDetail;
