import { xprisma } from '@/lib/prismaExtentions';
import { cache } from 'react';

export const revalidate = 30;

export const getMissions = cache(async () => {
  const missions = await xprisma.mission.getMissions();
  return missions;
});
