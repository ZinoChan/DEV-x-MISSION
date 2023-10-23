import { HTTP_STATUS } from '@/constants/httpStatus';
import { prisma } from '@/lib/prisma';
import { xprisma } from '@/lib/prismaExtentions';
import { PrismaUserMission } from '@/types/mission.types';
import { HttpException } from '@/utils/ErrHandling/HttpException';
import { Mission } from '@prisma/client';

export async function getMissions(
  currentUserEmail: string | null | undefined
): Promise<PrismaUserMission[]> {
  if (currentUserEmail == null)
    throw new HttpException(HTTP_STATUS.NOT_FOUND, 'user email does not exist');

  const user = await xprisma.user.findByEmail(currentUserEmail);
  if (user === null)
    throw new HttpException(HTTP_STATUS.NOT_FOUND, 'user does not exists');

  const userMissions = await xprisma.mission.getUserMissions(user.id);
  return userMissions;
}

export async function addMission(
  req: Request,
  currentUserEmail: string | null | undefined
): Promise<Mission> {
  if (currentUserEmail == null)
    throw new HttpException(HTTP_STATUS.NOT_FOUND, 'user email does not exist');

  const user = await xprisma.user.findByEmail(currentUserEmail);
  if (user === null)
    throw new HttpException(HTTP_STATUS.NOT_FOUND, 'user does not exists');
  const data = await req.json();
  const mission = await prisma.mission.create({
    data: { ...data, userId: user.id },
  });
  return mission;
}

export async function updateMission(
  req: Request,
  missionId: string,
  currentUserEmail: string | null | undefined
): Promise<Mission> {
  if (currentUserEmail == null)
    throw new HttpException(HTTP_STATUS.NOT_FOUND, 'user email does not exist');

  const user = await xprisma.user.findByEmail(currentUserEmail);
  if (user === null)
    throw new HttpException(HTTP_STATUS.NOT_FOUND, 'user does not exists');

  const missionExists = await xprisma.mission.findMissionById(missionId);
  if (missionExists == null)
    throw new HttpException(HTTP_STATUS.NOT_FOUND, 'mission not found');

  const data = await req.json();

  const updateData = {} as Mission;
  if (data.missionName != null) {
    updateData.missionName = data.missionName;
  }
  if (data.missionStatus != null) {
    updateData.missionStatus = data.missionStatus;
  }
  if (data.missionType != null) {
    updateData.missionType = data.missionType;
  }
  if (data.skillLevel != null) {
    updateData.skillLevel = data.skillLevel;
  }
  if (data.missionObjective != null) {
    updateData.missionObjective = data.missionObjective;
  }

  if (data.missionDetails != null) {
    updateData.missionDetails = data.missionDetails;
  }

  if (data.skillRequired != null) {
    for (const skillName of data.skillRequired) {
      await prisma.skillRequired.create({
        data: {
          name: skillName,
          mission: { connect: { id: missionId } },
        },
      });
    }
  }
  if (data.communityLinks != null) {
    for (const link of data.communityLinks) {
      await prisma.communityLink.create({
        data: {
          linkName: link.name,
          linkUrl: link.url,
          mission: { connect: { id: missionId } },
        },
      });
    }
  }
  if (data.published == true) {
    const allFieldsAreField =
      await xprisma.mission.areAllFieldsFilled(missionId);
    if (allFieldsAreField == true) updateData.published = true;
  }
  const mission = await prisma.mission.update({
    where: {
      id: missionId,
    },
    data: updateData,
  });
  return mission;
}

/*
 * HACK: Currently Archiving mission instead of deleting.
 * NOTE: Deleting a mission will cause user to lose access to liked missions
 * TODO: investigate and implement a more efficient deletion method.
 */

export async function deleteMission(
  missionId: string,
  currentUserEmail: string | null | undefined
): Promise<Mission> {
  if (currentUserEmail == null)
    throw new HttpException(HTTP_STATUS.NOT_FOUND, 'user email does not exist');

  const user = await xprisma.user.findByEmail(currentUserEmail);
  if (user === null)
    throw new HttpException(HTTP_STATUS.NOT_FOUND, 'user does not exists');
  const archivedMission = await prisma.mission.update({
    where: { id: missionId, userId: user.id },
    data: {
      archived: true,
    },
  });
  if (archivedMission != null) return archivedMission;
  else
    throw new HttpException(
      HTTP_STATUS.NOT_FOUND,
      'Mission not found or you do not have permission to delete it.'
    );
}
