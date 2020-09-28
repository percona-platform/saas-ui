import {TValidUser} from "../../common/interfaces/ICommon";
import faker from 'faker'

export const getFakeEmail = () => {
  return `${faker.internet.email()}.test`
};

export const getNewUser = (): TValidUser => {
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
