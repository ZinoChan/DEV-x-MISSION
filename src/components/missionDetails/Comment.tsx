import { Avatar } from '@/shared/Avatar';
import { UserComment } from '@/types/mission.types';

const Comment = ({ comment }: { comment: UserComment }) => {
  return (
    <div className='rounded bg-white p-4 shadow'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center'>
          <Avatar src={comment.user.image} alt={comment.user.name} size='sm' />
          <span className='font-semibold text-gray-700'>
            {comment.user.name}
          </span>
        </div>
        <span className='text-sm text-gray-500'>2 hours ago</span>
      </div>
      <p className='mt-2 text-sm text-gray-4'>{comment.content}</p>
    </div>
  );
};

export default Comment;
