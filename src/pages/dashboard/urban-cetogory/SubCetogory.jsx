import { useState, useEffect, useCallback } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Spinner,
  Switch,
} from "@material-tailwind/react";
import Select from "react-select";
import axios from "axios";
import Cookies from "js-cookie";
import CustomTable from "../../../components/CustomTable";
import { TrashIcon } from "@heroicons/react/24/solid";

const SubCategory = () => {
  const [subCategories, setSubCategories] = useState([]);
  const [mainCategories, setMainCategories] = useState([]);
  const [mainCategoryId, setMainCategoryId] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [subCategory, setSubCategory] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const token = Cookies.get("token");

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    if (!token) return;
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL_SOOPRS}/get-categories`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMainCategories(data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  const fetchSubCategories = useCallback(async () => {
    setLoading(true);
    if (!token) return;
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL_SOOPRS}/get-sub-categories/${
          categoryId ? categoryId : 0
        }`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSubCategories(data.data);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchCategories();
      fetchSubCategories();
    }
  }, [token, fetchCategories, fetchSubCategories]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubCategorySubmit = async () => {
    setLoadingSubmit(true);
    try {
      const formData = new FormData();
      formData.append("categoryId", mainCategoryId?.value);
      formData.append("name", subCategory);
      if (image) formData.append("image", image);

      await axios.post(
        `${import.meta.env.VITE_BASE_URL_SOOPRS}/create-sub-category`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchSubCategories(); // Refresh table
      setMainCategoryId(null);
      setSubCategory("");
      setCategoryId;
      null;
      setImage(null);
    } catch (error) {
      console.error("Error submitting subcategory:", error);
    } finally {
      setLoadingSubmit(false);
    }
  };

  const handleStatusToggle = async (id, status) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BASE_URL_SOOPRS}/sub-category-status`,
        { id, status: status ? 1 : 0 },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchSubCategories();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleDelete = async (id) => {
    console.log(id, "id");
    if (!token) {
      console.error("No token found. User may not be authenticated.");
      return;
    }

    try {
      await axios.post(
        "https://t5bdtk0b-3004.inc1.devtunnels.ms/api/delete-sub-category",
        { id: id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchSubCategories();
    } catch (error) {
      console.error("Error deleting subcategory:", error);
    }
  };

  const columns = [
    {
      key: "image",
      label: "Image",
      render: (row) => (
        <img
          src={row.image}
          alt="subcategory"
          className="w-16 h-16 object-cover rounded-md"
        />
      ),
    },
    {
      key: "name",
      label: "Subcategory",
      render: (row) => row.name,
    },
    {
      key: "main_category",
      label: "Main Category",
      render: (row) => row.main_category_name,
    },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <Switch
          checked={row.status === 1}
          onChange={(e) => handleStatusToggle(row.id, e.target.checked)}
        />
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <button size="sm" onClick={() => handleDelete(row.id)}>
          <TrashIcon className="h-5 w-5 text-red-500" />
        </button>
      ),
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-6 mt-10 px-4">
      {/* Left Side - Form */}
      <Card className="p-4 w-full lg:w-1/3 shadow-lg">
        <Typography variant="h5" className="mb-4 text-center">
          Add Subcategory
        </Typography>
        <CardBody className="space-y-4">
          <Select
            options={mainCategories.map((cat) => ({
              value: cat.id,
              label: cat.name,
            }))}
            value={mainCategoryId}
            onChange={setMainCategoryId}
            placeholder="Select Main Category"
            isSearchable={true} // Enables search
            className="basic-single"
          />
          <Input
            label="Subcategory"
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
          />
          <div className="w-full">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-md mx-auto"
            />
          )}
        </CardBody>
        <CardFooter className="text-center">
          <Button
            onClick={handleSubCategorySubmit}
            disabled={loadingSubmit}
            className="w-full"
          >
            {loadingSubmit ? (
              <Spinner className="h-5 w-5" />
            ) : (
              "Add Subcategory"
            )}
          </Button>
        </CardFooter>
      </Card>

      {/* Right Side - Table */}
      <Card className="w-full lg:w-2/3 shadow-lg">
        <Typography variant="h5" className="mb-4 text-center">
          Subcategories
        </Typography>
        <CardBody>
          {loading ? (
            <div className="flex justify-center">
              <Spinner className="h-8 w-8 text-blue-500" />
            </div>
          ) : (
            <CustomTable columns={columns} data={subCategories} />
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default SubCategory;
