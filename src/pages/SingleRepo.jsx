import { FaGithub } from "react-icons/fa";
import { Flex, Heading, Text, Tag, Link, Box } from "@chakra-ui/react";
import { useFetchRepoData } from "../customHooks/useFetchData";
import Loading from "../components/Loading";
import { useParams } from "react-router-dom";
import { capitalizeText, formatDate } from "../utils/formatingFunctions";

const SingleRepoPage = () => {
  const { id: repoName } = useParams();
  const {
    repositoryData,
    repositoryLanguages,
    repositoryCommits,
    isLoading,
    isFetching,
    isPending,
    isError,
  } = useFetchRepoData("victorvictoria-maker", repoName);

  if (isLoading || isFetching || isPending) {
    return <Loading />;
  }

  if (isError) {
    return <p>Error fetching data.</p>;
  }

  let languages;
  if (repositoryLanguages) {
    languages = Object.keys(repositoryLanguages);
  } else {
    languages = null;
  }
  const mainLanguage = repositoryData?.language;
  const commitCount = repositoryCommits?.length;
  const lastCommitMessage = repositoryCommits[0]?.commit?.message;
  const lastCommitTime = repositoryCommits[0]?.commit?.author.date;

  return (
    <Flex
      direction='column'
      alignItems='center'
      justifyContent='center'
      minH='100vh'
      px={4}
      py={8}
      bgGradient='linear(to-r, purple.800, green.400, red.500)'
    >
      <Box
        maxW='xl'
        bg='white'
        boxShadow='lg'
        rounded='lg'
        p={{ base: 6, md: 8 }}
        textAlign='left'
      >
        <Flex justify='space-between' align='center' mb={6}>
          <Heading size='lg' fontWeight='bold'>
            <FaGithub mr={2} />
            {repoName}
          </Heading>
        </Flex>
        <Flex flexWrap='wrap' mb={4}>
          {languages.map((lang, index) => (
            <Tag key={index} size='sm' mr={2} mb={2} bg='gray.200'>
              {lang}
            </Tag>
          ))}
        </Flex>
        <Text fontSize='sm' color='gray.500'>
          {capitalizeText(repositoryData.visibility)} repository
        </Text>
        <Text fontSize='sm' color='gray.500' mb={2}>
          Main Language: {capitalizeText(mainLanguage)}
        </Text>
        <Text fontSize='sm' color='gray.500' mb={2}>
          Default Branch: {capitalizeText(repositoryData.default_branch)}
        </Text>
        <Text fontSize='sm' color='gray.500' mb={2}>
          Last Updated: {formatDate(repositoryData.updated_at)}
        </Text>
        <Text fontSize='sm' color='gray.500' mb={4}>
          Created At: {formatDate(repositoryData.created_at)}
        </Text>
        <Text fontSize='sm' color='gray.500' mb={2}>
          Last Commit Message: {lastCommitMessage}
        </Text>
        <Text fontSize='sm' color='gray.500' mb={6}>
          Last Commited: {formatDate(lastCommitTime)}
        </Text>

        <Flex
          flexWrap={{ base: "wrap", md: "nowrap" }}
          justifyContent={{ md: "space-between" }}
          mb={3}
        >
          <Text fontSize='sm' color='gray.500' mb={{ base: 2, md: 0 }}>
            No of Commits: {commitCount}
          </Text>
          <Text fontSize='sm' color='gray.500' mb={{ base: 2, md: 0 }} mr={4}>
            Size: {repositoryData.size} kb
          </Text>
          <Text fontSize='sm' color='gray.500' mb={{ base: 2, md: 0 }} mr={4}>
            Forks: {repositoryData.forks_count}
          </Text>
          <Text fontSize='sm' color='gray.500' mb={{ base: 2, md: 0 }} mr={4}>
            Subscribers: {repositoryData.subscribers_count}
          </Text>
          <Text fontSize='sm' color='gray.500' mb={{ base: 2, md: 0 }} mr={4}>
            Watchers: {repositoryData.watchers_count}
          </Text>
        </Flex>

        <Flex justifyContent='space-between'>
          <Link
            href={repositoryData.html_url}
            isExternal
            bg='purple.800'
            color='white'
            px={4}
            py={2}
            rounded='md'
            _hover={{ bg: "purple.900" }}
            display='inline-block'
          >
            View on Github
          </Link>
          <Link
            href='/'
            bg='purple.800'
            color='white'
            px={4}
            py={2}
            rounded='md'
            _hover={{ bg: "purple.900" }}
            display='inline-block'
          >
            See other repositories
          </Link>
        </Flex>
      </Box>
    </Flex>
  );
};

export default SingleRepoPage;
