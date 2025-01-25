import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import InputGroup from "react-bootstrap/InputGroup";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";

import ImgsComponent from "../ImgsComponent";

import SelectSingleOrVariant from "../Variants/SelectSingleOrVariant";
import VariantsComponent from "../Variants/VariantsComponent";

import { IoMdArrowRoundBack } from "react-icons/io";

//import handleDenomDisplay from "../UnitDisplay";

class CreateItemPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // name: "Cool T-Shirt", //Title - String
      // description: "blah blah blah description stuff", // - String
      // //SKU: "??", // VARIANT NAME/TYPE/SKU ///SO PUT IN THE VARIANTS!! ***
      // //randomId:???
      // variants: [["", 10, 120000000]], // "",

      // imgArray: ["https://i.imgur.com/znIcOgA.jpeg"],

      // active: true,

      nameInput: "",
      validName: false,
      tooLongNameError: false,

      descriptionInput: "",
      validDescription: false,
      tooLongDescriptionError: false,

      imgStateArray: [],
      //linkStateArray: [],
      variantsArray: [],
      whichVariantForm: "Single", //

      //'qty'
      qtyInput: "",
      validQty: true,
      tooLongQtyError: false,

      //'price'
      priceInput: 0,
      validPrice: false,

      //   'extraInfo',
      extraInfoInput: "",
      validExtraInfo: true,
      tooLongExtraInfoError: false,

      //'active'
      active: true,
    };
  }

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
    let randomIdArray = this.props.Inventory.map((item) => {
      return item.randomId;
    });
    return randomIdArray.includes(theRandomId);
  };

  triggerVariantsButton = () => {
    this.setState({
      whichVariantForm: "Multiple",
      variantsArray: [],
    });
  };

  triggerSingleButton = () => {
    this.setState({
      whichVariantForm: "Single",
      variantsArray: [],
      priceInput: 0,
      validPrice: false,
    });
  };
  //imgStateArray
  addFieldOfImg = (stringURL) => {
    this.setState(
      {
        imgStateArray: [...this.state.imgStateArray, stringURL],
      },
      () => console.log(this.state.imgStateArray)
    );
  };

  removeFieldOfImg = () => {
    let removedFieldArray = this.state.imgStateArray;
    removedFieldArray.pop();
    this.setState({
      imgStateArray: removedFieldArray,
    });
  };

  //variantsArray
  addFieldOfVariant = (variantObj) => {
    this.setState(
      {
        variantsArray: [...this.state.variantsArray, variantObj],
      },
      () => console.log(this.state.variantsArray)
    );
  };

  removeFieldOfVariant = () => {
    let removedFieldArray = this.state.variantsArray;
    removedFieldArray.pop();
    this.setState({
      variantsArray: removedFieldArray,
    });
  };

  handleActive = () => {
    if (this.state.active) {
      this.setState({
        active: false,
      });
    } else {
      this.setState({
        active: true,
      });
    }
  };

  onChange = (event) => {
    //console.log(event.target.value);

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

  //descriptionValidate
  descriptionValidate = (description) => {
    // let regex = /^.[\S\s]{0,350}$/;

    // let valid = regex.test(description);

    let regex1 = /^.[\S\s]{0,349}$/;

    let valid1 = regex1.test(description);

    let regex2 = /^(?:[^\r\n]*(?:\r\n?|\n)){0,4}[^\r\n]*$/;

    let valid2 = regex2.test(description);

    let valid = false;

    if (valid1 && valid2) {
      valid = true;
    }

    if (valid) {
      this.setState({
        descriptionInput: description,
        validDescription: true,
        tooLongDescriptionError: false,
      });
    } else {
      if (description.length > 350 || !valid2) {
        this.setState({
          descriptionInput: description,
          validDescription: false,
          tooLongDescriptionError: true,
        });
      } else {
        this.setState({
          descriptionInput: description,
          validDescription: false,
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
    } else if (num.length >= 5) {
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

  extraInfoValidate = (extraInfo) => {
    // let regex = /^.[\S\s]{0,350}$/;

    // let valid = regex.test(extraInfo);

    let regex1 = /^.[\S\s]{0,349}$/;

    let valid1 = regex1.test(extraInfo);

    let regex2 = /^(?:[^\r\n]*(?:\r\n?|\n)){0,4}[^\r\n]*$/;

    let valid2 = regex2.test(extraInfo);

    let valid = false;

    if (valid1 && valid2) {
      valid = true;
    }

    if (valid) {
      this.setState({
        extraInfoInput: extraInfo,
        validExtraInfo: true,
        tooLongExtraInfoError: false,
      });
    } else {
      if (extraInfo.length > 350 || !valid2) {
        this.setState({
          extraInfoInput: extraInfo,
          validExtraInfo: false,
          tooLongExtraInfoError: true,
        });
      } else {
        this.setState({
          extraInfoInput: extraInfo,
          validExtraInfo: false,
        });
      }
    }
  };

  handleSubmitClick = (event) => {
    event.preventDefault();
    //console.log(event.target.ControlTextarea1.value);

    let newItem;

    let randomId = this.getRandomId(this.state.nameInput);

    // variantsArray: [],
    //  whichVariantForm: "Single",

    if (this.state.whichVariantForm === "Single") {
      newItem = {
        // qtyInput: 1,
        // priceInput: 0,

        name: this.state.nameInput,
        itemId: randomId,
        description: this.state.descriptionInput,

        imgArray: JSON.stringify(this.state.imgStateArray),
        linkArray: "",
        variants: JSON.stringify([
          [
            "",
            this.state.qtyInput,
            Number((this.state.priceInput * 100000000).toFixed(0)),
          ],
        ]),

        extraInfo: this.state.extraInfoInput,
        active: this.state.active,
      };
    } else {
      newItem = {
        name: this.state.nameInput,
        itemId: randomId,
        description: this.state.descriptionInput,

        imgArray: JSON.stringify(this.state.imgStateArray),
        linkArray: "",
        variants: JSON.stringify(this.state.variantsArray),
        // CartItemsForDocCreation = JSON.stringify(CartItemsForDocCreation);
        // returnedDoc.cart = JSON.parse(returnedDoc.cart);

        extraInfo: this.state.extraInfoInput,
        active: this.state.active,
      };
    }

    console.log(newItem);
    this.props.createItem(newItem);
    this.props.handleSelectedPage("Inventory");
  };

  render() {
    let validVariants = false;
    let uniqueVariants = true;
    if (this.state.whichVariantForm === "Single") {
      if (this.state.validQty && this.state.validPrice) {
        validVariants = true;
      }
    } else {
      if (this.state.variantsArray.length > 0) {
        // pull out lowercase of label
        let uniqueLabels = this.state.variantsArray.map((ant) =>
          ant[0].toLowerCase()
        );
        let setOfUniqueLabels = [...new Set(uniqueLabels)];
        if (uniqueLabels.length === setOfUniqueLabels.length) {
          validVariants = true;
          uniqueVariants = true;
        } else {
          uniqueVariants = false;
        }
      }
    }
    //whichVariantForm: "Single",//"Multiple"

    return (
      <>
        <Navbar bg={this.props.mode} variant={this.props.mode} fixed="top">
          <Container>
            {" "}
            <Button
              variant="primary"
              onClick={() => this.props.handleSelectedPage("Inventory")}
            >
              <IoMdArrowRoundBack size={28} />
            </Button>{" "}
            <h3 style={{ textAlign: "center" }}>
              {this.props.mode === "primary" ? (
                <b className="lightMode">Create Item</b>
              ) : (
                <b>Create Item</b>
              )}
            </h3>
            <div style={{ marginRight: "4rem" }}></div>
          </Container>
        </Navbar>
        <div className="bodytext">
          <>
            <Form
              noValidate
              onSubmit={this.handleSubmitClick}
              onChange={this.onChange}
            >
              {/* Name FORM BELOW */}
              <Form.Group className="mb-3" controlId="formName">
                <h5 style={{ marginTop: ".2rem", marginBottom: ".2rem" }}>
                  <b>Item Name</b>
                </h5>
                <Form.Control
                  type="text"
                  placeholder="Enter name of item..."
                  required
                  isInvalid={this.state.tooLongNameError}
                  isValid={this.state.validName}
                />
                <p></p>
                <Form.Control.Feedback type="invalid">
                  Item name is too long.
                </Form.Control.Feedback>
              </Form.Group>
            </Form>
            <div className="bodytext">
              <ImgsComponent
                imgStateArray={this.state.imgStateArray}
                addFieldOfImg={this.addFieldOfImg}
                removeFieldOfImg={this.removeFieldOfImg}
                mode={this.props.mode}
              />
            </div>
            <Form
              noValidate
              onSubmit={this.handleSubmitClick}
              onChange={this.onChange}
            >
              {/* DESCRIPTION FORM BELOW */}

              <Form.Group className="mb-3" controlId="formDescription">
                <Form.Label>
                  <h5 style={{ marginTop: ".5rem", marginBottom: ".2rem" }}>
                    Description
                  </h5>
                </Form.Label>

                <Form.Control
                  // onChange={this.onChange}
                  as="textarea"
                  rows={2}
                  placeholder="Put description here.."
                  required
                  isInvalid={this.state.tooLongDescriptionError}
                  isValid={this.state.validDescription}
                />
                {/* <p className="smallertext">
                  (e.g. Number of Bedrooms and Bathrooms, Max Number of
                  Occupents, Description of Item Location)
                </p> */}
                <p></p>

                <Form.Control.Feedback className="floatLeft" type="invalid">
                  Sorry, this is too long! Please use less than 500 characters.
                </Form.Control.Feedback>
              </Form.Group>

              <p></p>

              <div
                className="BottomBorder"
                style={{ paddingTop: ".5rem" }}
              ></div>

              <p></p>

              <SelectSingleOrVariant
                mode={this.props.mode}
                whichVariantForm={this.state.whichVariantForm}
                triggerVariantsButton={this.triggerVariantsButton}
                triggerSingleButton={this.triggerSingleButton}
              />
              <p></p>
            </Form>
            {this.state.whichVariantForm === "Single" ? (
              <>
                {/* Quantity FORM BELOW */}

                <Form.Group className="mb-3" controlId="formQty">
                  <h5 style={{ marginTop: ".5rem", marginBottom: ".2rem" }}>
                    Item Quantity
                  </h5>

                  {/* <InputGroup className="mb-3"> */}
                  <Form.Control
                    type="number"
                    onChange={this.onChange}
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
                    onChange={this.onChange}
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
              </>
            ) : (
              <>
                <VariantsComponent
                  whichNetwork={this.props.whichNetwork}
                  mode={this.props.mode}
                  variantsArray={this.state.variantsArray}
                  removeFieldOfVariant={this.removeFieldOfVariant}
                  addFieldOfVariant={this.addFieldOfVariant}
                />
              </>
            )}

            {!uniqueVariants ? (
              <>
                <p
                  style={{ color: "red", textAlign: "center" }}
                  className="smallertext"
                >
                  The variants need to have unique names.
                </p>
              </>
            ) : (
              <></>
            )}
            <Form
              noValidate
              onSubmit={this.handleSubmitClick}
              onChange={this.onChange}
            >
              <Form.Group className="mb-3" id="formGridCheckbox">
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  label={this.state.active ? <b>Active</b> : <b>Inactive</b>}
                />

                <p>
                  <b>Active</b> means people can add to cart and purchase the
                  item.
                </p>
              </Form.Group>

              {/* EXTRA INFO FORM BELOW */}

              <Form.Group className="mb-3" controlId="formExtraInfo">
                <Form.Label>
                  <h5 style={{ marginTop: ".5rem", marginBottom: ".2rem" }}>
                    Extra Information
                  </h5>
                </Form.Label>

                <Form.Control
                  // onChange={this.onChange}
                  as="textarea"
                  rows={2}
                  placeholder="(Optional)"
                  required
                  isInvalid={this.state.tooLongExtraInfoError}
                  isValid={this.state.validExtraInfo}
                />

                {this.state.tooLongExtraInfoError ? (
                  <Form.Control.Feedback className="floatLeft" type="invalid">
                    Sorry, this is too long! Please use less than 300
                    characters.
                  </Form.Control.Feedback>
                ) : (
                  <></>
                )}
              </Form.Group>

              <div className="ButtonRightNoUnderline">
                <>
                  {this.state.validName && // validName: false,
                  this.state.validDescription && // validDescription: false,
                  validVariants &&
                  // imgStateArray.length
                  this.state.validExtraInfo ? (
                    <Button variant="primary" type="submit">
                      <b>Create Item</b>
                    </Button>
                  ) : (
                    <Button variant="primary" disabled>
                      <b>Create Item</b>
                    </Button>
                  )}
                </>
              </div>
            </Form>
          </>
        </div>
      </>
    );
  }
}

export default CreateItemPage;
