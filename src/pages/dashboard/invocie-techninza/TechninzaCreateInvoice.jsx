import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Spinner,
  Typography,
  Dialog,
  DialogBody,
  DialogHeader,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import Toaster, {
  showErrorToast,
  showSuccessToast,
} from "@/components/Toaster";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Cookies from "js-cookie";
// import { Link } from "react-router-dom";
const TechninzaCreateInvoice = () => {
  const [userId, setUserId] = useState("");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [selectedSubscriber, setSelectedSubscriber] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [customerData, setCustomerData] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    gstno: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    console.log(userId, "user id ");
    console.log(selectedSubscriber, "selected subscriber");
  }, [userId, selectedSubscriber]);

  const [invoiceData, setInvoiceData] = useState({
    user_id: "",
    invoiceNo: "",
    invoiceDate: "",
    dueDate: "",
    billedBy:
      "VGI Sooprs Technology Pvt. Ltd., BlueOne Square, Udyog Vihar, Phase 4 Rd, Gurugram, Haryana, India - 122016",
    billedTo: "",
    country: "",
    state: "",
    items: [{ description: "", rate: "", quantity: "", gst: "" }],
    total: 0,
    discount: 0,
  });

  console.log(invoiceData);

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await fetch(
        "https://countriesnow.space/api/v0.1/countries/states"
      );
      const data = await response.json();
      setCountries(data.data);
    };

    const fetchSubscribers = async () => {
      try {
        const token = Cookies.get("token");
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/get-all-techninza-customers`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSubscribers(response.data.data);
      } catch (error) {
        console.error("Error fetching subscribers:", error);
      }
    };

    fetchCountries();
    fetchSubscribers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData({ ...invoiceData, [name]: value });

    if (name === "country") {
      const selectedCountry = countries.find(
        (country) => country.name === value
      );
      setStates(selectedCountry ? selectedCountry.states : []);
    }

    if (name === "billedTo") {
      console.log(value, "value");

      setUserId(e.target.value);

      const selectedClient = subscribers.find(
        (subscriber) => subscriber._id == value
      );
      setSelectedSubscriber(selectedClient || null);

      setInvoiceData((prevData) => ({
        ...prevData,
        user_id: value,
        billedTo: `${selectedClient?.name || ""} 
        ${selectedClient?.address || ""} 
        ${selectedClient?.city || ""} ${selectedClient?.state || ""} ${
          selectedClient?.pincode || ""
        }
        GSTIN:${selectedClient?.gstno || ""}
        Email: ${selectedClient?.email || ""}
        `,
      }));
    }

    // if (name === "user_id") {
    //   setInvoiceData({ ...invoiceData, user_id: value });

    //   setUserId(e.target.value);
    //   const selectedClient = subscribers.find(
    //     (subscriber) => subscriber.id == value
    //   );
    //   setSelectedSubscriber(selectedClient || null);
    //   setInvoiceData({ ...invoiceData, user_id: selectedClient?.id });
    // }
  };

  const addItem = () => {
    setInvoiceData({
      ...invoiceData,
      items: [
        ...invoiceData.items,
        { description: "", rate: "", quantity: "", gst: "" },
      ],
    });
  };

  // Calculate total amount
  useEffect(() => {
    let totalAmount = invoiceData.items.reduce((acc, item) => {
      const rate = parseFloat(item.rate) || 0;
      const quantity = parseFloat(item.quantity) || 0;
      const gst = parseFloat(item.gst) || 0;

      let itemTotal = rate * quantity;
      let gstAmount = (itemTotal * gst) / 100;
      return acc + itemTotal + gstAmount;
    }, 0);

    setInvoiceData((prev) => ({ ...prev, total: totalAmount }));
  }, [invoiceData.items]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = Cookies.get("token");
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/create-techninza-bill`,
        invoiceData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      showSuccessToast("Invoice created successfully!");
      setLoading(false);
      navigate(`/techninza-bill/${response.data.invoice._id}`);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to create invoice.";
      showErrorToast({ errorMessage });
      setLoading(false);
      console.error("Error creating invoice:", error);
    }
  };
  // calculateTotal();

  const handleOpen = () => setOpen(!open);

  const handleCustomerChange = (e) => {
    setCustomerData({ ...customerData, [e.target.name]: e.target.value });
  };

  const addCustomer = async () => {
    try {
      const token = Cookies.get("token");
      await axios.post(
        "http://103.189.172.154:3004/api/create-techninza-customer",
        new URLSearchParams(customerData),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      showSuccessToast("Customer added successfully!");
      setOpen(false);
    } catch (error) {
      showErrorToast("Failed to add customer.");
      console.error("Error adding customer:", error);
    }
  };

  return (
    <>
      {loading && (
        <div className="flex  fixed  z-10 w-[70%] h-full justify-center items-center">
          <Spinner className="h-8 w-8 text-blue-500" />
        </div>
      )}
      <div className="p-4">
        <Toaster />
        <Card className="p-6">
          <CardHeader
            floated={false}
            shadow={false}
            className="rounded-none border-b pb-4"
          >
            <div className="flex justify-between items-center">
              <Typography variant="h5" color="blue-gray" className="font-bold">
                Print Techninza Bill
              </Typography>
              <Button onClick={handleOpen}>Add Customer</Button>
            </div>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardBody id="invoice">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col">
                  <label className="font-semibold">Invoice NO</label>
                  <input
                    type="text"
                    name="invoiceNo"
                    value={invoiceData.invoiceNo}
                    onChange={handleInputChange}
                    placeholder="Enter invoice number"
                    className="border rounded-md p-2 w-full"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-semibold">Invoice Date</label>
                  <DatePicker
                    selected={invoiceData.invoiceDate}
                    onChange={(date) =>
                      setInvoiceData({ ...invoiceData, invoiceDate: date })
                    }
                    placeholderText="Enter invoice date"
                    className="border rounded-md p-2 w-full"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="font-semibold">Due Date</label>
                  <DatePicker
                    selected={invoiceData.dueDate}
                    onChange={(date) =>
                      setInvoiceData({ ...invoiceData, dueDate: date })
                    }
                    placeholderText="Enter due date"
                    className="border rounded-md p-2 w-full"
                  />
                </div>
                <div>
                  <label className="font-semibold">Client Name</label>
                  <select
                    name="billedTo"
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                    className="border rounded-md p-2 w-full"
                  >
                    <option>Select Client</option>
                    {subscribers.map((subscriber, index) => (
                      <option key={index} value={subscriber._id}>
                        {subscriber.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-purple-100 rounded-md">
                  <Typography variant="h6" className="font-bold">
                    Billed By
                  </Typography>

                  <p>Gazetinc Technology LLP </p>
                  <p>
                    3rd Floor, Rana Tower, Opp: Mahindra Aura, New Palam Vihar,
                    Phase I, Gurugram, Haryana, India - 122017
                  </p>
                  <p>GSTIN: 06AATFG8894M1Z8</p>
                  <p>PAN: AATFG8894M</p>
                  <p>Email: vinay@techninza.in</p>
                </div>
                <div className="p-4 bg-purple-100 rounded-md">
                  <Typography variant="h6" className="font-bold">
                    Billed To
                  </Typography>
                  {selectedSubscriber ? (
                    <>
                      <p>{selectedSubscriber.name}</p>
                      <p>{selectedSubscriber.address}</p>
                      <p>GSTIN: {selectedSubscriber.gstno}</p>
                      <p>Email: {selectedSubscriber.email}</p>
                    </>
                  ) : (
                    <p>Select a client to view details</p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 my-4">
                <div>
                  <label className="font-semibold">Country of Supply</label>
                  <select
                    name="country"
                    onChange={handleInputChange}
                    className="border rounded-md p-2 w-full"
                  >
                    <option>Select Country</option>
                    {countries.map((country, index) => (
                      <option key={index} value={country.name}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-semibold">Place of Supply</label>
                  <select
                    name="state"
                    onChange={handleInputChange}
                    className="border rounded-md p-2 w-full"
                  >
                    <option>Select State</option>
                    {states.map((state, index) => (
                      <option key={index} value={state.name}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-4 mb-5">
                <Typography variant="h6">Invoice Items</Typography>
                {invoiceData.items.map((item, index) => (
                  <div key={index} className="grid grid-cols-4 gap-2 mt-2">
                    <input
                      type="text"
                      placeholder="Description"
                      value={item.description}
                      onChange={(e) => {
                        let items = [...invoiceData.items];
                        items[index].description = e.target.value;
                        setInvoiceData({ ...invoiceData, items });
                      }}
                      className="border rounded-md p-2 w-full"
                    />
                    <input
                      type="text"
                      placeholder="Rate"
                      value={item.rate}
                      onChange={(e) => {
                        let items = [...invoiceData.items];
                        items[index].rate = e.target.value;
                        setInvoiceData({ ...invoiceData, items });
                      }}
                      className="border rounded-md p-2 w-full"
                    />
                    <input
                      type="text"
                      placeholder="Quantity"
                      value={item.quantity}
                      onChange={(e) => {
                        let items = [...invoiceData.items];
                        items[index].quantity = e.target.value;
                        setInvoiceData({ ...invoiceData, items });
                      }}
                      className="border rounded-md p-2 w-full"
                    />
                    <input
                      type="text"
                      placeholder="GST %"
                      value={item.gst}
                      onChange={(e) => {
                        let items = [...invoiceData.items];
                        items[index].gst = e.target.value;
                        setInvoiceData({ ...invoiceData, items });
                      }}
                      className="border rounded-md p-2 w-full"
                    />
                  </div>
                ))}
                <div className="flex justify-between mt-2">
                  <Button color="green" onClick={addItem} className="mt-2">
                    Add Item
                  </Button>
                  <input
                    type="number"
                    name="discount"
                    value={invoiceData.discount}
                    onChange={handleInputChange}
                    placeholder="Enter Discount"
                    className="border rounded-md p-2"
                  />
                </div>
              </div>
              <div className="p-4 bg-purple-100 rounded-md mb-4">
                <Typography variant="h6" className="font-bold">
                  Total Amount
                </Typography>
                <p>
                  ₹
                  {invoiceData.discount
                    ? (invoiceData.total - invoiceData.discount).toFixed(2)
                    : invoiceData.total.toFixed(2)}
                </p>
              </div>
              <div className="p-4 bg-purple-100 rounded-md mb-4">
                <Typography variant="h6" className="font-bold">
                  Bank Details
                </Typography>
                <p>Account Name: Gazetinc Technology LLP </p>
                <p>Account Number: 002105501589</p>
                <p>IFSC:ICIC0000021</p>
                <p>Account Type: Current</p>
                <p>Bank: ICICI Bank</p>
              </div>
              <div className="flex justify-end">
                <Button color="blue" className="mt-4" type="submit">
                  print Bill
                </Button>
              </div>
            </CardBody>
          </form>
        </Card>
      </div>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Add New Customer</DialogHeader>
        <DialogBody>
          <div className="grid grid-cols-1 gap-4">
            <Input label="Name" name="name" onChange={handleCustomerChange} />
            <Input label="Email" name="email" onChange={handleCustomerChange} />
            <Input
              label="Mobile"
              name="mobile"
              onChange={handleCustomerChange}
            />
            <Input
              label="Address"
              name="address"
              onChange={handleCustomerChange}
            />
            <Input
              label="GST No"
              name="gstno"
              onChange={handleCustomerChange}
            />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" onClick={handleOpen} className="mr-2">
            Cancel
          </Button>
          <Button variant="text" onClick={addCustomer} disabled={loading}>
            {loading ? <Spinner className="h-4 w-4" /> : "Add"}
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default TechninzaCreateInvoice;
