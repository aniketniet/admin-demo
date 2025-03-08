import { useState } from "react";
import axios from "axios";
import {
  Card,
  Input,
  Button,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import Cookies from "js-cookie";
import { PlusCircle, Trash } from "lucide-react";
import Toaster, {
  showSuccessToast,
  showErrorToast,
} from "@/components/Toaster";
import { useParams } from "react-router-dom";

function AddDescription() {
  const [product, setProduct] = useState({
    title: "",
    price: "",
    description: [],
    faq: [],
  });

  const { id: productId } = useParams();
  const token = Cookies.get("token");

  // Image Upload Function - Updates State Immediately
  const handleImageUpload = async (file, updateFunction) => {
    if (!file) return;
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

  // Add New Description
  const addDescription = (type) => {
    setProduct((prev) => ({
      ...prev,
      description: [
        ...prev.description,
        {
          title: "",
          image: "",
          desc: type === "1" ? "" : undefined,
        },
      ],
    }));
  };

  // Update Description Field
  const updateDescription = (index, key, value) => {
    setProduct((prev) => {
      const updatedDescription = [...prev.description];
      updatedDescription[index][key] = value;
      return { ...prev, description: updatedDescription };
    });
  };

  // Add FAQ
  const addFaq = () => {
    setProduct((prev) => ({
      ...prev,
      faq: [...prev.faq, { question: "", answer: "", image: "" }],
    }));
  };

  // Update FAQ Field
  const updateFaq = (index, key, value) => {
    setProduct((prev) => {
      const updatedFaq = [...prev.faq];
      updatedFaq[index][key] = value;
      return { ...prev, faq: updatedFaq };
    });
  };

  // Handle Description Submit
  const handleDescriptionSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL_SOOPRS}/add-description`,
        {
          productId,
          heading: product.heading,
          type: product.description[0].desc !== undefined ? 1 : 0,
          details: product.description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      showSuccessToast("Description added successfully!");
      setProduct((prev) => ({ ...prev, description: [] }));
    } catch (error) {
      showErrorToast("Failed to add description.", error);
    }
  };

  // Handle FAQ Submit
  const handleFaqSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL_SOOPRS}/add-faq`,
        {
          productId: parseInt(productId, 10),
          faqs: product.faq,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      showSuccessToast("FAQ added successfully!");
      setProduct((prev) => ({ ...prev, faq: [] }));
    } catch (error) {
      showErrorToast("Failed to add FAQ.", error);
    }
  };

  return (
    <>
      <Toaster />
      <div className="flex flex-col md:flex-row gap-6 mt-5">
        {/* Description Section */}
        <Card className="p-6 border border-gray-300 shadow-sm rounded-2xl w-full max-w-5xl">
          <Typography variant="h4">Add Product Description</Typography>
          <form onSubmit={handleDescriptionSubmit} className="grid gap-4">
            <Typography variant="h5">Product Description</Typography>
            <label className="font-medium">Choose Description Type</label>
            <Select
              label="Choose Description Type"
              onChange={(value) => addDescription(value)}
            >
              <Option value="0">Point</Option>
              <Option value="1">Process</Option>
              <Option value="2">Image</Option>
            </Select>
            <label className="font-medium">Heading</label>
            <Input
              value={product.heading}
              onChange={(e) =>
                setProduct({ ...product, heading: e.target.value })
              }
              placeholder="Heading"
            />

            {product.description.map((desc, index) => (
              <div
                key={index}
                className="flex flex-col gap-2 border p-2 rounded"
              >
                <label className="font-medium">Title</label>
                <Input
                  value={desc.title}
                  onChange={(e) =>
                    updateDescription(index, "title", e.target.value)
                  }
                  placeholder="Title (optional)"
                />
                <label className="font-medium">Upload Image</label>
                <Input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      handleImageUpload(file, (url) =>
                        updateDescription(index, "image", url)
                      );
                    }
                  }}
                />
                {desc.desc !== undefined && (
                  <>
                    <label className="font-medium">Description</label>
                    <Input
                      value={desc.desc}
                      onChange={(e) =>
                        updateDescription(index, "desc", e.target.value)
                      }
                      placeholder="Description"
                    />
                  </>
                )}
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      addDescription(desc.desc !== undefined ? "1" : "0")
                    }
                  >
                    <PlusCircle size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setProduct((prev) => ({
                        ...prev,
                        description: prev.description.filter(
                          (_, i) => i !== index
                        ),
                      }))
                    }
                  >
                    <Trash size={20} />
                  </button>
                </div>
              </div>
            ))}
            <Button type="submit">Submit Description</Button>
          </form>
        </Card>

        {/* FAQ Section */}
        <Card className="p-6 border border-gray-300 shadow-sm rounded-2xl w-full max-w-5xl">
          <Typography variant="h4">Add FAQ</Typography>
          <form onSubmit={handleFaqSubmit} className="grid gap-4 mt-6">
            <Typography variant="h5">Frequently Asked Questions</Typography>
            <Button type="button" onClick={addFaq}>
              Add FAQ
            </Button>
            {product.faq.map((faq, index) => (
              <div
                key={index}
                className="flex flex-col gap-2 border p-2 rounded"
              >
                <label className="font-medium">Question</label>
                <Input
                  value={faq.question}
                  onChange={(e) => updateFaq(index, "question", e.target.value)}
                  placeholder="Question"
                />
                <label className="font-medium">Answer</label>
                <Input
                  value={faq.answer}
                  onChange={(e) => updateFaq(index, "answer", e.target.value)}
                  placeholder="Answer"
                />
                <label className="font-medium">Upload Image</label>
                <Input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      handleImageUpload(file, (url) =>
                        updateFaq(index, "image", url)
                      );
                    }
                  }}
                />
                <div className="flex gap-2">
                  <button type="button" onClick={addFaq}>
                    <PlusCircle size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setProduct((prev) => ({
                        ...prev,
                        faq: prev.faq.filter((_, i) => i !== index),
                      }))
                    }
                  >
                    <Trash size={20} />
                  </button>
                </div>
              </div>
            ))}
            <Button type="submit">Submit FAQ</Button>
          </form>
        </Card>
      </div>
    </>
  );
}

export default AddDescription;
