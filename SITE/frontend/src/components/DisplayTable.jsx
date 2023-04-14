import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
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


const DisplayTable = ({jsonTableData}) => {
  console.log("Display table has json data:", jsonTableData);

  if (!jsonTableData || jsonTableData.length === 0) {
    return (
      <div>
        <h1>No data available</h1>
      </div>
    );
  }
  const headers = jsonTableData.length > 0 ? Object.keys(jsonTableData[0]) : [];

  return (
    <TableContainer>
      <Table varient = 'simple'>
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
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
};

export default DisplayTable;
