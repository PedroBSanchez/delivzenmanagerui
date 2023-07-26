import "./App.css";
import Pedidos from "./screens/pedidos/Pedidos";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./screens/login/Login";
import Cardapio from "./screens/cardapio/Cardapio";
import Historico from "./screens/historico/Historico";
import Sidebar from "./components/sidebar/Sidebar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/pedidos"
          element={
            <Sidebar>
              <Pedidos />
            </Sidebar>
          }
        />
        <Route
          path="/cardapio"
          element={
            <Sidebar>
              <Cardapio />
            </Sidebar>
          }
        />
        <Route
          path="/historico"
          element={
            <Sidebar>
              <Historico />
            </Sidebar>
          }
        />
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
