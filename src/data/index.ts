import {
  MISSIONS_STATUS,
  REACTION_ORDER,
  SKILL_LEVELS,
} from '@/constants/missionData';
import { ROUTES } from '@/utils/routes';

export const initialMarkdown = `## 🎯 Mission Objective:
  ------------

  ## 📋 Mission Brief:
  ------------

  ## 🔍 Key Tasks:
  ------------

  ## 🛠 Tools & Technologies Recommended:
  ------------

  ## 🤝 Collaboration Details:
  ------------

  ## 🔗 Additional Resources:`;

export const skillRequired = [
  { value: 'Front-end', label: 'Front-end' },
  { value: 'Backend', label: 'Backend' },
  { value: 'FullStack', label: 'FullStack' },
  { value: 'Design', label: 'Design' },
  { value: 'Mobile', label: 'Mobile' },
];

export const skillLevels = Object.values(SKILL_LEVELS);
export const projectTypes = [
  'Web Development',
  'Mobile Development',
  'UX/UI Design',
];
export const projectStatus = Object.values(MISSIONS_STATUS);

export const fakeMission = `
## 🎯 Mission Objective:
  ------------
  The mission objective is to establish a sustainable colony on Mars by the year 2030. This will involve a series of exploratory and logistical tasks to ensure the success of the mission.

## 📋 Mission Brief:
  ------------
  The mission brief outlines the key details of the Mars colonization project:
  - Launch Date: March 15, 2029
  - Duration: 24 months
  - Crew Members: 12 astronauts
  - Primary Location: Valles Marineris
  - Objectives:
    1. Establish a habitat with life support systems.
    2. Conduct scientific research on Martian geology and climate.
    3. Test and develop in-situ resource utilization technologies.

## 🔍 Key Tasks:
  ------------
  The following are the key tasks to be completed during the mission:
  1. Landing and Habitat Setup
  2. Life Support System Deployment
  3. Resource Exploration and Utilization
  4. Scientific Experiments
  5. Communication Infrastructure Establishment
  6. Sustainable Agriculture
  7. Crew Health and Safety Management
  8. Emergency Protocols
  9. Return Mission Planning

## 🛠 Tools & Technologies Recommended:
  ------------
  To accomplish the mission, the following tools and technologies are recommended:
  - SpaceX Starship spacecraft
  - Mars habitat modules
  - Advanced life support systems
  - Mars rovers for exploration
  - Solar power generation
  - 3D printing technology
  - Communication satellites
  - Remote sensing equipment

## 🤝 Collaboration Details:
  ------------
  Collaboration with various international space agencies and scientific institutions is crucial for the mission's success. Key partners include:
  - NASA
  - ESA (European Space Agency)
  - Roscosmos
  - SpaceX
  - University research teams

## 🔗 Additional Resources:
  ------------
  For additional information and resources related to the mission, refer to the following:
  - [NASA Mars Exploration Program](https://mars.nasa.gov/)
  - [SpaceX Mars Mission Updates](https://www.spacex.com/mars/)
  - [ESA Mars Exploration](https://www.esa.int/Science_Exploration/Space_Science/Mars_Express)


`;

export const communityLinks = [
  { id: '1a9d9a8f-5678-4e88-b7c3-2b36db1205eb', name: 'Discord', url: '' },
  { id: 'f2cc0489-1424-4aae-9e76-732f99d4d83f', name: 'Slack', url: '' },
  { id: '52e6f726-12d1-4b9c-85d6-4edbf8082e0e', name: 'Whatsup', url: '' },
  { id: '88d1d330-5077-4e41-b8a9-94e77443be17', name: 'Figma', url: '' },
];

export const profileLinks = [
  { label: 'missions', route: ROUTES.USER_PROFILE },
  { label: 'stats', route: ROUTES.USER_STATS },
  { label: 'saved', route: ROUTES.USER_SAVED_MISSIONS },
];

export const initialValues_1 = {
  missionName: '',
  skillLevel: skillLevels[0],
  missionType: projectTypes[0],
  missionStatus: projectStatus[0],
  missionObjective: '',
};

export const initialValues_2 = {
  skillRequired: [],
  missionDetails: '',
};

export const userMissionFilter = [
  { label: 'Newest', value: 'new' },
  { label: 'Draft', value: 'draft' },
  { label: 'Published', value: 'published' },
  { label: 'By number', value: 'number' },
];

const userVotes = Object.values(REACTION_ORDER);
const userLikes = Object.values(REACTION_ORDER);

const sRequired = ['Front-end', 'Backend', 'FullStack', 'Design', 'Mobile'];
export const missionFilters = [
  { label: 'skill required', options: sRequired },
  { label: 'skill level', options: skillLevels },
  { label: 'mission type ', options: projectTypes },
  { label: 'mission status ', options: projectStatus },
  { label: 'likes', options: userLikes },
  { label: 'votes', options: userVotes },
];
