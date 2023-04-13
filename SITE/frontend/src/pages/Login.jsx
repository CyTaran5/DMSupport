import Navbar from '../components/Navbar';
import { 
    Box, 
    Heading
} from "@chakra-ui/react";

const Login = () => {
    return (
        <Box bg="blackAlpha.900" h="100%" minH="100vh" pb={5}>
            
            <Heading
                p={100}
                color="whiteAlpha.800"
            > 
            You are on your login page! </Heading>
            
        </Box>
    );
}

export default Login;
