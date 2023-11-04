import { AiFillHeart } from 'react-icons/ai';
import SectionTitle from './SectionTitle';
import { BsFillBookmarkCheckFill } from 'react-icons/bs';
import { BiSolidUpvote } from 'react-icons/bi';

const chooseUsData = [
  {
    Icon: BiSolidUpvote,
    bg: 'bg-primary-2',
    title: 'Community Influence',
    description:
      'Have your say in which missions take center stage. Use our voting system to support the missions you are passionate about and help them rise to the top',
  },
  {
    Icon: AiFillHeart,
    bg: 'bg-secondary-3',
    title: 'Show Your Appreciation',
    description:
      'Connect with fellow learners, share your experiences, ask questions, and practice with native speakers.',
  },
  {
    Icon: BsFillBookmarkCheckFill,
    bg: 'bg-secondary-1',
    title: 'Bookmark Your Favorites',
    description:
      'Keep track of missions that catch your eye. curate a personal list of projects you want to explore further or contribute to.',
  },
];

export default function Features() {
  return (
    <section className='mx-auto max-w-screen-xl px-4 py-20 xl:px-0'>
      <SectionTitle
        h3Text='Our Features'
        h2Text='Enjoyable & Rewarding Experience!'
      />
      <div className='flex flex-col gap-10'>
        {chooseUsData.map((data, index) => (
          <article key={index} className={index === 1 ? 'sm:self-end' : ''}>
            <div className='flex flex-col items-center justify-center space-y-6 sm:flex-row sm:items-start sm:justify-normal sm:space-x-6 sm:space-y-0'>
              <div
                className={`${data.bg} flex h-20 w-20 items-center justify-center rounded shadow-lg`}
              >
                <data.Icon className='text-4xl text-white' />
              </div>
              <div className='max-w-md text-center sm:text-left'>
                <h6 className='mb-2 font-body text-2xl font-bold text-gray-700'>
                  {data.title}
                </h6>
                <p className='text-sm leading-[1.6] text-gray-4'>
                  {data.description}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
