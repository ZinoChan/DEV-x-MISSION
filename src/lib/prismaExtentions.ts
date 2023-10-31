import { prisma } from './prisma';
import { Prisma } from '@prisma/client';

export const xprisma = prisma.$extends({
  model: {
    user: {
      async findByEmail(email: string) {
        return prisma.user.findUnique({
          where: { email },
        });
      },
      async getUserStats(userId: string) {
        return prisma.user.findUnique({
          where: {
            id: userId,
          },
          select: {
            missions: {
              where: {
                archived: false,
              },
              select: {
                id: true,
                likes: {
                  select: {
                    id: true,
                  },
                },
              },
            },

            votes: {
              select: {
                id: true,
              },
            },
            followers: {
              select: {
                followerId: true,
              },
            },
          },
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
      async getMissions(
        filters?: Prisma.MissionWhereInput,
        orders?: Prisma.MissionOrderByWithRelationInput
      ) {
        return prisma.mission.findMany({
          where: {
            ...filters,
            published: true,
            archived: false,
          },
          orderBy: {
            ...orders,
          },
          include: {
            user: {
              select: {
                name: true,
                image: true,
                id: true,
              },
            },
            likes: true,
            votes: true,
          },
        });
      },
      async getMissionById(id: string) {
        return prisma.mission.findUnique({
          where: {
            id,
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
            likes: true,
            votes: true,
            comments: {
              include: {
                user: {
                  select: {
                    id: true,
                    name: true,
                    image: true,
                  },
                },
              },
            },
            communityLinks: true,
          },
        });
      },
    },
  },
});
