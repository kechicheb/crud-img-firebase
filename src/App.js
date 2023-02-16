import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AddEditUser from "./pages/AddEditUser";
function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="pages">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddEditUser />} />
          <Route path="/update/:id" element={<AddEditUser />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
