# @percona/platform-core

Percona Enterprise Platform Core UI.

## Local development

In order to setup the local development environment please run the following commands:

```bash
    npm i -g yarn lerna
    lerna bootstrap
```

## Most useful commands

- Start the development: `lerna run start --scope=@percona/platform-core`
- Run tests: `lerna run test --scope=@percona/platform-core`
- Build artifacts: `lerna run build --scope=@percona/platform-core`
- Publish the package: `lerna run publish --scope=@percona/platform-core`
