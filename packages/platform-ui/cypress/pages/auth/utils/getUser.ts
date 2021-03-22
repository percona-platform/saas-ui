import { ValidUser } from 'pages/common/interfaces/Auth';
import faker from 'faker';
import { generate } from 'generate-password';

/*
Using generate-password lib due to a bug in a faker when passing a regex to a password function.
https://github.com/Marak/faker.js/issues/826
*/

export const getFakeEmail = () => {
  return `${faker.name.firstName()}.${faker.name.lastName()}@${Cypress.env('MAILOSAUR_SAAS_SERVER_ID')}.mailosaur.net`;
};

export const getPassword = () => {
  return generate({
    length: 10,
    numbers: true,
    lowercase: true,
    uppercase: true,
    strict: true,
  });
};

export const getUser = (email = getFakeEmail(), password = getPassword()): ValidUser => {
  const signedInMessage = `You are signed in as ${email}`;

  return {
    user: {
      email,
      password,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    },
    signedInMessage,
    activationEmailSentMessage: 'A confirmation email has been sent to you',
    loggedOutMessage: 'You are now logged out',
  };
};
