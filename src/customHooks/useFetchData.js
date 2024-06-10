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
  } = useQuery({
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
    staleTime: 5000,
    refetchInterval: 5000,
  });

  return { repositories, isError, isLoading };
}

// function to create a new repo
export function useCreateNewRepo() {
  const { mutate } = useMutation({
    mutationFn: async ({ newRepoName, repoType }) => {
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
    onSuccess: (data) => {
      queryClient.invalidateQueries(["allRepos"]);
      queryClient.setQueryData(["allRepos", data]);
      return data;
    },
  });
  return { mutate };
}

// function to delete a repo
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
      queryClient.invalidateQueries(["allRepos"], { refetchActive: true });
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
    isFetching,
    isPending,
    isSuccess,
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
        let commit;
        if (
          singleRepoResult.data.description ===
          "This repo was not craeted from github directly, but from AltSchool github project!"
        ) {
          commit = false;
        } else {
          commit = true;
        }

        let commitsResult = [];
        if (commit) {
          commitsResult = await octokit.request(
            "GET /repos/{owner}/{repo}/commits",
            {
              owner,
              repo,
              headers: {
                "X-GitHub-Api-Version": "2022-11-28",
              },
            }
          );
        }

        return {
          repositoryData: singleRepoResult.data,
          repositoryLanguages: languagesResult.data,
          repositoryCommits: commitsResult.data,
        };
      } catch (error) {
        throw new Error(
          `Error fetching repository ${owner}/${repo}: ${error.message}`
        );
      }
    },
  });

  const { repositoryData, repositoryLanguages, repositoryCommits } =
    repoData || {};

  return {
    repositoryData,
    repositoryLanguages,
    repositoryCommits,
    isError,
    isLoading,
    isFetching,
    isPending,
    isSuccess,
  };
}
