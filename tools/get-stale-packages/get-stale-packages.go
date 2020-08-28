package main

import (
	"context"
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"
	"regexp"
	"strings"
	"time"

	"github.com/shurcooL/githubv4"
	"golang.org/x/oauth2"
)

const (
	packageTTL = 7 * 24 * time.Hour

	// https://semver.org/#is-there-a-suggested-regular-expression-regex-to-check-a-semver-string
	semverRegExp = "^(?P<major>0|[1-9]\\d*)\\.(?P<minor>0|[1-9]\\d*)\\.(?P<patch>0|[1-9]\\d*)(?:-(?P<prerelease>" +
		"(?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\\.(?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\\+" +
		"(?P<buildmetadata>[0-9a-zA-Z-]+(?:\\.[0-9a-zA-Z-]+)*))?$"
)

var reg = regexp.MustCompile(semverRegExp)

// That program collects repository packages that older that packageTTL and hasn't semver or 'latest' tag.
// I.e. it returns comma separated list of packages created by pull requests.
func main() {
	log.SetFlags(0)
	log.SetPrefix("get-stale-packages: ")
	flag.Parse()

	token := os.Getenv("ROBOT_TOKEN")
	if token == "" {
		log.Fatal("variable ROBOT_TOKEN is empty")
	}

	repositoryOwner := os.Getenv("REPOSITORY_OWNER")
	if repositoryOwner == "" {
		log.Fatal("variable REPOSITORY_OWNER is empty")
	}

	repositoryName := os.Getenv("REPOSITORY_NAME")
	if repositoryName == "" {
		log.Fatal("variable REPOSITORY_NAME is empty")
	}

	var query struct {
		Repository struct {
			Packages struct {
				Nodes []struct {
					ID       githubv4.ID
					Name     githubv4.String
					Versions struct {
						Nodes []struct {
							ID      githubv4.ID
							Version githubv4.String
							Files   struct {
								Nodes []struct {
									UpdatedAt githubv4.DateTime
								}
							} `graphql:"files(last: 1)"`
						}
						PageInfo PageInfo
					} `graphql:"versions(last: 100, after: $versionsCursor)"`
				}
				PageInfo PageInfo
			} `graphql:"packages(last: 1, after: $packagesCursor)"`
		} `graphql:"repository(owner: $repositoryOwner, name: $repositoryName)"`
	}

	variables := map[string]interface{}{
		"repositoryOwner": githubv4.String(repositoryOwner),
		"repositoryName":  githubv4.String(repositoryName),
		"packagesCursor":  (*githubv4.String)(nil),
		"versionsCursor":  (*githubv4.String)(nil),
	}

	client := getClient(token)

	var versions []string

	// loop packages one by one
	for {
		// loop versions pages
		for {
			err := client.Query(context.Background(), &query, variables)
			if err != nil {
				log.Fatal(err.Error())
			}

			if len(query.Repository.Packages.Nodes) == 0 {
				break
			}

			pkg := query.Repository.Packages.Nodes[0]

			// loop versions
			for _, node := range pkg.Versions.Nodes {
				if matchVersion(node.Version) {
					// check date on files that match current version
					if node.Files.Nodes[0].UpdatedAt.Before(time.Now().Add(-packageTTL)) {
						versions = append(versions, node.ID.(string))
					}
				}
			}

			if !pkg.Versions.PageInfo.HasNextPage {
				break
			}
			variables["versionsCursor"] = githubv4.NewString(pkg.Versions.PageInfo.EndCursor)
		}

		if !query.Repository.Packages.PageInfo.HasNextPage {
			break
		}
		variables["packagesCursor"] = githubv4.NewString(query.Repository.Packages.PageInfo.EndCursor)
	}

	fmt.Println(strings.Join(versions, ", "))
}

// getClient returns Github API client with packages preview enabled.
func getClient(token string) *githubv4.Client {
	return githubv4.NewClient(
		&http.Client{
			Transport: &oauth2.Transport{
				Base:   &PackagePreview{T: http.DefaultTransport},
				Source: oauth2.ReuseTokenSource(nil, oauth2.StaticTokenSource(&oauth2.Token{AccessToken: token})),
			},
		})
}

// matchVersion returns true if version doesn't match semver, 'latest' or other protected versions.
func matchVersion(version githubv4.String) bool {
	// version tags
	if reg.MatchString(string(version)) {
		return false
	}

	// Github internal meta tag https://github.community/t5/GitHub-Actions/GitHub-Package-Registry-tag-docker-base-layer-is-missing-a/m-p/46119
	if version == "docker-base-layer" {
		return false
	}

	// special tag for latest version
	if version == "latest" {
		return false
	}

	return true
}

// PackagePreview enables packages github API.
type PackagePreview struct {
	T http.RoundTripper
}

func (pp *PackagePreview) RoundTrip(req *http.Request) (*http.Response, error) {
	req.Header.Add("Accept", "application/vnd.github.packages-preview+json")
	return pp.T.RoundTrip(req)
}

type PageInfo struct {
	EndCursor   githubv4.String
	HasNextPage bool
}
