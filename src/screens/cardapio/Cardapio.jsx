import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { FaPencilAlt } from "react-icons/fa";
import { BsPlusSquareFill } from "react-icons/bs";

import "./Cardapio.css";

import "../../App.css";
import Loading from "../../components/loading/Loading";
import axios from "axios";
import Swal from "sweetalert2";
import { brMoney } from "../../shared/BrMoney";

const Cardapio = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState([]);

  const [category, setCategory] = useState("");

  const [items, setItems] = useState([]);

  const getCategories = async () => {
    const token = localStorage.getItem("tokenApi");
    const options = {
      method: "GET",
      url: `${import.meta.env.VITE_API_URL}/api/categories/getall`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await axios
      .request(options)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          title: "Erro ao carregar categorias",
          icon: "error",
        });
      });
  };

  const getItems = async (categoryParam = "") => {
    const token = localStorage.getItem("tokenApi");

    const options = {
      method: "GET",
      url: `${
        import.meta.env.VITE_API_URL
      }/api/items/getall?category=${categoryParam}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    setLoading(true);
    await axios
      .request(options)
      .then((response) => {
        setLoading(false);
        setItems(response.data);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        Swal.fire({
          title: "Erro ao carregar itens",
          icon: "error",
        });
      });
  };

  const handleDropdownSelect = (eventKey) => {
    setCategory(eventKey);

    getItems(eventKey);
  };

  const handleEditItem = (itemId) => {
    navigate("/editaritem/" + itemId);
  };

  const handleNewITem = () => {
    navigate("/novoitem");
  };

  useEffect(() => {
    getCategories();
    getItems();
  }, []);

  return (
    <>
      <Loading loading={loading} />
      <div className="container-fluid">
        <h1>Cardápio</h1>

        <div className="row mt-5 align-items-end justify-content-between">
          <div className="col-2 pt-5">
            <label>Categoria</label>
            <Dropdown onSelect={handleDropdownSelect} drop={"up"}>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                {category ? category : "Todos"}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item eventKey="">Todos</Dropdown.Item>
                {categories.map((category, index) => {
                  return (
                    <Dropdown.Item key={index} eventKey={category.name}>
                      {category.name}
                    </Dropdown.Item>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="col-5">
            <BsPlusSquareFill
              size={30}
              className="add-item-icon"
              onClick={handleNewITem}
            />
          </div>
        </div>
        <div className="row mt-5 ">
          <div className="col-md-8">
            <div className="table-background p-2">
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nome</th>
                    <th>Valor</th>
                    <th>Categoria</th>
                    <th colSpan={2}></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>R${brMoney(item.value)}</td>
                        <td>{item.category}</td>
                        <td>
                          <FaPencilAlt
                            onClick={() => {
                              handleEditItem(item._id);
                            }}
                            size={20}
                            style={{ cursor: "pointer" }}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cardapio;
