import { Button, Flex, Text } from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = (prop) => {
  return (
    <footer className='bg-gradient-to-r from-purple-800 via-green-800 to-red-800 mt-5 text-white p-4'>
      <Flex justify='space-between' alignItems='center'>
        <Link to='/404'>
          <Button
            colorScheme='green'
            // onClick={() => (window.location.href = "/404")}
          >
            Test 404 Page
          </Button>
        </Link>
        <Button colorScheme='green' onClick={prop.changeErrorBoundary}>
          Toggle Error Boundary
        </Button>
      </Flex>
      <Text mt={4} fontSize='sm' textAlign='center'>
        Thank you Setemi <FaHeart className='text-red-500 inline-block' />
        <br />
        For teaching JavaScript and React in the best way!
      </Text>
    </footer>
  );
};

export default Footer;
