import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Modal from "react-bootstrap/Modal";
// import Spinner from "react-bootstrap/Spinner";
// import Badge from "react-bootstrap/Badge";
import CloseButton from "react-bootstrap/CloseButton";
import handleDenomDisplay from "../../UnitDisplay";

class AddItemToCartModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemQuantity: 1,
    };
  }

  handleCloseClick = () => {
    this.props.hideModal();
  };

  isAvail = (theItem, theVariant) => {
    // let cartObjects = this.state.CartItems.map((tuple) => {
    //   return tuple[0];
    // });

    let itemInTheCart = this.props.CartItems.find((item) => {
      return item[0].itemId === theItem.itemId;
    }); //This is a tuple

    if (itemInTheCart === undefined) {
      //means the item is not in the cart
      if (this.state.itemQuantity <= theVariant[1] || theVariant[1] === "") {
        return true;
      } else {
        return false;
      }
    }

    let variantInTheCart = this.props.CartItems.find((itemVar) => {
      return (
        itemVar[0].itemId === theItem.itemId &&
        itemVar[0].variant === theVariant[0]
      );
    }); //This is a tuple

    if (variantInTheCart === undefined) {
      //means the variant is not in the cart
      if (this.state.itemQuantity <= theVariant[1] || theVariant[1] === "") {
        return true;
      } else {
        return false;
      }
    }

    if (this.state.itemQuantity + variantInTheCart[1] <= theVariant[1]) {
      return true;
    } else {
      return false;
    }

    // let selectedObject = JSON.stringify(this.state.SelectedCartItem);

    // if (cartObjects.includes(selectedObject)) {
    //   //use find ->
    //   // findIndex ->
    //   let cartIndex = cartObjects.indexOf(selectedObject);

    //   // this.state.CartItems.forEach((tuple, index) => {
    //   //   if (tuple[0] === this.state.SelectedCartItem) {
    //   let newCartItems = this.state.CartItems;

    //   newCartItems.splice(cartIndex, 1, [
    //     this.state.SelectedCartItem,
    //     cartObjects[cartIndex][1] + theQuantity,
    //   ]);
    // let qtyTotal = Get QTY from cart and this.state.quantity ->

    //this.state.itemQuantity <= this.props.SelectedCartItem.qty
    //return true;
  };

  handleQuantityClick = (input) => {
    this.setState({
      itemQuantity: this.state.itemQuantity + input,
    });
  };

  handleSubmitClick = () => {
    if (this.state.itemQuantity > 0) {
      this.props.addToCart(Number(this.state.itemQuantity));
      this.props.hideModal();
    } else {
      console.log("Nothing Added to Cart");
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

    //{itemId: Name, variant: VarName}
    //itemId: this.props.item.itemId,
    //variant: variant[0],
    //

    // Inventory={this.state.Inventory}
    //CartItems={this.state.CartItems}
    //

    let theItem = this.props.Inventory.find((item) => {
      return item.itemId === this.props.SelectedCartItem.itemId;
      // && item.variants === this.props.CartItems[this.props.SelectedCartItemIndex][0].variant
    }); //this gets active as well

    let theVariant = theItem.variants.find((vari) => {
      return vari[0] === this.props.SelectedCartItem.variant;
    });

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
                <b>Add to Cart</b>
              </h3>
            </Modal.Title>
            {closeButtonColor}
          </Modal.Header>
          <Modal.Body>
            <div className="cardTitle">
              <div>
                <h5>{theItem.name}</h5>
                <p style={{ color: "#008de4" }}>
                  {this.props.SelectedCartItem.variant}
                </p>
              </div>
              <ButtonGroup aria-label="Basic example">
                {this.state.itemQuantity === 0 ? (
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
            {/* <p>{this.props.SelectedCartItem.description}</p> */}

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

            {this.state.itemQuantity > 0 &&
            this.isAvail(theItem, theVariant) ? (
              <Button
                variant="primary"
                onClick={() => this.handleSubmitClick()}
              >
                <b>Add to cart</b>
              </Button>
            ) : (
              <Button disabled variant="primary">
                <b>Add to cart</b>
              </Button>
            )}
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default AddItemToCartModal;
