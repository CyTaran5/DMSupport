import { useState } from 'react';
import axios from 'axios';
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

const U_ID = 2;

//Navbar component (only renders the nav bar rather than a full page)
const TableSelect = ({onJsonDataReceived}) => {
  
  const getWorlds = async () => {
    const url1 = `http://localhost:8080/World?UserID=` + U_ID;
    
    try {
      const WorldGet = await axios.get(url1); //axios call to the backend
      onJsonDataReceived(WorldGet.data, 1);
    }
    catch (err) {
      console.error(err.message); //log error
    }
  }

  const getEntities = async () => {
    const url2 = `http://localhost:8080/Entity?UserID=` + U_ID;
    try {
      const EntitiesGet = await axios.get(url2); //axios call to the backend
      onJsonDataReceived(EntitiesGet.data, 4);
    }
    catch (err) {
      console.error(err.message); //log error
    }
  }

  const getItems = async () => {
    const url3 = `http://localhost:8080/Items?UserID=` + U_ID;
    
    try {
      const ItemGet = await axios.get(url3); //axios call to the backend
      onJsonDataReceived(ItemGet.data, 2);
    }
    catch (err) {
      console.error(err.message); //log error
    }
  }

  const getScenerios = async () => {
    const url4 = `http://localhost:8080/Scenarios?UserID=` + U_ID;
    
    try {
      const SceneriosGet = await axios.get(url4); //axios call to the backend
      onJsonDataReceived(SceneriosGet.data, 3);
    }
    catch (err) {
      console.error(err.message); //log error
    }
  }

  const [isOpen, setIsOpen] = useState(false); //state for the menu

  const toggle = () => setIsOpen(!isOpen); //function to toggle the menu

  return (
  <Tabs defaultIndex={1} isFitted backgroundColor= {'red.100'} colorScheme='red' size='lg' align='center' position="relative" variant="unstyled">
  <TabList>
    <Tab _selected={{color: 'white', bg: 'red.500'}} onClick={() => getWorlds()}>Worlds</Tab>
    <Tab _selected={{color: 'white', bg: 'red.500'}} onClick={() => getItems()}>Items</Tab>
    <Tab _selected={{color: 'white', bg: 'red.500'}} onClick={() => getScenerios()}>Scenarios</Tab>
    <Tab _selected={{color: 'white', bg: 'red.500'}} onClick={() => getEntities()}>Characters & Entities</Tab>
  </TabList>
</Tabs>
  );
};

export default TableSelect;
