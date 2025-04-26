import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Component/pages/Home";
import Alltask from "./Component/pages/Alltask";


function App() {
  return (
 
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-tasks" element={<Alltask />} />
      </Routes>
    </Router>
    
  );
}

export default App;