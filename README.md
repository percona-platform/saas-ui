# saas-ui

[![CI GitHub Action status](https://github.com/percona-platform/saas-ui/workflows/CI/badge.svg?branch=main)](https://github.com/percona-platform/saas-ui/actions?query=workflow%3ACI+branch%3Amain)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fpercona-platform%2Fsaas-ui.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fpercona-platform%2Fsaas-ui?ref=badge_shield)

SaaS UI.

### Developing locally

Run a local dev environment with one command:

`make dev`

When developing locally, you'll want to route your API requests to a dev server. To do so, add the following key to your `package.json`:

```json
"proxy": "https://platform-dev.percona.com"
```
