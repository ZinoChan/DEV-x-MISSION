import { DraftBtn, SubmitBtn } from '@/shared/Button/MissionBtns';
import { render, screen } from '@testing-library/react';

describe('mission buttons', () => {
  it('should render an enabled button when isValid and isDirty', () => {
    render(<SubmitBtn isDirty isValid label='Submit' />);
    const submitBtn = screen.getByRole('button');
    expect(submitBtn).toBeEnabled();
  });
  it('should render a disabled button when not isValid and isDirty', () => {
    render(<SubmitBtn isDirty isValid={false} label='Submit' />);
    const submitBtn = screen.getByRole('button');
    expect(submitBtn).toBeDisabled();
  });
  it('should render an enabled button when isValid and isDirty', () => {
    render(<DraftBtn saveAsDraft={jest.fn()} isDirty isValid label='Submit' />);
    const submitBtn = screen.getByRole('button');
    expect(submitBtn).toBeEnabled();
  });
  it('should render a disabled button when not isValid and isDirty', () => {
    render(
      <DraftBtn
        saveAsDraft={jest.fn()}
        isDirty
        isValid={false}
        label='Submit'
      />
    );
    const submitBtn = screen.getByRole('button');
    expect(submitBtn).toBeDisabled();
  });
});
