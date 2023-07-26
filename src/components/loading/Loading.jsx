import React, { useState } from "react";
import { Modal } from "react-bootstrap";

import "./Loading.css";

const Loading = ({ loading }) => {
  return (
    <Modal show={loading} centered backdrop="static" keyboard={false}>
      <Modal.Body>
        <div className="row text-center justify-content-center p-3">
          <div className="col-2">
            <div id="wifi-loader">
              <svg class="circle-outer" viewBox="0 0 86 86">
                <circle class="back" cx="43" cy="43" r="40"></circle>
                <circle class="front" cx="43" cy="43" r="40"></circle>
                <circle class="new" cx="43" cy="43" r="40"></circle>
              </svg>
              <svg class="circle-middle" viewBox="0 0 60 60">
                <circle class="back" cx="30" cy="30" r="27"></circle>
                <circle class="front" cx="30" cy="30" r="27"></circle>
              </svg>
              <svg class="circle-inner" viewBox="0 0 34 34">
                <circle class="back" cx="17" cy="17" r="14"></circle>
                <circle class="front" cx="17" cy="17" r="14"></circle>
              </svg>
              <div class="text" data-text="Carregando..."></div>
            </div>
          </div>
        </div>
        <div className="row text-center mt-1">
          <div className="col">
            <p></p>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Loading;
