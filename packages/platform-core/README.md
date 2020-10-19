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

- Install a package `np` globally: `npm i -g np`
- Gp to platform-core: `cd packages/platform-core`
- Publish from a branch other than main: `np patch --no-release-draft --any-branch --yolo` or
- Publish from the main branch `np patch --no-release-draft --yolo`

## Important

- This project does not leverage imports through statics paths because `tsc` does not properly support them when generating types.

### Challenges

- Currently we are unable to use direct imports, because the build system does not properly handle them in the bundle. This is possible however, but would require a better build setup.
