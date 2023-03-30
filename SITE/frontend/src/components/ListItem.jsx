import React from "react";
import { Box, Checkbox, Card } from "@chakra-ui/react";
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

//this is a component for each todo item once it has been added
const TodoItem = ({ todo, onDelete }) => {

  //Deals with the delete axios call once the delete button is clicked
  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8080/todos/delete/" + id); //axios call to the backend
      window.location.reload(); //reloads the page
    }
    catch (err) {
      console.error(err.message); //log error
    }
  };

  //Deals with the update axios call once the checkbox is clicked
  const handleUpdate = async (id) => {
    try {
      await axios.put("http://localhost:8080/todos/update/" + id); //axios call to the backend
      window.location.reload(); //reloads the page
    }
    catch (err) {
      console.error(err.message); //log error
    }
  };

  //since this is a component, it returns the jsx for each todo item individually rather than showing HTML for a full page
  return (
    <Box d="flex" alignItems="center" justifyContent="space-between" w="50%">
      <Card d="flex" flexDirection="row" alignItems="center" p="0.5rem" pl="1rem" pr="1rem" mb="0.5rem" bg="blue.600">
        <Checkbox 
          isChecked={todo.isCompleted} 
          onChange={()=>handleUpdate(todo.itemID)}
          color="white"
          flex="1" 
          mr="2rem" 
          size="lg" 
          spacing='1rem'>
          {todo.itemName}
        </Checkbox>
        <button 
          type="button"
          onClick={()=>handleDelete(todo.itemID)}>
          <FontAwesomeIcon icon={faTrash} style={{ color: '#e86848' }}/>
        </button>
      </Card>
    </Box>
  );
};

export default TodoItem;
