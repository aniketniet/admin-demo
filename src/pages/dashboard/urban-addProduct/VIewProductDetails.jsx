import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";

const ViewProductDetails = () => {
  const [product, setProduct] = useState(null);
  const token = Cookies.get("token");

  const { id } = useParams();
  const productId = parseInt(id);
      // Fetch product details by ID

  useEffect(() => {
    const fetchDetailProducts = async () => {
      // setLoading(true);
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/product/${productId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setProduct(data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        // setLoading(false);
      }
    };

    fetchDetailProducts();
  }, [productId, token]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/delete/${productId}`);
      alert("Product deleted successfully");
      setProduct(null);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  if (!product) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="flex justify-between gap-5  mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      {/* Product Image & Details */}
      <div className="mb-6 flex-1">
        <div className="h-64">
          <img  src={`${import.meta.env.VITE_BASE_URL_IMAGE}${product.image}`} alt={product.title} className="w-full h-full object-cover rounded-lg" />
        </div>
        <div className="mt-4">
          <h2 className="text-xl font-bold">{product.title}</h2>
          <p className="text-gray-500">Category ID: {product.category_id}</p>
          <p className="text-gray-500">Quantity: {product.quantity}</p>
          <p className="text-lg font-semibold text-blue-600">Price: {product.price}</p>
        </div>
      </div>

      <div className="flex-2">

      {/* Descriptions */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Descriptions</h3>
        <div className="space-y-4">
          {product.descriptions.map((desc, index) => (
            <div key={index} className="p-4 bg-gray-100 rounded-lg">
              {desc.heading && <h4 className="text-lg font-semibold">{desc.heading}</h4>}
              {desc.details.map((detail, idx) => (
                <div key={idx} className="mt-2">
                  <p className="text-gray-700">{detail.title && <strong>{detail.title}: </strong>} {detail.desc || detail.detail}</p>
                  {detail.image && <img src={`${import.meta.env.VITE_BASE_URL_IMAGE}${detail.image}`} alt="desc" className="w-24 h-24 mt-2 rounded-lg" />}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* FAQs */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">FAQs</h3>
        <div className="space-y-4">
          {product.faqs.map((faq, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <h4 className="font-semibold">{faq.question}</h4>
              <p className="text-gray-700">{faq.answer}</p>
              {faq.image && <img src={faq.image} alt="faq" className="w-24 h-24 mt-2 rounded-lg" />}
            </div>
          ))}
        </div>
      </div>

      {/* Delete Button */}
      <Button onClick={handleDelete} className="bg-red-500 text-white flex items-center gap-2">
        <Trash2 size={20} />
        Delete Product
      </Button>
      </div>
    </div>
  );
};

export default ViewProductDetails;
