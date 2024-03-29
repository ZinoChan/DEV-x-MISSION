'use client';
import { AiOutlineClose } from 'react-icons/ai';
import Comment from './Comment';
import AddComment from './AddComment';
import { useCommentsContext } from '@/context/comments';
import { UserComment } from '@/types/mission.types';

const CommentsList = ({
  missionId,
  comments,
}: {
  missionId: string;
  comments: UserComment[];
}) => {
  const { isOpen, setOpen } = useCommentsContext();
  return (
    <div
      className={`fixed inset-y-0 right-0 z-20 w-96 max-w-sm overflow-y-auto shadow-md ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } bg-light-2 transition-all duration-200 ease-linear`}
    >
      <div className='container mx-auto p-6'>
        <div className='flex items-center justify-between'>
          <h2 className='text-2xl font-semibold'>Comments</h2>
          <button
            onClick={() => setOpen(false)}
            className='flex items-baseline rounded-full border-2 border-dark-1 p-1 text-dark-1 transition-all duration-200 hover:border-red-500 hover:bg-red-500 hover:text-white'
          >
            <AiOutlineClose />
          </button>
        </div>
        <AddComment missionId={missionId} />
        <div className='mt-6'>
          <h4 className='font-body text-sm font-bold'>Most relevant</h4>
        </div>
        <div className='mt-6 space-y-4'>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))
          ) : (
            <div>no comment yet</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentsList;
