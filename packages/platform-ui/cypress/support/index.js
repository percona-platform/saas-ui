import './commands';
import addContext from 'mochawesome/addContext';
import setup from 'cypress-cy-select';
import {configure} from '@testing-library/cypress';

// cypress-cy-select config
const config = {
  name: 'qa',
  separator: ':'
};
setup(config);

// cypress-testing-library config data-qa attr
configure({testIdAttribute: 'data-qa'});

// This code is execute after each test in order to add attachments to failed tests in mocha report
Cypress.on('test:after:run', (test, runnable) => {

  if (test.state === 'failed') {
    let item = runnable;
    const nameParts = [runnable.title];

    while (item.parent) {
      nameParts.unshift(item.parent.title);
      item = item.parent;
    }
    if (runnable.hookName) {
      nameParts.push(`${runnable.hookName} hook`);
    }

    // Generating screenshot name with pattern '$Feature -- $TestName (failed).png'
    // in order to link in to the mocha report
    // This is the pattern that Cypress uses for screenshot names
    const fullTestName = nameParts.filter(Boolean).join(' -- ');

    const imageUrl = `screenshots/${Cypress.spec.name}/${fullTestName} (failed).png`;

    const videoUrl = `videos/${Cypress.spec.name}.mp4`;

    addContext({test}, imageUrl);
    addContext({test}, videoUrl);
  }
});

