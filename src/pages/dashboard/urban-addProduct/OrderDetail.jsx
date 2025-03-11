import { useEffect, useState } from "react";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";

const OrderDetail = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = Cookies.get("token");
  const orderId = useParams().id;

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL_SOOPRS}/get-order/${orderId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data.success) {
          setOrder(response.data.data);
        } else {
          setError("Failed to fetch order details.");
        }
      } catch (err) {
        setError("Error fetching order data.", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, token]);

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <Card className="w-full max-w-5xl mx-auto mt-5 p-6 shadow-lg">
      <CardBody className="flex flex-col md:flex-row justify-between gap-10">
        <div className="w-1/3">
          <Typography variant="h5" color="blue-gray" className="font-bold">
            Order Details
          </Typography>
          <div className="mt-3 space-y-2">
            <Typography className="font-semibold">Order ID: {order.order_id}</Typography>
            <Typography className="font-semibold">Username: {order.username}</Typography>
            <Typography className="font-semibold">Email: {order.email}</Typography>
            <Typography className="font-semibold">Address: {order.address}</Typography>
            <Typography className="font-semibold">Total Amount: {order.total_amount}</Typography>
            <Typography className="font-semibold">Payment ID: {order.payment_id}</Typography>
            <Typography className="font-semibold">
              Created At: {new Date(order.created_at).toLocaleString()}
            </Typography>
          </div>
        </div>
        <div className="w-2/3">
          <Typography variant="h6" className="mb-4 font-bold">
            Products
          </Typography>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {order.products.map((product) => (
              <Card key={product.product_id} className="border border-gray-300  rounded-lg shadow-md">
                <img
                  src={product.image}
                  alt="product"
                  className="w-full h-40 object-cover rounded"
                />
                <div className="mt-3 space-y-1 p-4">
                  <Typography className="font-bold">Title: {product.title}</Typography>
                  <Typography>Price: {product.price}</Typography>
                  <Typography>Quantity: {product.quantity}</Typography>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default OrderDetail;
