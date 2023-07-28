import "./App.css";
import Pedidos from "./screens/pedidos/Pedidos";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./screens/login/Login";
import Cardapio from "./screens/cardapio/Cardapio";
import Historico from "./screens/historico/Historico";
import Sidebar from "./components/sidebar/Sidebar";
import OrderDetails from "./screens/orderDetails/OrderDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<Login />} />
        <Route
          path="/pedidos"
          element={
            <div className="page-background">
              <Sidebar>
                <Pedidos />
              </Sidebar>
            </div>
          }
        />
        <Route
          path="/cardapio"
          element={
            <div className="page-background">
              <Sidebar>
                <Cardapio />
              </Sidebar>
            </div>
          }
        />
        <Route
          path="/historico"
          element={
            <div className="page-background">
              <Sidebar>
                <Historico />
              </Sidebar>
            </div>
          }
        />

        <Route
          path="/pedidodetalhado/:orderId"
          element={
            <div className="page-background">
              <Sidebar>
                <OrderDetails />
              </Sidebar>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
