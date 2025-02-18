import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Toaster, { showSuccessToast, showErrorToast } from "../../../../components/Toaster";
import { Card, Input, Button, Typography, Textarea, } from "@material-tailwind/react";
import Cookies from "js-cookie";

function EditUsers() {
  const { id } = useParams(); // Get ID from URL
  const [user, setUser] = useState({
    name: "",
    email: "",
    mobile: "",
    city: "",
    area_code: "",
    organisation: "",
    wallet: 0,
    country: "",
    listing_about: "",
    is_buyer: 0,
    is_company: 0,
    status: 1,
    is_subscriber: 0,
    is_verified: 0,
    is_kyc_verified: 0,
    city_requested: ""

  });
  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: ""
  });


  const token = Cookies.get("token");

  const fetchUserDetails = useCallback(async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/get-user/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(response.data.data);
    
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  }, [token, id]);

  useEffect(() => {
    fetchUserDetails();
  }, [id, token, fetchUserDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: ["is_buyer", "is_company", "status", "is_subscriber", "is_verified", "is_kyc_verified"].includes(name)
        ? Number(value)
        : value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!user.name.trim()) {
      showErrorToast("Name is required.");
      return false;
    }
    if (!user.email.trim()) {
      showErrorToast("Email is required.");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
      showErrorToast("Enter a valid email.");
      return false;
    }
    if (!user.mobile.trim()) {
      showErrorToast("Mobile number is required.");
      return false;
    }
    // if (!/^\d{10}$/.test(user.mobile)) {
    //   showErrorToast("Mobile number must be 10 digits.");
    //   return false;
    // }
    if (!user.city.trim()) {
      showErrorToast("City is required.");
      return false;
    }
    if (user.wallet < 0 || isNaN(user.wallet)) {
      showErrorToast("Wallet balance cannot be negative.");
      return false;
    }
    return true;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/update-user/${id}`,
        user,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      showSuccessToast("User updated successfully!");
    } catch (error) {
      console.error("Error updating user:", error);
      showErrorToast("Failed to update user.");
    }
  };

 

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
  
    if (passwords.newPassword !== passwords.confirmPassword) {
      showErrorToast("Passwords do not match.");
      return;
    }
  
    const formData = new FormData();
    formData.append("id", id);  // Replace with dynamic user ID if needed
   
    formData.append("pass", passwords.newPassword);
  
    try {
     await axios.post(
        "https://sooprs.com/api2/public/index.php/update-professional-password",
        formData,
        {
         }
      );
  
      showSuccessToast("Password updated successfully!");
      setPasswords({ newPassword: "", confirmPassword: "" });
  
    } catch (error) {
      console.error("Error updating password:", error);
      showErrorToast("Failed to update password.");
    }
  };
  

  return (
    <>
      <Toaster />
      <div className="flex flex-col xl:flex-row justify-center w-full">
      <div className=" w-full  mt-5 px-4">
        <Card color="transparent" shadow={false} className="p-6 border border-gray-300 shadow-sm rounded-2xl">
          {/* Update User */}
          <Typography variant="h4" color="blue-gray">Update User</Typography>
          <form onSubmit={handleUpdate} className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Name */}
            <div className="flex flex-col">
              <Typography variant="h6">Name</Typography>
              <Input size="lg" name="name" value={user.name}  onChange={handleChange} placeholder="Enter Name" />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <Typography variant="h6">Email</Typography>
              <Input size="lg" name="email" value={user.email} onChange={handleChange} placeholder="Enter Email" />
            </div>

            {/* Mobile */}
            <div className="flex flex-col">
              <Typography variant="h6">Mobile</Typography>
              <Input size="lg" name="mobile" value={user.mobile} onChange={handleChange} placeholder="Enter Mobile" />
            </div>

            {/* Organisation */}
            <div className="flex flex-col">
              <Typography variant="h6">Organisation</Typography>
              <Input size="lg" name="organisation" value={user.organisation} onChange={handleChange} placeholder="Enter Organisation" />
            </div>

            {/* City */}
            <div className="flex flex-col">
              <Typography variant="h6">City</Typography>
              <Input size="lg" name="city" value={user.city} onChange={handleChange} placeholder="Enter City" />
            </div>
            

            {/* Area Code */}
            <div className="flex flex-col">
              <Typography variant="h6">Area Code</Typography>
              <Input type="number" size="lg" name="area_code"  value={user.area_code} onChange={handleChange} placeholder="Enter Area Code" />
            </div>

            {/* Country */}
            <div className="flex flex-col">
              <Typography variant="h6">Country</Typography>
              <Input size="lg" name="country" value={user.country} onChange={handleChange} placeholder="Enter Country" />
            </div>

            {/* Wallet */}
            <div className="flex flex-col">
              <Typography variant="h6">Wallet Credit</Typography>
              <Input type="number" size="lg" name="wallet" value={user.wallet} onChange={handleChange} placeholder="Enter Credit Amount" />
            </div>

            
            <div className="flex flex-col md:col-span-2">
              <Typography variant="h6">City Requested</Typography>
              <Input type="city_requested" size="lg" name="city_requested" value={user.city_requested} onChange={handleChange} placeholder="Enter Credit Amount" />
            </div>

            {/* About */}
             <div className="flex flex-col md:col-span-2">
              <Typography variant="h6">About</Typography>
              <Textarea name="listing_about" value={user.listing_about} onChange={handleChange} placeholder="Enter About" />
            </div> 

            {/* Dropdowns */}

            {/* Is Buyer */}
            <div className="flex flex-col">
              <Typography variant="h6">Is Buyer</Typography>
              <select name="is_buyer" value={user.is_buyer} onChange={handleChange} className="border p-2 rounded-lg">
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>

            {/* Is Company */}
            <div className="flex flex-col">
              <Typography variant="h6">Is Company</Typography>
              <select name="is_company" value={user.is_company} onChange={handleChange} className="border p-2 rounded-lg">
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>

            {/* Status */}
            <div className="flex flex-col">
              <Typography variant="h6">Status</Typography>
              <select name="status" value={user.status} onChange={handleChange} className="border p-2 rounded-lg">
                <option value="0">Inactive</option>
                <option value="1">Active</option>
              </select>
            </div>

            {/* Is Subscriber */}
            <div className="flex flex-col">
              <Typography variant="h6">Is Subscriber</Typography>
              <select name="is_subscriber" value={user.is_subscriber} onChange={handleChange} className="border p-2 rounded-lg">
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>
            {/* Is Verify */}
            <div className="flex flex-col">
              <Typography variant="h6">Is Verify</Typography>
              <select name="is_verified" value={user.is_verified} onChange={handleChange} className="border p-2 rounded-lg">
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>
            {/* Is Subscriber */}
            <div className="flex flex-col">
              <Typography variant="h6">Is Kyc Verified</Typography>
              <select name="is_kyc_verified" value={user.is_kyc_verified} onChange={handleChange} className="border p-2 rounded-lg">
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>
          

            {/* Submit Button */}
            <div className="md:col-span-2 flex justify-end">
              <Button type="submit" className="mt-4 w-full md:w-auto">Update User</Button>
            </div>

          </form>


      
        </Card>
      </div>

      <div className="w-full md:w-1/2 mt-5 px-4">
      <Card color="transparent" shadow={false} className="p-6 border border-gray-300 shadow-sm rounded-2xl">

      {/* Update Password */}  

          {/* Update Password */}
          <Typography variant="h4" color="blue-gray">Update Password</Typography>
          <form onSubmit={handlePasswordUpdate} className="mt-4 grid grid-cols-1 gap-4">
            <div className="flex flex-col">
              <Typography variant="h6">New Password</Typography>
              <Input type="password" size="lg" name="newPassword" value={passwords.newPassword} onChange={handlePasswordChange} placeholder="Enter New Password" />
            </div>
            <div className="flex flex-col">
              <Typography variant="h6">Confirm Password</Typography>
              <Input type="password" size="lg" name="confirmPassword" value={passwords.confirmPassword} onChange={handlePasswordChange} placeholder="Confirm New Password" />
            </div>
            <div className="flex justify-end">
              <Button type="submit" className="mt-4">Update Password</Button>
            </div>
          </form>

      </Card>
    </div>
    </div>

    </>
  );
}

export default EditUsers;
