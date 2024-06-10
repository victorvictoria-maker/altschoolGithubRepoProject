import { FaGithub } from "react-icons/fa";
import ModalComponent from "./ModalComponent";
import { useState } from "react";
// import { useGitHubRepo } from "../context/repoContext";

const Navbar = (prop) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // trying context
  // const { repo: repoz } = useGitHubRepo();
  // console.log(repoz);

  return (
    <nav className='bg-gradient-to-r from-purple-800 via-green-800 to-red-800 p-4 flex flex-wrap items-center justify-between'>
      {/* <p>{repoz}</p> */}
      <div className='flex items-center justify-center'>
        <FaGithub className='text-white mr-2' />
        <h1 className='text-white text-lg font-bold sm:mb-1 mb:4  '>
          victorvictoria-maker
        </h1>
      </div>

      <div className='flex items-center justify-between w-full sm:w-auto'>
        {/* Add w-full sm:w-auto */}
        <input
          type='text'
          placeholder='Search repo...'
          className='px-4 py-2 bg-gray-100 text-black rounded-md focus:outline-none focus:bg-gray-100  mr-4'
          onChange={prop.searchRepo}
          required
          aria-required='true'
        />
        {/* modal comoponent */}
        <ModalComponent
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          mode='create'
        />
      </div>
    </nav>
  );
};

export default Navbar;
