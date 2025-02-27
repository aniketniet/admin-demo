import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {  Trash} from "lucide-react";
import { Tooltip } from "@material-tailwind/react";
import { EyeIcon } from "@heroicons/react/24/outline";

const AllInvoice = () => {
  const [invoices, setInvoices] = useState([]);
  // const navigate = useNavigate();

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const token = Cookies.get("token");
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/get-all-bills`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setInvoices(response.data.data);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };

    fetchInvoices();
  }, []);

  const formatDateToMonthYear = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  return (
    <div className="flex">
      <div className="flex-1 p-6">
        <div className="container mx-auto">
          <h3 className="text-2xl font-bold mb-4">ALL Invoices</h3>
          <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
            <table className="w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="border border-gray-300 px-4 py-2">
                    Invoice No.
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    Invoice Date
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    Client Name
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    Total Amount
                  </th>
                  <th className="border border-gray-300 px-4 py-2">View</th>
                  <th className="border border-gray-300 px-4 py-2">Delete</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice._id} className="border border-gray-300">
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {invoice.invoiceNo}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {formatDateToMonthYear(invoice.invoice_date)}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {invoice.billed_to}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {invoice?.items.reduce(
                        (total, item) => total + item.rate * item.quantity, 0
                      ).toFixed(2)}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <Tooltip content="View Invoice">
                        <Link to={`/invoice/${invoice.invoiceNo}`}>
                          <button>
                          <EyeIcon className="h-6 w-6 text-blue-500" />
                          
                          </button>
                        </Link>
                      </Tooltip>
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <Tooltip content="View">
                        <Link>
                          <button>
                          <Trash className="h-5 w-5 text-red-500" />
                          </button>
                        </Link>
                      </Tooltip>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default AllInvoice;
