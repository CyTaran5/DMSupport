import { useState } from 'react';
import axios from 'axios';
import EditModal from "./EditModel";

import { Link } from 'react-router-dom';
import {
    Button,
    ButtonGroup,
    Spacer,
    Flex,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
  } from "@chakra-ui/react"


  const handleDelete = (data, currentTable) => {
    //data = id to delete.
    const id = data;
    if(currentTable === 1) {
      console.log('Deleting World with ID of:', data);
      axios.delete('http://localhost:8080/World/delete', {data: {W_ID : id}}).then(response => {
        console.log('Delete success:', response.data);
      })
      .catch(error => {
        console.error('Delete error:', error);
      });

    }

    if(currentTable === 2) {
      console.log('Deleting Item with ID of:', data);
      
      axios.delete('http://localhost:8080/Items/delete', {data: {I_ID : id}}).then(response => {
        console.log('Delete success:', response.data);
      })
      .catch(error => {
        console.error('Delete error:', error);
      });
    }

    if(currentTable === 3) {
      console.log('Deleting Scenerio with ID of:', data);
      axios.delete('http://localhost:8080/Scenarios/delete', {data: {S_ID : id}}).then(response => {
        console.log('Delete success:', response.data);
      })
      .catch(error => {
        console.error('Delete error:', error);
      });
    }

    if(currentTable === 4) {
      console.log('Delete Entity', data);
      axios.delete('http://localhost:8080/Entity/delete', {data: {E_ID : id}}).then(response => {
        console.log('Delete success:', response.data);
      })
      .catch(error => {
        console.error('Delete error:', error);
      });
    }
  };


//-----------------------------------------------------------------------------------------------------------------------------------

  const DisplayTable = ({jsonTableData, currentTable}) => {

  const handleEdit = (jsonTableData) => {
    setJsonEditData(jsonTableData);
    setEditModalOpen(true);
  };

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [jsonEditData, setJsonEditData] = useState(null);

  if (!jsonTableData || jsonTableData.length === 0) {
    return (
      <div>
        <h1>No data available</h1>
      </div>
    );
  }
  const headers = jsonTableData.length > 0 ? Object.keys(jsonTableData[0]) : [];

  return (
  <div>
    <TableContainer>
      <Table variant = 'simple'>
        <Thead>
          <Tr>
            {headers.map((header, index) => (
            <Th key={index}>{header}</Th>
            ))}
          </Tr>
        </Thead>

        <Tbody>          
          {jsonTableData.map((data, index) => (
            <Tr key={index}>
              {headers.map((header, index) => (
                <Td key={index}>{data[header]}</Td>
              ))}
              <Td>
                <Flex>
                <Button
                  variant='outline'
                  colorScheme='blue'
                  aria-label="Edit"
                  onClick={() => handleEdit(data)}
                >
                  Edit
                </Button>
                <Spacer />
                <Button
                  variant='outline'
                  colorScheme='red'
                  aria-label="Delete"
                  onClick={() => handleDelete(data.World_ID || data.Item_ID || data.Entity_ID || data.Scenario_ID, currentTable)}
                >
                  Delete
                </Button>
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>

    {editModalOpen && (
    <EditModal isOpen={editModalOpen} jsonTableData={jsonEditData} onClose={() => setEditModalOpen(false)} />
    )}
  </div>
  )
};

export default DisplayTable;
