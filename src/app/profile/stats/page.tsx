import { BiGroup, BiHeart, BiSolidUpvote, BiTask } from 'react-icons/bi';

const data = [
  {
    icon: <BiHeart className='text-3xl text-red-400' />,
    name: 'Likes',
    value: 500,
  },
  {
    icon: <BiGroup className='text-3xl text-primary-2' />,
    name: 'Followers',
    value: 10,
  },
  {
    icon: <BiTask className='text-3xl text-secondary-3' />,
    name: 'Missions',
    value: 5,
  },
  {
    icon: <BiSolidUpvote className='text-3xl text-secondary-2' />,
    name: 'Votes',
    value: 50,
  },
];

function Stats() {
  return (
    <section className='grid min-w-[300px] max-w-full justify-center gap-10 py-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      {data.map((item) => (
        <div
          key={item.name}
          className='flex min-h-[150px] max-w-sm flex-col items-center justify-center space-y-2 rounded-lg border border-gray-200 bg-white bg-gradient-to-b from-[#F4F6F0] to-[#eee] p-6 text-center shadow'
        >
          {item.icon}
          <span className='mt-3 text-xl font-bold'>{item.value}</span>
          <p className='text-sm font-medium text-dark-1'>{item.name}</p>
        </div>
      ))}
    </section>
  );
}

export default Stats;
