// import { createContext, useContext } from "react";
// import {
//   useFetchAllRepoData,
//   useCreateNewRepo,
//   useDeleteRepo,
//   useFetchRepoData,
// } from "./customHooks/useFetchData.js"; // Import functions from useFetch file

import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import {
  useCreateNewRepo,
  useFetchAllRepoData,
  useFetchRepoData,
} from "../customHooks/useFetchData";
import { useEffect } from "react";

// const AllRepoContext = createContext();

// export const useGitHub = () => useContext(AllRepoContext);

// // eslint-disable-next-line react/prop-types
// export const AllRepoContextProvider = ({ children }) => {
//   // Use the functions from useFetch file
//   const {
//     repositories,
//     isError: allReposError,
//     isLoading: allReposLoading,
//   } = useFetchAllRepoData();
//   const {
//     mutate: createRepo,
//     newlyCreatedRepo,
//     isPending: createRepoPending,
//   } = useCreateNewRepo();
//   const { deleteMutate: deleteRepo } = useDeleteRepo();
//   const {
//     repositoryData,
//     repositoryLanguages,
//     repositoryCommits,
//     isError: singleRepoError,
//     isLoading: singleRepoLoading,
//   } = useFetchRepoData();

//   // Pass the functions and data to the context value
//   const value = {
//     repositories,
//     allReposError,
//     allReposLoading,
//     createRepo,
//     newlyCreatedRepo,
//     createRepoPending,
//     deleteRepo,
//     repositoryData,
//     repositoryLanguages,
//     repositoryCommits,
//     singleRepoError,
//     singleRepoLoading,
//   };

//   return (
//     <AllRepoContext.Provider value={value}>{children}</AllRepoContext.Provider>
//   );
// };

const AllRepoContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useGitHubRepo = () => useContext(AllRepoContext);

// eslint-disable-next-line react/prop-types
const AllRepoContextProvider = ({ children }) => {
  // the state every component is reaching
  const [allRepositories, setAllRepositories] = useState([]);

  //   fetching of all repositories
  const { repositories, isError, isLoading } = useFetchAllRepoData();
  useEffect(() => {
    setAllRepositories(repositories);
    // console.log("gogo - context");
  }, [repositories]);

  const value = {
    allRepositories,
    setAllRepositories,
    isError,
    isLoading,
  };
  return (
    <AllRepoContext.Provider value={value}>{children}</AllRepoContext.Provider>
  );
};

export default AllRepoContextProvider;
