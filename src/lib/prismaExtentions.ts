import { prisma } from './prisma';

export const xprisma = prisma.$extends({
  model: {
    user: {
      async findByEmail(email: string) {
        return prisma.user.findUnique({
          where: { email },
        });
      },
    },
    mission: {
      async findMissionById(id: string) {
        return prisma.mission.findUnique({
          where: { id },
        });
      },
      async areAllFieldsFilled(id: string) {
        return prisma.mission
          .findUnique({
            where: { id },
          })
          .then((data) =>
            data != null
              ? Object.values(data).every((value) => value !== null)
              : null
          );
      },
      async getUserMissions(userId: string) {
        return prisma.mission.findMany({
          where: {
            userId,
          },
          select: {
            id: true,
            missionName: true,
            published: true,
          },
        });
      },
    },
  },
});
