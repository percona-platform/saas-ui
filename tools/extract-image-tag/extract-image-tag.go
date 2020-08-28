package main

import (
	"flag"
	"fmt"
	"log"
	"os"
	"regexp"
	"strings"
)

const (
	gitBranchesRef     = "refs/heads/"
	gitTagsRef         = "refs/tags/"
	gitPullRequestsRef = "refs/pull/"

	// https://semver.org/#is-there-a-suggested-regular-expression-regex-to-check-a-semver-string
	semverRegExp = "^(?P<major>0|[1-9]\\d*)\\.(?P<minor>0|[1-9]\\d*)\\.(?P<patch>0|[1-9]\\d*)(?:-(?P<prerelease>" +
		"(?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\\.(?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\\+" +
		"(?P<buildmetadata>[0-9a-zA-Z-]+(?:\\.[0-9a-zA-Z-]+)*))?$"
)

// Regex that checks for invalid characters in a docker tag,
// anything that is not alphanumeric, period, underscore or dash.
// See: https://docs.docker.com/engine/reference/commandline/tag/
//nolint:gochecknoglobals
var (
	tagRegex    = regexp.MustCompile(`[^\w\.-]`)
	semVerRegex = regexp.MustCompile(semverRegExp)
)

// https://docs.github.com/en/actions/configuring-and-managing-workflows/using-environment-variables#default-environment-variables
type env struct {
	githubRef     string
	githubHeadRef string
}

// This program extracts the docker image tag.
func main() {
	log.SetFlags(0)
	log.SetPrefix("extract-image-tag: ")
	flag.Parse()

	env := &env{
		githubRef:     os.Getenv("GITHUB_REF"),
		githubHeadRef: os.Getenv("GITHUB_HEAD_REF"),
	}
	log.Printf("%+v", env)

	tag, err := extractImageTag(env)
	if err != nil {
		log.Fatal(err.Error())
	}

	log.Printf("Using DOCKER_TAG=%s", tag)
	fmt.Printf("::set-env name=DOCKER_TAG::%s\n", tag)
}

func extractImageTag(env *env) (string, error) {
	var ref string

	if strings.HasPrefix(env.githubRef, gitBranchesRef) {
		ref = strings.Split(env.githubRef, gitBranchesRef)[1]
	}

	if strings.HasPrefix(env.githubRef, gitTagsRef) {
		ref = strings.Split(env.githubRef, gitTagsRef)[1]

		if ref[0] == 'v' && semVerRegex.MatchString(ref[1:]) {
			ref = ref[1:]
		}
	}

	if strings.HasPrefix(env.githubRef, gitPullRequestsRef) {
		ref = env.githubHeadRef
	}

	tag := tagRegex.ReplaceAllString(ref, "_")
	if tag == "" {
		return "", fmt.Errorf("can't make tag")
	}
	if tag == "main" || tag == "master" {
		return "latest", nil
	}

	if tag[0] == '.' || tag[0] == '-' {
		tag = "_" + tag[1:]
	}

	if len(tag) > 128 {
		return "", fmt.Errorf("invalid image tag, 128 char limit exceeded")
	}

	return tag, nil
}
