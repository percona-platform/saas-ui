export default function() {
  cy.server({
    headers:{
      'grpc-message': 'Incorrect username or password.',
      'grpc-status': 3,
      'status': 200,
      'vary': origin
    },
    method: 'POST'
  });
  cy.route('**AuthAPI/SignIn', 'fx:login.json').as('singin_stub');
  cy.route('OPTIONS', '**AuthAPI/SignIn', 'IwogIDEwMksxRWRpRVNYUURhV0hreE5UaUYtd2cgIDIwMjAtMDktMTdUMDY6NTg6MTRa').as('singin_stub');
  cy.route('POST', '**AuthAPI/RefreshSession', '{"expireTime": "2020-09-17T06:58:14Z"}').as('singin_stub');
}
