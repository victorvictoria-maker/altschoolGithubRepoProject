import { useQuery } from "@tanstack/react-query";
import { Octokit } from "octokit";

// authentication and octokit to access the api
const token = import.meta.env.VITE_REACT_GITHUB_TOKEN;
const octokit = new Octokit({
  auth: token,
});

// function to get all the repositories
export function useFetchAllRepoData() {
  const {
    data: repositories,
    isError,
    isLoading,
  } = useQuery(
    {
      queryKey: ["allRepos"],
      queryFn: async () => {
        try {
          const result = await octokit.request(
            "GET /users/victorvictoria-maker/repos",
            {
              username: "victorvictoria-maker",
              headers: {
                "X-GitHub-Api-Version": "2022-11-28",
              },
              sort: "created",
              per_page: 100,
              //         //page: 1,
            }
          );
          return result.data;
        } catch (error) {
          throw new Error("Error fetching repositories");
        }
      },
    }

    // {
    //   enabled: false,
    // }
  );

  return { repositories, isError, isLoading };
}

// function to get all the singleRepo Details includinglangauges, commits and branches.
export function useFetchRepoData(owner, repo) {
  const {
    data: repoData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["singleRepo", owner, repo],
    queryFn: async () => {
      try {
        // repo detail
        const singleRepoResult = await octokit.request(
          "GET /repos/{owner}/{repo}",
          {
            owner,
            repo,
            headers: {
              "X-GitHub-Api-Version": "2022-11-28",
            },
          }
        );

        // repo languages
        const languagesResult = await octokit.request(
          "GET /repos/{owner}/{repo}/languages",
          {
            owner,
            repo,
            headers: {
              "X-GitHub-Api-Version": "2022-11-28",
            },
          }
        );

        // commits in the repo
        const commitsResult = await octokit.request(
          "GET /repos/{owner}/{repo}/commits",
          {
            owner,
            repo,
            headers: {
              "X-GitHub-Api-Version": "2022-11-28",
            },
          }
        );

        // branches in the repo
        const branchesResult = await octokit.request(
          "GET /repos/{owner}/{repo}/branches",
          {
            owner,
            repo,
            headers: {
              "X-GitHub-Api-Version": "2022-11-28",
            },
          }
        );

        return {
          repositoryData: singleRepoResult.data,
          repositoryLanguages: languagesResult.data,
          repositoryCommits: commitsResult.data,
          repositoryBranches: branchesResult.data,
        };
      } catch (error) {
        throw new Error(
          `Error fetching repository ${owner}/${repo}: ${error.message}`
        );
      }
    },
  });

  const {
    repositoryData,
    repositoryLanguages,
    repositoryCommits,
    repositoryBranches,
  } = repoData || {};

  return {
    repositoryData,
    repositoryLanguages,
    repositoryCommits,
    repositoryBranches,
    isLoading,
    isError,
  };
}
