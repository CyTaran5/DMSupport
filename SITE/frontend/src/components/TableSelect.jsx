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
  MenuItem
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
    <Flex as="nav" align="center" justify="space-between" wrap="wrap" padding="1rem" bg="pink.500" color="white">
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={'-.1rem'}>
          Table Select
        </Heading>
      </Flex>


      {/* Worlds Button */}
      <Box display={{ base: isOpen ? 'block' : 'none', md: 'flex' }} width={{ base: 'full', md: 'auto' }} alignItems="center">
        <Button
            variant="link"
            color="black"
            rightIcon={<svg width="5" height="5" viewBox="0 0 0 0" fill="none" xmlns="http://www.w3.org/2000/svg"></svg>}
            //onClick={()=>showWorld(todo.itemID)}
          >
          Worlds
        </Button>
      </Box>


      {/* Items Button */}
      <Box display={{ base: isOpen ? 'block' : 'none', md: 'flex' }} width={{ base: 'full', md: 'auto' }} alignItems="center">
        <Button
            variant="link"
            color="black"
            rightIcon={<svg width="5" height="5" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg"></svg>}
          >
          Items
        </Button>
      </Box>


      {/* Entities Button */}
      <Box display={{ base: isOpen ? 'block' : 'none', md: 'flex' }} width={{ base: 'full', md: 'auto' }} alignItems="center">
        <Button
            variant="link"
            color="black"
            rightIcon={<svg width="5" height="5" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg"></svg>}
          >
          Entities
        </Button>
      </Box>


      {/* Campaigns Button */}
      <Box display={{ base: isOpen ? 'block' : 'none', md: 'flex' }} width={{ base: 'full', md: 'auto' }} alignItems="center">
        <Button
            variant="link"
            color="black"
            rightIcon={<svg width="5" height="5" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg"></svg>}
          >
          Campaigns
        </Button>
      </Box>
    </Flex>
  );
};

export default TableSelect;
