import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};
const Container = ({ children }: Props) => {
  return <div className='mx-auto max-w-screen-xl px-2'>{children}</div>;
};

export default Container;
