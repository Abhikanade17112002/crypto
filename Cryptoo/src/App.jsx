import "./index.css";
import Navbar from "./Components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
const App = () => {
  return (
    <div className="App">
   
        <Navbar></Navbar>
  
      <main>
        <Outlet />
      </main>
    
      <Footer></Footer>
     
     
    </div>
  );
};

export default App;
