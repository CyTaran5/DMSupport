import React, { useState } from 'react';
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

const EditModal = ({ isOpen, onClose, jsonTableData }) => {
  // Use the useDisclosure hook to handle modal visibility
  const { isOpen: modalIsOpen, onClose: closeModal } = useDisclosure();

  // State variables to track edited data
  const [editedData, setEditedData] = useState({});

  // Function to handle data field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  // Function to handle save button click
  const handleSave = () => {
    // Call a function to update the data with editedData
    // You can pass editedData to your backend API for update
    console.log('Edited Data:', editedData);
    onClose(); // Close the modal
  };

  console.log('Working with:', jsonTableData);

  return (
    <Modal isOpen={isOpen || modalIsOpen} onClose={onClose || closeModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Data</ModalHeader>
        <ModalBody>
        <Stack spacing={3}>
            {/* Generate input spaces dynamically based on column names */}
            {Object.keys(jsonTableData).map((columnName) => (
              <Stack direction='row' alignItems='center' key={columnName}>
                {/* Display column name as label */}
                <Text>{columnName}: </Text>
                <Input
                  placeholder={jsonTableData[columnName]} // Set placeholder to data value
                  size='sm'
                  border='1px solid #000' // Add border property here
                  onChange={handleChange}
                  name={columnName}
                  value={editedData[columnName] || ''}
                />
              </Stack>
            ))}
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
};

export default EditModal;
