import Navbar from '../components/Navbar';
import { 
    Box, 
    Heading
} from "@chakra-ui/react";

const Account_Details = () => {
    return (
        <Box bg="blackAlpha.900" h="100%" minH="100vh" pb={5}>
            <Navbar />
            <Heading p={100} color="whiteAlpha.800"> 
                Will show account details
            </Heading>
        </Box>
    );
}

export default Account_Details;
