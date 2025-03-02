import { Routes, Route } from "react-router-dom";
import Dashboard from "./layouts/Dashboad"; // Fixed typo
import Login from "./auth/Login";




function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      {/* Added missing `/` in path */}
      {/* Private route */}
      <Route
        path="/*"
        element={
    
            <Dashboard />
      
        }
      />
     

    </Routes>

  );
}

export default App;
