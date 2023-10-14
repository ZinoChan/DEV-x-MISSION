export type Step_1_FormValues = {
  missionName: string;
  skillLevel: string;
  projectType: string;
  projectStatus: string;
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
  [k: string]: string;
};
