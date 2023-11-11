import { render, screen } from '@testing-library/react';
import Home from '@/app/page';
import '@testing-library/jest-dom';
import { ROUTES } from '@/utils/routes';

it('should have CTA Link', () => {
  render(<Home />);

  const ctaLink = screen.getByText(/get started/i);
  expect(ctaLink).toBeInTheDocument();
  expect(ctaLink).toHaveAttribute('href', ROUTES.MISSIONS);
});
