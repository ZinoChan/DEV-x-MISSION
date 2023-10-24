import { DangerBtn } from '../Button/Btns';

type Props = {
  reset: () => void;
};

const ErrorUI = ({ reset }: Props) => {
  return (
    <div className='fixed inset-0 z-[-1]  flex  items-center justify-center px-4 py-16'>
      <div className='max-w-screen-sm rounded border-2 border-dashed border-red-500 p-20 text-center'>
        <h2 className='mb-6 text-3xl tracking-wider'>Something went wrong!</h2>
        <DangerBtn onClick={() => reset()}>Try again</DangerBtn>
      </div>
    </div>
  );
};

export default ErrorUI;
