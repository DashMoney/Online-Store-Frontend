import React from "react";

import Carousel from "react-bootstrap/Carousel";

import Alert from "react-bootstrap/Alert";

import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";

class DeleteItemModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadTime: 4, //set to 4 when successful dgm addr and call
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

  handleDeleteItemClick = () => {
    this.props.deleteItem();
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

    let carouselImgs = this.props.item.imgArray.map((img, index) => {
      return (
        <Carousel.Item index={index} key={index}>
          <Image
            src={img}
            fluid //rounded
          />
        </Carousel.Item>
      );
    });

    return (
      <Modal
        show={this.props.isModalShowing}
        backdropClassName={modalBackdrop}
        contentClassName={modalBkg}
      >
        <Modal.Header style={{ paddingBottom: ".2rem" }}>
          <Modal.Title>
            <h3>
              <b>Delete Item</b>
            </h3>
          </Modal.Title>
          {closeButtonColor}
        </Modal.Header>
        <Modal.Body>
          <div className="cardTitle">
            <h5>
              {" "}
              <b style={{ color: "#008de4" }}>{this.props.item.name}</b>
            </h5>
            {/* <span className="textsmaller">
                {this.formatDate(
                  this.props.rental.$updatedAt,
                  this.props.today,
                  this.props.yesterday
                )}
              </span> */}
          </div>
          <Carousel slide={false} interval={null}>
            {carouselImgs}
          </Carousel>
          <p></p>
          <p>{this.props.item.description}</p>
          <p></p>
          <Alert variant="danger">
            <Alert.Heading>Delete Item (Warning)</Alert.Heading>
            <p>
              Once an item is deleted, the prior orders will be unverifiable.
            </p>
            <p>
              If you only want to prevent others from ordering, set the item to{" "}
              <b>Inactive</b> by editing the item.
            </p>
          </Alert>
        </Modal.Body>
        <div className="TwoButtons">
          <Button variant="primary" onClick={() => this.handleCloseClick()}>
            <b>Cancel</b>
          </Button>
          {this.state.loadTime >= 1 ? (
            <Button variant="primary" disabled>
              <b>Delete Item ({this.state.loadTime})</b>
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={() => this.handleDeleteItemClick()}
            >
              <b>Delete Item</b>
            </Button>
          )}
        </div>
        <p></p>
      </Modal>
    );
  }
}

export default DeleteItemModal;
