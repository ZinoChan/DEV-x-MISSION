import React from 'react';
import LikeBtn from '../LikeBtn';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { like } from '@/actions/likes.action';
import toast from 'react-hot-toast';

jest.mock('@/actions/likes.action.ts', () => ({
  like: jest.fn(),
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useOptimistic: (
    initialState: { likeCount: number; sending: boolean },
    updater: (
      prevState: { likeCount: number; sending: boolean },
      newLikeCount: number
    ) => { likeCount: number; sending: boolean }
  ) => {
    const [state, setState] = React.useState(initialState);

    const customAddOptimisticLike = (newLikeCount: number) => {
      setState((prevState) => updater(prevState, newLikeCount));
    };

    return [state, customAddOptimisticLike];
  },
}));

describe('Like Button', () => {
  it('renders the like button', () => {
    render(
      <LikeBtn missionId='mission123' currRoute='/' likeCount={12} userLikes />
    );
    const likes = screen.getByText(12);
    expect(likes).toBeInTheDocument();
  });

  it('calls like action on click', async () => {
    render(
      <LikeBtn missionId='mission123' currRoute='/' likeCount={12} userLikes />
    );
    const likeBtn = screen.getByRole('button');
    await userEvent.click(likeBtn);
    expect(like).toHaveBeenCalledWith('mission123', '/');
  });

  it('toast error when fetch fails', async () => {
    const toastSpy = jest.spyOn(toast, 'error');
    render(
      <LikeBtn missionId='mission123' currRoute='/' likeCount={12} userLikes />
    );
    const likeBtn = screen.getByRole('button');
    await userEvent.click(likeBtn);
    expect(like).toHaveBeenCalledWith('mission123', '/');
    expect(toastSpy).toHaveBeenCalledWith('An error occurred');
  });

  it('toast error when res success is false', async () => {
    (like as jest.Mock).mockResolvedValue({
      success: false,
      data: null,
      message: 'Like failed',
      status: 500,
    });
    const toastSpy = jest.spyOn(toast, 'error');
    render(
      <LikeBtn missionId='mission123' currRoute='/' likeCount={12} userLikes />
    );
    const likeBtn = screen.getByRole('button');
    await userEvent.click(likeBtn);
    expect(like).toHaveBeenCalledWith('mission123', '/');
    expect(toastSpy).toHaveBeenCalledWith('Like failed');
  });
});
