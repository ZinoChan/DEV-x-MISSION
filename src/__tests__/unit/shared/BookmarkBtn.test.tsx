import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { bookmark } from '@/actions/bookmark.action';
import toast from 'react-hot-toast';
import BookmarkBtn from '@/shared/Button/BookmarkBtn';
jest.mock('@/actions/bookmark.action.ts', () => ({
  bookmark: jest.fn(),
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useOptimistic: (
    initialState: { missionSaved: boolean; sending: boolean },
    updater: (
      prevState: { missionSaved: boolean; sending: boolean },
      newBookmarkState: boolean
    ) => { missionSaved: boolean; sending: boolean }
  ) => {
    const [state, setState] = React.useState(initialState);

    const customAddOptimisticLike = (newBookmarkState: boolean) => {
      setState((prevState) => updater(prevState, newBookmarkState));
    };

    return [state, customAddOptimisticLike];
  },
}));

describe('Bookmark Button', () => {
  it('renders bookmark filled svg when mission is saved', () => {
    render(<BookmarkBtn missionId='mission123' currRoute='/' missionSaved />);
    const bookmarkBtn = screen.getByTestId('bookmark-fill');
    expect(bookmarkBtn).toBeInTheDocument();
  });

  it('renders bookmark unfilled svg when mission is saved', () => {
    render(
      <BookmarkBtn missionId='mission123' currRoute='/' missionSaved={false} />
    );
    const bookmarkBtn = screen.getByTestId('bookmark-unfill');
    expect(bookmarkBtn).toBeInTheDocument();
  });

  it('calls bookmark action on click', async () => {
    render(
      <BookmarkBtn missionId='mission123' currRoute='/' missionSaved={false} />
    );
    const bookmarkBtn = screen.getByRole('button');
    await userEvent.click(bookmarkBtn);
    expect(bookmark).toHaveBeenCalledWith('mission123', '/');
  });

  it('toast error occured when the save fails', async () => {
    const toastSpy = jest.spyOn(toast, 'error');
    render(
      <BookmarkBtn missionId='mission123' currRoute='/' missionSaved={false} />
    );
    const bookmarkBtn = screen.getByRole('button');
    await userEvent.click(bookmarkBtn);
    expect(toastSpy).toHaveBeenCalledWith('An error occured');
  });

  it('toast the correct error message when res success is false', async () => {
    (bookmark as jest.Mock).mockResolvedValue({
      success: false,
      data: null,
      message: 'Bookmark failed',
      status: 500,
    });
    const toastSpy = jest.spyOn(toast, 'error');
    render(
      <BookmarkBtn missionId='mission123' currRoute='/' missionSaved={false} />
    );
    const bookmarkBtn = screen.getByRole('button');
    await userEvent.click(bookmarkBtn);
    expect(toastSpy).toHaveBeenCalledWith('Bookmark failed');
  });
  it('toast the correct message when mission is saved', async () => {
    (bookmark as jest.Mock).mockResolvedValue({
      success: true,
      data: null,
      message: null,
      status: 500,
    });
    const toastSpy = jest.spyOn(toast, 'success');
    render(
      <BookmarkBtn missionId='mission123' currRoute='/' missionSaved={false} />
    );
    const bookmarkBtn = screen.getByRole('button');
    await userEvent.click(bookmarkBtn);
    expect(toastSpy).toHaveBeenCalledWith('mission saved');
  });
  it('toast the correct message when mission is unsaved', async () => {
    (bookmark as jest.Mock).mockResolvedValue({
      success: true,
      data: null,
      message: null,
      status: 500,
    });
    const toastSpy = jest.spyOn(toast, 'success');
    render(
      <BookmarkBtn missionId='mission123' currRoute='/' missionSaved={true} />
    );
    const bookmarkBtn = screen.getByRole('button');
    await userEvent.click(bookmarkBtn);
    expect(toastSpy).toHaveBeenCalledWith('mission unsaved');
  });
});
