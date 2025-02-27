import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

import Cookies from "js-cookie";
import { Link } from "react-router-dom";
const CreateInvoice = () => {
  const [userId, setUserId] = useState("");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [selectedSubscriber, setSelectedSubscriber] = useState(null);

  useEffect(() => {
    console.log(userId, "user id ");
    console.log(selectedSubscriber, "selected subscriber");
  }, [userId, selectedSubscriber]);

  const [invoiceData, setInvoiceData] = useState({
    user_id: "",
    invoiceDate: "",
    dueDate: "",
    billedBy:
      "VGI Sooprs Technology Pvt. Ltd., BlueOne Square, Udyog Vihar, Phase 4 Rd, Gurugram, Haryana, India - 122016",
    billedTo: "",
    country: "",
    state: "",
    items: [{ description: "", rate: "", quantity: "", gst: "" }],
    total: 0,
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
          `${import.meta.env.VITE_BASE_URL}/get-all-subscriber-data`,
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
        (subscriber) => subscriber.id == value
      );
      setSelectedSubscriber(selectedClient || null);

      setInvoiceData((prevData) => ({
        ...prevData,
        user_id: value,
        billedTo: `${selectedClient?.name || ""} ${
          selectedClient?.address || ""
        }`,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(invoiceData, "data");

    try {
      const token = Cookies.get("token");
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/create-bill`,
        invoiceData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error creating invoice:", error);
    }
  };

  return (
    <div className="p-4">
      <Card className="p-6">
        <CardHeader
          floated={false}
          shadow={false}
          className="rounded-none border-b pb-4"
        >
          <div className="flex justify-between items-center">
            <Typography variant="h5" color="blue-gray" className="font-bold">
              Print INVOICE
            </Typography>
            <Link to={"/invoice"}>
              <Button color="blue" className="mt-4">
                Print Invoice
              </Button>
            </Link>
          </div>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardBody>
            <div className="grid grid-cols-2 gap-4 mb-4">
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
                    // const selectedName = e.target.value;
                    // const selectedClient = subscribers.find(
                    //   (subscriber) => subscriber.name === selectedName
                    // );
                    // if (selectedClient) {
                    //   setUserId(selectedClient.id); // Assuming the subscriber object has an 'id' field
                    // }
                    handleInputChange(e);
                  }}
                  className="border rounded-md p-2 w-full"
                >
                  <option>Select Client</option>
                  {subscribers.map((subscriber, index) => (
                    <option key={index} value={subscriber.id}>
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
                
                <p>VGI Sooprs Technology Pvt. Ltd.</p>
                <p>
                  BlueOne Square, Udyog Vihar, Phase 4 Rd, Gurugram, Haryana,
                  India - 122016
                </p>
                <p>GSTIN: 06AAKCV5021D1ZM</p>
                <p>PAN: AAKCV5021D</p>
                <p>Email: contact@sooprs.com</p>
              </div>
              <div className="p-4 bg-purple-100 rounded-md">
                <Typography variant="h6" className="font-bold">
                  Billed To
                </Typography>
                {selectedSubscriber ? (
                  <>
                    <p>{selectedSubscriber.name}</p>
                    <p>{selectedSubscriber.address}</p>
                    {/* <p>
                      {selectedSubscriber.city}, {selectedSubscriber.state}
                    </p> */}
                    <p>GSTIN: {selectedSubscriber.gstin}</p>
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
              <Button color="green" onClick={addItem} className="mt-2">
                Add Item
              </Button>
            </div>
            <div className="p-4 bg-purple-100 rounded-md mb-4">
              <Typography variant="h6" className="font-bold">
                Bank Details
              </Typography>
              <p>Account Name: VGI Sooprs Technology Pvt. Ltd.</p>
              <p>Account Number: 0648579371</p>
              <p>IFSC: KKBK0004605</p>
              <p>Account Type: Current</p>
              <p>Bank: Kotak Bank</p>
            </div>
            <div className="flex justify-end">
              <Button color="blue" className="mt-4" type="submit">
                Create Invoice
              </Button>
            </div>
          </CardBody>
        </form>
      </Card>
    </div>
  );
};

export default CreateInvoice;
