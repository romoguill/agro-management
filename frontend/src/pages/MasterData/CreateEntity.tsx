import BreadCrumb from '@/components/BreadCrumb';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import { SelectValue } from '@radix-ui/react-select';
import { useState } from 'react';

function CreateEntity() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  return (
    <div>
      <BreadCrumb
        location='Create'
        mainLevelName='Master Data'
        mainLevelPath='master-data'
      />

      <Select>
        <SelectTrigger>
          <SelectValue placeholder='Select what to create' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='Supplier'>Supplier</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default CreateEntity;
