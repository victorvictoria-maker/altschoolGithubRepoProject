import { NavLink } from "react-router-dom";

function formatDate(timestamp) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2); // Adding 1 because months are zero-indexed
  const day = ("0" + date.getDate()).slice(-2);

  return `${day}-${month}-${year}`;
}

const RepoList = (prop) => {
  let eachRepo = prop.eachRepo;
  return (
    <li key={eachRepo.created_at}>
      <NavLink to={`/repositories/${eachRepo.name}`}>
        {eachRepo.name} || {eachRepo.language} || {eachRepo.visibility} ||{" "}
        {formatDate(eachRepo.created_at)}
      </NavLink>
    </li>
  );
};

export default RepoList;
