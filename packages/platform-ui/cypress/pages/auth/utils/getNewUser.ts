import { ValidUser } from 'pages/common/interfaces/Auth';
import faker from 'faker';

export const getFakeEmail = () => {
  return `${faker.internet.email()}.test`;
};

export const getPassword = () => {
  return faker.internet.password();
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
