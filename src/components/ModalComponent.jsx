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
import {
  useCreateNewRepo,
  useFetchAllRepoData,
} from "../customHooks/useFetchData";

const ModalComponent = () => {
  const [newRepoName, setNewRepoName] = useState("");
  const [newRepoType, setNewRepoType] = useState("public");
  const [repoNameValidated, setRepoNameValidated] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const publicRef = useRef();
  const privateRef = useRef();
  const { repositories } = useFetchAllRepoData();
  const {
    mutate,
    newlyCreatedRepo,
    isPending,
    isError: repoCreationError,
    isSuccess,
  } = useCreateNewRepo();

  // Function to check if repository already exists
  const checkIfRepoExists = () => {
    const newName = initialRef.current.value;
    setNewRepoName(newName); // Update newRepoName state
    const formattedRepoName = newName.replace(/\s+/g, "-");

    const repoExists = () => {
      const lowercaseNewRepoName = formattedRepoName.toLowerCase();
      return repositories.some(
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
      console.log("You can mutate now");
      console.log({ newRepoName, newRepoType });
      mutate({ newRepoName, newRepoType });
      if (isPending) {
        console.log("Pending repo creation");
      }

      if (isSuccess) {
        console.log("Suucessfully craeted new repo");
      }

      onClose();
    } else {
      return;
    }
  };

  return (
    <>
      <Button colorScheme='green' onClick={onOpen}>
        New
      </Button>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
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
              />
              {newRepoName && (
                <Text>
                  {repoNameValidated ? (
                    <span>You are good to go, {newRepoName} is available</span>
                  ) : (
                    <span>{newRepoName} is not available</span>
                  )}
                </Text>
              )}
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Visibility</FormLabel>
              <RadioGroup
                defaultValue='public'
                onChange={(value) => setNewRepoType(value)}
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
              <Button colorScheme='blue' mr={3} onClick={createNewRepo}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalComponent;
