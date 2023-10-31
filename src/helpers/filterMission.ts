import { TUserMission } from '@/types/mission.types';
import { Prisma } from '@prisma/client';
import { MissionQuery } from '@/types/mission.types';
import { REACTION_ORDER } from '@/constants/missionData';

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

export function createMissionFilters(query: MissionQuery) {
  const filters: Prisma.MissionWhereInput = {};

  if (query.skillLevel != null) {
    filters.skillLevel = decodeURIComponent(query.skillLevel);
  }

  if (query.missionStatus != null) {
    filters.missionStatus = decodeURIComponent(query.missionStatus);
  }
  if (query.missionType != null) {
    filters.missionType = decodeURIComponent(query.missionType);
  }

  if (query.skillRequired != null) {
    filters.skillsRequired = {
      some: {
        name: decodeURIComponent(query.skillRequired),
      },
    };
  }

  return filters;
}

export function createOrderFilters(query: MissionQuery) {
  const order: Prisma.MissionOrderByWithRelationInput = {};

  if (query.likes != null) {
    if (query.likes == REACTION_ORDER.HIGH) {
      order.likes = {
        _count: 'asc',
      };
    } else {
      order.likes = {
        _count: 'desc',
      };
    }
  }
  if (query.votes != null) {
    if (query.votes == REACTION_ORDER.HIGH) {
      order.votes = {
        _count: 'asc',
      };
    } else {
      order.votes = {
        _count: 'desc',
      };
    }
  }

  return order;
}
