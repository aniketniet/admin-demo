import { HomeIcon,  UserIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
import Home from "./src/pages/dashboard/home"; // Fixed path



import PrivateRoute from "@/components/PrivateRoute";

// import BannerManager from "@/pages/dashboard/BannerManager";
// import Vendors
//  from "@/pages/dashboard/vendor/Vendor";
import CreateFaq from "@/pages/dashboard/Faq/CreateFaq";
import Audiobooks from "@/pages/dashboard/audio/Audiobooks";
import VideoBooks from "@/pages/dashboard/video/VideoBook";
import { AudioLinesIcon, ImageUpIcon,  VideoIcon } from "lucide-react";
import Users from "@/pages/dashboard/users/users";

const iconClass = "w-5 h-5 text-inherit";

export const routes = [
  {
    layout: "dashboard",

    pages: [
      {
        icon: <HomeIcon className={iconClass} />,
        name: "Dashboard",
        path: "/home", // Fixed path
        element: (
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        ),
      },

      {
        icon: <UserIcon className={iconClass} />,
        name: "All Users",
        path: "/all-users", // Fixed path
        element: (
          <PrivateRoute>
            <Users />
          </PrivateRoute>
        ),
      },
      {
        icon: <AudioLinesIcon className={iconClass} />,
        name: "Audio Book",
        path: "/audio-book", // Fixed path
        element: (
          <PrivateRoute>
            <Audiobooks />
          </PrivateRoute>
        ),
      },
      {
        icon: <VideoIcon className={iconClass} />,
        name: "Video Book",
        path: "/Video-book", // Fixed path
        element: (
          <PrivateRoute>
            <VideoBooks />
          </PrivateRoute>
        ),
      },

      {
        icon: <QuestionMarkCircleIcon className={iconClass} />,
        name: "Create FAQ",
        path: "/create-faq", // Fixed path
        element: (
          <PrivateRoute>
            <CreateFaq />
          </PrivateRoute>
        ),
      },
      // {
      //   icon: <UserCheck2Icon className={iconClass} />,
      //   name: "All Vendors",
      //   path: "/all-vendors", // Fixed path
      //   element: (
      //     <PrivateRoute>
      //       <Vendors />
      //     </PrivateRoute>
      //   ),
      // },
      // {
      //   icon: <ImageUpIcon className={iconClass} />,
      //   name: "Create Banner",
      //   path: "/creare-banner", // Fixed path
      //   element: (
      //     <PrivateRoute>
      //       <BannerManager />
      //     </PrivateRoute>
      //   ),
      // },
    ],
  },
];

export default routes;
