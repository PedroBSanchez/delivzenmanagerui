import React, { useEffect, useState } from "react";

import "./Pedidos.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Loading from "../../components/loading/Loading";
import OrderCard from "../../components/orderCard/OrderCard";
import axios from "axios";
import moment from "moment";
import Swal from "sweetalert2";

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

  const handleChangeStatus = async (orderId, status) => {
    let message;
    let newStatus;

    switch (status) {
      case 1:
        message = "Deseja alterar o status do pedido para 'Trânsito'?";
        newStatus = 2;
        break;

      case 2:
        message = "Deseja concluir o pedido?";
        newStatus = 0;
        break;

      default:
        message = "Deseja concluir o pedido?";
        newStatus = 0;
        break;
    }

    Swal.fire({
      title: message,
      showDenyButton: true,
      confirmButtonText: "Confirmar",
      denyButtonText: `Cancelar`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem("tokenApi");

        const options = {
          method: "PUT",
          url: `${
            import.meta.env.VITE_API_URL
          }/api/orders/changestatus/${orderId}/${newStatus}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        setLoading(true);
        await axios
          .request(options)
          .then((response) => {
            setLoading(false);
            setOrders([]);
            getOrders();
            Swal.fire({
              title: "Status alterado com sucesso",
              icon: "success",
            });
          })
          .catch((error) => {
            setLoading(false);
            console.log(error);

            Swal.fire({
              title: error.response.data.error ?? "Error",
              icon: "error",
            });
          });
      }
    });
  };

  useEffect(() => {
    getOrders();
    setInterval(getOrders, 60000);
  }, []);

  return (
    <>
      <Loading loading={loading} />
      <div className="container-fluid">
        <h1 className="mt-2">Pedidos</h1>

        <div className="row">
          {orders.map((order, index) => {
            return (
              <div key={index} className="col-md-4 col-sm-6 m-2">
                <OrderCard
                  order={order}
                  handleChangeStatus={handleChangeStatus}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Pedidos;
