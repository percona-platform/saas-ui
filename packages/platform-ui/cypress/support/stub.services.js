export default function () {
  // Do not mock server before tests if environment is 'prod'
  const isProduction = Cypress.env('setup') === 'prod';
  if (isProduction) {
    return;
  }

  cy.server({
    headers: {
      'set-cookie':
        '__Host-PP-Session=102ZX6eUv6mQ4qgEQSaIGIupQ; Path=/; Expires=Tue, 22 Sep 2021 08:08:05 GMT; Max-Age=604799; HttpOnly; Secure; SameSite=Strict',
      'content-type': 'application/grpc-web-text',
      status: 200,
    },
    method: 'POST',
  });

  cy.route(
    '**AuthAPI/SignIn',
    'AAAAACMKGTEwMlpYNmVVdjZtUTRxZ0VRU2FJR0l1cFESBgjl4ab7BQ==gAAAABBncnBjLXN0YXR1czogMA0K',
  ).as('singinStub');

  cy.route(
    '**AuthAPI/SignUp',
    'AAAAACMKGTEwMlpYNmVVdjZtUTRxZ0VRU2FJR0l1cFESBgjl4ab7BQ==gAAAABBncnBjLXN0YXR1czogMA0K',
  ).as('singupStub');
}
