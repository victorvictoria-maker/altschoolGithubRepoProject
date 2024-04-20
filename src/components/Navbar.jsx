import {
  Box,
  Flex,
  IconButton,
  Input,
  Spacer,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
// import { HamburgerIcon, SearchIcon } from "@chakra-ui/icons";

const Navbar = () => {
  const displayLogoText = useBreakpointValue({ base: true, md: false });
  const displaySearchInput = useBreakpointValue({ base: false, md: true });

  return (
    <Flex align='center' p={4} borderBottom='1px' borderColor='gray.200'>
      {displayLogoText && (
        <Text fontSize='xl' fontWeight='bold'>
          Logo Text
        </Text>
      )}
      {displaySearchInput && (
        <Input
          placeholder='Search'
          variant='outline'
          size='sm'
          mx={4}
          flex='1'
        />
      )}
      <Spacer />
      <Box display={{ base: "block", md: "none" }}>
        {/* <IconButton icon={<HamburgerIcon />} aria-label='Open menu' /> */}
        <p aria-label='Open menu'>Open </p>
      </Box>
      <Box display={{ base: "none", md: "block" }}>
        <p>Come</p>
        {/* <IconButton icon={<SearchIcon />} aria-label='Search' mr={2} /> */}
        {/* <IconButton icon={<AddIcon />} aria-label="Add" mr={2} /> */}
        {/* <IconButton icon={<BellIcon />} aria-label="Notifications" /> */}
      </Box>
    </Flex>
  );
};

export default Navbar;
