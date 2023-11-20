import { render, screen } from '@testing-library/react';
import BackBtn from '../BackBtn';

describe('BackBtn component', () => {
  it('should render a Link component with the provided link prop', () => {
    const link = '/example';
    render(<BackBtn link={link} />);
    const backBtn = screen.getByRole('link', { name: /back/i });
    expect(backBtn).toHaveProperty('href', 'http://localhost/example');
  });
});
