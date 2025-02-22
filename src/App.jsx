import { Routes, Route } from "react-router-dom";
import Dashboard from "./layouts/Dashboad"; // Fixed typo
import Login from "./auth/Login";
import PrivateRoute from "./components/PrivateRoute";



function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      {/* Added missing `/` in path */}
      {/* Private route */}
      <Route
        path="/*"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
     

    </Routes>

  );
}

export default App;
