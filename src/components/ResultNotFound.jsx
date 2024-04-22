import { Box, Heading, Center } from "@chakra-ui/react";

const ResultNotFound = () => {
  return (
    <Center height='75vh' textAlign='center'>
      <Box textAlign='center'>
        <Heading as='h1' size='xl' color='purple.600' mt={8} mb={4}>
          No repository matches your search
        </Heading>
      </Box>
    </Center>
  );
};

export default ResultNotFound;
