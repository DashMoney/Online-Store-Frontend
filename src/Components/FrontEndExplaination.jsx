import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";
import Spinner from "react-bootstrap/Spinner";

class FrontEndExplaination extends React.Component {
  handleCloseClick = () => {
    this.props.hideModal();
  };

  render() {
    let modalBkg = "";
    let closeButtonColor;
    let modalBackdrop;

    if (this.props.mode === "primary") {
      modalBackdrop = "modal-backdrop-nochange";
      modalBkg = "modal-backcolor-primary";
      closeButtonColor = <CloseButton onClick={this.handleCloseClick} />;
    } else {
      modalBackdrop = "modal-backdrop-dark";
      modalBkg = "text-bg-dark";
      closeButtonColor = (
        <CloseButton onClick={this.handleCloseClick} variant="white" />
      );
    }
    return (
      <>
        <Modal show={this.props.isModalShowing} contentClassName={modalBkg}>
          <Modal.Header>
            <Modal.Title>
              <b>About Dash Frontends</b>
            </Modal.Title>
            {closeButtonColor}
          </Modal.Header>
          <Modal.Body>
            <h4 style={{ color: "#008de4" }}>
              What is this?
              {/*
              {import.meta.env.VITE_FRONTEND_NAME} */}
            </h4>
            <p>
              This website is a Dash Platform Frontend. Dash Platform is a layer
              2 Data Contract Engine (a queriable decentralized database) linked
              with Dash's layer 1 (Core) blockchain (1 duff = 1000 credits).
            </p>
            <p>
              This frontend operates in your browser and communicates only with
              Dash's service node network (Core and Platform).
            </p>

            <h4 style={{ color: "#008de4" }}>Can anyone use this frontend?</h4>
            <p>
              Yes, you can visit{" "}
              <b>
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://github.com/DashMoney/Online-Store-Frontend"
                >
                  https://github.com/DashMoney/Online-Store-Frontend
                </a>{" "}
              </b>
              and find the source code, just follow the <b>README</b> to run the
              frontend yourself.{" "}
            </p>

            {/* <h3>Why would anyone use this?</h3>
            <p></p> */}
          </Modal.Body>

          <Modal.Footer>
            <Button variant="primary" onClick={this.props.hideModal}>
              <b>Close</b>
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default FrontEndExplaination;
