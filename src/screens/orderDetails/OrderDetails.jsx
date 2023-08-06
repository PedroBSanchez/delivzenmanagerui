import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BsFillCreditCard2BackFill } from "react-icons/bs";
import { MdPix } from "react-icons/md";
import { FaMoneyBillAlt } from "react-icons/fa";

import "./OrderDetails.css";
import Loading from "../../components/loading/Loading";
import { brMoney } from "../../shared/BrMoney";

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
        <div className="row mt-5">
          <div className="col">
            <h5>Informações</h5>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 ">
            <div className="order-detail-card p-3">
              <div className="row">
                <div className="col">
                  <p style={{ fontSize: "20px" }}>
                    {order.client} <br />
                    <span style={{ fontSize: "16px" }}>
                      {order.phoneNumber}
                      <br />
                      {`${order.address}, ${order.adressNumber}, ${order.neighborhood}`}
                      <br />
                      {order.complement}
                    </span>
                  </p>
                </div>
                <div className="col">
                  <p style={{ fontSize: "20px" }}>
                    Valor total: R$
                    {order.totalValue ? brMoney(order.totalValue) : ""}
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-1">
                  {order.paymentMethod == "Cartão" && (
                    <BsFillCreditCard2BackFill
                      size={35}
                      className="p-2 order-detail-payment-icon order-detail-payment-icon-card"
                    />
                  )}
                  {order.paymentMethod == "PIX" && (
                    <>
                      <MdPix
                        size={35}
                        className="p-2 order-detail-payment-icon order-detail-payment-icon-pix"
                      />
                    </>
                  )}
                  {order.paymentMethod == "Dinheiro" && (
                    <FaMoneyBillAlt
                      size={35}
                      className="p-2 order-detail-payment-icon order-detail-payment-icon-money"
                    />
                  )}
                </div>
                <div className="col-4">
                  <p className="m-1">{order.paymentMethod}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col">
            <h5>Pedido</h5>
          </div>
        </div>
        {order.items &&
          order.items.map((item, index) => {
            return (
              <div className="row mt-3 p-1" key={index}>
                <div className="col-md-6">
                  <div className="order-detail-card p-3">
                    <div className="row">
                      <div className="col">
                        <p style={{ fontSize: "21px" }}>
                          {item.name} R${item.value ? brMoney(item.value) : ""}
                        </p>
                      </div>
                      <div className="col-2 justify-content-end">
                        <div className="order-detail-item-amount p-1 text-center">
                          <p style={{ fontSize: "25px", color: "white" }}>
                            {item?.amount}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <p style={{ fontSize: "20px" }}>Adicionais:</p>
                        {item.additional &&
                          item.additional.map((additional, indexAdditional) => {
                            return (
                              <p
                                style={{ fontSize: "15px" }}
                                key={indexAdditional}
                              >{`${additional.name} R$${
                                additional.value
                                  ? brMoney(additional.value)
                                  : ""
                              }`}</p>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

        {order.observations && (
          <>
            <div className="row mt-5">
              <div className="col">
                <h5>Observação</h5>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="order-detail-card p-3">
                  <p>{order?.observations}</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default OrderDetails;
