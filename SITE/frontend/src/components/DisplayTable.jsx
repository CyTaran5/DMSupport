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
  } from "@chakra-ui/react"


const DisplayTable = ({jsonTableData}) => {
  console.log("Display table has json data:", jsonTableData);
  
  return (
    <div>
      <h1>Data reciever component</h1>
      <p>Recieved JSON DATA:</p>
      <pre>{JSON.stringify(jsonTableData, null, 2)}</pre>
    </div>

//   <Table variant="simple">
//   <TableCaption>Imperial to metric conversion factors</TableCaption>
//   <Thead>
//     <Tr>
//       <Th>To convert</Th>
//       <Th>into</Th>
//       <Th isNumeric>multiply by</Th>
//     </Tr>
//   </Thead>
//   <Tbody>
//     <Tr>
//       <Td>inches</Td>
//       <Td>millimetres (mm)</Td>
//       <Td isNumeric>25.4</Td>
//     </Tr>
//     <Tr>
//       <Td>feet</Td>
//       <Td>centimetres (cm)</Td>
//       <Td isNumeric>30.48</Td>
//     </Tr>
//     <Tr>
//       <Td>yards</Td>
//       <Td>metres (m)</Td>
//       <Td isNumeric>0.91444</Td>
//     </Tr>
//   </Tbody>
//   <Tfoot>
//     <Tr>
//       <Th>To convert</Th>
//       <Th>into</Th>
//       <Th isNumeric>multiply by</Th>
//     </Tr>
//   </Tfoot>
// </Table>

  )
};

export default DisplayTable;
