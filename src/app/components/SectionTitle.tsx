interface Props {
  h2Text: string;
  h3Text: string;
}

const SectionTitle: React.FC<Props> = ({ h2Text, h3Text }) => {
  return (
    <div className='mx-auto mb-20 flex max-w-lg flex-col items-center justify-center space-y-4'>
      <h3 className='text-center font-body font-bold uppercase leading-snug  text-primary-2'>
        {h3Text}
      </h3>
      <h2 className='text-center text-4xl font-bold leading-relaxed tracking-wider text-dark-1 sm:text-4xl'>
        {h2Text}
      </h2>
    </div>
  );
};

export default SectionTitle;
