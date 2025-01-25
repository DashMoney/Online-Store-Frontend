import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";

//import "./ConfirmPaymentModal.css";

class AboutUsConfirmModal extends React.Component {
  handleCloseClick = () => {
    this.props.hideModal();
  };

  handleSubmitClick = (event) => {
    event.preventDefault();

    this.props.saveAboutUs();
    this.handleCloseClick();
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
        <Modal
          contentClassName={modalBkg}
          backdropClassName={modalBackdrop}
          show={this.props.isModalShowing}
        >
          <Modal.Header>
            <Modal.Title>Confirm "About Us"</Modal.Title>
            {closeButtonColor}
          </Modal.Header>
          <Modal.Body>
            <div
              style={{
                // textAlign: "center",
                marginTop: ".5rem",
                marginBottom: "1.5rem",
              }}
            >
              <p>
                Supported Regions:{" "}
                <b>{this.props.AboutUsToSave.supportedRegions}</b>
              </p>
              <p style={{ whiteSpace: "pre-wrap" }}>
                {this.props.AboutUsToSave.description}
              </p>
              {/* <h5
              //style={{ color: "green" }}
              //onClick={() => this.handleNameClick()}
              >
                Request{" "}
                <b style={{ color: "#008de4" }}>
                  {handleDenomDisplay(
                    this.props.whichNetwork,
                    this.props.amountToSend
                  )}
                </b>{" "}
                from{" "}
                <b style={{ color: "#008de4" }}>
                  {this.props.requestPmtNameDoc.label}
                </b>
              </h5> */}
            </div>

            {/* <h6>
              <b>Message:</b>
              {this.props.messageToSend !== "" ? (
                <span>{this.props.messageToSend}</span>
              ) : (
                <span>(No Message)</span>
              )}
            </h6> */}
            <p></p>
          </Modal.Body>
          <Modal.Footer>
            <>
              <Button variant="primary" onClick={this.handleSubmitClick}>
                <b>Save "About Us"</b>
              </Button>
            </>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default AboutUsConfirmModal;
