import {
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  RadioGroup,
  Radio,
  HStack,
  Text,
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import { useCreateNewRepo } from "../customHooks/useFetchData";
import { useGitHubRepo } from "../context/repoContext";
import { useEffect } from "react";

const ModalComponent = () => {
  const [newRepoName, setNewRepoName] = useState("");
  const [newRepoType, setNewRepoType] = useState("public");
  const [repoNameValidated, setRepoNameValidated] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const publicRef = useRef();
  const privateRef = useRef();
  // const { repositories } = useFetchAllRepoData();
  const { allRepositories, setAllRepositories } = useGitHubRepo();
  const { mutate } = useCreateNewRepo();

  // Function to check if repository already exists
  const checkIfRepoExists = () => {
    const newName = initialRef.current.value;
    setNewRepoName(newName); // Update newRepoName state
    const formattedRepoName = newName.replace(/\s+/g, "-");

    const repoExists = () => {
      const lowercaseNewRepoName = formattedRepoName.toLowerCase();
      return allRepositories.some(
        (eachRepo) => eachRepo.name.toLowerCase() === lowercaseNewRepoName
      );
    };

    if (repoExists()) {
      console.log(`Repository name - ${newName} - is not available`);
      setRepoNameValidated(false);
    } else {
      setRepoNameValidated(true);
    }
  };

  // Function to create a new repository
  const createNewRepo = () => {
    if (repoNameValidated) {
      mutate(
        { newRepoName, newRepoType },
        {
          onSuccess: (data) => {
            setAllRepositories((prevRepos) => {
              return [...prevRepos, data];
            });
            onClose();
            setNewRepoName("");
            alert(
              "Oops, It might take a short while for the ui to update, still trying to ix the delay bug."
            );
          },
        }
      );
    } else {
      return;
    }
  };

  // useEffect(() => {
  //   console.log(allRepositories);
  // }, [allRepositories]);

  return (
    <>
      <Button colorScheme='green' onClick={onOpen}>
        New
      </Button>

      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setNewRepoName("");
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your new repository</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            as='form'
            pb={6}
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <FormControl>
              <FormLabel>Repository name</FormLabel>
              <Input
                ref={initialRef}
                placeholder='Repository name'
                onChange={checkIfRepoExists}
                required
                aria-required='true'
              />
              {newRepoName && (
                <Text>
                  {repoNameValidated ? (
                    <small className='text-green-600'>
                      You are good to go, repository name {newRepoName} is
                      available
                    </small>
                  ) : (
                    <small className='text-red-600 font-bold-600'>
                      Repository name {newRepoName} is not available
                    </small>
                  )}
                </Text>
              )}
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Visibility</FormLabel>
              <RadioGroup
                defaultValue='public'
                onChange={(value) => setNewRepoType(value)}
                colorScheme='green'
                required
                aria-required='true'
              >
                <HStack spacing='24px'>
                  <Radio ref={publicRef} value='public'>
                    Public
                  </Radio>
                  <Radio ref={privateRef} value='private'>
                    Private
                  </Radio>
                </HStack>
              </RadioGroup>
            </FormControl>

            <ModalFooter>
              <Button colorScheme='green' mr={3} onClick={createNewRepo}>
                Save
              </Button>
              <Button
                onClick={() => {
                  onClose();
                  setNewRepoName("");
                }}
              >
                Cancel
              </Button>
            </ModalFooter>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalComponent;
