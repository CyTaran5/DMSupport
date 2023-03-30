import Navbar from '../components/Navbar';
import { 
    Box, 
    Heading
} from "@chakra-ui/react";

const Surprise = () => {
    return (
        <Box bg="blackAlpha.900" h="100%" minH="100vh" pb={5}>
            <Navbar />
            <Heading
                p={100}
                color="whiteAlpha.800"
            > 
            Surprise!!! Now you have an example of routing to another page! </Heading>
        </Box>
    );
}

export default Surprise;
