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
- cd to platform-core: `cd packages/platform-core`
- Publish a minor version from the main branch (best): `np minor` or
- Publish a patch version from a branch other than main (not encouraged): `np patch --any-branch`

## Important

- This project does not leverage imports through static paths because `tsc` does not properly support them when generating types.

### Challenges

- Currently we are unable to use direct imports, because the build system does not properly handle them in the bundle. This is possible however, but would require a better build setup.
