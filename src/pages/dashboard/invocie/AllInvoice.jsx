import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
// import Sidebar from "../components/Sidebar";
// import Header from "../components/Header";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TrashIcon } from "lucide-react";
import { Tooltip } from "@material-tailwind/react";

const AllInvoice = () => {
  const [invoices, setInvoices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInvoices = async () => {
      const token = Cookies.get("token");
      try {
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

  // const handleDeleteInvoice = async (invoiceId) => {
  //   try {
  //     const response = await axios.delete(
  //       `${import.meta.env.VITE_BASE_URL}api/invoices/${invoiceId}`
  //     );
  //     if (response.status === 200) {
  //       setInvoices(
  //         invoices.filter((prevInvoice) => prevInvoice._id !== invoiceId)
  //       );
  //       toast.error("Invoice Deleted Successfully!", {
  //         style: {
  //           backgroundColor: "#4c3575",
  //           color: "white",
  //         },
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Error deleting invoice:", error);
  //   }
  // };

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
                    <td className="border border-gray-300 px-4 py-2">
                      {invoice.invoiceNo}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {formatDateToMonthYear(invoice.invoice_date)}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {invoice.billed_to}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {invoice.total}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <Tooltip content="Delete">
                        <Link to={`/invoice/${invoice.invoiceNo}`}>
                          <button>
                            <TrashIcon className="h-5 w-5 text-red-500" />
                          </button>
                        </Link>
                      </Tooltip>
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center"></td>
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
