import React, { useState } from 'react';
import axios from 'axios';
import {
  Modal,
  Text,
  Stack,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  useDisclosure,
} from '@chakra-ui/react';

const EditModal = ({ isOpen, onClose, jsonTableData, currentTab}) => {
  // Use the useDisclosure hook to handle modal visibility
  const { isOpen: modalIsOpen, onClose: closeModal } = useDisclosure();

  // State variables to track edited data
  const [editedData, setEditedData] = useState({});

  const [column1Data, setColumn1Data] = useState('');
  const [column2Data, setColumn2Data] = useState('');

  const handleChangeColumn1 = (e) => {
    setColumn1Data(e.target.value);
  };

  const handleChangeColumn2 = (e) => {
    setColumn2Data(e.target.value);
  };

  // Function to handle save button click
  const handleSave = async () => {
    const updates = [];

    for (const key in editedData) {
      const update = {
        columnName: key,
        oldValue: jsonTableData[key],
        newValue: editedData[key]
      };

      updates.push(update);
    }
    
    console.log('World Name:', column1Data);
    console.log('Lore:', column2Data);
    console.log("Current Tab:", currentTab);

    if(currentTab === 1) {
      axios.post('http://localhost:8080/World', { W_Name: column1Data, Lore: column2Data})
        .then((response) => {
        console.log('Data updated successfully:', response);
        onClose(); // Close the modal
      })
      .catch((error) => {
        console.error('Failed to update data:', error);
      });
    }

    if (currentTab === 2) {

    }

    if (currentTab === 3) {

    }

    if (currentTab === 4) {

    }

    onClose(); // Close the modal
  };

  if(currentTab === 1) {
    return (
      <Modal isOpen={isOpen || modalIsOpen} onClose={onClose || closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create</ModalHeader>
          <ModalBody>
            <Stack spacing={3} direction="column">
              <Stack spacing={1} direction="row">
                <Text noWrap>World Name:</Text>
                <Input size="sm" border="1px solid #000" value={column1Data} onChange={handleChangeColumn1}/>
              </Stack>

              <Stack spacing={1} direction="row">
                <Text noWrap>Lore:</Text>
                <Input size="sm" border="1px solid #000" value={column2Data} onChange={handleChangeColumn2} />
              </Stack>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose || closeModal}>
              Close
            </Button>
            {/* Add your Save or Update button here */}
            <Button colorScheme="green" onClick={handleSave}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }


};

export default EditModal;
