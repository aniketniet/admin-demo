import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams } from "react-router";
import { Button, Typography } from "@material-tailwind/react";

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
        // console.log(data, 'DARA');
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
    window.print();
  };

  return (
    <div>
      <style>
        {`
  @media print {
    /* Hide everything by default */
    body * {
      visibility: hidden;
      -webkit-print-color-adjust: exact;
    print-color-adjust: exact;

      
    }
      
    /* Ensure only the invoice is visible */
    #invoice, #invoice * {
      visibility: visible;
    }

    /* Position the invoice correctly for printing */
    #invoice {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%; 
    }
    
     
      @page {
  size: A4; /* Auto-adjust to content */
  margin:0; /* Remove default browser margins (header/footer) */
}

    /* Hide specific elements like header, footer, and navbar */
    .no-print, .header, .navbar, .sidebar, .footer, .routes {
      display: none !important;
    }
    // .terms {
    //   position: absolute;
    //   bottom: 10px;
    //   width: 100%;
    //   text-align: center;
    //   padding: 10px;
    // }

  
  }
  `}
      </style>

      <div className="flex justify-end mb-5 mt-5 no-print">
        <Button
          style={{
            backgroundColor: "#4c3575",
            color: "white",
          }}
          onClick={handlePrint}
        >
          Print Invoice
        </Button>
      </div>
      <div id="invoice" className="max-w-4xl mx-auto p-6 border rounded-lg">
        <h2 className="text-2xl font-bold border-b-2 mb-4">INVOICE</h2>

        <div className="mb-4">
          <div className="flex justify-between">
            <div>
              <p>
                <strong className="text-gray-600">Invoice No# :</strong>{" "}
                {bills?.invoiceNo}
              </p>
              <p>
                <strong className="text-gray-600">Invoice Date:</strong>{" "}
                {new Date(bills?.invoice_date).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </p>
              <p>
                <strong className="text-gray-600">Due Date:</strong>{" "}
                {new Date(bills?.due_date).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className="text-right h-16 w-42 ">
              <img
                src="https://sooprs.com/images/sooprs_logo.png"
                alt="logo"
                className="h-full w-full "
              />
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4 mb-4">
            {/* Billed By Section */}
            <div className=" p-4 bg-purple-100  flex flex-col gap-2 rounded-md">
              <Typography variant="h6" className="font-semibold text-[#343D68]">
                Billed By
              </Typography>
              <p className="font-semibold">VGI Sooprs Technology Pvt. Ltd.</p>
              <p className="font-semibold">
                BlueOne Square, Udyog Vihar, Phase 4 Rd, Gurugram, Haryana,
                India - 122016
              </p>
              <div className="font-semibold">
                <p>GSTIN: 06AAKCV5021D1ZM</p>
                <p>PAN: AAKCV5021D</p>
              </div>
              <p className="font-semibold">Email: contact@sooprs.com</p>
            </div>

            {/* Billed To Section */}
            <div className="p-4 bg-purple-100 rounded-md flex flex-col gap-2 ">
              <Typography variant="h6" className="font-semibold text-[#343D68]">
                Billed To
              </Typography>
              {bills?.billed_to?.split("\n").map((line, index) => (
                <p className="font-semibold" key={index}>
                  {line.trim()}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-between mb-4 w-[80%]">
          <p>
            {" "}
            <span className="font-bold">Country of Supply :</span>{" "}
            {bills?.country}{" "}
          </p>
          <p>
            {" "}
            <span className="font-bold">Place of Supply :</span> {bills?.state}{" "}
          </p>
        </div>

        <table className="w-full  border-collapse mb-4">
          <thead>
            <tr className=" bg-purple-600 text-white">
              <th className="border p-2">Item</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Rate</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">GST %</th>
              <th className="border p-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {bills?.items?.map((item, index) => (
              <tr key={item.id || index}>
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">{item.description}</td>
                <td className="border p-2">₹ {item.rate}</td>
                <td className="border p-2">{item.quantity}</td>
                <td className="border p-2">{item.gst}%</td>
                <td className="border p-2">
                  ₹ {((item.rate * item.quantity) + (item.gst /100 * (item.rate * item.quantity)  ) ).toFixed(2) }
                </td>
              </tr>
            ))}
            {/* Totals Row */}
            <tr>
              <td className=" blank" colSpan={3}></td>
              <td className=" blank"></td>
              <td className="border p-2 text-right ">Amount</td>
              <td className="border p-2 text-right">
                ₹{" "}
                {bills?.items
                  ?.reduce(
                    (total, item) => total + item.rate * item.quantity,
                    0
                  )
                  .toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className="blank" colSpan={3}></td>
              <td className="blank"></td>
              <td className="border p-2 text-right ">Total GST</td>
              <td className="border p-2 text-right">
                ₹{" "}
                {bills?.items
                  ?.reduce(
                    (total, item) =>
                      total + item.rate * item.quantity * (item.gst / 100),
                    0
                  )
                  .toFixed(2)}
              </td>
            </tr>
             <tr>
              <td className="blank" colSpan={3}></td>
              <td className="blank"></td>
              <td className="border p-2 text-right">
                Discount (INR)
              </td>
              <td className="border p-2 text-right text-gray-500 font-bold">
                ₹{" "}
                {bills?.discount}
              </td>
            </tr> 
            <tr>
              <td className="blank" colSpan={3}></td>
              <td className="blank"></td>
              <td className="border p-2 text-right font-bold text-gray-500">
                Total (INR)
              </td>
              <td className="border p-2 text-right text-gray-500 font-bold">
                ₹{" "}
                {bills?.items
                  ?.reduce(
                    (total, item) =>
                      total + item.rate * item.quantity * (1 + item.gst / 100)-bills?.discount ,
                    0
                  )
                  .toFixed(2)}
              </td>
            </tr>
           
          </tbody>
        </table>

        <div className="mb-4 p-4 term bg-purple-100  rounded-md">
          <h3 className="text-lg font-semibold text-[#343D68]">Bank Details</h3>
          <p>
            <span className="font-semibold">Account Name:</span> VGI Sooprs
            Technology
          </p>
          <p>
            <span className="font-semibold">Account Number:</span> 0648579371
          </p>
          <p>
            <span className="font-semibold">IFSC:</span> KKBK0004605
          </p>
          <p>
            <span className="font-semibold">Account Type:</span> Current
          </p>
          <p>
            <span className="font-semibold">Bank:</span> Kotak Bank
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-[#343D68]">
            Terms and Conditions
          </h3>
          <p>1. Please quote invoice number when remitting funds</p>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
