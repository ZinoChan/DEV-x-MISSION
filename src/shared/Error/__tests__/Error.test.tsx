import { render, screen } from '@testing-library/react';
import ErrorUI from '..';
import userEvent from '@testing-library/user-event';

describe('Error ui', () => {
  it('calls the reset function on try again', async () => {
    const resetMock = jest.fn();
    render(<ErrorUI reset={resetMock} />);
    const resetBtn = screen.getByRole('button', { name: /try again/i });
    await userEvent.click(resetBtn);
    expect(resetMock).toHaveBeenCalled();
  });
});
