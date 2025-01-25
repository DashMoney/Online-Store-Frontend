import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";

//import handleDenomDisplay from "../UnitDisplay";

class ShippingCreateModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameInput: "",
      validName: false,
      tooLongNameError: false,

      //'price'
      priceInput: 0,
      validPrice: false,
    };
  }
  handleCloseClick = () => {
    this.props.hideModal();
  };

  getRandomId = (theName) => {
    // CREATE RANDOM STRING  name+randomnumber 000-999
    let randomId =
      this.state.nameInput.toLowerCase() + Math.floor(Math.random() * 1000);

    if (this.checkIfDuplicate(randomId)) {
      this.getRandomId(theName);
    } else {
      return randomId;
    }
  };

  checkIfDuplicate = (theRandomId) => {
    let randomIdArray = this.props.ShippingOptions.map((shipOpt) => {
      return shipOpt.randomId;
    });
    return randomIdArray.includes(theRandomId);
  };

  onChange = (event) => {
    // console.log(event.target.value);

    //console.log(`id = ${event.target.id}`);
    if (event.target.id === "formName") {
      event.preventDefault();
      event.stopPropagation();
      this.nameValidate(event.target.value);
    }

    if (event.target.id === "formDescription") {
      event.preventDefault();
      event.stopPropagation();
      this.descriptionValidate(event.target.value);
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

    if (event.target.id === "formExtraInfo") {
      event.preventDefault();
      event.stopPropagation();
      this.extraInfoValidate(event.target.value);
    }
    if (event.target.id === "custom-switch") {
      event.stopPropagation();
      this.handleActive();
    }
  };

  //nameValidate
  nameValidate = (name) => {
    let regex = /^\S.{0,31}$/;
    let valid = regex.test(name);

    if (valid) {
      this.setState({
        nameInput: name,
        tooLongNameError: false,
        validName: true,
      });
    } else {
      if (name.length > 32) {
        this.setState({
          nameInput: name,
          tooLongNameError: true,
          validName: false,
        });
      } else {
        this.setState({
          nameInput: name,
          validName: false,
        });
      }
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

  handleSubmitClick = (event) => {
    event.preventDefault();
    //console.log(event.target.ControlTextarea1.value);

    let newShippingOption;

    let randomId = this.getRandomId(this.state.nameInput);

    newShippingOption = {
      // qtyInput: 1,
      // priceInput: 0,

      label: this.state.nameInput,
      shipId: randomId,
      price: Number((this.state.priceInput * 100000000).toFixed(0)),
    };

    console.log(newShippingOption);
    this.props.updateShippingOptions(newShippingOption);
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
          show={this.props.isModalShowing}
          backdropClassName={modalBackdrop}
          contentClassName={modalBkg}
        >
          <Modal.Header>
            <Modal.Title>
              <h3>
                <b>Create Shipping Option</b>
              </h3>
            </Modal.Title>
            {closeButtonColor}
          </Modal.Header>

          <Modal.Body>
            <>
              <Form
                noValidate
                onSubmit={this.handleSubmitClick}
                onChange={this.onChange}
              >
                {/* Name FORM BELOW */}
                <Form.Group className="mb-3" controlId="formName">
                  <h5 style={{ marginTop: ".2rem", marginBottom: ".2rem" }}>
                    <b>Shipping Option</b>
                  </h5>
                  <Form.Control
                    type="text"
                    placeholder="Enter Shipping Option"
                    required
                    isInvalid={this.state.tooLongNameError}
                    isValid={this.state.validName}
                  />
                  <p></p>
                  <Form.Control.Feedback type="invalid">
                    Shipping label is too long.
                  </Form.Control.Feedback>
                  <p className="smallertext">
                    (e.g. "Standard(4-7 days)", "Expedited(1-3 days)")
                  </p>
                </Form.Group>

                {/*  PRICE FORM BELOW */}

                <Form.Group className="mb-3" controlId="formPrice">
                  <Form.Label>
                    <h4 style={{ marginTop: ".2rem", marginBottom: ".2rem" }}>
                      Price (in Dash)
                    </h4>
                  </Form.Label>

                  <Form.Control
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

                <div className="ButtonRightNoUnderline">
                  <>
                    {this.state.validName && this.state.validPrice ? (
                      <Button variant="primary" type="submit">
                        <b>Create Shipping Option</b>
                      </Button>
                    ) : (
                      <Button variant="primary" disabled>
                        <b>Create Shipping Option</b>
                      </Button>
                    )}
                  </>
                </div>
              </Form>
            </>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default ShippingCreateModal;
