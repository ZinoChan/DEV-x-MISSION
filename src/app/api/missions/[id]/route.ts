import { prisma } from '@/lib/prisma';
import { authOptions } from '@/utils/AuthOptions';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { handleErrMsg } from '@/utils/ErrHandling/HandleErr';
import { xprisma } from '@/lib/prismaExtentions';
import { Mission } from '@prisma/client';

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const missionId = params.id;
  const session = await getServerSession(authOptions);
  const currentUserEmail = session?.user?.email;

  if (currentUserEmail == null) throw Error('user email does not exist');

  const user = await xprisma.user.findByEmail(currentUserEmail);
  if (user === null) throw Error('user does not exists');
  const mission = await xprisma.mission.findMissionById(missionId);
  if (mission == null) throw Error('mission not found');

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
  if (data.published != null) {
    updateData.published = data.published;
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

  try {
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
    const allFieldsAreField =
      await xprisma.mission.areAllFieldsFilled(missionId);
    if (allFieldsAreField == true) updateData.published = true;
    const mission = await prisma.mission.update({
      where: {
        id: missionId,
      },
      data: updateData,
    });
    return NextResponse.json({ mission }, { status: 201 });
  } catch (error) {
    const errMsg = handleErrMsg(error);
    return NextResponse.json(
      { success: false, message: errMsg },
      { status: 500 }
    );
  }
}
