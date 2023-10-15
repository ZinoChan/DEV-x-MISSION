import Post from '@/shared/Post';

const UserMissionDetails = () => {
  return (
    <section className='pt-10 '>
      <div className='mx-auto max-w-screen-md'>
        <Post editBtns mission_slug='mission_slug' />
      </div>
    </section>
  );
};

export default UserMissionDetails;
