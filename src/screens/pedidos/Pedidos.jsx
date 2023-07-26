import React, { useState } from "react";

import "./Pedidos.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Loading from "../../components/loading/Loading";

const Pedidos = () => {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Loading loading={loading} />
      <div className="container-fluid">
        <h1>Pedidos</h1>
      </div>
    </>
  );
};

export default Pedidos;
