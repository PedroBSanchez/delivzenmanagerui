import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import "./OrderDetails.css";
import Loading from "../../components/loading/Loading";

const OrderDetails = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState({});
  const { orderId } = useParams();

  const getOrder = async () => {
    const token = localStorage.getItem("tokenApi");

    const options = {
      method: "GET",
      url: `${import.meta.env.VITE_API_URL}/api/orders/getorderbyid/${orderId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    setLoading(true);
    await axios
      .request(options)
      .then((response) => {
        setLoading(false);
        console.log(response.data);
        setOrder(response.data);
      })
      .catch((error) => {
        setLoading(false);
        navigate("/pedidos");
        console.log(error);
      });
  };

  useEffect(() => {
    getOrder();
  }, []);

  return (
    <>
      <Loading loading={loading} />
      <div className="container-fluid">
        <h1 className="mt-2">Pedido</h1>
      </div>
    </>
  );
};

export default OrderDetails;
