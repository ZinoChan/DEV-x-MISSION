import Avatar from '../Avatar';

const MissionAuthor = ({
  authorName,
  authorImage,
}: {
  authorName: string | null;
  authorImage: string | null;
}) => {
  return (
    <div className='flex items-center space-x-1'>
      <Avatar src={authorImage} alt={authorName} size='xs' />
      <h6 className='font-body text-sm font-bold'>{authorName ?? 'author'}</h6>
    </div>
  );
};

export default MissionAuthor;
