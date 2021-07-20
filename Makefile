SHELL := /bin/bash
DOCKER_TAG ?= latest
DOCKER_IMAGE = docker.pkg.github.com/percona-platform/saas-ui/saas-ui

default: help

help:                   ## Display this help message
	@echo "Please use \`make <target>\` where <target> is one of:"
	@grep '^[a-zA-Z]' $(MAKEFILE_LIST) | \
		awk -F ':.*?## ' 'NF==2 {printf "  %-26s%s\n", $$1, $$2}'

init:                   ## Install dependencies
	npm i

dev:                    ## Develop locally
	npm start

e2e:					## Run e2e tests
	npm run cy:run

test:                   ## Run unit tests
	npm run test:ci

build:                  ## Build artifacts
	npm run lint && npm run build

docker-build:           ## Build Docker image
	docker build --squash --tag $(DOCKER_IMAGE):$(DOCKER_TAG) .

docker-push:            ## Push Docker image
	docker push $(DOCKER_IMAGE):$(DOCKER_TAG)

docker-tag:
	if [[ "$(DOCKER_TAG)" == "latest" ]]; then exit 0; fi; \
	    docker tag $(DOCKER_IMAGE):$(DOCKER_TAG) $(DOCKER_IMAGE):dev-latest; \
	    docker push $(DOCKER_IMAGE):dev-latest;
