import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export default async function resetDB() {
  const safeToReset = process.env.NODE_ENV == 'test' || process.env.CYPRESS;
  if (!safeToReset) {
    console.log(
      'WARNING: database reset unavailable outside test environement!'
    );
    return;
  }
  return await prisma.$transaction([
    prisma.like.deleteMany(),
    prisma.vote.deleteMany(),
    prisma.comment.deleteMany(),
    prisma.savedMission.deleteMany(),
    prisma.communityLink.deleteMany(),
    prisma.skillRequired.deleteMany(),
    prisma.mission.deleteMany(),
    prisma.user.deleteMany(),
  ]);
}
