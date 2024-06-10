import { useState, useEffect } from "react";
import { useDeleteRepo } from "./../customHooks/useFetchData";
import { Helmet } from "react-helmet-async";
import RepoList from "../components/RepoList";

import { SimpleGrid, Button } from "@chakra-ui/react";
import Loading from "../components/Loading";

import Paginate from "../components/Paginate";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ResultNotFound from "../components/ResultNotFound";
import { useGitHubRepo } from "../context/repoContext";

const Home = () => {
  // trying context
  const { allRepositories, isError, isLoading } = useGitHubRepo();

  const { deleteMutate } = useDeleteRepo();

  const [filteredRepositories, setFilteredRepositories] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [showErrorBoundary, setShowErrorBoundary] = useState(false);

  // Number of repository per page
  const PERPAGE = 6;

  // Data is saved to state after loading
  useEffect(() => {
    // console.log("Hi");
    setFilteredRepositories(allRepositories);
    // console.log("gogo - home");
  }, [allRepositories]);

  const searchRepo = (e) => {
    const typedWord = e.target.value.toLowerCase();

    if (typedWord.trim() === "") {
      //if there is no searched word i.e no word to filter, get all the repo
      setFilteredRepositories(allRepositories);
    } else {
      // get the repo that matches the searched word
      const filtered = allRepositories.filter((repo) =>
        repo.name.toLowerCase().includes(typedWord)
      );

      // update the filtered repositories and reset to the first page to display
      setFilteredRepositories(filtered);
      setCurrentPage(0);
    }
  };

  const pageCount = Math.ceil(filteredRepositories?.length / PERPAGE);
  const offset = currentPage * PERPAGE;
  const currentRepos = filteredRepositories?.slice(offset, offset + PERPAGE);

  // Pagination event handler
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  //   mimic error boundary
  const changeErrorBoundary = () => {
    setShowErrorBoundary(true);
  };

  // update the newly created repos
  const updateRepository = (repoName) => {
    console.log(repoName);
  };

  // deletion of the newly created repos
  const deleteRepository = (repoName) => {
    deleteMutate(repoName);
    alert(
      "Oops, It might take a short while for the ui to update, still trying to ix the delay bug."
    );
  };

  return (
    <div>
      {/* for seo */}
      <Helmet>
        <title>@victorvictoria-maker github repositories</title>
        <meta
          name='description'
          content='This page shows all the repositories in my github account'
        />
      </Helmet>

      {/* error fetching data */}
      {isError && <p>Error everywhere.</p>}

      {isLoading && <Loading />}

      {/* this should render when there is no error and it is done loading */}
      {!isLoading && !isError && (
        <>
          <Navbar searchRepo={searchRepo} />
          {showErrorBoundary && (
            <Button onClick={renderWrongComponent}>Error Boundary</Button>
          )}
          {/* the repositories */}
          {currentRepos?.length > 0 ? (
            <>
              <SimpleGrid
                as='main'
                minChildWidth='300px'
                px='20px'
                paddingTop='40px'
                paddingBottom='0'
                gap='15px'
              >
                {currentRepos.map((eachRepo) => (
                  <RepoList
                    key={eachRepo.created_at}
                    eachRepo={eachRepo}
                    deleteRepository={deleteRepository}
                    updateRepository={updateRepository}
                  />
                ))}
              </SimpleGrid>

              {/* handle pagination */}
              <Paginate
                handlePageChange={handlePageChange}
                pageCount={pageCount}
              />

              {/* <p>{repoz}</p> */}
            </>
          ) : (
            <ResultNotFound />
          )}
          <Footer changeErrorBoundary={changeErrorBoundary} />
        </>
      )}
    </div>
  );
};

export default Home;
