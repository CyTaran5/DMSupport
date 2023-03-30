import React, { useEffect } from "react";
import { useState } from "react";
import axios from 'axios';
import Navbar from '../components/Navbar';
import ListItem from '../components/ListItem';
import { 
    Box, 
    Input, 
    Flex
} from "@chakra-ui/react";

const Todos = () => {
    //states- one for each backend method
    const [todos, setTodos] = React.useState([]); //For the get method
    const [newTodo, setNewTodo] = useState({ //For the post method
        itemName: "", //corresponds to the name of the field in the json body
    });
    
    //useEffect- for the get method
    useEffect(() => {
        const getTodos = async () => {
            try{
                const res =await axios.get("http://localhost:8080/todos") //this is the backend endpoint
                    setTodos(res.data); //set the state to the data returned from the backend
            }
            catch(err){
                console.error(err.message); //console log the error
            }
        }
        getTodos(); //call the function
    }, []);


    //handleChange and handleClick- for the post method
    const handleChange = (e) => {
        setNewTodo(prev => ({...prev, [e.target.name]: e.target.value})); //set the state to the value of the input
    }

    const handleClick = async (e) => {
        try {
            const res = await axios.post("http://localhost:8080/todos", newTodo); //this is the backend endpoint
            setTodos(prevTodos => [...prevTodos, res.data]); //add the new todo to the list of todos
            setNewTodo({ itemName: "" }); // reset the form
        } catch(err) {
            console.error(err.message); //console log the error
        }
    };

    return (
        <Box bg="blackAlpha.900" h="100%" minH="100vh" pb={5}>
            <Navbar />
                <form onSubmit={handleClick}>
                    <Input 
                        type="text" 
                        name="itemName"
                        placeholder="Add a todo"
                        color="whiteAlpha.800"
                        w="50%"
                        m="1rem"
                        onChange={handleChange}

                    />
                </form>
            <Flex direction="column" align="center">
                {todos.map((todo) => (
                    <ListItem todo={todo} />
                ))}
            </Flex>
        </Box>
    );
}

export default Todos;
