import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function seedDB() {
  // Create users
  const user1 = await prisma.user.create({
    data: {
      name: 'John Doe',
      about: 'I am a software developer',
      location: 'City, Country',
      email: 'john@example.com',
      emailVerified: new Date(),
      image: 'https://randomuser.me/api/portraits/thumb/men/75.jpg',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Jane Doe',
      about: 'I love coding',
      location: 'Another City',
      email: 'jane@example.com',
      emailVerified: new Date(),
      image: 'https://randomuser.me/api/portraits/thumb/men/75.jpg',
    },
  });

  // Create missions
  const mission1 = await prisma.mission.create({
    data: {
      missionName: 'Mission 1',
      missionStatus: 'In Progress',
      missionType: 'Type 1',
      published: true,
      skillLevel: 'Intermediate',
      missionObjective: 'Objective for Mission 1',
      userId: user1.id,
      missionDetails: 'some details here',
    },
  });

  const mission2 = await prisma.mission.create({
    data: {
      missionName: 'Mission 2',
      missionStatus: 'Completed',
      missionType: 'Type 2',
      published: true,
      skillLevel: 'Advanced',
      missionObjective: 'Objective for Mission 2',
      userId: user2.id,
      missionDetails: 'some details here',
    },
  });

  // Create likes
  await prisma.like.create({
    data: {
      userId: user1.id,
      missionId: mission2.id,
    },
  });

  // Create votes
  await prisma.vote.create({
    data: {
      userId: user2.id,
      missionId: mission1.id,
    },
  });

  // Create saved missions
  await prisma.savedMission.create({
    data: {
      userId: user1.id,
      missionId: mission2.id,
    },
  });

  // Create comments
  await prisma.comment.create({
    data: {
      userId: user2.id,
      missionId: mission1.id,
      content: 'Great mission!',
    },
  });

  // Create community links
  await prisma.communityLink.create({
    data: {
      linkName: 'Community Link 1',
      linkUrl: 'https://example.com/link1',
      missionId: mission1.id,
    },
  });

  // Create skill required
  await prisma.skillRequired.create({
    data: {
      name: 'JavaScript',
      missionId: mission2.id,
    },
  });

  await prisma.$disconnect();
  return null;
}
