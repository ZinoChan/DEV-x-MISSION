type Props = {
  linkName: string;
  linkUrl: string;
};
const CommunityLinksList = ({ linkName, linkUrl }: Props) => {
  return (
    <div className='mb-2 flex items-center justify-start space-x-2'>
      <span className='font-bold capitalize'>{linkName}:</span>
      <a
        href={linkUrl}
        className='text-sm text-blue-500 hover:text-blue-600 hover:underline focus:text-blue-700'
        target='_blank'
        rel='noopener noreferrer'
      >
        {linkUrl}
      </a>
    </div>
  );
};

export default CommunityLinksList;
