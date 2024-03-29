import { render, screen } from '@testing-library/react';
import Avatar from '..';

describe('Avatar component', () => {
  it('should render a small avatar with the provided src and alt', () => {
    const src = 'https://pfps.gg/assets/pfps/3260-eren-yeager.png';
    const alt = 'eren yeager';

    render(<Avatar src={src} alt={alt} size='sm' />);

    const avatarAlt = screen.getAllByAltText(alt);
    expect(avatarAlt[0]).toBeInTheDocument();
  });
  it('should render a small avatar with the provided src and default alt', () => {
    const src = 'https://pfps.gg/assets/pfps/3260-eren-yeager.png';

    render(<Avatar src={src} size='sm' />);

    const avatarAlt = screen.getAllByAltText('user');
    expect(avatarAlt[0]).toBeInTheDocument();
  });
  it('should render a small avatar with the user placeholder', () => {
    const src = null;

    render(<Avatar src={src} size='sm' />);

    const avatarImg = screen.getAllByTestId('avatar-placeholder');
    expect(avatarImg[0]).toBeInTheDocument();
  });
});
