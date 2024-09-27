import React from "react";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
//import Form from "react-bootstrap/Form";

import handleDenomDisplay from "../UnitDisplay";

class ShippingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //
      //Shipping Type
      shippingInput: "",
      validShipping: false,
      tooLongShippingError: false,

      //Shipping Details/Label
      labelInput: "",
      validLabel: false,
      tooLongLabelError: false,

      //'qty'
      // qtyInput: "",
      // validQty: true,
      // tooLongQtyError: false,

      //'price'
      priceInput: 0,
      validPrice: false,
      tooLongPriceError: false,
    };
  }

  onChange = (event) => {
    // console.log(event.target.value);

    //console.log(`id = ${event.target.id}`);

    if (event.target.id === "formLabel") {
      event.preventDefault();
      event.stopPropagation();
      this.labelValidate(event.target.value);
    }
    if (event.target.id === "formQty") {
      event.preventDefault();
      event.stopPropagation();
      this.qtyValidate(event.target.value);
    }
    if (event.target.id === "formPrice") {
      event.preventDefault();
      event.stopPropagation();
      this.priceValidate(event.target.value);
    }
  };

  labelValidate = (label) => {
    let regex = /^\S.{0,31}$/;
    let valid = regex.test(label);

    if (valid) {
      this.setState({
        labelInput: label,
        tooLongLabelError: false,
        validLabel: true,
      });
    } else {
      if (label.length > 32) {
        this.setState({
          labelInput: label,
          tooLongLabelError: true,
          validLabel: false,
        });
      } else {
        this.setState({
          labelInput: label,
          validLabel: false,
        });
      }
    }
  };

  qtyValidate = (num) => {
    let regex = /(^[0-9]{0,4}$)/;

    let valid = regex.test(num);

    if (valid) {
      this.setState({
        qtyInput: num,
        validQty: true,
        tooLongQtyError: false,
      });
    } else if (num.length >= 4) {
      this.setState({
        qtyInput: num,
        validQty: false,
        tooLongQtyError: true,
      });
    } else {
      this.setState({
        qtyInput: num,
        validQty: false,
        tooLongQtyError: false,
      });
    }
  };

  priceValidate = (price) => {
    //let regex = /(^[0-9]+[.,]{0,1}[0-9]*$)|(^[.,][0-9]+$)/;

    let regex = /(^[0-9]+[.,]{0,1}[0-9]{0,5}$)|(^[.,][0-9]{1,5}$)/;
    //CHANGED TO LIMIT TO minimum mDash possible

    let valid = regex.test(price);

    if (valid) {
      this.setState({
        priceInput: price,
        validPrice: true,
      });
    } else {
      this.setState({
        priceInput: price,
        validPrice: false,
      });
    }
  };

  submitAndResetForm = () => {
    // this.props.addFieldOfVariant({
    //   name: this.state.labelInput,
    //   qty: this.state.qtyInput,
    //   price: this.state.priceInput,
    // });
    this.props.addFieldOfVariant([
      this.state.labelInput,
      this.state.qtyInput,
      Number((this.state.priceInput * 100000000).toFixed(0)),
    ]);

    document.getElementById("formControlReset").reset();
    //   <Form
    //   id="formControlReset"
    //   noValidate
    //   //onubmit={this.submitAndResetForm}
    //   onChange={this.onChange}
    // >
    //https://stackoverflow.com/questions/43922508/clear-and-reset-form-input-fields

    this.setState({
      //
      labelInput: "",
      validLabel: false,
      //
      qtyInput: "",
      validQty: true,
      //
      priceInput: 0,
      validPrice: false,
    });
  };

  render() {
    // I THINK i WILL MAKE SOME CARDS
    // HOW DOES THE CUSTOMER SELECT? WHAT IT LOOK LIKE
    // use buttons like Nearby Dapp!! <-
    return (
      <>
        <div
          className="bodytext" //bodytextnotop
        >
          {needToSaveInventory && !this.props.isLoadingInventory ? (
            <>
              <div className="d-grid gap-2">
                <Button
                  // size="lg"
                  variant="success"
                  onClick={() => this.props.showModal("SaveInventoryModal")}
                >
                  <b style={{ fontSize: "larger" }}>Save Changes</b>
                </Button>
              </div>

              {/* <div
                className="BottomBorder"
                style={{ paddingTop: ".5rem" }}
              ></div> */}
              <p></p>
            </>
          ) : (
            <></>
          )}

          <h2>Shipping Options</h2>
          {this.props.isLoadingInventory ? (
            <>
              <p></p>
              <div id="spinner">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
              <p> </p>
            </>
          ) : (
            <>
              <Form
                id="formControlReset"
                noValidate
                //onSubmit={this.submitAndResetForm}
                onChange={this.onChange}
              >
                {/* LABEL FORM BELOW */}
                <Form.Group className="mb-3" controlId="formLabel">
                  <h5 style={{ marginTop: ".2rem", marginBottom: ".2rem" }}>
                    <b>Label Name</b>
                  </h5>
                  <Form.Control
                    // onChange={this.onChange}

                    type="text"
                    placeholder="Enter name of variant..."
                    required
                    isInvalid={this.state.tooLongLabelError}
                    isValid={this.state.validLabel}
                  />
                  <p></p>
                  <Form.Control.Feedback type="invalid">
                    Item name is too long.
                  </Form.Control.Feedback>
                </Form.Group>
                {/* Quantity FORM BELOW */}

                <Form.Group className="mb-3" controlId="formQty">
                  <h5 style={{ marginTop: ".5rem", marginBottom: ".2rem" }}>
                    Item Quantity
                  </h5>

                  {/* <InputGroup className="mb-3"> */}
                  <Form.Control
                    //onChange={this.onChange}
                    type="number"
                    step="1"
                    // precision="0"
                    // min="1"
                    // max="2000"
                    // defaultValue="15"
                    placeholder="Enter quantity.."
                    required
                    isInvalid={this.state.tooLongQtyError}
                    isValid={this.state.validQty}
                    aria-describedby="basic-addon2"
                  />
                  {/* <InputGroup.Text id="basic-addon2">days</InputGroup.Text> */}
                  {/* </InputGroup> */}
                  <p className="smallertext">
                    Leave <b>Item Quantity</b> blank if you don't want inventory
                    to track, or you have as much of something as anyone can
                    order.
                  </p>
                  <p></p>
                  <Form.Control.Feedback type="invalid">
                    Quantity is too much.
                  </Form.Control.Feedback>
                </Form.Group>

                {/*  PRICE FORM BELOW */}

                <Form.Group className="mb-3" controlId="formPrice">
                  <Form.Label>
                    <h4 style={{ marginTop: ".2rem", marginBottom: ".2rem" }}>
                      Price (in Dash)
                    </h4>
                  </Form.Label>

                  <Form.Control
                    //onChange={this.onChange}
                    type="text"
                    placeholder="0.85 for example.."
                    required
                    isValid={this.state.validPrice}
                    //isInvalid={!this.state.validAmt}
                  />
                  {/* <p className="smallertext">
                    (i.e. Must include 2 decimal precision)
                  </p>  */}
                </Form.Group>
              </Form>
            </>
          )}

          {!this.props.isLoginComplete ? (
            <>
              <p
                className="textsmaller"
                style={{ marginTop: ".5rem", textAlign: "center" }}
              >
                <b> *Sign in to place your order!*</b>{" "}
              </p>
            </>
          ) : (
            <></>
          )}
        </div>
      </>
    );
  }
}

export default ShippingPage;
