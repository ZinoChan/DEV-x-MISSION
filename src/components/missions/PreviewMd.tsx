import { AiOutlineClose } from 'react-icons/ai';
import Markdown from 'react-markdown';

type Props = {
  markdown: string;
  setPreviewOpen: (isopen: boolean) => void;
};

const PreviewMd = ({ markdown, setPreviewOpen }: Props) => {
  return (
    <div className='fixed inset-0 z-20 h-screen w-screen overflow-y-scroll bg-light-2'>
      <div className='mx-auto max-w-screen-md py-10'>
        <button
          onClick={() => setPreviewOpen(false)}
          className='absolute right-10 top-10 flex items-center rounded-full border-2 border-red-500 p-2 text-red-500 transition-all duration-200 hover:bg-red-500 hover:text-white'
        >
          <AiOutlineClose />
        </button>
        <div className='prose mx-auto max-h-[80vh] max-w-screen-md overflow-y-scroll'>
          <Markdown>{markdown}</Markdown>
        </div>
        <div className='mt-10 flex justify-end'>
          <button
            onClick={() => setPreviewOpen(false)}
            className='rounded bg-red-500 px-4 py-2 text-end font-medium text-white'
          >
            close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewMd;
