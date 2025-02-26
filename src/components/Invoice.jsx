import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams } from "react-router";

const Invoice = () => {
  const [bills, setBills] = useState({});
  const { id } = useParams(); // URL se id lena

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const token = Cookies.get("token");
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/get-all-bills/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = response.data.data;
        const invoice = data.find(
          (bill) => String(bill.invoiceNo) === String(id)
        );

        if (invoice) {
          setBills(invoice);
        } else {
          console.log("No matching invoice found");
        }
      } catch (error) {
        console.error("Error fetching bills:", error);
      }
    };

    fetchBills();
  }, [id]);

  const handlePrint = () => {
    const printContent = document.getElementById("invoice").innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload(); // Restore state after print
  };

  return (
    <div>
      <style>
        {`
        @media print {
          body * {
            visibility: hidden;
          }
          #invoice, #invoice * {
            visibility: visible;
          }
          #invoice {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .no-print {
            display: none;
          }
        }
        `}
      </style>
      <div
        id="invoice"
        className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg border"
      >
        <h2 className="text-2xl font-bold text-center mb-4">INVOICE</h2>
        <div className="flex justify-center mb-4 no-print">
          <button
            style={{
              backgroundColor: "#4c3575",
              color: "white",
            }}
            onClick={handlePrint}
          >
            Print Invoice
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p>
              <strong>Invoice No #:</strong> {bills?.invoiceNo}
            </p>
            <p>
              <strong>Invoice Date:</strong> {bills?.invoice_date}
            </p>
            <p>
              <strong>Due Date:</strong> {bills?.due_date}
            </p>
          </div>
          <div className="text-right">
            <p>
              <strong>Billed by:</strong> {bills?.billed_by}
            </p>
          </div>
          <div className="text-left">
            <p className="text-left">
              <strong>Billed To:</strong> {bills?.billed_to}
            </p>
          </div>
        </div>
        <table className="w-full border-collapse border border-gray-300 mb-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Item</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Rate</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">GST %</th>
              <th className="border p-2">IGST</th>
            </tr>
          </thead>
          <tbody>
            {bills?.items?.map((item) => (
              <tr key={item.id}>
                <td className="border p-2">{item.id}</td>
                <td className="border p-2">{item.description}</td>
                <td className="border p-2">₹ {item.rate}</td>
                <td className="border p-2">{item.quantity}</td>
                <td className="border p-2">{item.gst}%</td>
                <td className="border p-2">
                  ₹ {(item.rate * item.quantity * (item.gst / 100)).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-right mb-4">
          <p>
            <strong>Amount:</strong> ₹ {bills?.total}
          </p>
          <p>
            <strong>Total GST:</strong> ₹
            {bills?.items
              ?.reduce(
                (total, item) =>
                  total + item.rate * item.quantity * (item.gst / 100),
                0
              )
              .toFixed(2)}
          </p>
          <p className="text-lg font-bold">
            Total (INR): ₹
            {(
              Number(bills?.total) +
              bills?.items?.reduce(
                (total, item) =>
                  total + item.rate * item.quantity * (item.gst / 100),
                0
              )
            ).toFixed(2)}
          </p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-bold">Bank Details</h3>
          <p>
            <strong>Account Name:</strong> VGI Sooprs Technology
          </p>
          <p>
            <strong>Account Number:</strong> 0648579371
          </p>
          <p>
            <strong>IFSC:</strong> KKBK0004605
          </p>
          <p>
            <strong>Account Type:</strong> Current
          </p>
          <p>
            <strong>Bank:</strong> Kotak Bank
          </p>
        </div>
        <div>
          <h3 className="text-lg font-bold">Terms and Conditions</h3>
          <p>1. Please quote invoice number when remitting funds</p>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
