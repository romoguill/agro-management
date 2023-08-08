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
import { useState } from 'react';

function CreateEntity() {
  const [selectedEntity, setSelectedEntity] = useState('');

  return (
    <div>
      <BreadCrumb
        location='Create'
        mainLevelName='Master Data'
        mainLevelPath='master-data'
      />

      <Select onValueChange={setSelectedEntity}>
        <SelectTrigger>
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

      <CreateSupplierForm />

      {/* {selectedEntity === MasterDataEntities.SUPPLIERS && (
        <CreateSupplierForm />
      )} */}
    </div>
  );
}

export default CreateEntity;
