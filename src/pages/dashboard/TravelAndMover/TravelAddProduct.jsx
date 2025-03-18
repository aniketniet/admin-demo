import { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import {
  Card,
  Input,
  Button,
  Typography,
  Spinner,
  Tooltip,
} from "@material-tailwind/react";
import Cookies from "js-cookie";
import Toaster, {
  showSuccessToast,
  showErrorToast,
} from "@/components/Toaster";
import CustomTable from "@/components/CustomTable";
import {
  PlusCircleIcon,
  TrashIcon,
  ViewfinderCircleIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

function TravelAddProduct() {
  const [product, setProduct] = useState({
    title: "",
    days: "",
    nights: "",
    price: "",
    phone: "",
    image: null,
    services: [],
  });

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = Cookies.get("token");

  useEffect(() => {
    fetchProducts();
  }, [token]);

  const handleImageUpload = async (file, updateFunction) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL_SOOPRS}/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Image uploaded successfully:", data.data);
      updateFunction(data.data); // Set image URL in state
    } catch (error) {
      showErrorToast("Image upload failed", error);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL_SOOPRS}/get-all-travel-packages`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Packages fetched successfully:", data.data);
      setProducts(data.data);
    } catch (error) {
      console.error("Error fetching packages:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceChange = (service) => {
    setProduct((prev) => {
      const updatedServices = prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service];

      return { ...prev, services: updatedServices };
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      await handleImageUpload(file, (url) => {
        setProduct((prev) => ({ ...prev, image: url })); // Store URL instead of file
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        title: product.title,
        days: product.days, // Assuming the duration represents the number of days
        nights: product.nights, // Assuming the number of nights is 1 less than the number of days
        price: product.price,
        image: product.image, // This is now a URL, not a file
        mobile: product.phone,
        meals: product.services.includes("Meals") ? 1 : 0,
        transport: product.services.includes("Transport") ? 1 : 0,
        sightseeing: product.services.includes("Sightseeing") ? 1 : 0,
        hotel: product.services.includes("Hotel") ? 1 : 0,
        tour: product.services.includes("Tour") ? 1 : 0, // Tour service checkbox
        activity: product.services.includes("Activity") ? 1 : 0, // Activity service checkbox
        guide: product.services.includes("Guide") ? 1 : 0, // You might want to adjust this depending on the use case
        ticketing: product.services.includes("Ticketing") ? 1 : 0, // You might want to adjust this depending on the use case
        camping: product.services.includes("Camping") ? 1 : 0, // Adjust based on your application's needs
        couple_friendly: product.services.includes("Couple_friendly") ? 1 : 0, // Set based on your application's needs
      };

      await axios.post(
        `${import.meta.env.VITE_BASE_URL_SOOPRS}/create-travel-package`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      showSuccessToast("Package added successfully!");
      fetchProducts();
      setProduct({
        title: "",
        days: "",
        nights: "",
        price: "",
        phone: "",
        image: null,
        services: [],
      });
    } catch (error) {
      showErrorToast("Failed to add package.", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL_SOOPRS}/delete-package`,
        { id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchProducts();
    } catch (error) {
      console.error("Error deleting package:", error);
    }
  };

  const columns = [
    {
      key: "image",
      label: "Image",
      render: (row) => (
        <img
         src={`${import.meta.env.VITE_BASE_URL_IMAGE}${row.image}`}
          alt="Package"
          className="w-16 h-16 object-cover rounded-md"
        />
      ),
    },
    { key: "title", label: "Title", render: (row) => row.title },
    {
      key: "days",
      label: "Days",
      render: (row) => `${row.days} days`,
    },
    { key: "price", label: "Price", render: (row) => `${row.price}` },
    { key: "mobile", label: "Phone", render: (row) => row.mobile },
    // {
    //   key: "services",
    //   label: "Services",
    //   render: (row) => row.services.join(", "),
    // },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <div className="px-4 py-2 flex gap-2">
          <Tooltip content="Package Details">
            <Link
              to={`/view-package-detail/${row.id}`}
              className="text-blue-500"
            >
              <button>
                <ViewfinderCircleIcon className="h-5 w-5 text-green-500" />
              </button>
            </Link>
          </Tooltip>
          <Tooltip content="Add Description & Faq">
            <Link
              to={`/add-travel-description/${row.id}`}
              className="text-blue-500"
            >
              <button>
                <PlusCircleIcon className="h-5 w-5 text-green-500" />
              </button>
            </Link>
          </Tooltip>
          <Tooltip content="Delete">
            <button onClick={() => handleDelete(row.id)}>
              <TrashIcon className="h-5 w-5 text-red-500" />
            </button>
          </Tooltip>
        </div>
      ),
      width: "w-24",
    },
  ];

  return (
    <>
      <Toaster />
      <div className="flex flex-col gap-6 mt-10 px-4 items-center">
        <Card className="p-6 border border-gray-300 shadow-sm rounded-2xl w-full max-w-5xl">
          <Typography variant="h4">Add Travel Package</Typography>
          <form
            onSubmit={handleSubmit}
            className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Package Title
              </label>
              <Input
                name="title"
                value={product.title}
                onChange={handleProductChange}
                placeholder="Enter Title"
              />
            </div>

            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-gray-700">
                Duration (Days)
              </label>
              <Input
                type="number"
                name="days"
                value={product.days}
                onChange={handleProductChange}
                placeholder="Enter Days"
              />
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-gray-700">
                Duration (Nights)
              </label>
              <Input
                type="number"
                name="nights"
                value={product.nights}
                onChange={handleProductChange}
                placeholder="Enter Nights"
              />
            </div>

            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <Input
                type="number"
                name="price"
                value={product.price}
                onChange={handleProductChange}
                placeholder="Enter Price"
              />
            </div>

            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <Input
                name="phone"
                value={product.phone}
                onChange={handleProductChange}
                placeholder="Enter Contact Number"
              />
            </div>
          
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Services
              </label>

              <div className="flex flex-wrap gap-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={product.services.includes("Meals")}
                    onChange={() => handleServiceChange("Meals")}
                  />
                  <span className="ml-2">Meals</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={product.services.includes("Hotel")}
                    onChange={() => handleServiceChange("Hotel")}
                  />
                  <span className="ml-2">Hotel</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={product.services.includes("Transport")}
                    onChange={() => handleServiceChange("Transport")}
                  />
                  <span className="ml-2">Transport</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={product.services.includes("Sightseeing")}
                    onChange={() => handleServiceChange("Sightseeing")}
                  />
                  <span className="ml-2">Sightseeing</span>
                </label>

                {/* New checkbox for Tour */}
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={product.services.includes("Tour")}
                    onChange={() => handleServiceChange("Tour")}
                  />
                  <span className="ml-2">Tour</span>
                </label>

                {/* New checkbox for Activity */}
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={product.services.includes("Activity")}
                    onChange={() => handleServiceChange("Activity")}
                  />
                  <span className="ml-2">Activity</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={product.services.includes("Guide")}
                    onChange={() => handleServiceChange("Guide")}
                  />
                  <span className="ml-2">Guide</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={product.services.includes("Ticketing")}
                    onChange={() => handleServiceChange("Ticketing")}
                  />
                  <span className="ml-2">Ticketing</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={product.services.includes("Camping")}
                    onChange={() => handleServiceChange("Camping")}
                  />
                  <span className="ml-2">Camping</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={product.services.includes("Couple_friendly")}
                    onChange={() => handleServiceChange("Couple_friendly")}
                  />
                  <span className="ml-2">Couple Friendly</span>
                </label>

                {/* Add more services as needed */}
              </div>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Upload Image
              </label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>

            <div className="col-span-2">
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </div>
          </form>
        </Card>

        <Card className="w-full max-w-5xl shadow-lg">
          <Typography variant="h5" className="p-4">
            Packages
          </Typography>
          <div className="p-4">
            {loading ? (
              <Spinner />
            ) : (
              <CustomTable columns={columns} data={products} />
            )}
          </div>
        </Card>
      </div>
    </>
  );
}

export default TravelAddProduct;
