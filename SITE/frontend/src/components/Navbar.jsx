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

//Navbar component (only renders the nav bar rather than a full page)
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); //state for the menu

  const toggle = () => setIsOpen(!isOpen); //function to toggle the menu

  return (
    <Flex as="nav" align="center" justify="space-between" wrap="wrap" padding="1rem" bg="blue.500" color="white">
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={'-.1rem'}>
          Todo List
        </Heading>
      </Flex>

      <Box display={{ base: 'block', md: 'none' }} onClick={toggle}>
        <svg
          fill="white"
          width="12px"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path
            fillRule="evenodd"
            d="M20 18H0v-2h20v2zm0-7H0v-2h20v2zm0-7H0V2h20v2z"
          />
        </svg>
      </Box>

      <Box display={{ base: isOpen ? 'block' : 'none', md: 'flex' }} width={{ base: 'full', md: 'auto' }} alignItems="center">
        <Menu>
          <MenuButton
            as={Button}
            variant="ghost"
            color="white"
            rightIcon={<svg width="5" height="5" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg"></svg>}
          >
            Menu
          </MenuButton>
          <MenuList bg="blackAlpha.500">
            <MenuItem bg="blackAlpha.500"><Link to="/">My Todo List</Link></MenuItem>
            <MenuItem bg="blackAlpha.500"><Link to="/surprise">Surprise</Link></MenuItem>
            <MenuDivider />
            <MenuItem bg="blackAlpha.500"> Fake Logout</MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
};

export default Navbar;
