import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

const Dashboard = lazy(() => import("./layouts/Dashboad")); // Fixed typo
const Login = lazy(() => import("./auth/Login"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* Private route */}
        <Route path="/*" element={<Dashboard />} />
      </Routes>
    </Suspense>
  );
}

export default App;
