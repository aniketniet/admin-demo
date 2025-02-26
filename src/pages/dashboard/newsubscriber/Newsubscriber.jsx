import { useState, useEffect, useCallback } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  IconButton,
  Spinner,
  //   Progress,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import Cookies from "js-cookie";
import CustomTable from "../../../components/CustomTable";
import { Link } from "react-router-dom"; // Import useNavigate
// import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

function Newsubscriber() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState(""); // Added search filter
  const [isLoading, setIsLoading] = useState(false);
  // State for single filter dropdown
  //   const [filter, setFilter] = useState("");

  const token = Cookies.get("token");

  const fetchUsers = useCallback(
    async (page) => {
      if (!token) return;
      setIsLoading(true);

      const form = new URLSearchParams();

      // Added search filter
      form.append("search", search);

      // If-else condition based on filter value
      //   if (filter === "client") {
      // form.append("is_buyer", "0");
      // Add any additional form data for "client"
      //   } else if (filter === "professional") {
      //     form.append("is_buyer", "0");
      //     // Add any additional form data for "bugery1"
      //   } else if (filter === "subscriber") {
      form.append("is_subscriber", "1");
      //     // Add any additional form data for "bugery1"
      //   } else if (filter === "agency") {
      //     form.append("is_company", "1");
      //     // Add any additional form data for "bugery1"
      //   }
      form.append("page", page);
      form.append("limit", 10);

      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/get-all-subscribers-data`,
          {
            params: form,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsers(data.data);
        setTotalPages(data.pagination.totalPages);
      } catch (error) {
        console.error("Error fetching users:", error);
        setIsLoading(false);
      }
      setIsLoading(false);
    },
    [token, search]
  );

  useEffect(() => {
    if (token) fetchUsers(currentPage);
  }, [token, currentPage, fetchUsers]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  //   const handleFilterChange = (e) => {
  //     setFilter(e.target.value); // Update filter state
  //   };

  // const handleSearch = () => {
  //   // Only fetch users when the search button is clicked
  //   setCurrentPage(1); // Reset to the first page on new search
  //   fetchUsers(1); // Fetch users for the first page with the current search and filter
  // };

  //   const handleDelete = async (id) => {
  //     try {
  //       await axios.delete(`${import.meta.env.VITE_BASE_URL}/users/${id}`, {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });
  //       setUsers(users.filter((user) => user.id !== id));
  //     } catch (error) {
  //       console.error("Error deleting user:", error);
  //     }
  //   };

  const sendMail = async (name, email) => {
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("name", name);
      const response = await axios.post(
        "https://sooprs.com/api2/public/index.php/send-reminder-mail-subscriber",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert(response.data.msg);
    } catch (error) {
      alert("An error occurred. Please try again later.");
      console.error("Error sending mail:", error);
    }
  };

  const columns = [
    {
      key: "name",
      label: "Name",
      render: (row) => <div title={row.name}>{row.name || "N/A"}</div>,
      width: "w-12",
    },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <div title={row.status}>
          {row.status == "1" ? (
            <Button
              variant="outlined"
              color="blue"
              className="h-4 w-10 flex items-center justify-center"
            >
              Active
            </Button>
          ) : (
            <Button
              variant="outlined"
              color="red"
              className="h-4 w-10 flex items-center justify-center text-[10px]"
            >
              InActive
            </Button>
          )}
        </div>
      ),
      width: "w-30",
    },
    {
      key: "cradit",
      label: "Cradit",
      render: (row) => <div title={row.credits}>{row.credits}</div>,
      width: "w-25",
    },
    {
      key: "amount",
      label: "Amount",
      render: (row) => <div title={row.ammount}>{row.ammount || "N/A"}</div>,
      width: "w-48",
    },

    {
      key: "plan",
      label: "Plan",
      render: (row) => {
        const buttonStyle =
          row.plan_id == "0"
            ? "bg-gray-500 text-white"
            : row.plan_id == "1"
            ? "bg-blue-600 text-white"
            : row.plan_id == "2"
            ? "bg-blue-600 text-white"
            : "bg-red-600 text-white";
        const buttonText =
          row.plan_id == "0"
            ? "Coustom"
            : row.plan_id == "1"
            ? "Standard"
            : row.plan_id == "2"
            ? "Pro"
            : "Elite";
        const buttonSize =
          row.plan_id == "0"
            ? "w-10"
            : row.plan_id == "1"
            ? "w-12"
            : row.plan_id == "2"
            ? "w-10"
            : "w-12";
        return (
          <button
            style={{ width: buttonSize }}
            className={`px-2 py-1 rounded-md ${buttonStyle}`}
          >
            {buttonText}
          </button>
        );
      },
      width: "w-32",
    },
    {
      key: "start_date",
      label: "Start Date",
      render: (row) => {
        const date = new Date(row.created_at);
        const formattedDate = `${date.getDate().toString().padStart(2, "0")}/${(
          date.getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}/${date.getFullYear()} ${date
          .getHours()
          .toString()
          .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
        return <div>{formattedDate}</div>;
      },
      width: "w-48",
    },
    {
      key: "end_date",
      label: "End Date",
      render: (row) => {
        const date = new Date(row.created_at);
        const formattedDate = `${date.getDate().toString().padStart(2, "0")}/${(
          date.getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}/${date.getFullYear()} ${date
          .getHours()
          .toString()
          .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
        return <div>{formattedDate}</div>;
      },
      width: "w-48",
    },

    {
      key: "wallet",
      label: "Available Cradits",
      render: (row) => (
        <div style={{ color: row.wallet < 100 ? "red" : "inherit" }}>
          {row.wallet}
        </div>
      ),
      width: "w-32",
    },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <td className="px-4 py-2 flex gap-2">
          <Tooltip content="Send Mail">
            <button onClick={() => sendMail(row.name, row.email)}>
              <PaperAirplaneIcon className="h-5 w-5 text-blue-500 transform rotate-315" />
            </button>
          </Tooltip>
        </td>
      ),
      width: "w-32",
    },
  ];

  return (
    <Card>
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="flex items-center justify-between">
          <div>
            <Typography variant="h5" color="blue-gray">
              Subscribers List
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              View the current active Subscribers
            </Typography>
          </div>
          <div className="flex gap-2">
            {/* <select
              onChange={handleFilterChange}
              value={filter}
              className="border border-slate-200 rounded-md  p-1 shadow-sm "
            >
              <option value="">Select Filter</option>
              <option value="client">Client</option>
              <option value="professional">professional</option>
              <option value="subscriber">Subscriber</option>
              <option value="agency">Agency</option>
            </select> */}

            <div className="relative flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600"
              >
                <path
                  fillRule="evenodd"
                  d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder="Search by name"
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              />
            </div>
            <Link to="/addnewsubscriber">
              <Button color="blue">Add Subscriber</Button>
            </Link>
            {/* <Button variant="gradient" >
              Search
            </Button> */}
          </div>
        </div>
      </CardHeader>

      <CardBody>
        {isLoading ? (
          <div className="flex justify-center items-center">
            <Spinner className="h-8 w-8 text-blue-500" />
          </div>
        ) : (
          <CustomTable columns={columns} data={users} />
        )}
      </CardBody>

      <CardFooter className="flex justify-between">
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>

        <div className="flex items-center gap-2">
          {currentPage > 3 && (
            <>
              <IconButton
                variant="text"
                size="sm"
                onClick={() => setCurrentPage(1)}
              >
                1
              </IconButton>
              {currentPage > 4 && <p>...</p>}
            </>
          )}

          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const page = Math.max(1, currentPage - 2) + i;
            if (page > totalPages) return null;
            return (
              <IconButton
                key={page}
                variant="text"
                size="sm"
                onClick={() => setCurrentPage(page)}
                disabled={currentPage === page}
              >
                {page}
              </IconButton>
            );
          })}

          {currentPage < totalPages - 2 && (
            <>
              {currentPage < totalPages - 3 && <p>...</p>}
              <IconButton
                variant="text"
                size="sm"
                onClick={() => setCurrentPage(totalPages)}
              >
                {totalPages}
              </IconButton>
            </>
          )}
        </div>

        <Button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </CardFooter>
    </Card>
  );
}

export default Newsubscriber;
