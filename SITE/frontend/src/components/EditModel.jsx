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

  // Function to handle data field changes
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
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
    
    console.log('Edited Data:', editedData);
    console.log("Current Tab:", currentTab);

    if(currentTab === 1) {
      const formattedUpdates = updates.map(update => {
        if (update.columnName === 'W_Name') {
          update.order = 1;
        } else if (update.columnName === 'Lore') {
          update.order = 2;
        }
        return update;
      }).sort((a, b) => {
        return a.order - b.order;
      });

      axios.put('http://localhost:8080/World/update', { updates: formattedUpdates })
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
