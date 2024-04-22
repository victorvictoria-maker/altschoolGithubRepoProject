import { NavLink } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Text,
  Button,
  Box,
} from "@chakra-ui/react";
import { capitalizeText, formatDate } from "../utils/formatingFunctions";

const distinctingText =
  "This repo was not craeted from github directly, but from AltSchool github project!";

const RepoList = (prop) => {
  const { eachRepo, deleteRepository, updateRepository } = prop;
  //   console.log(eachRepo);
  return (
    <Card
      key={eachRepo.created_at}
      px='15px'
      borderTop='4px'
      borderColor='purple.600'
    >
      <CardHeader>
        {/* <h1>Come</h1> */}
        <Heading
          fontSize='2xl'
          fontWeight='bold'
          color='indigo.500'
          // lineHeight='0'
        >
          {capitalizeText(eachRepo.name)}
        </Heading>
      </CardHeader>
      <CardBody as='section' paddingTop='0'>
        <Text>
          Main Language: {eachRepo.language ? eachRepo.language : "None"}
        </Text>
        <Text>Last Updated: {formatDate(eachRepo.updated_at)}</Text>
        <Text>{capitalizeText(eachRepo.visibility)} repo</Text>

        <Box
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          marginTop='15px'
        >
          {/* know more details button */}
          <NavLink to={`/repositories/${eachRepo.name}`}>
            <Button colorScheme='green'>
              More details <FaArrowRight className='ml-2' />
            </Button>
          </NavLink>

          {/* delete button */}
          {eachRepo.description === distinctingText && (
            <Button
              colorScheme='red'
              onClick={() => deleteRepository(eachRepo.name)}
            >
              <MdDelete />
            </Button>
          )}
        </Box>
      </CardBody>
    </Card>
  );
};

export default RepoList;
