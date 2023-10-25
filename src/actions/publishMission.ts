'use server';
import { prisma } from '@/lib/prisma';
import { xprisma } from '@/lib/prismaExtentions';
import { CommunityLinksReq } from '@/types/mission.types';
import { handleErrMsg } from '@/utils/ErrHandling/HandleErr';
import { ROUTES } from '@/utils/routes';
import { Mission } from '@prisma/client';
import { revalidatePath } from 'next/cache';

interface FormStateProps extends CommunityLinksReq {
  missionId: string;
}

export async function publishMission(
  prevState: unknown,
  formState: FormStateProps
) {
  try {
    const updateData = {} as Mission;
    if (formState.communityLinks != null) {
      for (const link of formState.communityLinks) {
        await prisma.communityLink.create({
          data: {
            linkName: link.name,
            linkUrl: link.url,
            mission: { connect: { id: formState.missionId } },
          },
        });
      }
    }
    if (formState.published == true) {
      const allFieldsAreField = await xprisma.mission.areAllFieldsFilled(
        formState.missionId
      );
      if (allFieldsAreField == true) updateData.published = true;
    }
    const mission = await prisma.mission.update({
      where: {
        id: formState.missionId,
      },
      data: updateData,
    });
    revalidatePath(ROUTES.MISSIONS);
    return { mission };
  } catch (error) {
    const { message, status } = handleErrMsg(error);
    return { message, status };
  }
}
