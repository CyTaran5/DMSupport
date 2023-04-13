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
  Tabs, TabList, TabPanels, Tab, TabPanel
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
    <Tab>Worlds</Tab>
    <Tab>Items</Tab>
    <Tab>Scenarios</Tab>
    <Tab>Entities</Tab>
  </TabList>

  <TabPanels>
    <TabPanel>
      <p>THESE ARE YOUR WORLDS!</p>
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
