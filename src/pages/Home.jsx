import { useState, useEffect } from "react";
import {
  useCreateNewRepo,
  useDeleteRepo,
  useFetchAllRepoData,
} from "./../customHooks/useFetchData";
import { Helmet } from "react-helmet-async";
import RepoList from "../components/RepoList";
import ReactPaginate from "react-paginate";
import { SimpleGrid, Button, Box } from "@chakra-ui/react";
// import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import ModalComponent from "../components/ModalComponent";

const Home = () => {
  const { repositories, isError, isLoading } = useFetchAllRepoData();
  const {
    mutate,
    newlyCreatedRepo,
    isPending,
    isError: repoCreationError,
    isSuccess,
  } = useCreateNewRepo();
  const { deleteMutate } = useDeleteRepo();

  //   const [searchedWord, setsearchedWord] = useState("");
  const [filteredRepositories, setFilteredRepositories] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [showErrorBoundary, setShowErrorBoundary] = useState(false);

  // data for creating new repo
  const [newRepo, setNewRepo] = useState({});

  // Number of repository per page
  const PERPAGE = 6;

  // Data is saved to state after loading
  useEffect(() => {
    if (repositories) {
      setFilteredRepositories(repositories);
    }
  }, [repositories]);

  const searchRepo = (e) => {
    const typedWord = e.target.value.toLowerCase();
    // setsearchedWord(typedWord);

    if (typedWord.trim() === "") {
      //if there is no searched word i.e no word to filter, get all the repo
      setFilteredRepositories(repositories);
    } else {
      // get the repo that matches the searched word
      const filtered = repositories.filter((repo) =>
        repo.name.toLowerCase().includes(typedWord)
      );

      // update the filtered repositories and reset to the first page to display
      setFilteredRepositories(filtered);
      setCurrentPage(0);
    }
  };

  const pageCount = Math.ceil(filteredRepositories.length / PERPAGE);
  const offset = currentPage * PERPAGE;
  const currentRepos = filteredRepositories.slice(offset, offset + PERPAGE);

  // Pagination event handler
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  //   mimic error boundary
  const changeErrorBoundary = () => {
    setShowErrorBoundary(true);
  };

  // handle creation of new repo
  const updateRepo = (initialRef, publicRef) => {
    const newRepoName = initialRef.current.value;
    // format user input so whitespace can be replaced with hyphen just like github does it
    const formattedRepoName = newRepoName.replace(/\s+/g, "-");
    const repoType = publicRef.current.checked ? "public" : "private";

    // check if the repository already exists
    const repoExists = () => {
      const lowercaseNewRepoName = formattedRepoName.toLowerCase();
      return repositories.some(
        (eachRepo) => eachRepo.name.toLowerCase() === lowercaseNewRepoName
      );
    };

    if (repoExists()) {
      console.log(`repository name  - ${newRepoName} - is not available`);
      return;
    } else {
      console.log("goOn");
      mutate({ newRepoName, repoType });

      if (isPending) {
        console.log("Pending repo creation");
      }

      if (isSuccess) {
        console.log("Suucessfully craeted new repo");
      }
    }
  };

  // deletion of the newly created repos
  const deleteRepository = (repoName) => {
    deleteMutate(repoName);
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
          {/* <Navbar /> */}

          {/* search  */}
          <div>
            <input type='text' placeholder='Search' onChange={searchRepo} />
          </div>

          {/* page not found */}
          <Button
            colorScheme='green'
            onClick={() => (window.location.href = "/")}
          >
            404
          </Button>

          {/* error boundary */}
          <Button colorScheme='red' onClick={changeErrorBoundary}>
            Toggle Error Boundary
          </Button>
          {showErrorBoundary && (
            <Button onClick={renderWrongComponent}>Error Boundary</Button>
          )}

          {/* modal comoponent */}
          <ModalComponent updateRepo={updateRepo} />

          {/* the repositories */}
          <SimpleGrid
            as='main'
            minChildWidth='300px'
            px='20px'
            py='40px'
            gap='15px'
          >
            {currentRepos.map((eachRepo) => (
              <RepoList
                key={eachRepo.created_at}
                eachRepo={eachRepo}
                deleteRepository={deleteRepository}
              />
            ))}
          </SimpleGrid>

          {/* <button onClick={errorFunction}>Error Boundary</button> */}

          {/* handle pagination */}
          <Box display='flex' justifyContent='center' marginTop='20px'>
            <ReactPaginate
              // eslint-disable-next-line react/no-unknown-property
              nextLabel={<button> Next</button>}
              onPageChange={handlePageChange}
              pageRangeDisplayed={0}
              marginPagesDisplayed={0}
              pageCount={pageCount}
              previousLabel={<button>Previous</button>}
              previousClassName='page-item'
              previousLinkClassName='page-link'
              nextClassName='page-item'
              nextLinkClassName='page-link'
              containerClassName='pagination'
              activeClassName='active'
            />
          </Box>
        </>
      )}
    </div>
  );
};

export default Home;
