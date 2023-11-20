import useClickOutside from '@/utils/hooks/useClickOutside';
import { renderHook } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('useClickOutside hook', () => {
  it('should call callback function when click event occurs outside of ref element', async () => {
    const ref = { current: document.createElement('div') };
    const callback = jest.fn();
    renderHook(() => useClickOutside(ref, callback));

    const newElement = document.createElement('span');
    document.body.appendChild(newElement);
    await userEvent.click(newElement);
    expect(callback).toHaveBeenCalled();
  });
});
