import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function addMission() {
  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      about: 'I am a software designer',
      location: 'City, Country',
      email: 'john@design.com',
      emailVerified: new Date(),
      image: 'https://randomuser.me/api/portraits/thumb/men/75.jpg',
    },
  });

  const mission = await prisma.mission.create({
    data: {
      missionName: 'Mission 3',
      missionStatus: 'In Progress',
      missionType: 'Type 1',
      published: true,
      skillLevel: 'Intermediate',
      missionObjective: 'Objective for Mission 1',
      userId: user.id,
      missionDetails: 'some details here',
    },
  });

  await prisma.$disconnect();
  return null;
}
