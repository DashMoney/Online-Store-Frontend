import React from "react";

import Alert from "react-bootstrap/Alert";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";

class SaveShippingModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadTime: 3, //set to 4 when successful dgm addr and call
    };
  }
  handleCloseClick = () => {
    this.props.hideModal();
  };

  decrementTimer = () => {
    this.setState({
      loadTime: this.state.loadTime - 1,
    });
    if (this.state.loadTime >= 1) {
      const myTimeout = setTimeout(this.decrementTimer, 1000);
    }
  };

  componentDidMount = () => {
    this.decrementTimer();
  };

  submitClick = () => {
    this.props.saveShipping();
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
      <Modal
        show={this.props.isModalShowing}
        backdropClassName={modalBackdrop}
        contentClassName={modalBkg}
      >
        <Modal.Header style={{ paddingBottom: ".2rem" }}>
          <Modal.Title>
            <h3>
              <b>Save Shipping Options</b>
            </h3>
          </Modal.Title>
          {closeButtonColor}
        </Modal.Header>
        <Modal.Body>
          <Alert variant="success">
            <Alert.Heading>Saving to Platform</Alert.Heading>
            <p>
              Saving the shipping options to Platform will set what everyone
              sees when they checkout.
            </p>
            <p>
              Saving to Platform costs credits, so making as many changes at one
              time will lower the cost.
            </p>
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          {this.state.loadTime >= 1 ? (
            <Button variant="primary" disabled>
              <b>Save Shipping ({this.state.loadTime})</b>
            </Button>
          ) : (
            <Button variant="primary" onClick={() => this.submitClick()}>
              <b>Save Shipping</b>
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    );
  }
}

export default SaveShippingModal;
