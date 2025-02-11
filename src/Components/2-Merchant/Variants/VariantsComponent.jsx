import React from "react";
//import Badge from "react-bootstrap/Badge";
import Form from "react-bootstrap/Form";

import VariantTable from "./VariantTable";

import Button from "react-bootstrap/Button";

class VariantsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //
      //Variant - Large, Medium, Small   OR Years OR Colors
      labelInput: "",
      validLabel: false,
      tooLongLabelError: false,

      //'qty'
      qtyInput: "",
      validQty: true,
      tooLongQtyError: false,

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
    //if(this.props.)
    let item = { variants: this.props.variantsArray };
    // let VariantArray = this.props.variantStateArray.map((imgObj, index) => {
    //   return (
    //     <div className="cardTitle"></div>

    //   );
    // });

    return (
      <>
        {/* <Form style={{ marginBottom: "1rem" }}>
          <div className="cardTitle">
            
            <Button
              variant="primary"
              //type="submit"
              style={{
                paddingLeft: "2rem",
                paddingRight: "2rem",
                marginLeft: "1rem",
              }}
              noValidate
              onClick={() => this.()}
            >
              Add
            </Button>
          </div>
        </Form> */}

        {/* <h4 style={{ textDecoration: "underline" }}>Add Variants</h4> */}

        {this.props.variantsArray.length > 0 ? (
          <></>
        ) : (
          <>
            <p>
              Use variants to include different variations of the same
              product.(e.g. Shirt sizes - Large, Medium, and Small)
            </p>
          </>
        )}

        <VariantTable
          whichNetwork={this.props.whichNetwork}
          item={item}
          mode={this.props.mode}
        />

        {this.props.variantsArray.length > 0 ? (
          <>
            <Button
              onClick={() => this.props.removeFieldOfVariant()}
              style={{
                //marginTop: "0.5rem",
                marginBottom: "1rem",
              }}
            >
              Remove
            </Button>
          </>
        ) : (
          <></>
        )}

        {/* <div
          className="BottomBorder"
          style={{ paddingTop: ".2rem", marginBottom: ".3rem" }}
        ></div> */}
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
              Leave <b>Item Quantity</b> blank if you don't want inventory to
              track, or you have as much of something as anyone can order.
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

        {this.props.variantsArray.length > 7 ? (
          <>
            <p className="textsmaller">(Limit of 8 variant per item)</p>
          </>
        ) : (
          <></>
        )}

        {this.state.validLabel &&
        this.state.validPrice &&
        this.state.validQty &&
        this.props.variantsArray.length <= 7 ? (
          <>
            <div className="d-grid gap-2" style={{ marginTop: "1rem" }}>
              <Button
                variant="primary"
                onClick={() => this.submitAndResetForm()}
              >
                <b>Add Variant</b>
              </Button>
            </div>
            <p></p>
          </>
        ) : (
          <>
            <div className="d-grid gap-2" style={{ marginTop: "1rem" }}>
              <Button
                variant="primary" //type="submit"
                disabled
              >
                <b>Add Variant</b>
              </Button>
            </div>
            <p></p>
          </>
        )}
      </>
    );
  }
}

export default VariantsComponent;
