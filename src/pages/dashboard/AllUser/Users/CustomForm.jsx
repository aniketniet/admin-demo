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
  import Toaster, { showErrorToast, showSuccessToast } from "@/components/Toaster";
  import PhoneInput from "react-phone-input-2";
  import "react-phone-input-2/lib/style.css";
  import Select from "react-select";
  
  const CustomerForm = ({ open, handleOpen }) => {
    const [loading, setLoading] = useState(false);
    const [countries, setCountries] = useState([]);
    const [services, setServices] = useState([]);
    const [customerData, setCustomerData] = useState({
      name: "",
      email: "",
      mobile: "",
      services: "",
      city: "",
      requested_city: "",
      password: "",
      is_company: false,
      country: "",
    });
  
    useEffect(() => {
      const fetchCountries = async () => {
        try {
          const response = await axios.get("https://restcountries.com/v3.1/all");
          setCountries(
            response.data.map((country) => ({
              value: country.cca2,
              label: `${country.flag} ${country.name.common}`,
            }))
          );
        } catch (error) {
          console.error("Error fetching countries:", error);
        }
      };
  
      const fetchServices = async () => {
        try {
          const response = await axios.get("API_ENDPOINT_FOR_SERVICES");
          setServices(response.data.map((service) => ({
            value: service.id,
            label: service.name,
          })));
        } catch (error) {
          console.error("Error fetching services:", error);
        }
      };
  
      fetchCountries();
      fetchServices();
    }, []);
  
    const handleCustomerChange = (e) => {
      const { name, value, type, checked } = e.target;
      setCustomerData({
        ...customerData,
        [name]: type === "checkbox" ? checked : value,
      });
    };
  
    const handlePhoneChange = (value) => {
      setCustomerData({ ...customerData, mobile: value });
    };
  
    const handleCountryChange = (selectedOption) => {
      setCustomerData({ ...customerData, country: selectedOption.label });
    };
  
    const handleServiceChange = (selectedOption) => {
      setCustomerData({ ...customerData, services: selectedOption.value });
    };
  
    const addCustomer = async () => {
      setLoading(true);
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
            <div className="grid grid-cols-1 gap-4">
              <Input label="Name" name="name" onChange={handleCustomerChange} />
              <Input label="Email" name="email" onChange={handleCustomerChange} />
              <PhoneInput
                country={"us"}
                value={customerData.mobile}
                onChange={handlePhoneChange}
                inputStyle={{ width: "100%" }}
              />
              <Select
                options={services}
                onChange={handleServiceChange}
                placeholder="Select Service"
                isSearchable
              />
              <Input label="City" name="city" onChange={handleCustomerChange} />
              <Input label="Requested City" name="requested_city" onChange={handleCustomerChange} />
              <Input label="Password" name="password" type="password" onChange={handleCustomerChange} />
              <div className="flex items-center gap-2">
                <input type="checkbox" name="is_company" onChange={handleCustomerChange} />
                <label>Is Company?</label>
              </div>
              <Select
                options={countries}
                onChange={handleCountryChange}
                placeholder="Select Country"
                isSearchable
              />
            </div>
          </DialogBody>
          <DialogFooter>
            <Button variant="text" onClick={handleOpen} className="mr-2">Cancel</Button>
            <Button color="blue" onClick={addCustomer} disabled={loading}>
              {loading ? <Spinner className="h-4 w-4" /> : "Add"}
            </Button>
          </DialogFooter>
        </Dialog>
      </div>
    );
  };
  
  export default CustomerForm;
  