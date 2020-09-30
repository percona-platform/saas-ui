import {ValidUser} from "../../common/interfaces/Auth";
import faker from 'faker'

export const getFakeEmail = () => {
  return `${faker.internet.email()}.test`
};

export const getNewUser = (): ValidUser => {
  const email = getFakeEmail();
  return {
    user: {
      email: email,
      password: 'Password123',
    },
    signedInMessage: `You are signed in as ${email}`,
    signedUpMessage: 'You have successfully created your credentials',
  };
};
