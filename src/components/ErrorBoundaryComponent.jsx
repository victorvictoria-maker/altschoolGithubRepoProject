import { Box, Heading, Button, Center, Image } from "@chakra-ui/react";
import errorBoundary from "../assets/errorFlag.png";

function ErrorNotFound() {
  return (
    <Center height='100vh' textAlign='center'>
      <Box textAlign='center'>
        <Image
          src={errorBoundary}
          alt='errorBoundary'
          width='350px'
          paddingLeft='10px'
        />
        <Heading as='h1' size='xl' color='purple.600' mt={8} mb={4}>
          Error boundary!!!
        </Heading>
        <Button
          colorScheme='green'
          onClick={() => (window.location.href = "/")}
        >
          Reload Page
        </Button>
      </Box>
    </Center>
  );
}

export default ErrorNotFound;
