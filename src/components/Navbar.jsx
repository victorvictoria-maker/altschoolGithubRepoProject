// import {
//   Box,
//   Flex,
//   IconButton,
//   Input,
//   Spacer,
//   Text,
//   useBreakpointValue,
// } from "@chakra-ui/react";
// // import { HamburgerIcon, SearchIcon } from "@chakra-ui/icons";

// const Navbar = () => {
//   const displayLogoText = useBreakpointValue({ base: true, md: false });
//   const displaySearchInput = useBreakpointValue({ base: false, md: true });

//   return (
//     <nav class='bg-gray-800 p-4'>
//       {/* Left side: Page title */}
//       <div class='flex items-center flex-grow'>
//         <h1 class='text-white text-lg font-bold'>Page Title</h1>
//       </div>

//       {/* Right side: Search bar  */}
//       <div class='flex items-center ml-4'>
//         <input
//           type='text'
//           placeholder='Search...'
//           className='px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:bg-gray-600'
//         />

//         {/* Search icon (optional)  */}
//         <svg
//           xmlns='http://www.w3.org/2000/svg'
//           className='h-6 w-6 text-white ml-2'
//           viewBox='0 0 20 20'
//           fill='currentColor'
//         >
//           <path
//             fill-rule='evenodd'
//             d='M15.707 14.293l3.01 3.01a1 1 0 0 1-1.414 1.414l-3.01-3.01a7.5 7.5 0 1 1 1.414-1.414zM9 15.5A6.5 6.5 0 1 0 9 2a6.5 6.5 0 0 0 0 13z'
//             clip-rule='evenodd'
//           />
//         </svg>
//       </div>
//     </nav>

//     // <Flex align='center' p={4} borderBottom='1px' borderColor='gray.200'>
//     //   {displayLogoText && (
//     //     <Text fontSize='xl' fontWeight='bold'>
//     //       Logo Text
//     //     </Text>
//     //   )}
//     //   {displaySearchInput && (
//     //     <Input
//     //       placeholder='Search'
//     //       variant='outline'
//     //       size='sm'
//     //       mx={4}
//     //       flex='1'
//     //     />
//     //   )}
//     //   <Spacer />
//     //   <Box display={{ base: "block", md: "none" }}>
//     //     {/* <IconButton icon={<HamburgerIcon />} aria-label='Open menu' /> */}
//     //     <p aria-label='Open menu'>Open </p>
//     //   </Box>
//     //   <Box display={{ base: "none", md: "block" }}>
//     //     <p>Come</p>
//     //     {/* <IconButton icon={<SearchIcon />} aria-label='Search' mr={2} /> */}
//     //     {/* <IconButton icon={<AddIcon />} aria-label="Add" mr={2} /> */}
//     //     {/* <IconButton icon={<BellIcon />} aria-label="Notifications" /> */}
//     //   </Box>
//     // </Flex>
//   );
// };

// export default Navbar;
import { FaGithub } from "react-icons/fa";

const Navbar = (prop) => {
  return (
    <nav className='bg-gradient-to-r from-purple-800 via-green-800 to-red-800 p-4 flex flex-wrap items-center justify-between'>
      <div className='flex items-center'>
        <FaGithub className='text-white mr-2' />
        <h1 className='text-white text-lg font-bold mb-4 sm:mb-0'>
          victorvictoria-maker
        </h1>
      </div>

      <div className='flex items-center'>
        <input
          type='text'
          placeholder='Search repo...'
          className='px-4 py-2 bg-gray-100 text-black rounded-md focus:outline-none focus:bg-gray-100'
          onChange={prop.searchRepo}
        />
      </div>
    </nav>
  );
};

export default Navbar;
