import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { BsPlusSquareFill } from "react-icons/bs";
import { BiSolidTrash } from "react-icons/bi";
import "./CategoriesModal.css";
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "../loading/Loading";

const CategoriesModal = ({
  show,
  handleClose,
  handleOpen,
  categories,
  getCategories,
}) => {
  const [loading, setLoading] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = async () => {
    if (!newCategory) {
      return Swal.fire({
        title: "O campo nome é obrigatório",
        icon: "warning",
      });
    }

    const token = localStorage.getItem("tokenApi");
    const options = {
      method: "POST",
      url: `${import.meta.env.VITE_API_URL}/api/categories/create`,
      headers: {
        Authorization: `Bearer ${token}`,
        ContentType: "application/json",
      },
      data: {
        name: newCategory,
      },
    };

    setLoading(true);
    await axios
      .request(options)
      .then((response) => {
        setLoading(false);
        setNewCategory("");
        getCategories();
        Swal.fire({
          title: "Categoria criada com sucesso",
          icon: "success",
        });
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        if (error.response.status == 401) {
          Swal.fire({
            title: "Categoria já cadastrada",
            icon: "error",
          });
        } else {
          Swal.fire({
            title: "Erro ao criar categoria",
            icon: "error",
          });
        }
      });
  };
  const handleDeleteCategory = async (categoryId) => {
    const token = localStorage.getItem("tokenApi");

    const options = {
      method: "DELETE",
      url: `${
        import.meta.env.VITE_API_URL
      }/api/categories/delete/${categoryId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    setLoading(true);
    await axios
      .request(options)
      .then((response) => {
        setLoading(false);
        getCategories();
        Swal.fire({
          title: "Categoria deletada com sucesso",
          icon: "success",
        });
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        Swal.fire({
          title: "Erro ao deletar categoria",
          icon: "error",
        });
      });
  };

  return (
    <>
      <Loading loading={loading} />
      <Modal
        size="sm"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Categorias</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row mt-1 align-items-end">
            <div className="col-7">
              <label>
                Nome <span style={{ color: "red" }}>*</span>
              </label>
              <input
                className="form-control"
                id="newCategoryInput"
                value={newCategory}
                onChange={(e) => {
                  setNewCategory(e.target.value);
                }}
              />
            </div>
            <div className="col-1">
              <BsPlusSquareFill
                size={35}
                className="add-item-icon"
                onClick={handleAddCategory}
              />
            </div>
          </div>
          <hr />
          {categories.map((element, index) => {
            return (
              <div key={index} className="row justify-content-around">
                <div className="col-4">
                  <p>{element.name}</p>
                </div>
                <div className="col">
                  <BiSolidTrash
                    size={15}
                    className="trash-icon"
                    onClick={() => {
                      handleDeleteCategory(element._id);
                    }}
                  />
                </div>
              </div>
            );
          })}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CategoriesModal;
