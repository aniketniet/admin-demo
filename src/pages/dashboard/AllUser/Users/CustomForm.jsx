import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
  DialogFooter,
  Input,
  Spinner,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Toaster, {
  showErrorToast,
  showSuccessToast,
} from "@/components/Toaster";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Select from "react-select";

const CustomerForm = ({ open, handleOpen }) => {
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [services, setServices] = useState([]);
  const token = Cookies.get("token");
  const [customerData, setCustomerData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    services: "",
    city: "",
    address: "",
    is_buyer: 1,
    country: "",
    is_verified: 1,
    wallet: "",
    is_subscriber: 0,
    is_company: 0,
    city_requested: "",
    gst_no: "",
  });

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/get-all-contry`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCountries(
          response.data.data.map((country) => ({
            value: country.country_code,
            label: ` ${country.country_name}`,
          }))
        );
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    const fetchServices = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/get-all-services`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setServices(
          response.data.data.map((service) => ({
            value: service.id,
            label: service.service_name,
          }))
        );
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchCountries();
    fetchServices();
  }, [token]);

  const handleCustomerChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCustomerData({
      ...customerData,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    });
  };

  const handlePhoneChange = (value) => {
    setCustomerData({ ...customerData, mobile: `+${value}` });
  };

  const handleCountryChange = (selectedOption) => {
    setCustomerData({ ...customerData, country: selectedOption.value });
  };

  const handleServiceChange = (selectedOption) => {
    setCustomerData({ ...customerData, services: selectedOption.value });
  };

  const addCustomer = async () => {
    setLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/create-user`,
        new URLSearchParams(customerData),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      showSuccessToast("Customer added successfully!");
      handleOpen();
    } catch (error) {
      showErrorToast("Failed to add customer.");
      console.error("Error adding customer:", error);
    }
    setLoading(false);
  };

  return (
    <div>
      <Toaster />
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Add New Customer</DialogHeader>
        <DialogBody>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Name" name="name" onChange={handleCustomerChange} />
            <Input label="Email" name="email" onChange={handleCustomerChange} />
            <PhoneInput
              country={"in"}
              value={customerData.mobile}
              onChange={handlePhoneChange}
              inputStyle={{ width: "100%" }}
            />
            <Select
              options={countries}
              onChange={handleCountryChange}
              placeholder="Select Country"
              isSearchable
            />
            <Select
              options={services}
              onChange={handleServiceChange}
              placeholder="Select Service"
              isSearchable
            />
            <Input label="City" name="city" onChange={handleCustomerChange} />
            <Input label="Address" name="address" onChange={handleCustomerChange} />
            <Input label="Requested City" name="city_requested" onChange={handleCustomerChange} />
            <Input label="GST No" name="gst_no" onChange={handleCustomerChange} />
            <Input label="Wallet" name="wallet" onChange={handleCustomerChange} />
            <Input label="Password" name="password" type="password" onChange={handleCustomerChange} />
            <div className="flex items-center gap-2">
              <input type="checkbox" name="is_buyer" checked={customerData.is_buyer} onChange={handleCustomerChange} />
              <label>Is Buyer?</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" name="is_verified" checked={customerData.is_verified} onChange={handleCustomerChange} />
              <label>Is Verified?</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" name="is_company" checked={customerData.is_company} onChange={handleCustomerChange} />
              <label>Is Company?</label>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" onClick={handleOpen} className="mr-2">Cancel</Button>
          <Button variant="text" onClick={addCustomer} disabled={loading}>{loading ? <Spinner className="h-4 w-4" /> : "Add"}</Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

CustomerForm.propTypes = {
  open: PropTypes.bool.isRequired,
  handleOpen: PropTypes.func.isRequired,
};

export default CustomerForm;