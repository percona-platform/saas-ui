# saas-ui

[![CI GitHub Action status](https://github.com/percona-platform/saas-ui/workflows/CI/badge.svg?branch=main)](https://github.com/percona-platform/saas-ui/actions?query=workflow%3ACI+branch%3Amain)

SaaS UI.

## Local development

In order to setup the local development environment please run the following commands:

```bash
    npm i -g yarn lerna
    lerna bootstrap
	lerna run build --scope='@percona/platform-core'
	lerna link
	cd packages/platform-ui
    yarn start
```

## Most useful commands

- Start the development of a particular package: `lerna run start --scope=@percona/platform-ui`
- Run tests for all packages: `lerna run tests`
- Build artifacts for all packages: `lerna run build`
- Add a dependency to a particular package: `lerna add moment --scope=@platform/core`
- Add a dev dependency to a particular package: `lerna add react-router-dom --scope=@platform/ui --dev`
- Run a local dev environment in one command: `make dev`
