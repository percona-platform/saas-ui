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
- Bump up the version with `npm version patch` or `npm version minor` or `npm version major`
- Commit the changes with `git add . && git commit -m "version bump"`
- cd to /packages/platform-core
- Publish by running `np patch --no-release-draft --any-branch --yolo --contents=dist --tag=latest`
