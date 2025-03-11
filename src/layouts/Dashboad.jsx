import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "../layout/Sidebar";
import routes from "../../routes";
import DashboardNavbar from "../layout/dashboard-navbar";
import { useState } from "react";
import LeadDetail from "../pages/dashboard/leads/LeadDetail";
import EditUsers from "../pages/dashboard/AllUser/Users/EditUsers";
import AddSubscriber from "../pages/dashboard/subscriber/AddSubscriber";
import AddnewSubscriber from "../pages/dashboard/newsubscriber/AddnewSubscriber";
import Addnewuser from "../pages/dashboard/Addnewuser";
import Invoice from "../components/Invoice";
import TechninzaInvoice from "@/components/TechninzaInvoice";
import AddDescription from "@/pages/dashboard/urban-addProduct/DescriptionProduct";
import ViewProductDetails from "@/pages/dashboard/urban-addProduct/VIewProductDetails";
import PrivateRoute from "@/components/PrivateRoute";
import OrderDetail from "@/pages/dashboard/urban-addProduct/OrderDetail";

// import PrivateRoute from "@/components/PrivateRoute";

const Dashboard = () => {
  // Local state for toggling sidebar visibility on mobile
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-blue-gray-50/50">
      {/* Sidebar */}
      <div
        className={`transition-all duration-300 ${
          isOpen ? "w-72" : "w-0"
        } md:w-72`}
      >
        <Sidebar routes={routes} isOpen={isOpen} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4 md:ml-4 h-screen overflow-y-auto transition-all duration-300">
        <DashboardNavbar isOpen={isOpen} setIsOpen={setIsOpen} />
        <Routes>
          {/* Redirect /dashboard to /dashboard/home */}
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route
            path="/detail/:id"
            element={
                <LeadDetail />
            }
          />
          

          <Route
            path="/edituser/:id"
            element={
             
                <EditUsers />
            
            }
          />
          <Route
            path="/order-detail/:id"
            element={
             
              <PrivateRoute> <OrderDetail /></PrivateRoute>
            
            }
          />
          <Route
            path="/add-description/:id"
            element={
             
                <AddDescription />
            
            }
          />
          <Route
            path="/view-product-detail/:id"
            element={
             
                <ViewProductDetails />
            
            }
          />
          <Route
            path="/addsubscriber"
            element={
              
                <AddSubscriber />
           
            }
          />
          <Route
            path="/addnewsubscriber"
            element={
            
                <AddnewSubscriber />
           
            }
          />
          <Route
            path="/addnewuser"
            element={
            
                <Addnewuser />
            
            }
          />
          <Route path="/asignpermission/:id" element={<EditUsers />} />
          <Route path="/invoice/:id" element={<Invoice />} />
          <Route path="/techninza-bill/:id" element={<TechninzaInvoice />} />
          {routes.map(({ layout, pages }) =>
            layout === "dashboard"
              ? pages.map(({ path, element, subPages }) => (
                  <>
                    <Route
                      key={path}
                      path={path.replace("/", "")}
                      element={element}
                    />
                    {/* Handle subpages routing */}
                    {subPages?.map((subPage) => (
                      <Route
                        key={subPage.path}
                        path={subPage.path}
                        element={subPage.element || <div>Not Implemented</div>}
                      />
                    ))}
                  </>
                ))
              : null
          )}
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
