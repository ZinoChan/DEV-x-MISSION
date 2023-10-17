import * as yup from 'yup';

export const create_mission_schema_1 = yup.object().shape({
  missionName: yup.string().required('Mission Name is required'),
  skillLevel: yup.string().required('Skill Level is required'),
  missionType: yup.string().required('Project Type is required'),
  missionStatus: yup.string().required('Status is required'),
  missionObjective: yup
    .string()
    .required('Mission Objective is required')
    .test(
      'wordCount',
      'Mission Objective must contain between 7 and 250 words',
      (value) => {
        const wordCount = value.trim().split(/\s+/).length;
        return wordCount >= 7 && wordCount <= 250;
      }
    ),
});

export const create_mission_schema_2 = yup.object().shape({
  missionDetails: yup
    .string()
    .required('Mission Details is required')
    .test(
      'wordCount',
      'Mission Details must contain between 7 and 2500 words',
      (value) => {
        const wordCount = value.trim().split(/\s+/).length;
        return wordCount >= 7 && wordCount <= 2500;
      }
    ),
  skillRequired: yup
    .array()
    .min(1, 'At least one skill is required')
    .required('At least one skill is required'),
});

export const create_mission_schema_3 = yup
  .object()
  .test(
    'at-least-one-key-with-value',
    'At least one key must have a non-empty value',
    function (obj: { [key: string]: string }) {
      for (const key in obj) {
        if (
          obj.hasOwnProperty(key) &&
          obj[key] !== '' &&
          obj[key] !== null &&
          obj[key] !== undefined
        ) {
          return true;
        }
      }
      return false;
    }
  );
