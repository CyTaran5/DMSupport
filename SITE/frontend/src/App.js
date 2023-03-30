import './App.css';
import Todos from './pages/Todos'; //import any pages you have (this is my home page)
import Surprise from './pages/Surprise'; //import any pages you have
import {BrowserRouter, Routes, Route} from "react-router-dom"; //import the router to navigate pages
import { ChakraProvider } from "@chakra-ui/react"; //import the Chakra UI library

function App() {
  return (
    
    // wrap the whole app in ChakraProvider
    //use the Route tag to route to your different pages
    
    <ChakraProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Todos/>} />
            <Route path="/surprise" element={<Surprise/>} />
          </Routes>
        </BrowserRouter>
      </div>
    </ChakraProvider>
  );
}

export default App;
