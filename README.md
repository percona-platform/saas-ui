# saas-ui

[![CI GitHub Action status](https://github.com/percona-platform/saas-ui/workflows/CI/badge.svg?branch=main)](https://github.com/percona-platform/saas-ui/actions?query=workflow%3ACI+branch%3Amain)

SaaS UI.

## Local development

In order to setup local dev environment please run the following commands:

```bash
    npm i -g yarn lerna
    yarn install
    lerna bootstrap
    lerna run start --scope=@percona/platform-ui
```

## Most useful commands

- Start the development: `lerna run start --scope=@percona/platform-core`
- Run tests: `lerna run tests`
- Build artifacts: `lerna run build`
- Add a dependency to a select package: `lerna add moment --scope=@platform/core`
- Add a dev dependency to a select package: `lerna add react-router-dom --scope=@platform/ui --dev`
