const loading = () => {
  return (
    <section className='mx-auto mb-20 max-w-screen-md px-4 py-20 xl:px-0'>
      <div className='mb-8 flex items-center space-x-1'>
        <div className='h-6 w-6 animate-pulse bg-gray-300'></div>
        <div className='h-4 w-16 animate-pulse bg-gray-300'></div>
      </div>
      <div className='mb-2'>
        <div className='h-6 w-16 animate-pulse bg-gray-300'></div>
      </div>
      <div className='mb-4'>
        <div className='h-8 w-1/2 animate-pulse bg-gray-300'></div>
      </div>
      <div className='mb-4'>
        <div className='h-6 w-1/3 animate-pulse bg-gray-300'></div>
      </div>
      <div className='mb-8'>
        <div className='h-64 w-full animate-pulse bg-gray-300'></div>
      </div>
      <div className=' mb-20 mt-4 text-gray-800'>
        <div className='mb-2 h-6 w-full animate-pulse bg-gray-300'></div>
        <div className='my-4 h-6 w-full animate-pulse bg-gray-300'></div>
        <div className='mb-2 h-6 w-full animate-pulse bg-gray-300'></div>
        <div className='my-4 h-6 w-full animate-pulse bg-gray-300'></div>
        <div className='mb-2 h-6 w-full animate-pulse bg-gray-300'></div>
        <div className='h-6 w-full animate-pulse bg-gray-300'></div>
      </div>
      <div>
        <div className='grid grid-cols-1 items-center border border-gray-200 bg-gray-200/40 p-4 sm:p-6 md:grid-cols-7 md:gap-10'>
          <div className='mx-auto mb-4 h-24 w-24 rounded-full md:mb-0'>
            <div className='h-full w-full animate-pulse rounded-full bg-gray-300'></div>
          </div>
          <div className='col-span-6 text-center text-gray-2 md:text-left'>
            <h4 className='mb-2 text-xl font-bold'>
              <div className='h-6 w-1/3 animate-pulse bg-gray-300'></div>
            </h4>
            <div className='text-sm leading-relaxed'>
              <div className='mb-2 h-6 w-full animate-pulse bg-gray-300'></div>
              <div className='h-6 w-full animate-pulse bg-gray-300'></div>
              <div className='h-6 w-4/5 animate-pulse bg-gray-300'></div>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-8 flex items-center space-x-4 font-bold'>
        <div className='h-6 w-6 animate-pulse bg-gray-300'></div>
        <div className='h-4 w-16 animate-pulse bg-gray-300'></div>
      </div>
    </section>
  );
};

export default loading;
