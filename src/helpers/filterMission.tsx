import { TUserMission } from '@/types/mission.types';

export function filterMissions(
  missions: TUserMission[],
  filterValue: string | null
) {
  if (filterValue == null) return missions;
  if (missions.length == 0) return [];
  const dateCompare = (a: string, b: string) => {
    return a < b ? -1 : a > b ? 1 : 0;
  };
  switch (filterValue) {
    case 'new':
      return missions
        .slice()
        .sort((a, b) => dateCompare(b.createAt, a.createAt));
    case 'draft':
      return missions.filter((mission) => mission.published === false);
    case 'published':
      return missions.filter((mission) => mission.published === true);
    case 'number':
      return missions.slice().sort((a, b) => a.missionOrder - b.missionOrder);
    default:
      return missions;
  }
}
