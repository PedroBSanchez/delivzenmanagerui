import React, { useEffect, useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";

import { PiMagnifyingGlassDuotone } from "react-icons/pi";
import { FaBars } from "react-icons/fa";

import "./OrderCard.css";
import { brMoney } from "../../shared/BrMoney";

const OrderCard = (props) => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("");
  const [bgColor, setBgColor] = useState("");

  const handleOrderDetail = () => {
    navigate("/pedidodetalhado/" + props.order._id);
  };

  useEffect(() => {
    switch (props.order.status) {
      case 1:
        setStatus("Aberto");
        setBgColor("order-card-open");
        break;

      case 2:
        setStatus("Trânsito");
        setBgColor("order-card-transit");
        break;

      case 3:
        setStatus("Preparando");
        setBgColor("");
        break;

      default:
        setStatus("Fechado");
        setBgColor("");
        break;
    }
  }, []);

  return (
    <div className={"order-card p-2 " + bgColor}>
      <div className="row">
        <div className="col">
          <p>
            {moment(props.order.created_at ?? new Date())
              .utc(-3)
              .format("DD/MM/YYYY HH:mm")}
          </p>
        </div>
        <div className="col">
          <p>{`Status: ${status}`}</p>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <p>
            {props.order.client} <br />{" "}
            <u>R${brMoney(props.order.totalValue)}</u> <br />
            Forma de pagamento: {props.order.paymentMethod}
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <p style={{ fontSize: "15px" }}>
            {`${props.order.address}, ${props.order.adressNumber}, ${props.order.neighborhood}`}
            <br /> {props.order.complement ?? ""}
          </p>
        </div>
      </div>
      <div className="row">
        <div className="offset-9 col-1">
          <FaBars
            size={20}
            style={{ cursor: "pointer" }}
            onClick={() =>
              props.handleChangeStatus(props.order._id, props.order.status)
            }
          />
        </div>
        <div className="col-1">
          <PiMagnifyingGlassDuotone
            size={20}
            style={{ cursor: "pointer" }}
            onClick={handleOrderDetail}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
