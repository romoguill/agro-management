import BreadCrumb from '@/components/BreadCrumb';
import CreateSupplierForm from '@/components/MasterData/CreateSupplierForm';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import { MasterDataEntities } from '@/ts/interfaces';
import { SelectValue } from '@radix-ui/react-select';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function CreateEntity() {
  const [selectedEntity, setSelectedEntity] = useState('');
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const entityParam = searchParams.get('entity');

    if (!entityParam) return;

    setSelectedEntity(entityParam);
    console.log(entityParam);
  }, [searchParams]);

  return (
    <div>
      <BreadCrumb
        location='Create'
        mainLevelName='Master Data'
        mainLevelPath='master-data'
      />

      <Select onValueChange={setSelectedEntity} value={selectedEntity}>
        <SelectTrigger className='bg-slate-100'>
          <SelectValue placeholder='Select what to create' />
        </SelectTrigger>
        <SelectContent>
          {Object.keys(MasterDataEntities).map((key) => (
            <SelectItem
              value={MasterDataEntities[key as keyof typeof MasterDataEntities]}
              key={key}
            >
              {MasterDataEntities[key as keyof typeof MasterDataEntities]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selectedEntity && (
        <hr className='mt-5 w-1/2 m-auto h-[2px] border-none bg-gradient-to-r from-slate-100 via-slate-400 to-slate-100' />
      )}

      <section className='mt-5'>
        {selectedEntity === MasterDataEntities.SUPPLIERS && (
          <CreateSupplierForm />
        )}
      </section>
    </div>
  );
}

export default CreateEntity;
