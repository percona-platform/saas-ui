/// <reference types="cypress" />
// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  // This code executes before the browser launch
  on('before:browser:launch', (browser, launchOptions) => {

    // Setting 1920x1080 resolution for chrome browser in order to increase artifacts quality
    if (browser.name === 'chrome' && browser.isHeadless) {
      launchOptions.args.push('--window-size=1920,1080');

      return launchOptions;
    }
  });
};

