import { useState, useEffect, useCallback } from "react";
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

function AddProduct() {
  const [product, setProduct] = useState({
    title: "",
    image: "",
    quantity: "",
    price: "",
    categoryId: null,
    subCategoryId: null,
    subSubCategoryId: null,
  });
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subSubCategories, setSubSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = Cookies.get("token");

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [token]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/admin/get-products`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProducts(data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    if (!token) return;
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/admin/get-categories`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCategories(data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  const fetchSubCategories = useCallback(
    async (categoryId) => {
      setLoading(true);
      if (!token || !categoryId) return;
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/admin/get-sub-categories/${
            categoryId ? categoryId : 0
          }`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSubCategories(data.data); // Only set relevant subcategories
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  const fetchSubSubCategories = useCallback(
    async (subCategoryId) => {
      setLoading(true);
      if (!token || !subCategoryId) return;
      try {
        const { data } = await axios.get(
          `${
            import.meta.env.VITE_BASE_URL
          }/admin/get-sub-sub-categories/${subCategoryId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSubSubCategories(data.data); // Only set related sub-subcategories
      } catch (error) {
        console.error("Error fetching sub-subcategories:", error);
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (selectedOption) => {
    setProduct((prev) => ({
      ...prev,
      categoryId: selectedOption,
      subCategoryId: null,
      subSubCategoryId: null,
    }));
    setSubCategories([]);
    setSubSubCategories([]);
    fetchSubCategories(selectedOption.value);
  };

  const handleSubCategoryChange = (selectedOption) => {
    setProduct((prev) => ({
      ...prev,
      subCategoryId: selectedOption,
      subSubCategoryId: null,
    }));
    setSubSubCategories([]);
    fetchSubSubCategories(selectedOption.value);
  };

  const handleSubSubCategoryChange = (selectedOption) => {
    setProduct((prev) => ({ ...prev, subSubCategoryId: selectedOption }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProduct((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = async (e) => {

    if (!product.image) {
      showErrorToast("Please select an image");
      return;
    }
    if (!product.title) {
      showErrorToast("Product title is required");
      return;
    }
    if (!product.quantity) {
      showErrorToast("Product quantity is required");

      return;
    }
    if (!product.price) {
      showErrorToast("Product price is required");
      return;
    }
    if (!product.categoryId) {
      showErrorToast("Please select a category");
      return;
    }
    if (!product.subCategoryId) {
      showErrorToast("Please select a subcategory");
      return;
    }
    if (!product.subSubCategoryId) {
      showErrorToast("Please select a sub-subcategory");
      return;
    }
    if (product.quantity <= 0) {
      showErrorToast("Quantity must be greater than 0");
      return;
    }
    if (product.price <= 0) {
      showErrorToast("Price must be greater than 0");
      return;
    }
    if (product.title.length < 3) {
      showErrorToast("Product title must be at least 3 characters long");
      return;
    }
    

    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", product.title);
      formData.append("image", product.image); // Image file
      formData.append("quantity", product.quantity);
      formData.append("price", product.price);
      formData.append("categoryId", product.categoryId?.value);
      formData.append("subCategoryId", product.subCategoryId?.value);
      formData.append("subSubCategoryId", product.subSubCategoryId?.value);

      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/admin/create-product`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // Required for file uploads
          },
        }
      );

      showSuccessToast("Product added successfully!");
      fetchProducts();
      setProduct({
        title: "",
        image: null,
        quantity: "",
        price: "",
        categoryId: null,
        subCategoryId: null,
        subSubCategoryId: null,

      });

    } catch (error) {
      showErrorToast("Failed to add product.", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/admin/delete-product/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const columns = [
    {
      key: "image",
      label: "Image",
      render: (row) => (
        <img
        src={`${import.meta.env.VITE_BASE_URL_IMAGE}${row.image}`}
          alt="Product"
          className="w-16 h-16 object-cover rounded-md"
        />
      ),
    },
    { key: "title", label: "Title", render: (row) => row.title },
    { key: "quantity", label: "Quantity", render: (row) => row.quantity },
    { key: "price", label: "Price", render: (row) => `$${row.price}` },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <div className="px-4 py-2 flex gap-2">
          <Tooltip content="Product Details">
            <Link to={`/view-product-detail/${row.id}`} className="text-blue-500">
              <button>
                <ViewfinderCircleIcon className="h-5 w-5 text-green-500" />
              </button>
            </Link>
          </Tooltip>
          <Tooltip content="Add Description & Faq">
            <Link to={`/add-description/${row.id}`} className="text-blue-500">
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
          <Typography variant="h4">Add Product</Typography>
          <form
            onSubmit={handleSubmit}
            className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <Select
                options={categories.map((cat) => ({
                  value: cat.id,
                  label: cat.name,
                }))}
                value={product.categoryId}
                onChange={handleCategoryChange}
                placeholder="Select Category"
              />
            </div>

            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-gray-700">
                Subcategory
              </label>
              <Select
                options={subCategories.map((sub) => ({
                  value: sub.id,
                  label: sub.name,
                }))}
                value={product.subCategoryId}
                onChange={handleSubCategoryChange}
                placeholder="Select Subcategory"
                isDisabled={!product.categoryId}
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Sub-Subcategory
              </label>
              <Select
                options={subSubCategories.map((subsub) => ({
                  value: subsub.id,
                  label: subsub.name,
                }))}
                value={product.subSubCategoryId}
                onChange={handleSubSubCategoryChange}
                placeholder="Select Sub-Subcategory"
                isDisabled={!product.subCategoryId}
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Product Title
              </label>
              <Input
                name="title"
                value={product.title}
                onChange={handleProductChange}
                placeholder="Enter Product Title"
              />
            </div>

            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-gray-700">
                Quantity
              </label>
              <Input
                type="number"
                name="quantity"
                value={product.quantity}
                onChange={handleProductChange}
                placeholder="Enter Quantity"
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
                Product Image
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
            Products Table
          </Typography>
          <div className="p-4">
            {loading ? (
              <Spinner className="h-8 w-8 text-blue-500" />
            ) : (
              <CustomTable columns={columns} data={products} />
            )}
          </div>
        </Card>
      </div>
    </>
  );
}

export default AddProduct;
