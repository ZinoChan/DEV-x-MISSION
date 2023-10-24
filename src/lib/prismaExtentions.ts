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
            archived: false,
          },
          select: {
            id: true,
            missionName: true,
            published: true,
            createAt: true,
            missionOrder: true,
          },
        });
      },
      async getMissions() {
        return prisma.mission.findMany({
          where: {
            published: true,
            archived: false,
          },
          include: {
            user: {
              select: {
                name: true,
                image: true,
                id: true,
              },
            },
            likes: {
              select: {
                id: true,
                userId: true,
                missionId: true,
              },
            },
            votes: {
              select: {
                id: true,
                userId: true,
                missionId: true,
              },
            },
          },
        });
      },
    },
  },
});
