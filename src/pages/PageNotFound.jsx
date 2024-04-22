import { Box, Heading, Text, Button, Center, Image } from "@chakra-ui/react";
import error404 from "../assets/error.png";

function ErrorNotFound() {
  return (
    <Center height='100vh'>
      <Box textAlign='center'>
        <Image
          src={error404}
          alt='Page Found'
          width='350px'
          paddingLeft='10px'
        />
        <Heading as='h1' size='xl' color='purple.600' mt={8} mb={4}>
          Oops! Page Not Found
        </Heading>
        <Text color='indigo.500' fontSize='xl' mb={8}>
          The page you are looking for does not exist.
        </Text>
        <Button
          colorScheme='green'
          onClick={() => (window.location.href = "/")}
        >
          Go Home
        </Button>
      </Box>
    </Center>
  );
}

export default ErrorNotFound;
