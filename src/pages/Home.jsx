import { useState, useEffect } from "react";
import { useFetchAllRepoData } from "./../customHooks/useFetchData";
import { Helmet } from "react-helmet-async";
import RepoList from "../components/RepoList";
import ReactPaginate from "react-paginate";

const Home = () => {
  const { repositories, isError, isLoading } = useFetchAllRepoData();
  //   const [searchedWord, setsearchedWord] = useState("");
  const [filteredRepositories, setFilteredRepositories] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  // Number of repository per page
  const PERPAGE = 10;

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

      {isLoading && <p>Loading...</p>}

      {/* this should render when there is no error and it is done loading */}
      {!isLoading && !isError && (
        <>
          <div>
            <input type='text' placeholder='Search' onChange={searchRepo} />
          </div>
          <ol>
            {currentRepos.map((eachRepo) => (
              <RepoList key={eachRepo.created_at} eachRepo={eachRepo} />
            ))}
          </ol>

          {/* handle pagination */}
          <ReactPaginate
            nextLabel={<button>Next</button>}
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
        </>
      )}
    </div>
  );
};

export default Home;
