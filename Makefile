DOCKER_TAG ?= latest
DOCKER_IMAGE = docker.pkg.github.com/percona-platform/saas-ui/saas-ui:$(DOCKER_TAG)

default: help

help:                   ## Display this help message
	@echo "Please use \`make <target>\` where <target> is one of:"
	@grep '^[a-zA-Z]' $(MAKEFILE_LIST) | \
		awk -F ':.*?## ' 'NF==2 {printf "  %-26s%s\n", $$1, $$2}'

init:                   ## Install development tools
	npm install -g lerna

bootstrap:              ## Bootstrap projects
	lerna bootstrap
	lerna link

dev:                   ## Run the ui dev locally
	lerna bootstrap
	lerna run build --scope='@percona/platform-core'
	lerna link
	lerna run start --scope='@percona/platform-ui'

e2e:
	lerna run cy:run

test:                   ## Run unit tests
	lerna run test:ci

build-core:             ## Build platform-core
	lerna run build --scope='@percona/platform-core'

build-ui:               ## Build platform-ui
	lerna run build --scope='@percona/platform-ui'

docker-build:           ## Build Docker image
	docker build --squash --tag $(DOCKER_IMAGE) .

docker-push:            ## Push Docker image
	docker push $(DOCKER_IMAGE)
