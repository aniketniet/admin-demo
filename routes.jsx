// import { HomeIcon,  UserIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
// import Home from "./src/pages/dashboard/home"; // Fixed path
// import PrivateRoute from "@/components/PrivateRoute";
// import CreateFaq from "@/pages/dashboard/Faq/CreateFaq";
// import Audiobooks from "@/pages/dashboard/audio/Audiobooks";
// import VideoBooks from "@/pages/dashboard/video/VideoBook";
// import { AudioLinesIcon, VideoIcon } from "lucide-react";
// import Users from "@/pages/dashboard/users/users";
// import FreeAudiobooks from "@/pages/dashboard/audioFree/FreeAudiobooks";
// import CreateTestimonial from "@/pages/dashboard/testimonials/CreateTestimonial";
// import AudioPackage from "@/pages/dashboard/audioPackage/AudioPackage";

// const iconClass = "w-5 h-5 text-inherit";

// export const routes = [
//   {
//     layout: "dashboard",

//     pages: [
//       {
//         icon: <HomeIcon className={iconClass} />,
//         name: "SuperAdmin Role",
//         path: "/home", // Fixed path
//         element: (
//           <PrivateRoute>
//             <Home />
//           </PrivateRoute>
//         ),
//       },

//       {
//         icon: <UserIcon className={iconClass} />,
//         name: "Admin role",
//         path: "/all-users", // Fixed path
//         element: (
//           <PrivateRoute>
//             <Users />
//           </PrivateRoute>
//         ),
//       },
//       {
//         icon: <AudioLinesIcon className={iconClass} />,
//         name: "Audio Book",
//         path: "/audio-book", // Fixed path
//         element: (
//           <PrivateRoute>
//             <Audiobooks />
//           </PrivateRoute>
//         ),
//       },
      
//       {
//         icon: <AudioLinesIcon className={iconClass} />,
//         name: "Audio Package",
//         path: "/audio-package", // Fixed path
//         element: (
//           <PrivateRoute>
//             <AudioPackage/>
//           </PrivateRoute>
//         ),
//       },
//       {
//         icon: <AudioLinesIcon className={iconClass} />,
//         name: "Free Audio Book",
//         path: "/free-audio-book", // Fixed path
//         element: (
//           <PrivateRoute>
//             <FreeAudiobooks/>
//           </PrivateRoute>
//         ),
//       },
//       {
//         icon: <VideoIcon className={iconClass} />,
//         name: "Video Book",
//         path: "/Video-book", // Fixed path
//         element: (
//           <PrivateRoute>
//             <VideoBooks />
//           </PrivateRoute>
//         ),
//       },

//       {
//         icon: <QuestionMarkCircleIcon className={iconClass} />,
//         name: "Create FAQ",
//         path: "/create-faq", // Fixed path
//         element: (
//           <PrivateRoute>
//             <CreateFaq />
//           </PrivateRoute>
//         ),
//       },
//       {
//         icon: <QuestionMarkCircleIcon className={iconClass} />,
//         name: "Create Testimonial",
//         path: "/create-testimonial", // Fixed path
//         element: (
//           <PrivateRoute>
//             <CreateTestimonial/>
//           </PrivateRoute>
//         ),
//       },



//       // {
//       //   icon: <UserCheck2Icon className={iconClass} />,
//       //   name: "All Vendors",
//       //   path: "/all-vendors", // Fixed path
//       //   element: (
//       //     <PrivateRoute>
//       //       <Vendors />
//       //     </PrivateRoute>
//       //   ),
//       // },
//       // {
//       //   icon: <ImageUpIcon className={iconClass} />,
//       //   name: "Create Banner",
//       //   path: "/creare-banner", // Fixed path
//       //   element: (
//       //     <PrivateRoute>
//       //       <BannerManager />
//       //     </PrivateRoute>
//       //   ),
//       // },
//     ],
//   },
// ];

// export default routes;


import { HomeIcon, UserIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
// import { 
//   UserIcon as UserDetailIcon, 
//   UsersIcon, 
//   BellIcon, 
//   StarIcon, 
//   VideoIcon, 
//   BadgeCheckIcon, 
//   DocumentReportIcon,
//   CreditCardIcon 
// } from "@heroicons/react/24/outline";

// import Home from "./src/pages/dashboard/home";
// import PrivateRoute from "@/components/PrivateRoute";
// import RolesManagement from "@/pages/dashboard/roles/RolesManagement";
// import PlayerManagement from "@/pages/dashboard/players/PlayerManagement";
// import VenueManagement from "@/pages/dashboard/venues/VenueManagement";
// import NotificationManagement from "@/pages/dashboard/notifications/NotificationManagement";
// import PromoManagement from "@/pages/dashboard/promos/PromoManagement";
// import RatingManagement from "@/pages/dashboard/ratings/RatingManagement";
// import VideoManagement from "@/pages/dashboard/videos/VideoManagement";
// import BadgeManagement from "@/pages/dashboard/badges/BadgeManagement";
// import LogTracking from "@/pages/dashboard/logs/LogTracking";
// import AccountSettings from "@/pages/dashboard/account/AccountSettings";
// import ZylopassManagement from "@/pages/dashboard/zylopass/ZylopassManagement";
// import SettlementManagement from "@/pages/dashboard/settlements/SettlementManagement";
// import ReportsManagement from "@/pages/dashboard/reports/ReportsManagement";
// import EarningsManagement from "@/pages/dashboard/earnings/EarningsManagement";
// import FranchisingManagement from "@/pages/dashboard/franchising/FranchisingManagement";
import RolesManagement from "@/pages/dashboard/roles/RolesManagement";
import Home from "@/pages/dashboard/home";
import PlayerManagement from "@/pages/dashboard/roles/PlayerManagement";
import VenueManagement from "@/pages/dashboard/roles/VenueManagement";
import NotificationManagement from "@/pages/dashboard/roles/NotificationManagement";
// import PromoManagement from "@/pages/dashboard/roles/PromoManagement";


import PrivateRoute from "@/components/PrivateRoute";
import BadgeManagement from "@/pages/dashboard/roles/BadgeManagement";
import LogTracking from "@/pages/dashboard/roles/LogTracking";
import AccountSettings from "@/pages/dashboard/roles/AccountSettings";
import ZylopassManagement from "@/pages/dashboard/roles/ZylopassManagement";
import SettlementManagement from "@/pages/dashboard/roles/SettlementManagement";
import EarningsManagement from "@/pages/dashboard/roles/EarningsManagement";
import FranchisingManagement from "@/pages/dashboard/roles/FranchisingManagement";
import AdditionalFeatures from "@/pages/dashboard/roles/AdditionalFeatures";
import PromoManagement from "@/pages/dashboard/roles/PromoManagement";

const iconClass = "w-5 h-5 text-inherit";

export const routes = [
  {
    layout: "dashboard",
    pages: [
      // {
      //   // icon: <UserIcon className={iconClass} />,
      //   name: "SuperAdmin Role",
      //   subPages: [
      //     {
      //       name: "Roles Management",
      //       path: "/roles-management",
      //       // icon: <UsersIcon className="w-4 h-4" />,
      //       element: (
      //         <PrivateRoute>
      //           <RolesManagement />
      //         </PrivateRoute>
      //       )
      //     }
      //   ]
      // },
      {
        // icon: <HomeIcon className={iconClass} />,
        name: "Admin Role",
        subPages: [
          {
            name: "Home",
            path: "/home",
            // icon: <HomeIcon className="w-4 h-4" />,
            element: (
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            )
          },
          {
            name: "Player Management",
            path: "/player-management",
            // icon: <UserDetailIcon className="w-4 h-4" />,
            element: (
              <PrivateRoute>
                <PlayerManagement />
              </PrivateRoute>
            )
          },
          {
            name: "Venue Management",
            path: "/venue-management",
            // icon: <StarIcon className="w-4 h-4" />,
            element: (
              <PrivateRoute>
                <VenueManagement />
              </PrivateRoute>
            )
          },
          {
            name: "Roles",
            path: "/roles",
            // icon: <UsersIcon className="w-4 h-4" />,
            element: (
              <PrivateRoute>
                <RolesManagement />
              </PrivateRoute>
            )
          },
          {
            name: "Notification",
            path: "/notifications",
            // icon: <BellIcon className="w-4 h-4" />,
            element: (
              <PrivateRoute>
                <NotificationManagement />
              </PrivateRoute>
            )
          },
          {
            name: "Promo",
            path: "/promos",
            // icon: <StarIcon className="w-4 h-4" />,
            element: (
              <PrivateRoute>
                <PromoManagement />
              </PrivateRoute>
            )
          },
          // {
          //   name: "Rating",
          //   path: "/ratings",
          //   // icon: <StarIcon className="w-4 h-4" />,
          //   element: (
          //     <PrivateRoute>
          //       <RatingManagement />
          //     </PrivateRoute>
          //   )
          // },
          // {
          //   name: "Video Management",
          //   path: "/video-management",
          //   // icon: <VideoIcon className="w-4 h-4" />,
          //   element: (
          //     <PrivateRoute>
          //       <VideoManagement />
          //     </PrivateRoute>
          //   )
          // },
          {
            name: "Badge Management",
            path: "/badge-management",
            // icon: <BadgeCheckIcon className="w-4 h-4" />,
            element: (
              <PrivateRoute>
                <BadgeManagement />
              </PrivateRoute>
            )
          },
          {
            name: "Log Tracking",
            path: "/log-tracking",
            // icon: <DocumentReportIcon className="w-4 h-4" />,
            element: (
              <PrivateRoute>
                <LogTracking />
              </PrivateRoute>
            )
          },
          {
            name: "Account",
            path: "/account-settings",
            // icon: <UserDetailIcon className="w-4 h-4" />,
            element: (
              <PrivateRoute>
                <AccountSettings />
              </PrivateRoute>
            )
          },
          {
            name: "Zylopass",
            path: "/zylopass",
            // icon: <CreditCardIcon className="w-4 h-4" />,
            element: (
              <PrivateRoute>
                <ZylopassManagement />
              </PrivateRoute>
            )
          },
          {
            name: "Settlement",
            path: "/settlement",
            // icon: <CreditCardIcon className="w-4 h-4" />,
            element: (
              <PrivateRoute>
                <SettlementManagement />
              </PrivateRoute>
            )
          },
          // {
          //   name: "Reports",
          //   path: "/reports",
          //   // icon: <DocumentReportIcon className="w-4 h-4" />,
          //   element: (
          //     <PrivateRoute>
          //       <ReportsManagement />
          //     </PrivateRoute>
          //   )
          // },
          {
            name: "Earnings",
            path: "/earnings",
            // icon: <CreditCardIcon className="w-4 h-4" />,
            element: (
              <PrivateRoute>
                <EarningsManagement/>
              </PrivateRoute>
            )
          },
          {
            name: "Franchising",
            path: "/franchising",
            // icon: <StarIcon className="w-4 h-4" />,
            element: (
              <PrivateRoute>
                <FranchisingManagement/>
              </PrivateRoute>
            )
          },
          {
            name: "Additional Features",
            path: "/additional-features",
            // icon: <StarIcon className="w-4 h-4" />,
            element: (
              <PrivateRoute>
                <AdditionalFeatures />
              </PrivateRoute>
            )
          }
        ]
      }
    ]
  }
];

export default routes;