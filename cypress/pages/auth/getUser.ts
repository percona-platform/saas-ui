import faker from 'faker';
import { generate } from 'generate-password';

/*
Using generate-password lib due to a bug in a faker when passing a regex to a password function.
https://github.com/Marak/faker.js/issues/826
*/

const getFakeEmail = () => `${faker.name.firstName()}.${faker.name.lastName()}@${Cypress.env('MAILOSAUR_SAAS_SERVER_ID')}.mailosaur.net`;

const getPassword = () => generate({
    length: 10,
    numbers: true,
    lowercase: true,
    uppercase: true,
    strict: true,
  });

export const getUser = (email = getFakeEmail(), password = getPassword()) => {
  const signedInMessage = `You are signed in as ${email}`;

  return {
    user: {
      email,
      password,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    },
    signedInMessage,
    activationEmailSentMessage: 'An account activation email has been sent to you',
    loggedOutMessage: 'You are now logged out',
  };
};
