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
import { PlusCircleIcon, TrashIcon, ViewfinderCircleIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

function TravelAddProduct() {
  const [product, setProduct] = useState({
    title: "",
    duration: "",
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
        `${import.meta.env.VITE_BASE_URL_SOOPRS}/package`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
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

  const handleServiceChange = (selectedOptions) => {
    setProduct((prev) => ({
      ...prev,
      services: selectedOptions.map((option) => option.value),
    }));
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
        duration: product.duration,
        price: product.price,
        phone: product.phone,
        image: product.image, // This is now a URL, not a file
        services: product.services,
      };

      await axios.post(
        `${import.meta.env.VITE_BASE_URL_SOOPRS}/package`,
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
        duration: "",
        price: "",
        phone: "",
        image: null,
        services: [],
      });
    } catch (error) {
      showErrorToast("Failed to add package.");
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
          src={row.image}
          alt="Package"
          className="w-16 h-16 object-cover rounded-md"
        />
      ),
    },
    { key: "title", label: "Title", render: (row) => row.title },
    {
      key: "duration",
      label: "Duration",
      render: (row) => `${row.duration} days`,
    },
    { key: "price", label: "Price", render: (row) => `${row.price}` },
    { key: "phone", label: "Phone", render: (row) => row.phone },
    {
      key: "services",
      label: "Services",
      render: (row) => row.services.join(", "),
    },
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
            <Link to={`/add-travel-description/${row.id}`} className="text-blue-500">
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
                name="duration"
                value={product.duration}
                onChange={handleProductChange}
                placeholder="Enter Duration"
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

            <div className="col-span-2">
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
              <Select
                isMulti
                options={[
                  { value: "Meals", label: "Meals" },
                  { value: "Hotel", label: "Hotel" },
                  { value: "Transport", label: "Transport" },
                ]}
                value={product.services.map((s) => ({ value: s, label: s }))}
                onChange={handleServiceChange}
                placeholder="Select Services"
              />
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
