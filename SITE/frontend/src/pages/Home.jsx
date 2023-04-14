import React, { useEffect } from "react";
import { useState } from "react";
import axios from 'axios';
import Navbar from '../components/Navbar';
import ListItem from '../components/ListItem';
import TableSelect from '../components/TableSelect';
import DisplayTable from '../components/DisplayTable';
import { 
    Box, 
    Input, 
    Flex
} from "@chakra-ui/react";

const Home = () => {
    const [jsonTableData, setJsonTableData] = useState(null);
    const [currentTable, setCurrentTable] = useState(null);

    
    const handleJsonReceived = (data, whichTableSelected) => {
        setJsonTableData(data);
        setCurrentTable(whichTableSelected);
    }

    return (
        <Box bg="white" h="100%" minH="100vh" pb={5}>
            <Navbar />
            <TableSelect onJsonDataReceived={handleJsonReceived} />
            <DisplayTable jsonTableData={jsonTableData} currentTable={currentTable}/>
        </Box>
    );

}

export default Home;