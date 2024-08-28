import React from "react";
import Button from "react-bootstrap/Button";
// import ButtonGroup from "react-bootstrap/ButtonGroup";
import Modal from "react-bootstrap/Modal";
//import Spinner from "react-bootstrap/Spinner";

import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import CloseButton from "react-bootstrap/CloseButton";
// import Col from "react-bootstrap/Col";
// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
import handleDenomDisplay from "../../UnitDisplay";

class PlaceOrderModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      copiedName: false,

      commentInput: "",
      validComment: true,
      tooLongCommentError: false,
      loadTime: 3,
    };
  }

  handleNameClick = (nameLabel) => {
    navigator.clipboard.writeText(nameLabel);
    this.setState({
      copiedName: true,
    });
  };

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

  handleTotalItems = () => {
    let numOfItems = 0;
    this.props.CartItems.forEach((tuple) => {
      // this.props.merchantItems.find((item)=>{
      //   return item.$id === tuple[0].$id
      // })
      numOfItems += tuple[1];
    });

    return (
      <span>
        {numOfItems} {numOfItems > 1 ? <span>items</span> : <span>item</span>}
      </span>
    );
  };

  handleTotal = () => {
    //this.prop.CartItems AND this.props.merchantItems
    let theTotal = 0;

    this.props.CartItems.forEach((cartTuple) => {
      //NEED TO GET THE PRICE FROM THE INVENTORY LIKE I GET THE QTY FROM THE INVENTORY
      // let variantFromInventory = this.props.Inventory.find((item) => {
      //   return (
      //     item.itemId === cartTuple[0].itemId &&
      //     item.variants[0] === cartTuple[0].variant
      //   );
      // });

      let theItem = this.props.Inventory.find((item) => {
        return item.itemId === cartTuple[0].itemId;
      }); //this gets active as well

      let theVariant = theItem.variants.find((vari) => {
        return vari[0] === cartTuple[0].variant;
      });

      if (theVariant[2] !== 0) {
        theTotal += cartTuple[1] * theVariant[2];
        //console.log(theTotal);
      }
    });

    return (
      <h4 className="indentMembers" style={{ color: "#008de4" }}>
        <b>{handleDenomDisplay(this.props.whichNetwork, theTotal)}</b>
      </h4>
    );
  };

  // handleTotalNotForDisplay = () => {
  //   let theTotal = 0;

  //   this.props.CartItems.forEach((tuple) => {
  //     if (tuple[0].price !== 0) {
  //       theTotal += tuple[1] * tuple[0].price;
  //       //console.log(theTotal);
  //     }
  //   });
  //   return Number(theTotal);
  // };

  handleTotalNotForDisplay = () => {
    let theTotal = 0;

    this.props.CartItems.forEach((tuple) => {
      let theItem = this.props.Inventory.find((item) => {
        return item.itemId === tuple[0].itemId;
      }); //this gets active as well

      let theVariant = theItem.variants.find((vari) => {
        return vari[0] === tuple[0].variant;
      });

      if (theVariant[2] !== 0) {
        theTotal += tuple[1] * theVariant[2];
        //console.log(theTotal);
      }
    });
    return Number(theTotal);
  };

  onChange = (event) => {
    //console.log(event.target.id);
    //console.log(`id = ${event.target.id}`);

    if (event.target.id === "formOrderComment") {
      event.preventDefault();
      event.stopPropagation();
      this.orderCommentValidate(event.target.value);
    }
  };

  orderCommentValidate = (comment) => {
    let regex = /^[\S\s]{0,200}$/;

    let valid = regex.test(comment);

    if (valid) {
      this.setState({
        commentInput: comment,
        validComment: true,
        tooLongCommentError: false,
      });
    } else {
      if (comment.length > 200) {
        this.setState({
          commentInput: comment,
          validComment: false,
          tooLongCommentError: true,
        });
      } else {
        this.setState({
          commentInput: comment,
          validComment: false,
        });
      }
    }
  };

  // handleSubmitClick = () => {
  //   if (this.state.validComment) {
  //     this.props.placeOrder(this.state.commentInput);
  //     this.props.hideModal();
  //   }
  // };

  handleSubmitClick = () => {
    this.props.placeOrder(
      this.state.commentInput,
      this.handleTotalNotForDisplay()
    );
    //this.props.hideModal();
  };

  componentDidMount = () => {
    this.decrementTimer();
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

    let variantRows = [];
    let theIndex = 0;

    this.props.CartItems.forEach((cartItem, index) => {
      let theItem = this.props.Inventory.find((item) => {
        return item.itemId === cartItem[0].itemId; //This is from the cart
      });

      let theVariant = theItem.variants.find((vari) => {
        return vari[0] === cartItem[0].variant;
      });

      let variantRow = [];
      theIndex += 1;
      variantRow.push(
        <td style={{ textAlign: "left" }} key={theIndex}>
          <div>
            <h5 style={{ marginBottom: "0rem" }}>{theItem.name}</h5>
            <p style={{ color: "#008de4" }}>{theVariant[0]}</p>
          </div>
          {/* <p
              style={{
                //fontSize: "smaller",
                margin: "0rem",
              }}
            >
              {this.props.item.variants[i][j]}
            </p> */}
        </td>
      );
      theIndex += 1;
      variantRow.push(
        <td key={theIndex} style={{ textAlign: "center" }}>
          <b>{cartItem[1]}</b>
          {/* <p
                style={{
                  //fontSize: "smaller",
                  margin: "0rem",
                }}
              >
                {this.props.item.variants[i][j]}
              </p> */}
        </td>
      );
      theIndex += 1;
      variantRow.push(
        <td style={{ textAlign: "center" }} key={theIndex}>
          <b>
            {handleDenomDisplay(
              this.props.whichNetwork,
              theVariant[2],
              cartItem[1]
            )}
          </b>
          {/* <p
              style={{
                //fontSize: "smaller",
                margin: "0rem",
              }}
            >
              {handleDenomDisplay(this.props.whichNetwork,this.props.item.variants[i][j])}
            </p> */}
        </td>
      );

      let addVariantRow = <tr key={index}>{variantRow}</tr>;
      variantRows.push(addVariantRow);
    });

    // let orderItems = this.props.CartItems.map((cartItem, index) => {
    //   //get the Inventory item for the price ->
    //   let theItem = this.props.Inventory.find((item) => {
    //     return item.itemId === cartItem[0].itemId; //This is from the cart
    //   }); //this gets active as well

    //   let theVariant = theItem.variants.find((vari) => {
    //     return vari[0] === cartItem[0].variant;
    //   });

    //   return (
    //     <div key={index} className="cardTitle">
    //       <div>
    //         <h5>{theItem.name}</h5>
    //         <p>{theVariant[0]}</p>
    //       </div>
    //       {/* <h5>{item[0].name}</h5> */}
    //       <h5>{cartItem[1]}</h5>
    //       <h5>
    //         <b>{handleDenomDisplay(this.props.whichNetwork,theVariant[2], cartItem[1])}</b>
    //       </h5>
    //     </div>
    //     // <Row key={index}>
    //     //   <Col xs={6} md={4}>
    //     //     <h5>{item[0].name}</h5>{" "}
    //     //   </Col>
    //     //   <Col xs={1} md={4}>
    //     //     <h5>{item[1]}</h5>{" "}
    //     //   </Col>
    //     //   <Col xs={5} md={4}>
    //     //     <h5 style={{ color: "#008de4" }}>
    //     //       <b>{handleDenomDisplay(this.props.whichNetwork,item[0].price, item[1])}</b>
    //     //     </h5>
    //     //   </Col>
    //     // </Row>
    //   );
    // });

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
                <b>Confirm Your Order</b>
              </h3>
            </Modal.Title>
            {closeButtonColor}
          </Modal.Header>
          <Modal.Body>
            <h5>
              <span
                style={{
                  marginTop: ".2rem",
                  marginBottom: "0rem",
                }}
              >
                <b>Merchant:</b>
              </span>
              <span
                style={{
                  color: "#008de3",
                  marginTop: ".2rem",
                  marginBottom: "0rem",
                }}
              >
                {" "}
                <b
                  onClick={() =>
                    this.handleNameClick(this.props.MerchantNameDoc.label)
                  }
                >
                  {this.props.MerchantNameDoc.label}
                </b>
              </span>
              <span>{this.state.copiedName ? <span>✅</span> : <></>}</span>
            </h5>
            <p></p>
            {/* {this.props.isLoadingWallet ? (
              <></>
            ) : (
              <>
                <h5 className="BalanceRightNoUnderline">
                  <b>Your Current Balance</b>
                </h5>
                <h5 className="BalanceRight" style={{ color: "#008de4" }}>
                  <b>{handleDenomDisplay(this.props.whichNetwork,this.props.accountBalance, 1)}</b>
                </h5>

                <p></p>
              </>
            )} */}
            <h3>Your Order</h3>
            {/* <div className="cardTitle">
              <h5 style={{ marginLeft: "1rem" }}>Item</h5>
              <h5 style={{ marginRight: ".5rem" }}>Qty</h5>
              <h5 style={{ marginRight: "1rem" }}>Subtotal</h5>
            </div> */}
            {this.props.mode === "primary" ? (
              <>
                <Table
                  responsive
                  borderless
                  //bordered
                  size="md"
                  style={{ paddingLeft: "0rem" }}
                >
                  <thead>
                    <tr>
                      <th style={{ textAlign: "center" }}>
                        <b>Item</b>
                      </th>
                      <th style={{ textAlign: "center" }}>
                        <b>Qty</b>
                      </th>
                      <th style={{ textAlign: "center" }}>
                        <b>Subtotal</b>
                      </th>
                    </tr>
                  </thead>
                  <tbody>{variantRows}</tbody>
                </Table>
              </>
            ) : (
              <>
                <Table
                  responsive
                  borderless //bordered
                  size="md"
                  variant="dark"
                >
                  <thead>
                    <tr>
                      <th style={{ textAlign: "center" }}>
                        <b>Item</b>
                      </th>
                      <th style={{ textAlign: "center" }}>
                        <b>Qty</b>
                      </th>
                      <th style={{ textAlign: "center" }}>
                        <b>Subtotal</b>
                      </th>
                    </tr>
                  </thead>
                  <tbody>{variantRows}</tbody>
                </Table>
              </>
            )}
            {/* <Row>
              <Col xs={1} md={1}>
                {" "}
              </Col>
              <Col xs={4} md={4}>
                <h5>Item</h5>{" "}
              </Col>
              <Col xs={2} md={2}>
                <h5>Qty</h5>{" "}
              </Col>
              <Col xs={4} md={4}>
                <h5>Subtotal</h5>{" "}
              </Col>
              <Col xs={1} md={1}></Col>
            </Row> */}
            {/* <div className="cardTitle">
           <h5>Item</h5> 
           <h5>Qty</h5> 
           <h5>Price</h5> 
           
           </div> */}

            {/* <Container>{orderItems}</Container> */}

            <p></p>
            <div className="ButtonRight">
              <h4>
                <b>Total</b> ({this.handleTotalItems()})<b>:</b>
              </h4>

              {this.handleTotal()}
            </div>
            <p></p>
            <Form.Group className="mb-3" controlId="formOrderComment">
              <Form.Label>
                <b>Additional Order Info</b>
              </Form.Label>

              <Form.Control
                onChange={this.onChange}
                as="textarea"
                rows={2}
                placeholder="You can put any extra info here for the merchant to see.."
                required
                isInvalid={this.state.tooLongDescriptionError}
                isValid={this.state.validDescription}
              />

              {this.state.tooLongError ? (
                <Form.Control.Feedback className="floatLeft" type="invalid">
                  Sorry, this is too long! Please use less than 250 characters.
                </Form.Control.Feedback>
              ) : (
                <></>
              )}
              <p></p>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            {this.state.validComment ? (
              <>
                {this.state.loadTime >= 1 ? (
                  <Button variant="primary" disabled>
                    <b>Place Order ({this.state.loadTime})</b>
                  </Button>
                ) : (
                  <Button variant="primary" onClick={this.handleSubmitClick}>
                    <b>Place Order</b>
                  </Button>
                )}
              </>
            ) : (
              <Button variant="primary" disabled>
                <b>Place Order</b>
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default PlaceOrderModal;
