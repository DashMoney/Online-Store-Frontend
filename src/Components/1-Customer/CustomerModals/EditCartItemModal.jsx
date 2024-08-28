import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";

import handleDenomDisplay from "../../UnitDisplay";

class EditCartItemModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemQuantity: this.props.CartItems[this.props.SelectedCartItemIndex][1],
    };
  }

  handleCloseClick = () => {
    this.props.hideModal();
  };

  isAvail = (theItem, theVariant) => {
    let itemInTheCart = this.props.CartItems.find((item) => {
      return (
        item[0].itemId === theItem.itemId && item[0].variant === theVariant[0]
      );
    }); //This is a tuple

    if (itemInTheCart === undefined) {
      if (this.state.itemQuantity <= theVariant[1] || theVariant[1] === "") {
        return true;
      } else {
        return false;
      }
    }

    if (
      this.state.itemQuantity <= //+ itemInTheCart[1]
        theVariant[1] ||
      theVariant[1] === ""
    ) {
      return true;
    } else {
      return false;
    }
  };

  handleQuantityClick = (input) => {
    this.setState({
      itemQuantity: this.state.itemQuantity + input,
    });
  };

  handleSubmitClick = () => {
    if (this.state.itemQuantity > 0) {
      this.props.editCart([
        this.props.CartItems[this.props.SelectedCartItemIndex][0],
        this.state.itemQuantity,
      ]);
      this.props.hideModal();
    } else {
      this.props.editCart("remove from cart");
      this.props.hideModal();
    }
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

    let theItem = this.props.Inventory.find((item) => {
      return (
        item.itemId ===
        this.props.CartItems[this.props.SelectedCartItemIndex][0].itemId
        //   &&
        // item.variants ===
        //   this.props.CartItems[this.props.SelectedCartItemIndex][0].variant
      );
    }); //this gets active as well
    //console.log(`theItem: ${theItem}`);

    let theVariant = theItem.variants.find((vari) => {
      return (
        vari[0] ===
        this.props.CartItems[this.props.SelectedCartItemIndex][0].variant
      );
    });
    //console.log(`theVariant: ${theVariant}`);

    return (
      <>
        <Modal
          show={this.props.isModalShowing}
          backdropClassName={modalBackdrop}
          contentClassName={modalBkg}
        >
          <Modal.Header>
            <Modal.Title>
              <h3>
                <b>Edit Your Cart</b>
              </h3>
            </Modal.Title>
            {closeButtonColor}
          </Modal.Header>
          <Modal.Body>
            <div className="cardTitle">
              {/* <h5>
                {this.props.CartItems[this.props.SelectedCartItemIndex][0].name}
              </h5> */}
              <div>
                <h5>{theItem.name}</h5>
                <p>{theVariant[0]}</p>
              </div>
              <ButtonGroup aria-label="Basic example">
                {this.state.itemQuantity <= 0 ? (
                  <Button
                    className="ButtonFontBigger"
                    variant="primary"
                    disabled
                  >
                    <b> - </b>
                  </Button>
                ) : (
                  <Button
                    className="ButtonFontBigger"
                    variant="primary"
                    onClick={() => this.handleQuantityClick(-1)}
                  >
                    <b> - </b>
                  </Button>
                )}

                <Button variant="primary">
                  <b>{this.state.itemQuantity}</b>
                </Button>

                <Button
                  className="ButtonFontBigger"
                  variant="primary"
                  onClick={() => this.handleQuantityClick(1)}
                >
                  <b>+</b>
                </Button>
              </ButtonGroup>
            </div>
            <p></p>
            <p>
              {
                this.props.CartItems[this.props.SelectedCartItemIndex][0]
                  .description
              }
            </p>

            {this.state.itemQuantity > 0 ? (
              <h5 style={{ color: "#008de4", textAlign: "right" }}>
                <b>
                  {handleDenomDisplay(
                    this.props.whichNetwork,
                    theVariant[2],
                    this.state.itemQuantity
                  )}
                </b>
              </h5>
            ) : (
              <p></p>
            )}

            {this.state.itemQuantity > 0 ? (
              <>
                {this.isAvail(theItem, theVariant) ? (
                  <Button
                    variant="primary"
                    onClick={() => this.handleSubmitClick()}
                  >
                    <b>Edit Cart</b>
                  </Button>
                ) : (
                  <Button variant="primary" disabled>
                    <b>Edit Cart</b>
                  </Button>
                )}
              </>
            ) : (
              <Button
                onClick={() => this.handleSubmitClick()}
                variant="primary"
              >
                <b>Remove from Cart</b>
              </Button>
            )}
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default EditCartItemModal;
