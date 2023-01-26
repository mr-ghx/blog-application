import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Player, Controls } from "@lottiefiles/react-lottie-player";

import UserDataService from "../services/user.service";

function PopUp(props) {
  let [transactionInitiated, setTransactionInitiated] = useState({
    status: false,
    message: "",
  });

  let navigate = useNavigate();

  const updateSubscription = (id) => {
    UserDataService.updatePremium(id)
      .then((response) => {
        console.log(response.data);
        setTransactionInitiated({
          status: true,
          message: response.data.message,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Modal
      {...props}
      // size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {transactionInitiated.status ? (
        <>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Enjoy your premium subscription
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Player
              autoplay={true}
              loop={true}
              src="https://assets1.lottiefiles.com/packages/lf20_Vwcw5D.json"
              style={{ height: "300px", width: "300px" }}
            >
              <Controls visible={false} />
            </Player>
          </Modal.Body>
          <Modal.Footer>
            <p>{transactionInitiated.message}&nbsp;&nbsp;&nbsp;</p>
            <Button className="btn btn-success" onClick={props.onHide}>
              Okay
            </Button>
          </Modal.Footer>
        </>
      ) : (
        <>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Upgrade to premium user
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* <h4>Upgrade to premium user</h4> */}
            <p>
              You need to upgrade to a premium subscription to continue reading
              the blog.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <a
              style={{ cursor: "pointer", color: "grey" }}
              onClick={props.onHide}
            >
              <u>I'll do it later</u>
            </a>
            <p>&nbsp;&nbsp;&nbsp;</p>
            <Button
              className="btn btn-success"
              onClick={
                props.user
                  ? () => updateSubscription(props.user.id)
                  : () => props.onHide
              }
            >
              Buy now - ₹100
            </Button>
          </Modal.Footer>
        </>
      )}
    </Modal>
  );
}

export default PopUp;
