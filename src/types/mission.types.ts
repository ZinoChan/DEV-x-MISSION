import { Mission } from '@prisma/client';

export type Step_1_FormValues = {
  missionName: string;
  skillLevel: string;
  missionType: string;
  missionStatus: string;
  missionObjective: string;
};

export type Step_2_FormValues = {
  skillRequired: { value: string; label: string }[];
  missionDetails: string;
};

export type SkillRequiredOptions = {
  value: string;
  label: string;
};

export type CommunityLink = {
  name: string;
  id: string;
};

export type Step_3_FormValues = {
  [k: string]: string | boolean;
};

export interface MissionRes {
  mission: Mission;
}
export interface MissionsRes {
  missions: ExtendedMission[];
}

export interface ExtendedMission extends Mission {
  user: {
    image: string | null;
    id: string;
    name: string | null;
  };
  likes: {
    id: string;
    userId: string;
    missionId: string;
  }[];
  votes: {
    id: string;
    userId: string;
    missionId: string;
  }[];
}

export interface UserMissionRes {
  userMissions: TUserMission[];
}

export interface TUserMission {
  missionName: string;
  id: string;
  published: boolean;
  createAt: string;
  missionOrder: number;
}

export type PrismaUserMission = Omit<TUserMission, 'createAt'> & {
  createAt: Date;
};

export interface CommunityLinksReq {
  communityLinks: {
    name: string;
    url: string;
  }[];
  published?: boolean;
}
