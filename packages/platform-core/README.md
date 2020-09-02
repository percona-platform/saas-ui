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

## Publishing

- Install a package `np` globally with `npm i -g np`
- cd to /packages/platform-core
- Bump up the version with `npm version patch` or `npm version minor` or `npm version major`
- Commit the changes with `git add . && git commit -m "Version bump"`
- Publish from a non-main branch `np patch --no-release-draft --any-branch --yolo --tag=latest`
- Publish from the main branch `np patch --no-release-draft --yolo --tag=latest`
