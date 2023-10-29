'use client';
import { bookmark } from '@/actions/bookmark.action';
import toast from 'react-hot-toast';
import { BiBookmark } from 'react-icons/bi';
import { BsBookmarkFill } from 'react-icons/bs';

type Props = {
  missionId: string;
  currRoute: string;
  missionSaved: boolean;
};
const BookmarkBtn = ({ missionId, currRoute, missionSaved }: Props) => {
  const handleBookmark = async () => {
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
      {missionSaved == true ? (
        <BsBookmarkFill className='text-xl text-primary-2' />
      ) : (
        <BiBookmark className='text-xl' />
      )}
    </button>
  );
};

export default BookmarkBtn;
