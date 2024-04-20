import { useParams } from "react-router-dom";
import { useFetchRepoData } from "../customHooks/useFetchData";
import { Helmet } from "react-helmet-async";

const SingleRepo = () => {
  const { id: repo } = useParams();

  // data from the fetchRepoData function in the hook
  const {
    repositoryData,
    repositoryLanguages,
    repositoryCommits,
    repositoryBranches,
    isLoading,
    isError,
  } = useFetchRepoData("victorvictoria-maker", repo);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error fetching data.</p>;
  }

  console.log(
    repositoryData,
    repositoryData.commits_url,
    repositoryData.created_at,
    repositoryData.default_branch,
    repositoryData.size,
    // stars
    repositoryData.stargazers_count,
    repositoryData.subscribers_count,
    repositoryData.forks_count,
    // repositoryData.deployment_url,
    repositoryData.visibility,
    repositoryData.updated_at
  );
  console.log(repositoryLanguages);
  console.log(repositoryCommits[0].commit.message);
  console.log(repositoryBranches[0].name);

  return (
    <div>
      <Helmet>
        <title>{`@victorvictoria-maker/${repo}`}</title>
        <meta
          name='description'
          content={`Details of my ${repo} repositories in my github account`}
        />
      </Helmet>

      <p>SingleRepo</p>
      <p>{repo}</p>
      {/* Render repository details, languages, commits, branches here */}
      <p>Stars</p>
      <p>Watch</p>
      <p>Fork</p>
      <p>Branches</p>
      <p>View on Github</p>
    </div>
  );
};

export default SingleRepo;
