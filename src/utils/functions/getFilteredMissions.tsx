import {
  createMissionFilters,
  createOrderFilters,
} from '@/helpers/filterMission';
import { xprisma } from '@/lib/prismaExtentions';
import { cache } from 'react';

export const getFilteredMissions = cache(
  async (searchParams: { [key: string]: string | string[] | undefined }) => {
    const missions = await xprisma.mission.getMissions(
      createMissionFilters(searchParams),
      createOrderFilters(searchParams)
    );
    return missions;
  }
);
