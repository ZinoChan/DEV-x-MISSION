import { deleteComment } from '@/actions/comment.action';
import { Avatar } from '@/shared/Avatar';
import { UserComment } from '@/types/mission.types';
import { TrashCan } from '@carbon/icons-react';
import toast from 'react-hot-toast';
import TimeAgo from 'react-timeago';

const Comment = ({ comment }: { comment: UserComment }) => {
  const handleCommentDel = async () => {
    const res = await deleteComment(comment.id);
    if (res.success && res.data != null) toast.success('comment deleted');
    else toast(res.message);
  };
  return (
    <div className='relative rounded bg-white p-4 shadow'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Avatar src={comment.user.image} alt={comment.user.name} size='sm' />
          <span className='font-semibold text-gray-700'>
            {comment.user.name}
          </span>
        </div>
        <span className='text-sm text-gray-500'>
          <TimeAgo date={comment.updateAt} />
        </span>
      </div>
      <p className='mt-2 text-sm text-gray-4'>{comment.content}</p>
      {comment.user.id === comment.userId && (
        <div className='absolute bottom-2 right-2'>
          <button onClick={handleCommentDel} className='text-red-400'>
            <TrashCan />
          </button>
        </div>
      )}
    </div>
  );
};

export default Comment;
