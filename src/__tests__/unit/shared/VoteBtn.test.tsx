import React from 'react';
import VoteBtn from '@/shared/Button/VoteBtn';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vote } from '@/actions/vote.action';
import toast from 'react-hot-toast';
jest.mock('@/actions/vote.action.ts', () => ({
  vote: jest.fn(),
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useOptimistic: (
    initialState: { voteCount: number; sending: boolean },
    updater: (
      prevState: { voteCount: number; sending: boolean },
      newVoteCount: number
    ) => { voteCount: number; sending: boolean }
  ) => {
    const [state, setState] = React.useState(initialState);

    const customAddOptimisticLike = (newVoteCount: number) => {
      setState((prevState) => updater(prevState, newVoteCount));
    };

    return [state, customAddOptimisticLike];
  },
}));

describe('Vote Button', () => {
  it('renders the vote button', () => {
    render(
      <VoteBtn missionId='mission123' currRoute='/' voteCount={12} userVotes />
    );
    const likes = screen.getByText(12);
    expect(likes).toBeInTheDocument();
  });

  it('toast error occured when the fetch fails', async () => {
    const toastSpy = jest.spyOn(toast, 'error');
    render(
      <VoteBtn missionId='mission123' currRoute='/' voteCount={12} userVotes />
    );
    const voteBtn = screen.getByRole('button');
    await userEvent.click(voteBtn);
    expect(vote).toHaveBeenCalledWith('mission123', '/');
    expect(toastSpy).toHaveBeenCalledWith('An error occured');
  });

  it('calls vote action on click', async () => {
    render(
      <VoteBtn missionId='mission123' currRoute='/' voteCount={12} userVotes />
    );
    const voteBtn = screen.getByRole('button');
    await userEvent.click(voteBtn);
    expect(vote).toHaveBeenCalledWith('mission123', '/');
  });

  it('toast error when res success is false', async () => {
    (vote as jest.Mock).mockResolvedValue({
      success: false,
      data: null,
      message: 'Vote failed',
      status: 500,
    });
    const toastSpy = jest.spyOn(toast, 'error');
    render(
      <VoteBtn missionId='mission123' currRoute='/' voteCount={12} userVotes />
    );
    const voteBtn = screen.getByRole('button');
    await userEvent.click(voteBtn);
    expect(vote).toHaveBeenCalledWith('mission123', '/');
    expect(toastSpy).toHaveBeenCalledWith('Vote failed');
  });
});
