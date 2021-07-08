const token = `SSWS ${Cypress.env('OKTA_TOKEN')}`;
const url = `https://${Cypress.env('OKTA_HOST')}`;

Cypress.Commands.add('oktaGetUser', (userId = '') => cy.task('oktaRequest', {
    baseUrl: url,
    urlSuffix: `/api/v1/users?q=${userId}`,
    method: 'get',
    token,
  }).then((response) => {
  // eslint-disable-next-line no-magic-numbers
    expect(response.status).to.equal(200);
    if (response.data && response.data.length) {
      return cy.wrap(response.data[0]);
    }

    return cy.wrap(null);
  }),
);

Cypress.Commands.add('oktaSetUserPassword', (userId, password = 'SecretPassword123@') => cy.task('oktaRequest', {
    baseUrl: url,
    urlSuffix: `/api/v1/users/${userId}`,
    method: 'post',
    token,
    data: {
      credentials: {
        password,
      },
    },
  }).then((response) => {
    // eslint-disable-next-line no-magic-numbers
    expect(response.status).to.equal(200);
    cy.wrap(response.data);
  }),
);

Cypress.Commands.add('oktaDeleteUser', (userId = '') => {
  cy.task('oktaRequest', {
    baseUrl: url,
    urlSuffix: `/api/v1/users/${userId}`,
    method: 'delete',
    token,
  }).then((response) => {
    // eslint-disable-next-line no-magic-numbers
    expect(response.status).to.equal(204);
    expect(response.data).is.empty;
  });
});
