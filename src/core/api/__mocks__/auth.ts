
export const getProfile = () => Promise.resolve({
  getEmail: () => 'email@test.mail.com',
  getFirstName: () => 'FirstName',
  getLastName: () => 'lastname',
});

export const updateProfile = jest.fn();
