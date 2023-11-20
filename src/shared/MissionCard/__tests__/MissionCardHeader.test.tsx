import { render, screen } from '@testing-library/react';
import MissionCardHeader from '../MissionCardHeader';

describe('Mission Card Header Component', () => {
  it('renders correctly', () => {
    render(
      <MissionCardHeader
        id='123'
        missionName='my new mission'
        missionObjective='have some objectives'
        missionStatus='ideation'
        skillLevel='beginner'
      />
    );
    const missionName = screen.getByRole('link', {
      name: /my new mission/i,
    });
    expect(missionName).toBeInTheDocument();
  });
  it('should render the correct mission status icon', () => {
    render(
      <MissionCardHeader
        id='123'
        missionName='my new mission'
        missionObjective='have some objectives'
        missionStatus='ideation'
        skillLevel='beginner'
      />
    );
    const missionStatus = screen.getByTestId('ideation-icon');
    expect(missionStatus).toBeInTheDocument();
  });
  it('should render the correct mission skill level', () => {
    render(
      <MissionCardHeader
        id='123'
        missionName='my new mission'
        missionObjective='have some objectives'
        missionStatus='ideation'
        skillLevel='beginner'
      />
    );
    const missionSkillLevel = screen.getByText('beginner');
    expect(missionSkillLevel).toBeInTheDocument();
  });
});
