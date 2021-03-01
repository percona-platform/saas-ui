import { ValidUser } from 'pages/common/interfaces/Auth';
import faker from 'faker';
import { generate } from 'generate-password';

/*
Using generate-password lib due to a bug in a faker when passing a regex to a password function.
https://github.com/Marak/faker.js/issues/826
*/

export const getFakeEmail = () => {
  return `${faker.internet.email()}.test`;
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

export const getNewUser = (): ValidUser => {
  const email = getFakeEmail();
  const password = getPassword();

  return {
    user: {
      email,
      password,
    },
    signedInMessage: `You are signed in as ${email}`,
    signedUpMessage: 'You have successfully created your credentials',
    loggedOutMessage: 'You are now logged out',
  };
};
