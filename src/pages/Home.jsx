import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useFetchAllRepoData } from "./../customHooks/useFetchData";

// import { v4 as uuidv4 } from "uuid";

// const key = uuidv4();

// import { startTransition } from "react";

function formatDate(timestamp) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2); // Adding 1 because months are zero-indexed
  const day = ("0" + date.getDate()).slice(-2);

  return `${day}-${month}-${year}`;
}

const Home = () => {
  const { repositories, isError, isLoading } = useFetchAllRepoData();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRepositories, setFilteredRepositories] = useState([]);

  // Save the data in state when it's loaded
  useEffect(() => {
    if (repositories) {
      setFilteredRepositories(repositories);
    }
  }, [repositories]);

  const searchRepo = (e) => {
    const typedWord = e.target.value.toLowerCase();
    setSearchTerm(typedWord);
    if (typedWord.trim() === "") {
      setFilteredRepositories(repositories);
    } else {
      setFilteredRepositories(
        repositories.filter((repo) =>
          repo.name.toLowerCase().includes(typedWord)
        )
      );
    }
  };

  // if (repositories?.data) {
  //   for (let index = 0; index < repositories.data.length; index++) {
  //     //   console.log(repositories.data);
  //     console.log(
  //       repositories.data[index].created_at,
  //       repositories.data[index].commits_url,
  //       repositories.data[index].default_branch,
  //       repositories.data[index].full_name,
  //       repositories.data[index].language,
  //       repositories.data[index].name,
  //       repositories.data[index].owner,
  //       repositories.data[index].private,
  //       repositories.data[index].pushed_at,
  //       repositories.data[index].updated_at,
  //       repositories.data[index].url,
  //       repositories.data[index].visibility,
  //       `End of ${[index]}`
  //     );
  //   }
  // }
  //   created_at, commits_url, default_branch, full_name, language, name, owner, private, pushed_at, updated_at,url, visibility

  return (
    <div>
      {isError && <p>Error everywhere.</p>}
      {isLoading && <p>Loadin...</p>}
      {!isLoading && !isError && (
        <>
          <div>
            <input type='text' placeholder='search' onChange={searchRepo} />
          </div>
          <ol>
            {filteredRepositories?.map((eachRepo) => {
              return (
                <li key={eachRepo.created_at}>
                  <NavLink to={`/repositories/${eachRepo.name}`}>
                    {eachRepo.name} || {eachRepo.language} ||{" "}
                    {eachRepo.visibility} || {formatDate(eachRepo.created_at)}
                  </NavLink>
                </li>
              );
            })}
          </ol>
        </>
      )}
    </div>
  );
};

export default Home;
