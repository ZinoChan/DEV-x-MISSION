import { prisma } from '@/lib/prisma';
import { authOptions } from '@/utils/AuthOptions';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { handleErrMsg } from '@/utils/ErrHandling/HandleErr';
import { xprisma } from '@/lib/prismaExtentions';
import { Mission } from '@prisma/client';
import { HttpException } from '@/utils/ErrHandling/HttpException';
import { HTTP_STATUS } from '@/constants/httpStatus';

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const missionId = params.id;
  const session = await getServerSession(authOptions);
  const currentUserEmail = session?.user?.email;

  try {
    if (currentUserEmail == null)
      throw new HttpException(
        HTTP_STATUS.NOT_FOUND,
        'user email does not exist'
      );

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
    return NextResponse.json({ mission }, { status: 201 });
  } catch (error) {
    const { message, status } = handleErrMsg(error);
    return NextResponse.json({ success: false, message }, { status });
  }
}
