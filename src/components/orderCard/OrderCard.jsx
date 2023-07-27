import React, { useEffect, useState } from "react";
import moment from "moment";

import { PiMagnifyingGlassDuotone } from "react-icons/pi";
import { FaBars } from "react-icons/fa";

import "./OrderCard.css";

const OrderCard = (props) => {
  const handleChangeStatus = async () => {};

  const [status, setStatus] = useState("");
  const [bgColor, setBgColor] = useState("");

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
          <p>{props.order.client}</p>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <p>{`${props.order.address}, ${props.order.adressNumber}, ${props.order.neighborhood}`}</p>
        </div>
      </div>
      <div className="row">
        <div className="offset-9 col-1">
          <FaBars size={20} />
        </div>
        <div className="col-1">
          <PiMagnifyingGlassDuotone size={20} />
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
