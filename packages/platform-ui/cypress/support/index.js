import './commands';
import addContext from 'mochawesome/addContext';
import setup from 'cypress-cy-select';
import {configure} from '@testing-library/cypress';

// cypress-cy-select config
const config = {
  name: 'qa',
  separator: ':',
};

setup(config);

// cypress-testing-library config data-qa attr
configure({testIdAttribute: 'data-qa'});

// This code executes after each test in order to add attachments to the tests in mocha report
Cypress.on('test:after:run', (test, runnable) => {

  // Generating screenshot name with pattern '$Feature -- $TestName (failed).png'
  // in order to link in to the mocha report
  // This is the pattern that Cypress uses for screenshot names
  if (test.state === 'failed') {
    const imageName = `${runnable.parent.title} -- ${runnable.title}`;
    const imageUrl = `screenshots/${Cypress.spec.name}/${imageName} (failed).png`;

    addContext({test}, imageUrl);
  }

// Generating video name in order to link in to the mocha report
  const videoUrl = `videos/${Cypress.spec.name}.mp4`;
  addContext({test}, videoUrl);
});
