import { useState, useEffect, useCallback } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  IconButton,
  Spinner,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import Cookies from "js-cookie";
import CustomTable from "../../../components/CustomTable";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

function Leads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const token = Cookies.get("token");

  const navigate = useNavigate(); // Initialize navigate

  const fetchLeads = useCallback(
    async (page) => {
      if (!token) return;
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/leads?page=${page}&limit=10`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setLeads(data.data);
        setTotalPages(data.pagination.totalPages);
      } catch (error) {
        console.error("Error fetching leads:", error);
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  useEffect(() => {
    if (token) fetchLeads(currentPage);
  }, [token, currentPage, fetchLeads]);

  const deleteLead = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/leads/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLeads(leads.filter((lead) => lead.id !== id));
    } catch (error) {
      console.error("Error deleting lead:", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/detail/${id}`); // Redirect to detail page with ID
  };

  const columns = [
    {
      key: "flag",
      label: "Origin",
      render: (row) => (
        <div className="w-8 h-8" title={row.professional?.country_name}>
          {" "}
          <img src={row.professional?.flag} alt="Flag" />{" "}
        </div>
      ),
      width: "w-12",
    },
    {
      key: "project_title",
      label: "Project Title",
      render: (row) => (
        <div title={row.project_title}>
          {row.project_title.slice(0, 20) + "..."}
        </div>
      ),
      width: "w-70 ",
    },
    {
      key: "professional.name",
      label: "Client Name",
      render: (row) => (
        <div title={row.professional?.name || "N/A"}>
          {row.professional?.name || "N/A"}
        </div>
      ),
      width: "w-52",
    },
    {
      key: "email",
      label: "Email & Mobile",
      render: (row) => (
        <div title={`${row.email} ${row.mobile}`}>
          {row.email} <br /> {row.mobile}
        </div>
      ),
      width: "w-48",
    },
    {
      key: "budget",
      label: "Budget",
      render: (row) => (
        <div title={`$${row.min_budget} - $${row.max_budget_amount}`}>
          ${row.min_budget} - ${row.max_budget_amount}
        </div>
      ),
      width: "w-100",
    },
    {
      key: "service.service_name",
      label: "Service Name",
      render: (row) => (
        <div title={row.service?.service_name}>
          {row.service?.service_name?.slice(0, 50) + "..."}
        </div>
      ),
      width: "w-100",
    },
    { key: "bid_count", label: "Bids", width: "w-20" },
    { key: "mobile_count", label: "Mobile Count", width: "w-24" },

    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <td className="px-4 py-2 flex gap-2">
          <Tooltip content="Edit">
            <button onClick={() => handleEdit(row.id)}>
              <PencilIcon className="h-5 w-5 text-blue-500" />
            </button>
          </Tooltip>
          <Tooltip content="Delete">
            <button onClick={() => deleteLead(row.id)}>
              <TrashIcon className="h-5 w-5 text-red-500" />
            </button>
          </Tooltip>
        </td>
      ),
      width: "w-24",
    },
  ];

  return (
    <Card>
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="flex items-center justify-between">
          <div>
            <Typography variant="h5" color="blue-gray">
              Leads List
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              View the current active leads
            </Typography>
          </div>
          <Button variant="gradient">Add New Lead</Button>
        </div>
      </CardHeader>

      <CardBody>
        {loading ? (
          <div className="flex justify-center items-center">
            <Spinner className="h-8 w-8 text-blue-500" />
          </div>
        ) : (
          <CustomTable columns={columns} data={leads} />
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

export default Leads;
