import { render, screen } from '@testing-library/react';
import MissionAuthor from '../MissionAuthor';

describe('Author Component', () => {
  it('renders correctly when props are provided', () => {
    render(
      <MissionAuthor
        authorImage='https://pfps.gg/assets/pfps/3260-eren-yeager.png'
        authorName='eren'
      />
    );
    const authorName = screen.getByRole('heading', { name: /eren/i });
    expect(authorName).toBeInTheDocument();
  });
  it('renders author as the author name if author name is null', () => {
    render(
      <MissionAuthor
        authorImage='https://pfps.gg/assets/pfps/3260-eren-yeager.png'
        authorName={null}
      />
    );
    const authorName = screen.getByRole('heading', { name: /author/i });
    expect(authorName).toBeInTheDocument();
  });
});
