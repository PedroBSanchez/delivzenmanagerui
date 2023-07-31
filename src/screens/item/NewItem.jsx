import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Dropdown from "react-bootstrap/Dropdown";
import "./NewItem.css";
import Loading from "../../components/loading/Loading";

import Swal from "sweetalert2";
import { BsPlusSquareFill } from "react-icons/bs";
import { BiSolidTrash } from "react-icons/bi";
import CurrencyInput from "react-currency-input-field";
import CategoriesModal from "../../components/categoriesModal/CategoriesModal";
import { brMoney } from "../../shared/BrMoney";

const NewItem = () => {
  const navigate = useNavigate();
  const currencyInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [modalCategories, setModalCategories] = useState(false);
  const handleCloseModalCategories = () => setModalCategories(false);
  const handleShowModalCategories = () => setModalCategories(true);

  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [tmpState, setTmpState] = useState(false);

  const [name, setName] = useState("");
  const [value, setValue] = useState();
  const [description, setDescription] = useState("");
  const [additionals, setAdditionals] = useState([]);
  const [newAdditionalName, setNewAdditionalName] = useState("");
  const [newAdditionalValue, setNewAddittionalValue] = useState();

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
        if (response.data.length > 0) {
          setCategory(response.data[0].name);
        }
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          title: "Erro ao carregar categorias",
          icon: "error",
        });
      });
  };

  const handleDropdownSelect = (eventKey) => {
    setCategory(eventKey);
  };

  const handleAddNewAdditional = () => {
    if (!newAdditionalName || !newAdditionalValue) {
      return Swal.fire({
        title: "Nome e valor do adicional são obrigatórios",
        icon: "warning",
      });
    }
    let newAdditionals = additionals;

    newAdditionals.push({ name: newAdditionalName, value: newAdditionalValue });

    setAdditionals(newAdditionals);
    setNewAdditionalName("");
  };

  const handleRemoveNewAdditional = (index) => {
    let newAdditionals = additionals;
    newAdditionals.splice(index, 1);
    setAdditionals(newAdditionals);
    setTmpState(!tmpState);
  };

  const handleNewItem = async () => {
    if (isValidItem()) {
      const token = localStorage.getItem("tokenApi");

      const dataParams = {
        name: name,
        value: value,
        description: description,
        additional: additionals,
        category: category,
      };
      console.log(dataParams);

      const options = {
        method: "POST",
        url: `${import.meta.env.VITE_API_URL}/api/items/create`,
        headers: {
          ContentType: "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: dataParams,
      };

      setLoading(true);
      await axios
        .request(options)
        .then((response) => {
          setLoading(false);
          Swal.fire({
            title: "Item criado com sucesso",
            icon: "success",
          });
          setTimeout(function () {
            navigate("/cardapio");
          }, 1000);
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
          Swal.fire({
            title: "Erro ao cadastrar novo item",
            icon: "error",
          });
          setTimeout(function () {
            navigate("/cardapio");
          }, 1000);
        });
    }
  };

  const isValidItem = () => {
    let valid = true;
    if (!name) {
      valid = false;
      Swal.fire({
        title: "Campo nome obrigatório",
        icon: "error",
      });
      return valid;
    }
    if (!value) {
      valid = false;
      Swal.fire({
        title: "Campo valor obrigatório",
        icon: "error",
      });
      return valid;
    }

    return valid;
  };

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <>
      <Loading loading={loading} />
      <CategoriesModal
        show={modalCategories}
        handleShow={handleShowModalCategories}
        handleClose={handleCloseModalCategories}
        categories={categories}
        getCategories={getCategories}
      />
      <div className="contaienr-fluid">
        <h1>Novo Item</h1>
        <div className="row">
          <div className="col-md-7">
            <hr />
          </div>
        </div>
        <div className="row mt-5 align-items-end">
          <div className="col-md-2 col-sm-2 mt-1">
            <label>Categoria</label>
            <Dropdown onSelect={handleDropdownSelect} drop={"up"}>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                {category}
              </Dropdown.Toggle>

              <Dropdown.Menu>
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
          <div className="col-1 mt-1">
            <BsPlusSquareFill
              size={35}
              className="add-item-icon"
              onClick={handleShowModalCategories}
            />
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-5 col-sm-6 mt-2">
            <label>
              Nome <span style={{ color: "red" }}>*</span>
            </label>
            <input
              id="nameInput"
              className="form-control"
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
            />
          </div>
          <div className="col-md-2 col-sm-3 mt-2">
            <label>
              Valor<span style={{ color: "red" }}>*</span>
            </label>
            <CurrencyInput
              ref={currencyInputRef}
              id="valueInput"
              className="form-control"
              prefix="R$"
              decimalSeparator=","
              groupSeparator="."
              decimalsLimit={2}
              maxLength={7}
              allowNegativeValue={false}
              allowDecimals={true}
              onValueChange={(e) => {
                let valueFormated = e.replace(",", ".");
                setValue(parseFloat(valueFormated));
              }}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-7 col-sm">
            <label>Descrição</label>
            <textarea
              id="descriptionInput"
              className="form-control"
              rows={4}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="row mt-4">
          <div className="col">
            <h4>Adicionais</h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-7 col-sm">
            <hr />
          </div>
        </div>
        <div className="row align-items-end">
          <div className="col-md-4 mt-2">
            <label>
              Nome <span style={{ color: "red" }}>*</span>
            </label>
            <input
              id="additionalNameInput"
              className="form-control"
              onChange={(e) => {
                setNewAdditionalName(e.target.value);
              }}
              value={newAdditionalName}
            />
          </div>
          <div className="col-md-2 mt-2">
            <label>
              Valor <span style={{ color: "red" }}>*</span>
            </label>
            <CurrencyInput
              ref={currencyInputRef}
              id="additionalValueInput"
              className="form-control"
              prefix="R$"
              decimalSeparator=","
              groupSeparator="."
              decimalsLimit={2}
              maxLength={7}
              allowNegativeValue={false}
              allowDecimals={true}
              onValueChange={(e) => {
                let valueFormated = e.replace(",", ".");
                setNewAddittionalValue(parseFloat(valueFormated));
              }}
            />
          </div>
          <div className="col-md-1 mt-2">
            <button
              className="btn btn-primary btn-sm"
              onClick={handleAddNewAdditional}
            >
              Incluir
            </button>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-4">
            <div className="additionals-card p-2">
              {additionals.map((element, index) => {
                return (
                  <div className="row" key={index}>
                    <div className="col-5">
                      <p>
                        {element.name} - R${brMoney(element.value)}
                      </p>
                    </div>
                    <div className="col">
                      <BiSolidTrash
                        size={15}
                        className="trash-icon"
                        onClick={() => {
                          handleRemoveNewAdditional(index);
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-7 col-sm">
            <hr />
          </div>
        </div>
        <div className="row text-end jusity-content-end">
          <div className="col-md-7">
            <button className="button-salvar" onClick={handleNewItem}>
              Salvar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewItem;
