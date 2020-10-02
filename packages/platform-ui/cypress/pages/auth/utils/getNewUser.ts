import { ValidUser } from 'pages/common/interfaces/Auth';
import faker from 'faker';

export const getFakeEmail = () => {
  return `${faker.internet.email()}.test`;
};

export const getNewUser = (): ValidUser => {
  const email = getFakeEmail();
  return {
    user: {
      email,
      password: 'Password123',
    },
    signedInMessage: `You are signed in as ${email}`,
    signedUpMessage: 'You have successfully created your credentials',
  };
};
