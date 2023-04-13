import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuDivider,
  MenuList,
  MenuItem,
  Tabs, TabList, TabPanels, Tab, TabPanel,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'; //imports from Chakra UI


// const showWorld = async (id) => {
//   try {
//     await axios.get("http://localhost:8080/World" + id); //axios call to the backend
//     window.location.reload(); //reloads the page
//   }
//   catch (err) {
//     console.error(err.message); //log error
//   }
// };



//Navbar component (only renders the nav bar rather than a full page)
const TableSelect = () => {
  const [isOpen, setIsOpen] = useState(false); //state for the menu

  const toggle = () => setIsOpen(!isOpen); //function to toggle the menu

  return (
    <Tabs defaultIndex={1} isFitted variant='enclosed' colorScheme='red' size='lg' align='center'>
  <TabList>
    <Tab _selected={{ color: 'white', bg: 'red.500' }} _unselected={{ color: 'white', bg: 'black.500' }}>Worlds</Tab>
    <Tab>Items</Tab>
    <Tab>Scenarios</Tab>
    <Tab>Entities</Tab>
    <Tab >Tab 1</Tab>
  </TabList>

  <TabPanels>
    <TabPanel>
    <TableContainer>
  <Table variant='simple'>
    <Thead>
      <Tr>
        <Th>World Name</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Td>World1</Td>
        
      </Tr>
      <Tr>
        <Td>World2</Td>
        
      </Tr>
      <Tr>
        <Td>World3</Td>

      </Tr>
    </Tbody>
  </Table>
</TableContainer>
    </TabPanel>
    <TabPanel>
      <p>THESE ARE YOUR ITEMS!</p>
    </TabPanel>
    <TabPanel>
      <p>THESE ARE YOUR SCENARIOS!</p>
    </TabPanel>
    <TabPanel>
      <p>THESE ARE YOUR ENTITIES!</p>
    </TabPanel>
  </TabPanels>
</Tabs>
      );
};

export default TableSelect;
