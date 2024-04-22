import { NavLink } from "react-router-dom";

import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Text,
  Button,
  Box,
} from "@chakra-ui/react";

function formatDate(timestamp) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);

  return `${day}-${month}-${year}`;
}

function capitalizeText(text) {
  if (typeof text !== "string") {
    return;
  }

  return text.charAt(0).toUpperCase() + text.slice(1);
}

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
        <Heading
          as='h3'
          fontSize='xl'
          fontWeight='bold'
          color='indigo.500'
          // lineHeight='0'
        >
          {capitalizeText(eachRepo.name)}
        </Heading>
      </CardHeader>
      <CardBody paddingTop='0'>
        <Text>
          Main Language: {eachRepo.language ? eachRepo.language : "None"}
        </Text>
        <Text>Last Updated: {formatDate(eachRepo.updated_at)}</Text>
        <Text>{capitalizeText(eachRepo.visibility)} repo</Text>

        {/* know more detalils button */}
        <NavLink
          to={`/repositories/${eachRepo.name}`}
          style={{ textDecoration: "none" }}
        >
          <Button colorScheme='green' marginTop='15px'>
            Know more details
          </Button>
        </NavLink>

        {/* delete and update button */}
        {eachRepo.description === distinctingText ? (
          <Box mt='10px'>
            <Button
              colorScheme='yellow'
              onClick={() => updateRepository(eachRepo.name)}
            >
              Update
            </Button>
            <Button
              colorScheme='red'
              onClick={() => deleteRepository(eachRepo.name)}
            >
              Delete
            </Button>
          </Box>
        ) : (
          ""
        )}
      </CardBody>
    </Card>
  );
};

export default RepoList;
