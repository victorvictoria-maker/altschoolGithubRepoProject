// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import "./App.css";

import { Octokit } from "octokit";

const token = import.meta.env.VITE_REACT_GITHUB_TOKEN;

const octokit = new Octokit({
  auth: token,
});

function App() {
  // const [count, setCount] = useState(0);

  const getData = async () => {
    try {
      const result = await octokit.request(
        "GET /users/victorvictoria-maker/repos",
        {
          username: "victorvictoria-maker",
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
          sort: "created",
          per_page: 10,
          //page: 1,
        }
      );

      console.log(result);
    } catch (error) {
      console.log(
        `Error! Status: ${error.status}. Message: ${error.response.data.message}`
      );
    }
  };

  getData();

  return <p>Start Project.</p>;
}

export default App;
