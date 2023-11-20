export default function MissionCardLoader() {
  return (
    <div
      role='status'
      className='max-w-sm animate-pulse rounded border border-gray-200 p-4 shadow  md:p-6'
    >
      <div className='flex items-center space-x-6'>
        <div className='mb-4 h-16 w-16 rounded bg-gray-300 '></div>
        <div>
          <div className='mb-1 h-4 w-48 rounded bg-gray-300 '></div>
          <div className='mb-4 h-4 w-48 rounded bg-gray-300 '></div>
        </div>
      </div>
      <div className='mb-4 h-2.5 w-48 rounded-full bg-gray-300 '></div>
      <div className='mb-2.5 h-2 rounded-full bg-gray-300 '></div>
      <div className='mb-2.5 h-2 rounded-full bg-gray-300 '></div>
      <div className='h-2 rounded-full bg-gray-300 '></div>
      <div className='mt-4 flex items-center space-x-3'>
        <svg
          className='h-10 w-10 text-gray-300'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          fill='currentColor'
          viewBox='0 0 20 20'
        >
          <path d='M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z' />
        </svg>
        <div>
          <div className='mb-2 h-2.5 w-32 rounded-full bg-gray-300 '></div>
          <div className='h-2 w-48 rounded-full bg-gray-300 '></div>
        </div>
      </div>
      <span className='sr-only'>Loading...</span>
    </div>
  );
}
