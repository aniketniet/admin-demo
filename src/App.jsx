import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import RolesManagement from "./pages/dashboard/roles/RolesManagement";
import Home from "./pages/dashboard/home";
import PlayerManagement from "./pages/dashboard/roles/PlayerManagement";
import VenueManagement from "./pages/dashboard/roles/VenueManagement";
import NotificationManagement from "./pages/dashboard/roles/NotificationManagement";
import BadgeManagement from "./pages/dashboard/roles/BadgeManagement";
import LogTracking from "./pages/dashboard/roles/LogTracking";
import AccountSettings from "./pages/dashboard/roles/AccountSettings";
import ZylopassManagement from "./pages/dashboard/roles/ZylopassManagement";
import SettlementManagement from "./pages/dashboard/roles/SettlementManagement";
import FranchisingManagement from "./pages/dashboard/roles/FranchisingManagement";
import AdditionalFeatures from "./pages/dashboard/roles/AdditionalFeatures";
import PromoManagement from "./pages/dashboard/roles/PromoManagement";

const Dashboard = lazy(() => import("./layouts/Dashboad")); // Fixed typo
const Login = lazy(() => import("./auth/Login"));

function App() {
  return (
    <Suspense fallback={<div className="flex flex-col w-full h-[100vh] justify-center items-center">Loading...</div>}>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* Private route */}
       <Route path="/" element={<Dashboard />} />
       <Route path="/roles-management" element={<RolesManagement />} />
       <Route path="/home" element={<Home />} />
       <Route path="/player-management" element={<PlayerManagement />} />
       <Route path="/venue-management" element={<VenueManagement />} />
       <Route path="/roles" element={<RolesManagement />} />
       <Route path="/notifications" element={<NotificationManagement />} />
       <Route path="/promos" element={<PromoManagement   />} />
       <Route path="/badge-management" element={<BadgeManagement />} />
       <Route path="/log-tracking" element={<LogTracking />} />
       <Route path="/account-settings" element={<AccountSettings />} />
       <Route path="/zylopass" element={<ZylopassManagement />} />
        <Route path="/settlement" element={<SettlementManagement />} />
       {/* <Route path="/learnings" element={<learning />} /> */}
       <Route path="/franchising" element={<FranchisingManagement />} />
       <Route path="/additional-features" element={<AdditionalFeatures />} />
      </Routes>
    </Suspense>
  );
}

export default App;
