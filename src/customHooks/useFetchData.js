import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";
import { Octokit } from "octokit";
const queryClient = new QueryClient();

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
      refetchInterval: 3000,
    }
    // {
    //   refetchOnWindowFocus: false,
    // }

    // {
    //   enabled: false,
    // }
  );

  return { repositories, isError, isLoading };
}

// function to create a new repo
export function useCreateNewRepo() {
  const {
    mutate,
    data: newlyCreatedRepo,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: async ({ newRepoName, repoType }) => {
      // console.log(`This is from the query file ${newRepoName}, ${visibility}`);
      try {
        let privateRepo;
        if (repoType === "private") {
          privateRepo = true;
        } else {
          privateRepo = false;
        }

        const result = await octokit.request("POST /user/repos", {
          name: newRepoName,
          description:
            "This repo was not craeted from github directly, but from AltSchool github project!",
          homepage: "https://github.com",
          private: privateRepo,
          is_template: false,
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        });

        return result.data;
      } catch (error) {
        throw new Error("Error creating the new repository");
      }
    },
    onSuccess: () => {
      // console.log("successful");
      // queryClient.invalidateQueries([
      //   "allRepos",
      //   (oldRepoList) => [...oldRepoList, newlyCreatedRepo],
      // ]);

      queryClient.invalidateQueries("allRepos");
    },
  });
  // console.log(newlyCreatedRepo, isPending, isError, isSuccess);
  // console.log(newlyCreatedRepo);
  return { mutate, newlyCreatedRepo, isPending, isError, isSuccess };
}

// function to delet a repo
export function useDeleteRepo() {
  const { mutate: deleteMutate } = useMutation({
    mutationFn: async (repoName) => {
      try {
        const result = await octokit.request(
          `DELETE /repos/victorvictoria-maker/${repoName}`,
          {
            owner: "victorvictoria-maker",
            repo: repoName,
            headers: {
              "X-GitHub-Api-Version": "2022-11-28",
            },
          }
        );

        return result.data;
      } catch (error) {
        throw new Error("Error deleting this repository");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries("allRepos");
    },
  });

  return { deleteMutate };
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
