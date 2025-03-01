import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ArchiveBoxArrowDownIcon,
  UsersIcon,
  TicketIcon,
  BellIcon,
} from "@heroicons/react/24/solid";
import Home from "./src/pages/dashboard/home"; // Fixed path
import Profile from "./src/pages/dashboard/profile"; // Fixed path
import Tables from "./src/pages/dashboard/tables"; // Fixed path
import Notifications from "./src/pages/dashboard/notifications"; // Fixed path
import Leads from "./src/pages/dashboard/leads/Leads"; // Fixed path
import Users from "./src/pages/dashboard/AllUser/Users/Users"; // Fixed path
import Coupon from "./src/pages/dashboard/Coupon";
import Professional from "./src/pages/dashboard/AllUser/professional/Professional";
import Client from "./src/pages/dashboard/AllUser/client/Client";
import Agency from "./src/pages/dashboard/AllUser/agency/Agency";
import Susbscriber from "./src/pages/dashboard/subscriber/Subscriber";
import CreateInvoice from "./src/pages/dashboard/invocie/CreateInvoice";
import AllInvoice from "./src/pages/dashboard/invocie/AllInvoice";
import Newsubscriber from "./src/pages/dashboard/newsubscriber/Newsubscriber";
import Permissions from "./src/pages/dashboard/role/Permissions";
import Role from "./src/pages/dashboard/role/Role";
import AddUserForRole from "./src/pages/dashboard/role/AddUserForRole";
import TechninzaCreateInvoice from "@/pages/dashboard/invocie-techninza/TechninzaCreateInvoice";
import TechninzaInvoice from "@/pages/dashboard/invocie-techninza/TechninzaInvoice";
const iconClass = "w-5 h-5 text-inherit";

export const routes = [
  {
    layout: "dashboard",

    pages: [
      {
        icon: <HomeIcon className={iconClass} />,
        name: "Dashboard",
        path: "/home", // Fixed path
        element: <Home />,
      },

      {
        icon: <ArchiveBoxArrowDownIcon className={iconClass} />,
        name: "All Leads",
        path: "/leads", // Fixed path
        element: <Leads />,
      },
      {
        icon: <UsersIcon className={iconClass} />,
        name: "All Users",
        path: "/users", // Main path for "All Users" without any element
        subPages: [
          { name: "Users", path: "/users/all", element: <Users /> },
          {
            name: "Professional",
            path: "/users/professional",
            element: <Professional />,
          },
          { name: "Client", path: "/users/client", element: <Client /> },
          { name: "Agency", path: "/users/agency", element: <Agency /> },
        ],
      },
      {
        icon: <UsersIcon className={iconClass} />,
        name: "Leads",
        path: "/users", // Main path for "All Users" without any element
        subPages: [
          { name: "Leads", path: "/users/all", element: <Users /> },
          {
            name: "Lead Sharing",
            path: "/users/professional",
            element: <Professional />,
          },
          { name: "Active Leads", path: "/users/client", element: <Client /> },
        ],
      },
      {
        icon: <UsersIcon className={iconClass} />,
        name: "Gigs",
        path: "/users", // Main path for "All Users" without any element
        subPages: [
          { name: "All Gigs", path: "/users/all", element: <Users /> },
          {
            name: "Gigs Purchase",
            path: "/users/professional",
            element: <Professional />,
          },
        ],
      },
      {
        icon: <UsersIcon className={iconClass} />,
        name: "Account",
        path: "/invoice", // Main path for "All Users" without any element
        subPages: [
          {
            name: "Create Invoice",
            path: "/invoice/create",
            element: <CreateInvoice />,
          },
          {
            name: "All Invoice",
            path: "/invoice/all",
            element: <AllInvoice />,
          },
        ],
      },
      {
        icon: <UsersIcon className={iconClass} />,
        name: "Techninza",
        path: "/bill", // Main path for "All Users" without any element
        subPages: [
          {
            name: "Create Invoice",
            path: "/bill/techninza/billcreate",
            element: <TechninzaCreateInvoice />,
          },
          {
            name: "All Invoice",
            path: "/bill/techninza/all",
            element: <TechninzaInvoice />,
          },
        ],
      },
      {
        icon: <BellIcon className={iconClass} />,
        name: "Subscriber",
        path: "/subscriber", // Fixed path
        element: <Susbscriber />,
      },

      {
        icon: <BellIcon className={iconClass} />,
        name: "New Subscriber",
        path: "/newsubscriber", // Fixed path
        element: <Newsubscriber />,
      },

      {
        icon: <UserCircleIcon className={iconClass} />,
        name: "Profile",
        path: "/profile", // Fixed path
        element: <Profile />,
      },
      {
        icon: <HomeIcon className={iconClass} />,
        name: "Role",
        path: "/role", // Fixed path
        subPages: [
          { name: "Add Role", path: "/role", element: <Role /> },
          {
            name: "Add Permissions",
            path: "/Permissions",
            element: <Permissions />,
          },
          { name: "Add User", path: "/adduser", element: <AddUserForRole /> },
        ],
        element: <Role />,
      },
      {
        icon: <TableCellsIcon className={iconClass} />,
        name: "Tables",
        path: "/tables", // Fixed path
        element: <Tables />,
      },
      {
        icon: <InformationCircleIcon className={iconClass} />,
        name: "Notifications",
        path: "/notifications", // Fixed path
        element: <Notifications />,
      },
      {
        icon: <TicketIcon className={iconClass} />,
        name: "Coupons",
        path: "/coupons", // Fixed path
        element: <Coupon />,
      },
    ],
  },
];

export default routes;
