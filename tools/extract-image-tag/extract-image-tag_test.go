package main

import (
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestExtractImageTag(t *testing.T) {
	testCases := []struct {
		name          string
		githubRef     string
		githubHeadRef string
		expected      string
		length        int
		err           string
	}{{
		name:      "all valid characters, original string returned",
		githubRef: "refs/heads/valid-Branch.name_1",
		expected:  "valid-Branch.name_1",
		length:    19,
	}, {
		name:      "'master' branch should return 'latest' as tag",
		githubRef: "refs/heads/master",
		expected:  "latest",
		length:    6,
	}, {
		name:      "'main' branch should return 'latest' as tag",
		githubRef: "refs/heads/main",
		expected:  "latest",
		length:    6,
	}, {
		name:      "all valid characters and a tags ref",
		githubRef: "refs/tags/v2.8.0",
		expected:  "2.8.0",
		length:    5,
	}, {
		name:      "all valid characters and semver without leading v",
		githubRef: "refs/tags/12.8.0",
		expected:  "12.8.0",
		length:    6,
	}, {
		name:      "all valid characters and semver with non-v perfix",
		githubRef: "refs/tags/x2.8.0",
		expected:  "x2.8.0",
		length:    6,
	}, {
		name:      "all valid characters and a non-semver tags ref",
		githubRef: "refs/tags/ver2.0",
		expected:  "ver2.0",
		length:    6,
	}, {
		name:          "all valid characters with a leading dash and with GITHUB_HEAD_REF set",
		githubRef:     "refs/pull/-branch-name",
		githubHeadRef: "-branch-name",
		expected:      "_branch-name",
		length:        12,
	}, {
		name:          "all valid characters with a leading period and with GITHUB_HEAD_REF set",
		githubRef:     "refs/pull/.branch-name",
		githubHeadRef: ".branch-name",
		expected:      "_branch-name",
		length:        12,
	}, {
		name:      "invalid characters with a leading dash",
		githubRef: "refs/heads/-!@/",
		expected:  "____",
		length:    4,
	}, {
		name:          "real example from a dependabot PR containing slashes",
		githubRef:     "refs/pull/dependabot/go_modules/tools/github.com/golangci/golangci-lint-1.28.3",
		githubHeadRef: "dependabot/go_modules/tools/github.com/golangci/golangci-lint-1.28.3",
		expected:      "dependabot_go_modules_tools_github.com_golangci_golangci-lint-1.28.3",
		length:        68,
	}, {
		name:      "branch name exceeding 128 characters",
		githubRef: "refs/heads/Very.Long-Branch_Name-1_Very.Long-Branch_Name-1_Very.Long-Branch_Name-1_Very.Long-Branch_Name-1_Very.Long-Branch_Name-1_Very.Lon......",
		err:       "invalid image tag, 128 char limit exceeded",
	}}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			require.Len(t, tc.expected, tc.length)

			actual, err := extractImageTag(&env{
				githubRef:     tc.githubRef,
				githubHeadRef: tc.githubHeadRef,
			})

			assert.Equal(t, tc.expected, actual)
			assert.Len(t, actual, tc.length)
			if tc.err == "" {
				assert.NoError(t, err)
			} else {
				assert.EqualError(t, err, tc.err)
			}
		})
	}
}
