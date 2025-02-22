import React, { useState, useEffect } from "react";
import axios from "axios";
// import Sidebar from "../components/Sidebar";
// import Header from "../components/Header";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllInvoice = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}api/invoices`);
        setInvoices(response.data);
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

  const handleDeleteInvoice = async (invoiceId) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}api/invoices/${invoiceId}`);
      if (response.status === 200) {
        setInvoices(invoices.filter((prevInvoice) => prevInvoice._id !== invoiceId));
        toast.error("Invoice Deleted Successfully!", {
          style: {
            backgroundColor: "#4c3575",
            color: "white",
          },
        });
      }
    } catch (error) {
      console.error("Error deleting invoice:", error);
    }
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
                  <th className="border border-gray-300 px-4 py-2">Invoice No.</th>
                  <th className="border border-gray-300 px-4 py-2">Invoice Date</th>
                  <th className="border border-gray-300 px-4 py-2">Client Name</th>
                  <th className="border border-gray-300 px-4 py-2">Total Amount</th>
                  <th className="border border-gray-300 px-4 py-2">View</th>
                  <th className="border border-gray-300 px-4 py-2">Delete</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice._id} className="border border-gray-300">
                    <td className="border border-gray-300 px-4 py-2">{invoice.invoiceNumber}</td>
                    <td className="border border-gray-300 px-4 py-2">{formatDateToMonthYear(invoice.invoiceDate)}</td>
                    <td className="border border-gray-300 px-4 py-2">{invoice.clientDetail.clientName}</td>
                    <td className="border border-gray-300 px-4 py-2">{invoice.total}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <Link to="/update-invoice" state={{ invoice }}>
                        <i className="bi bi-eye-fill text-blue-500 text-lg" />
                      </Link>
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDeleteInvoice(invoice._id)}
                      >
                        <i className="icofont-ui-delete text-lg" />
                      </button>
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
