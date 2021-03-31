/// <reference types="cypress" />
// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */

let userEmail;
let userPassword;

module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  // This code executes before the browser launch
  on('before:browser:launch', (browser, launchOptions) => {
    if (browser.name === 'chrome') {
      launchOptions.args.push('--window-size=1366,768');
    }

    return launchOptions;
  });

  // Solution to pass email and password between tests when cross-origin takes place
  // https://github.com/cypress-io/cypress/issues/6562#issuecomment-595042151
  on('task', {
    setEmail: ( email ) => userEmail = email,
    setPassword: ( password ) => userPassword = password,
    getUser: () => {
      return { userEmail, userPassword };
    },
  });
};

