import { addComment } from '@/actions/comment.action';

export default function AddComment({ missionId }: { missionId: string }) {
  return (
    <form
      action={addComment}
      className='mt-4 rounded-md bg-white px-4 py-2 shadow'
    >
      <input type='hidden' name='missionId' value={missionId} />
      <div className='mb-1'>
        <label
          htmlFor='content'
          className='mb-2 block text-sm font-bold text-gray-700'
        >
          Your Comment:
        </label>
        <textarea
          id='content'
          name='content'
          className='w-full border-b border-gray-2 p-2 focus:border-primary-1 focus:outline-none focus:ring-primary-1'
          rows={4}
        ></textarea>
      </div>
      <div className='flex justify-end'>
        <button className='rounded-lg bg-primary-1 px-4 py-2 text-sm font-medium  text-dark-1 hover:bg-primary-1/70'>
          Comment
        </button>
      </div>
    </form>
  );
}
