import React, { useEffect, useState } from "react";

import "./Pedidos.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Loading from "../../components/loading/Loading";
import OrderCard from "../../components/orderCard/OrderCard";
import axios from "axios";
import moment from "moment";

const Pedidos = () => {
  const [loading, setLoading] = useState(false);

  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    const token = localStorage.getItem("tokenApi");
    const options = {
      method: "GET",
      url: `${import.meta.env.VITE_API_URL}/api/orders/getopenorders`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    setLoading(true);
    await axios
      .request(options)
      .then((response) => {
        setLoading(false);
        console.log(response);
        setOrders(response.data);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    //const data = new Date();
    //console.log(moment(data).utc(-3).format("DD/MM/YYYY HH:mm"));
    getOrders();
  }, []);

  return (
    <>
      <Loading loading={loading} />
      <div className="container-fluid">
        <h1>Pedidos</h1>

        <div className="row">
          {orders.map((order, index) => {
            return (
              <div key={index} className="col-md-4 col-sm-6 m-2">
                <OrderCard order={order} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Pedidos;
