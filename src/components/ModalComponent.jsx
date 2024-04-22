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
} from "@chakra-ui/react";
import { useRef } from "react";
// import {
//   useCreateNewRepo,
//   useFetchAllRepoData,
// } from "../customHooks/useFetchData";

const ModalComponent = ({ updateRepo }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const [firstName, setFirstName] = useState();
  // const [lastName, setLastName] = useState();

  const initialRef = useRef(null);
  const publicRef = useRef();
  const privateRef = useRef();
  // const finalRef = useRef(null);

  // const { repositories, isError, isLoading } = useFetchAllRepoData();
  // const {
  //   mutate,
  //   newlyCreatedRepo,
  //   isPending,
  //   isError: creatingRepoError,
  //   isSuccess,
  // } = useCreateNewRepo();

  // const updateRepo = () => {
  //   // check if the repositories have loaded
  //   if (isError || isLoading) {
  //     return;
  //   } else {
  //     //       Your new repository will be created as hello-Madam.
  //     // The repository name can only contain ASCII letters, digits, and the characters ., -, and _.

  //     let newRepoName = initialRef.current.value;
  //     const visibility = publicRef.current.checked ? "public" : "private";
  //     // visibility
  //     console.log(visibility);
  //     let formattedRepoName = newRepoName.replace(/\s+/g, "-");
  //     console.log(formattedRepoName);

  //     // check if repo name already exists
  //     const repoExists = (formattedRepoName) => {
  //       const lowercaseNewRepoName = formattedRepoName.toLowerCase();
  //       return repositories.some(
  //         (eachRepo) => eachRepo.name.toLowerCase() === lowercaseNewRepoName
  //       );
  //     };

  //     if (repoExists(newRepoName)) {
  //       console.log("repository name  - fhfhf - is not available");
  //       return;
  //     } else {
  //       console.log("goOn");
  //       mutate({ newRepoName, visibility });

  //       // Check if the mutation is successful and access the response data
  //       // if(isSuccess) {
  //       //   alert("Suucessful");
  //       // }
  //       // if (isSuccess && newlyCreatedRepo) {
  //       //   alert("success");
  //       //   onClose();
  //       //   console.log("New repository created:", newlyCreatedRepo);
  //       // }
  //     }

  return (
    <>
      <Button colorScheme='green' onClick={onOpen}>
        ModalComponent
      </Button>

      <Modal
        initialFocusRef={initialRef}
        // finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
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
              <Input ref={initialRef} placeholder='Repository name' />
            </FormControl>

            {/* <FormControl mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input ref={finalRef} placeholder='Last name' />
            </FormControl> */}
            <FormControl mt={4}>
              <FormLabel>Visibility</FormLabel>
              <RadioGroup defaultValue='public'>
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
              <Button
                colorScheme='blue'
                mr={3}
                onClick={() => updateRepo(initialRef, publicRef)}
              >
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
