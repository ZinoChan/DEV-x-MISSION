import { Fragment } from 'react';
import SectionTitle from './SectionTitle';
import { AiOutlineSearch } from 'react-icons/ai';
import { BiGitPullRequest } from 'react-icons/bi';
import { TbTargetArrow } from 'react-icons/tb';

const steps = [
  {
    icon: <AiOutlineSearch />,
    title: 'Discover Missions',
    description:
      'Browse through a wide variety of missions, use filter feature to find the perfect project for you.',
    bg: 'bg-primary-1',
    shadow: 'shadow-primary-100/70',
  },
  {
    icon: <TbTargetArrow />,
    title: 'Pick Your Mission',
    description:
      'Select from a diverse range of exciting missions that match your interests and expertise',
    bg: 'bg-secondary-1',
    shadow: 'shadow-secondary-100/70',
  },
  {
    icon: <BiGitPullRequest />,
    title: 'Join the Community',
    description:
      'Connect with fellow developers on Discord, GitHub, or Slack. Become a valued contributor and make a real impact.',
    bg: 'bg-secondary-2',
    shadow: 'shadow-secondary-400/70',
  },
];

export default function HowItWorks() {
  return (
    <section className='relative px-2 py-24 lg:px-0'>
      <div className='mx-auto max-w-screen-xl'>
        <SectionTitle
          h3Text='How it works'
          h2Text='From Ideas to Impact: Your Path to Collaboration'
        />
        <div className='grid grid-cols-1 items-start justify-center text-center  md:grid-cols-2 lg:grid-cols-5'>
          {steps.map((step, index) => (
            <Fragment key={index}>
              <div
                className={`mx-auto flex max-w-[300px] flex-col items-center py-5 lg:w-auto lg:px-0 ${
                  index === steps.length - 1
                    ? 'md:col-span-2 lg:col-span-1'
                    : ''
                }`}
              >
                <div
                  className={`mb-6 h-20 w-20 rounded-2xl shadow-md ${step.shadow} flex items-center justify-center text-5xl ${step.bg} text-white`}
                >
                  {step.icon}
                </div>
                <h6 className='mb-4	font-body text-2xl font-semibold text-dark-1'>
                  {step.title}
                </h6>
                <p className='text-base	leading-7 text-gray-4'>
                  {step.description}
                </p>
              </div>
              {index !== steps.length - 1 && (
                <div className='hidden w-[400px] lg:flex'></div>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
