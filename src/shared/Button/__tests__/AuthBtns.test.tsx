import { render, screen } from '@testing-library/react';
import { AuthButton, SignInButton, SignOutButton } from '../AuthBtns';
import { signIn, useSession } from 'next-auth/react';
import userEvent from '@testing-library/user-event';
jest.mock('next-auth/react');

describe('Auth Buttons Component', () => {
  it('should have avatar when authenticated', () => {
    (useSession as jest.Mock).mockReturnValueOnce({
      data: {
        user: {
          name: 'eren',
          image: 'https://randomuser.me/api/portraits/thumb/men/75.jpg',
          email: 'user@gmail.com',
        },
      },
      status: 'authenticated',
    });
    render(<AuthButton />);
    const avatar = screen.getByAltText(/eren/i);
    expect(avatar).toBeInTheDocument();
  });

  it('should render correctly when unauthenticated', () => {
    (useSession as jest.Mock).mockReturnValueOnce({
      data: {},
      status: 'unauthenticated',
    });
    render(<AuthButton />);
    const registerBtn = screen.getByText(/register/i);

    expect(registerBtn).toBeInTheDocument();
  });

  it('should sign in user', async () => {
    (useSession as jest.Mock).mockReturnValueOnce({
      data: {},
      status: 'unauthenticated',
    });
    render(<AuthButton />);
    const registerBtn = screen.getByText(/register/i);

    await userEvent.click(registerBtn);
    expect(signIn as jest.Mock).toHaveBeenCalled();
  });

  it('should render sign in button', () => {
    render(<SignInButton />);
    const registerBtn = screen.getByText(/register/i);
    expect(registerBtn).toBeInTheDocument();
  });

  it('should render sign out button', () => {
    render(<SignOutButton />);
    const signOutBtn = screen.getByText(/sign out/i);
    expect(signOutBtn).toBeInTheDocument();
  });
});
