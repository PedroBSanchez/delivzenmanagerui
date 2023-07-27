import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

import DoofLogo from "../../assets/doofLogo.png";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!isValidEmail() || !isValidPassword()) {
      return false;
    }

    const options = {
      method: "POST",
      url: `${import.meta.env.VITE_API_URL}/api/users/login`,
      data: {
        email: email,
        password: password,
      },
      headers: {
        "Content-Type": "application/json",
      },
    };

    setLoading(true);
    await axios
      .request(options)
      .then((response) => {
        setLoading(false);
        localStorage.setItem("tokenApi", response.data.token);
        localStorage.setItem("userEmail", response.data.user.email);
        localStorage.setItem("userCreatedAt", response.data.user.created_at);
        navigate("/pedidos");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        Swal.fire({
          title: error.response.data.error ?? "Error",
          icon: "error",
        });
      });
  };

  const isValidEmail = () => {
    if (!email) {
      Swal.fire({
        title: "Email inválido",
        icon: "error",
      });
      return false;
      return false;
    }
    return true;
  };

  const isValidPassword = () => {
    if (!password) {
      Swal.fire({
        title: "Senha inválida",
        icon: "error",
      });
      return false;
      return false;
    }
    return true;
  };

  return (
    <>
      <div className="container-fluid login-background">
        <div className="position-absolute top-50 start-50 translate-middle login-card p-4 col-md-4">
          <div className="row">
            <div className="col-4">
              <img src={DoofLogo} width={50} />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="form-control-input">
                <input required onChange={(e) => setEmail(e.target.value)} />
                <label>
                  <span style={{ transitionDelay: "0ms" }}>E</span>
                  <span style={{ transitionDelay: "50ms" }}>m</span>
                  <span style={{ transitionDelay: "100ms" }}>a</span>
                  <span style={{ transitionDelay: "150ms" }}>i</span>
                  <span style={{ transitionDelay: "200ms" }}>l</span>
                </label>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="form-control-input">
                <input
                  type="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label>
                  <span style={{ transitionDelay: "0ms" }}>S</span>
                  <span style={{ transitionDelay: "25ms" }}>e</span>
                  <span style={{ transitionDelay: "100ms" }}>n</span>
                  <span style={{ transitionDelay: "175ms" }}>h</span>
                  <span style={{ transitionDelay: "220ms" }}>a</span>
                </label>
              </div>
            </div>
          </div>

          <div className="row mt-4 justify-content-center">
            <div className="col">
              <button
                className="btn btn-secondary"
                style={{ width: "100%" }}
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
