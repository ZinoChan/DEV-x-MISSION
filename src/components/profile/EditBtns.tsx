import { BiEdit, BiTrash } from 'react-icons/bi';

const EditBtns = () => {
  return (
    <div className='flex items-baseline space-x-3'>
      <button className='text-secondary-3 hover:text-purple-500'>
        <BiEdit className='text-xl' />
      </button>
      <button className='text-red-500 hover:text-red-400'>
        <BiTrash className='text-xl' />
      </button>
    </div>
  );
};

export default EditBtns;
