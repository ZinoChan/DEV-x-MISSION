'use client';
import { bookmark } from '@/actions/bookmark.action';
import { useOptimistic } from 'react';
import toast from 'react-hot-toast';
import { BiBookmark } from 'react-icons/bi';
import { BsBookmarkFill } from 'react-icons/bs';
import Spinner from '../Spinner';

type Props = {
  missionId: string;
  currRoute: string;
  missionSaved: boolean;
};
const BookmarkBtn = ({ missionId, currRoute, missionSaved }: Props) => {
  const [optimisticBookmark, addOptimisticBookmark] = useOptimistic(
    { missionSaved, sending: false },
    (state, newBookmarkState: boolean) => ({
      ...state,
      missionSaved: newBookmarkState,
      sending: true,
    })
  );
  const handleBookmark = async () => {
    const optimisticResult = missionSaved ? false : true;
    addOptimisticBookmark(optimisticResult);
    const res = await bookmark(missionId, currRoute);
    if (res.success) {
      if (missionSaved) toast.success('mission unsaved');
      else toast.success('mission saved');
    }
    if (!res.success) toast(res.message);
  };
  return (
    <button
      className='flex items-center hover:text-primary-2'
      onClick={handleBookmark}
    >
      {optimisticBookmark.sending == true ? (
        <Spinner />
      ) : optimisticBookmark.missionSaved == true ? (
        <BsBookmarkFill className='text-xl text-primary-2' />
      ) : (
        <BiBookmark className='text-xl' />
      )}
    </button>
  );
};

export default BookmarkBtn;
