/// <reference types="cypress" />
// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

require('dotenv').config();

/**
 * @type {Cypress.PluginConfig}
 */

let userEmail;
let userPassword;

module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  // Setting up env variables
  config.env.PORTAL_USER_EMAIL = process.env.PORTAL_USER_EMAIL;
  config.env.PORTAL_USER_PASSWORD = process.env.PORTAL_USER_PASSWORD;
  config.env.MAILOSAUR_API_KEY = process.env.MAILOSAUR_API_KEY;
  config.env.MAILOSAUR_UI_TESTS_SERVER_ID = process.env.MAILOSAUR_UI_TESTS_SERVER_ID;

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
    // eslint-disable-next-line no-return-assign
    setEmail: ( email ) => userEmail = email,
    // eslint-disable-next-line no-return-assign
    setPassword: ( password ) => userPassword = password,
    getUser: () => ({ userEmail, userPassword }),
  });

  return config;
};

