import { MdNoteAdd, MdSearch } from 'react-icons/md';
import { Button } from '../ui/button';

interface TableActionsProps {
  search?: boolean;
  filterInactive?: boolean;
  addEntry?: boolean;
}

function TableActions({
  search = true,
  filterInactive = true,
  addEntry = false,
}: TableActionsProps) {
  return (
    <section className='flex justify-between mt-6'>
      <div className='flex gap-6 items-center text-gray-700 font-medium'>
        {search && (
          <div className='rounded-lg bg-white flex justify-between items-center h-full px-2 focus-within:outline focus-within:outline-primary-500/30'>
            <MdSearch className='text-gray-400 text-xl' />
            <input
              type='text'
              placeholder='Search...'
              className='outline-none px-2 py-1 text-gray-600 h-full'
            />
          </div>
        )}

        {filterInactive && (
          <label className=''>
            <input type='checkbox' className='mr-2' />
            Show inactive
          </label>
        )}
      </div>

      {addEntry && (
        <Button className=' gap-2' variant='action'>
          <MdNoteAdd className={'text-xl'} />
          Add New
        </Button>
      )}
    </section>
  );
}
export default TableActions;
