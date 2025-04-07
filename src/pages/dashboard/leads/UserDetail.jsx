import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, CardBody } from "@material-tailwind/react";
import Cookies from "js-cookie";

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) {
          console.error("Admin token is missing. Please ensure you are logged in.");
          setLoading(false);
          return;
        }

        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/get-user/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setUser(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) return <div className="text-center p-4">Loading...</div>;

  if (!user) return <div className="text-center p-4 text-red-500">User not found.</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Card>
      <CardBody>
  <div className="flex flex-col sm:flex-row items-start gap-6">
    {/* Left Side - Profile Image */}
    <div className="flex-shrink-0">
     
      <img
        src={`${import.meta.env.VITE_BASE_URL_IMAGE}${user.profile_img}`}
        alt="Profile"
        className="w-32 h-32 rounded-full mt-2 object-cover"
      />
    </div>

    {/* Right Side - Details */}
    <div className="flex-grow">
      <h2 className="text-xl font-bold mb-4">User Details</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div><strong>Name:</strong> {user.name}</div>
        <div><strong>Email:</strong> {user.email}</div>
        <div><strong>Mobile:</strong> {user.mobile}</div>
        <div><strong>DOB:</strong> {user.dob}</div>
        <div><strong>Gender:</strong> {user.gender}</div>
        <div><strong>Status:</strong> {user.status === 1 ? "Active" : "Inactive"}</div>
      </div>

      {user.address && user.address.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Address</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div><strong>House No:</strong> {user.address[0].house_no}</div>
            <div><strong>Area:</strong> {user.address[0].area}</div>
            <div><strong>City:</strong> {user.address[0].city}</div>
            <div><strong>District:</strong> {user.address[0].district}</div>
            <div><strong>Pincode:</strong> {user.address[0].pincode}</div>
            <div><strong>Latitude:</strong> {user.address[0].latitude}</div>
            <div><strong>Longitude:</strong> {user.address[0].longitude}</div>
          </div>
        </div>
      )}
    </div>
  </div>
</CardBody>

      </Card>
    </div>
  );
};

export default UserDetail;
