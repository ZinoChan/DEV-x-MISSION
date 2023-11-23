import { defineConfig } from 'cypress';
import resetDB from './cypress/tasks/resetDb';
import seedDB from './cypress/tasks/seedDb';
import addMission from './cypress/tasks/addMission';

export default defineConfig({
  e2e: {
    setupNodeEvents(on) {
      on('task', {
        resetDB,
        seedDB,
        addMission,
      });
    },
  },
});
