import React, { Children, useEffect, useState } from "react";

import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";

import "./Sidebar.css";
import restaurantLogo from "../../assets/restaurantLogo.png";
import menuIcon from "../../assets/icons/menu.png";
import orderIcon from "../../assets/icons/order.png";
import orderHistoryIcon from "../../assets/icons/orderHistory.png";
const breakpoints = {
  small: "(max-width: 599px)",
  medium: "(min-width: 600px) and (max-width: 1199px)",
  large: "(min-width: 1200px)",
};

import { verifyToken } from "../../shared/VerifyToken";

const Sidebar = ({ children }) => {
  const isSmallScreen = useMediaQuery({ query: breakpoints.small });
  const navigate = useNavigate();
  const [show, setShow] = useState(!isSmallScreen);

  const handleNavigate = (url) => {
    if (isSmallScreen) {
      handleClose();
    }
    navigate(url);
  };

  const [linkPages, setLinkPages] = useState([
    { route: "/pedidos", icon: orderIcon, name: "Pedidos" },
    { route: "/cardapio", icon: menuIcon, name: "Cardápio" },
    { route: "/historico", icon: orderHistoryIcon, name: "Histórico" },
  ]);

  useEffect(() => {
    verifyToken().then((userLogged) => {
      if (!userLogged) {
        navigate("/");
      }
    });
  }, []);

  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);
  return (
    <>
      <div className="row">
        <div className="col-md-3 col-lg-4">
          <FaBars className="m-3" onClick={toggleShow} />
          <Offcanvas
            show={show}
            onHide={handleClose}
            scroll={false}
            backdrop={false}
          >
            <Offcanvas.Header
              closeButton={isSmallScreen}
              closeVariant="white"
              className="sidebar-background justify-content-center"
            ></Offcanvas.Header>
            <Offcanvas.Body className="sidebar-background">
              <div className="row justify-content-center text-center sidebar-background">
                <div className="col sidebar-background">
                  <img
                    src={restaurantLogo}
                    width={120}
                    className="sidebar-background"
                  />
                </div>
              </div>
              <div className="row text-center mb-5 sidebar-background">
                <Offcanvas.Title
                  style={{ color: "white" }}
                  className="mt-2 sidebar-background"
                >
                  {import.meta.env.VITE_RESTAURANT_NAME}
                </Offcanvas.Title>
              </div>
              <hr style={{ color: "white" }} className="sidebar-background" />
              {linkPages.map((link, index) => {
                return (
                  <div
                    className="row text-start justify-content-center mt-3 sidebar-background"
                    key={index}
                  >
                    <div className="col-1 sidebar-background">
                      <img
                        src={link.icon}
                        width={27}
                        className="sidebar-background"
                      />
                    </div>
                    <div className="col-3 pt-2 sidebar-background">
                      <h5
                        className="sidebar-background"
                        style={{ color: "white", cursor: "pointer" }}
                        onClick={() => {
                          handleNavigate(link.route);
                        }}
                      >
                        {link.name}
                      </h5>
                    </div>
                  </div>
                );
              })}
            </Offcanvas.Body>
          </Offcanvas>
        </div>
        <div className="col">
          <main>{children}</main>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
