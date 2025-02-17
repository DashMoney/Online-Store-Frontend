import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import CloseButton from "react-bootstrap/CloseButton";

import ImgsComponent from "../ImgsComponent";

import SelectSingleOrVariant from "../Variants/SelectSingleOrVariant";
import VariantsComponent from "../Variants/VariantsComponent";

class EditItemModal extends React.Component {
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

      nameInput: this.props.SelectedItem.name,
      validName: true,
      tooLongNameError: false,

      descriptionInput: this.props.SelectedItem.description,
      validDescription: true,
      tooLongDescriptionError: false,

      imgStateArray: this.props.SelectedItem.imgArray,

      //linkStateArray: [],

      variantsArray: this.props.SelectedItem.variants,

      whichVariantForm: "Single", //

      //'qty'
      qtyInput: this.props.SelectedItem.variants[0][1],
      validQty: true,
      tooLongQtyError: false,

      //'price'
      priceInput: (
        Number(this.props.SelectedItem.variants[0][2]) / 100000000
      ).toFixed(5),
      // Number((this.state.priceInput * 100000000).toFixed(0)),
      validPrice: true,

      //   'extraInfo',
      extraInfoInput: this.props.SelectedItem.extraInfo,
      validExtraInfo: true,
      tooLongExtraInfoError: false,

      //'active'
      active: this.props.SelectedItem.active,
    };
  }

  handleCloseClick = () => {
    this.props.hideModal();
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
    let removedFieldArray = new Array(...this.state.imgStateArray);
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
    let removedFieldArray = new Array(...this.state.variantsArray);
    //BE CAREFUL WITH POP THAT IS TOUCHING THE MAIN ARRAY
    removedFieldArray.pop();
    this.setState({
      variantsArray: removedFieldArray,
    });
  };

  handleAvail = () => {
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
      this.handleAvail();
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
    event.stopPropagation();
    //console.log(event.target.ControlTextarea1.value);

    let editItem;

    //let randomId = this.getRandomId(this.state.nameInput);

    // variantsArray: [],
    //  whichVariantForm: "Single",

    if (this.state.whichVariantForm === "Single") {
      editItem = {
        // qtyInput: 1,
        // priceInput: 0,

        name: this.state.nameInput,
        itemId: this.props.SelectedItem.itemId,

        description: this.state.descriptionInput,

        imgArray: this.state.imgStateArray,
        linkArray: "",
        variants: [
          [
            "",
            this.state.qtyInput,
            Number((this.state.priceInput * 100000000).toFixed(0)),
          ],
        ],

        extraInfo: this.state.extraInfoInput,
        active: this.state.active,
      };
    } else {
      editItem = {
        name: this.state.nameInput,
        itemId: this.props.SelectedItem.itemId,
        description: this.state.descriptionInput,

        imgArray: this.state.imgStateArray,
        linkArray: "",
        variants: this.state.variantsArray,

        extraInfo: this.state.extraInfoInput,
        active: this.state.active,
      };
    }

    console.log(editItem);
    this.props.editItem(editItem);
    this.handleCloseClick();
    this.props.handleSelectedPage("Inventory");
  };

  handleSingleOrMultiVariant = () => {
    //This will determine which button is activated and should display
    // is the variant name is not '' then it should be multi bc you can have a multi that is just of one but that would be dumb.. oh well
    if (this.props.SelectedItem.variants.length === 1) {
      this.setState({
        whichVariantForm: "Single", //"Multiple"
      });
    } else {
      this.setState({
        whichVariantForm: "Multiple",
      });
    }
  };

  componentDidMount = () => {
    this.handleSingleOrMultiVariant();
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
        <Modal
          show={this.props.isModalShowing}
          backdropClassName={modalBackdrop}
          contentClassName={modalBkg}
        >
          <Modal.Header style={{ paddingBottom: ".2rem" }}>
            <Modal.Title>
              <h3>
                <b>Edit Item</b>
              </h3>
            </Modal.Title>
            {closeButtonColor}
          </Modal.Header>
          <Modal.Body>
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
                  defaultValue={this.props.SelectedItem.name}
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
                  defaultValue={this.props.SelectedItem.description}
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
            </Form>
            <p></p>

            <div className="BottomBorder" style={{ paddingTop: ".5rem" }}></div>

            <p></p>

            <SelectSingleOrVariant
              mode={this.props.mode}
              whichVariantForm={this.state.whichVariantForm}
              triggerVariantsButton={this.triggerVariantsButton}
              triggerSingleButton={this.triggerSingleButton}
            />
            <p></p>

            {this.state.whichVariantForm === "Single" ? (
              <>
                <Form
                  noValidate
                  onSubmit={this.handleSubmitClick}
                  onChange={this.onChange}
                >
                  {/* Quantity FORM BELOW */}

                  <Form.Group className="mb-3" controlId="formQty">
                    <h5 style={{ marginTop: ".5rem", marginBottom: ".2rem" }}>
                      Item Quantity
                    </h5>

                    {/* <InputGroup className="mb-3"> */}
                    <Form.Control
                      type="number"
                      step="1"
                      // precision="0"
                      // min="1"
                      // max="2000"
                      // defaultValue="15"
                      placeholder="Enter quantity.."
                      defaultValue={this.props.SelectedItem.variants[0][1]}
                      required
                      isInvalid={this.state.tooLongQtyError}
                      isValid={this.state.validQty}
                      aria-describedby="basic-addon2"
                    />
                    {/* <InputGroup.Text id="basic-addon2">days</InputGroup.Text> */}
                    {/* </InputGroup> */}
                    <p className="smallertext">
                      Leave <b>Item Quantity</b> blank if you don't want
                      inventory to track, or you have as much of something as
                      anyone can order.
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
                      type="text"
                      placeholder="0.85 for example.."
                      defaultValue={this.state.priceInput}
                      // {(
                      //   this.props.SelectedItem.variants[0][2] / 100000000
                      // ).toFixed(5)}
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
            ) : (
              <>
                <p
                  // className="textsmaller"
                  style={{ color: "red", textAlign: "center" }}
                >
                  <b>
                    {" "}
                    *Be careful adjusting variants as this can break orders if
                    the variant labels change.*
                  </b>{" "}
                </p>
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
                  defaultValue={this.props.SelectedItem.extraInfo}
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
                      <b>Edit Item</b>
                    </Button>
                  ) : (
                    <Button variant="primary" disabled>
                      <b>Edit Item</b>
                    </Button>
                  )}
                </>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default EditItemModal;
