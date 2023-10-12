const Comment = () => {
  return (
    <div className='rounded bg-white p-4 shadow'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center'>
          <div className='mr-2 h-8 w-8 rounded-full bg-gray-300' />
          <span className='font-semibold text-gray-700'>John Doe</span>
        </div>
        <span className='text-sm text-gray-500'>2 hours ago</span>
      </div>
      <p className='mt-2 text-sm text-gray-4'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in
        turpis eros.
      </p>
    </div>
  );
};

export default Comment;
