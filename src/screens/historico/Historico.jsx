import React, { useEffect, useState } from "react";
import Pagination from "react-bootstrap/Pagination";
import { useNavigate } from "react-router-dom";
import "./Historico.css";

import moment from "moment";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { PiMagnifyingGlassFill } from "react-icons/pi";
import axios from "axios";
import Loading from "../../components/loading/Loading";
import { FaPager } from "react-icons/fa";
import { brMoney } from "../../shared/BrMoney";

const Historico = () => {
  const navigate = useNavigate();
  const dateNow = new Date();
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(
    new Date(dateNow.setDate(new Date().getDate() - 7))
  );
  const [endDate, setEndDate] = useState(new Date());
  const [tmpState, setTmpState] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [totalOrders, setTotalOrders] = useState(0);
  const [orders, setOrders] = useState([]);

  const formattedDate = (date) => {
    return moment(date).format("DD/MM/YYYY");
  };

  const getOrders = async (page = 1) => {
    const token = localStorage.getItem("tokenApi");

    const options = {
      method: "POST",
      url: `${
        import.meta.env.VITE_API_URL
      }/api/orders/getordersbydate?page=${page}`,
      headers: {
        ContentType: "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        start: new Date(startDate),
        end: new Date(endDate),
      },
    };

    setLoading(true);
    await axios
      .request(options)
      .then((response) => {
        setLoading(false);
        console.log(response);
        setOrders(response.data.orders);
        setTotalPages(response.data.totalPages);
        setTotalOrders(response.data.totalOrders);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        Swal.fire({ title: "Erro ao carregar histórico", icon: "error" });
      });
  };

  useEffect(() => {
    getOrders();
  }, []);

  const differenceBetweenDatesInDays = (start, end) => {
    const differenceInMIliseconds = end - start;
    const dayInMiliseconds = 24 * 60 * 60 * 1000;
    const diferrenceInDays = Math.round(
      differenceInMIliseconds / dayInMiliseconds
    );

    return diferrenceInDays;
  };

  const validateStartDate = (date) => {
    if (date > endDate) {
      return Swal.fire({
        text: "Data de início deve ser menor que fim",
        icon: "warning",
      });
    }

    const diferrenceInDays = differenceBetweenDatesInDays(date, endDate);

    if (diferrenceInDays > 31) {
      return Swal.fire({
        text: "Diferença entre datas deve ser no máximo 31 dias",
        icon: "warning",
      });
    }

    setStartDate(date);
    setTmpState(!tmpState);
  };

  const validateEndDate = (date) => {
    if (date < startDate) {
      return Swal.fire({
        text: "Data de fim deve ser maior que início",
        icon: "warning",
      });
    }

    const diferrenceInDays = differenceBetweenDatesInDays(startDate, date);

    if (diferrenceInDays > 31) {
      return Swal.fire({
        text: "Diferença entre datas deve ser no máximo 31 dias",
        icon: "warning",
      });
    }

    setEndDate(date);
    setTmpState(!tmpState);
  };

  const handleDetailOrderClick = (orderId) => {
    navigate("/pedidodetalhado/" + orderId);
  };

  return (
    <>
      <Loading loading={loading} />
      <div className="container-fluid">
        <h1>Histórico</h1>
        <div className="row mt-5 align-items-end">
          <div className="col-md-4 p-4">
            <label>Início</label>
            <ReactDatePicker
              className="form-control"
              selected={startDate}
              onChange={(e) => {
                validateStartDate(e);
              }}
              dateFormat={"dd/MM/yyyy"}
              showYearDropdown
              scrollableYearDropdown
              showMonthDropdown
              scrollableMonthYearDropdown
            />
          </div>
          <div className="col-md-4 p-4">
            <label>Fim</label>
            <ReactDatePicker
              className="form-control"
              selected={endDate}
              onChange={(e) => {
                validateEndDate(e);
              }}
              dateFormat={"dd/MM/yyyy"}
              showYearDropdown
              scrollableYearDropdown
              showMonthDropdown
              scrollableMonthYearDropdown
              popperPlacement="right"
            />
          </div>
          <div className="col-2 p-4">
            <button className="btn btn-sm btn-secondary" onClick={getOrders}>
              Buscar
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-10">
            <hr />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col">
            <h5>Total: </h5>
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-md-10">
            <div className="table-background table-responsive p-2">
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Cliente</th>
                    <th>Valor</th>
                    <th>Data</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => {
                    return (
                      <tr key={index}>
                        <td>{order.code}</td>
                        <td>{order.client}</td>
                        <td>R${brMoney(order.totalValue)}</td>
                        <td>
                          {moment(new Date(order.created_at)).format(
                            "DD/MM/yyyy H:m"
                          )}
                        </td>
                        <td>
                          <PiMagnifyingGlassFill
                            size={20}
                            className="search-icon"
                            onClick={() => {
                              handleDetailOrderClick(order._id);
                            }}
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
        <div className="row mt-5 text-center justify-content-center">
          <div className="col-4">
            <Pagination>
              <Pagination.Prev
                disabled={currentPage === 1}
                onClick={() => {
                  setCurrentPage(currentPage - 1);
                  getOrders(index - 1);
                }}
              />
              {Array.from({ length: totalPages }, (_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === currentPage}
                  onClick={() => {
                    setCurrentPage(index + 1);
                    getOrders(index + 1);
                  }}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                disabled={currentPage === totalPages}
                onClick={() => {
                  setCurrentPage(currentPage + 1);
                  getOrders(index + 1);
                }}
              />
            </Pagination>
          </div>
        </div>
      </div>
    </>
  );
};

export default Historico;
