import React from "react";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";

import Table from "react-bootstrap/Table";

import handleDenomDisplay from "../UnitDisplay";
import formatDate from "../TimeDisplayLong";
//import simpleDate from "../DateDisplay";

class YourOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      copiedName: false,
      //copiedAddress: false,
    };
  }

  handleNameClick = (nameLabel) => {
    navigator.clipboard.writeText(nameLabel);
    this.setState({
      copiedName: true,
    });
  };

  verifyOrderStatus = (theOrder, theConfirm) => {
    // if (ride.txId1 !== "") {
    //   //pass to the verify payment function ->
    //   // console.log("Called Verify Payment Status");
    //   return this.verifyPaymentStatus(ride);
    // }

    if (theConfirm === undefined) {
      //console.log("Awaiting Confirmation");
      return <Badge bg="warning">Awaiting Confirm</Badge>;
    }

    //if(confirm!==undefined){this will check if the order and confirm dates and amts match }
    //
    if (
      theConfirm.amt === theOrder.amt
      // theConfirm.arriveDate === theOrder.arriveDate &&
    ) {
      //console.log("Acceptance Rejected");
      return <Badge bg="success">Confirmed</Badge>;
    }

    // if (paidThrs.length === 0) {
    //   //console.log("Ordered");
    //   return <Badge bg="success">Ordered</Badge>;
    // }

    // if (ride.replyId === this.props.drive.$id) {
    //console.log("Confirmed");
    return <Badge bg="danger">Confirm Error</Badge>;
    //}
  };

  // handleNameClick = () => {
  //   navigator.clipboard.writeText(`${this.props.tuple[0]}`);
  //   this.setState({
  //     copiedName: true,
  //   });
  // };

  handleTotalItems = () => {
    let numOfItems = 0;
    this.props.order.cart.forEach((tuple) => {
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
    //this.prop.order.cart AND this.props.merchantItems
    let theTotal = 0;

    this.props.order.cart.forEach((cartTuple) => {
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

      //FOR ITEM DELETED FROM INVENTORY
      let theVariant;
      if (theItem === undefined) {
        theItem = {
          name: "Item Not Found",
          itemId: "Item Not Found",
          variants: [["", "", 0]],
        };

        theVariant = ["", "", 0];
      } else {
        theVariant = theItem.variants.find((vari) => {
          return vari[0] === cartTuple[0].variant;
        });
        if (theVariant === undefined) {
          theVariant = ["unknown", "", 0];
        }
      }

      // let theVariant = theItem.variants.find((vari) => {
      //   return vari[0] === cartTuple[0].variant;
      // });

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

  render() {
    let cardBkg;
    let cardText;

    if (this.props.mode === "primary") {
      cardBkg = "white";
      cardText = "dark";
    } else {
      cardBkg = "dark";
      cardText = "white";
    }

    // let item = this.props.Inventory.find((item) => {
    //   return item.$id === this.props.order.itemId;
    // });

    //let confirm = undefined;

    let confirm = this.props.ConfirmedOrders.find((confirm) => {
      return this.props.order.$id === confirm.orderId;
    });

    //this.props.OrderReplies
    //this.props.MerchantNameDoc

    //this.props.MerchantNameDoc
    //this.props.uniqueName

    let orderReplies = [];

    if (this.props.OrderReplies.length !== 0) {
      orderReplies = this.props.OrderReplies.filter((msg) => {
        return confirm.$id === msg.confirmId;
      });
    }

    //ADD THE ORDER.MSG HERE !!
    if (this.props.order.msg !== undefined && this.props.order.msg !== "") {
      orderReplies = [this.props.order, ...orderReplies];
    }

    let orderReplyMessages = [];

    if (
      //confirm !== undefined &&
      orderReplies.length !== 0
    ) {
      orderReplyMessages = orderReplies.map((msg, index) => {
        return (
          // <Card
          //   id="comment"
          //   key={index}
          //   index={index}
          //   bg={cardBkg}
          //   text={cardText}
          // >
          //   <Card.Body>
          <div index={index} key={index}>
            <div
              className="ThreadBorder"
              style={{ paddingTop: ".2rem", marginBottom: ".3rem" }}
            ></div>
            <Card.Title className="cardTitle">
              {msg.$ownerId === this.props.identity ? (
                <b style={{ color: "#008de4" }}>{this.props.uniqueName}</b>
              ) : (
                <b style={{ color: "#008de4" }}>
                  {this.props.MerchantNameDoc.label}
                </b>
              )}

              <span className="textsmaller">
                {formatDate(
                  msg.$createdAt,
                  this.props.today,
                  this.props.yesterday
                )}
              </span>
            </Card.Title>
            <Card.Text>{msg.msg}</Card.Text>
          </div>
          //    </Card.Body>
          // </Card>
        );
      });
    }

    //  Table Creation (BELOW)

    let variantRows = [];
    let theIndex = 0;

    this.props.order.cart.forEach((cartItem, index) => {
      let theItem = this.props.Inventory.find((item) => {
        return item.itemId === cartItem[0].itemId; //This is from the cart
      });

      //FOR ITEM DELETED FROM INVENTORY
      let theVariant;
      if (theItem === undefined) {
        theItem = {
          name: "Item Not Found",
          itemId: "Item Not Found",
          variants: [["", "", 0]],
        };
        theVariant = ["", "", 0];
      } else {
        theVariant = theItem.variants.find((vari) => {
          return vari[0] === cartItem[0].variant;
        });
        if (theVariant === undefined) {
          theVariant = ["unknown", "", 0];
        }
      }

      let variantRow = [];
      theIndex += 1;
      variantRow.push(
        <td style={{ textAlign: "left" }} key={theIndex}>
          <div>
            <h5 style={{ marginBottom: "0rem" }}>{theItem.name}</h5>
            <p style={{ color: "#008de4" }}>{theVariant[0]}</p>
          </div>
        </td>
      );
      theIndex += 1;
      variantRow.push(
        <td key={theIndex} style={{ textAlign: "center" }}>
          <b>{cartItem[1]}</b>
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
        </td>
      );

      let addVariantRow = <tr key={index}>{variantRow}</tr>;
      variantRows.push(addVariantRow);
    });

    //  Table Creation ^^^

    return (
      <>
        <Card
          id="card"
          key={this.props.index}
          index={this.props.index}
          bg={cardBkg}
          text={cardText}
        >
          <Card.Body>
            {}
            <Card.Title className="cardTitle">
              {/* <h5>
                To:{" "}
                <b //style={{ color: "#008de4" }}
                >
                {this.props.MerchantNameDoc.label}
                
                </b>
              </h5> */}

              {/* <span className="textsmaller">
                {formatDate(
                  this.props.order.$updatedAt,
                  this.props.today,
                  this.props.yesterday
                )}
              </span> */}
            </Card.Title>
            <Card.Title style={{ display: "flex", justifyContent: "center" }}>
              {this.verifyOrderStatus(this.props.order, confirm)}
            </Card.Title>

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

            {/* <p></p>
            <div className="d-grid gap-2">
              <Button
                // size="lg"
                variant="primary"
                onClick={() => this.props.handleSelectedItem(item)}
              >
                <b>View Item</b>
              </Button>
            </div> */}
            {/* <p></p> */}
            {/* <p
              className="textsmaller"
              style={{ marginTop: "1rem", textAlign: "center" }}
            >
              <b> *Click on me to view availability!*</b>{" "}
            </p> */}

            {/* Amount */}

            {/* <h5 style={{ marginTop: ".2rem", textAlign: "center" }}>
              {" "}
              <b style={{ color: "#008de4" }}>
                {handleDenomDisplay(this.props.whichNetwork,order.total)}
              </b>{" "}
              per day
            </h5> */}
            {/* <h4
              style={{
                marginTop: "1.5rem",
                marginBottom: "2rem",
                textAlign: "center",
              }}
            >
              Total Cost{" "}
              <b style={{ marginLeft: "1rem", color: "#008de4" }}>
                {handleDenomDisplay(this.props.whichNetwork,this.props.order.amt)}
              </b>
            </h4> */}

            <p></p>
            <div className="cartTotal">
              <h4>
                <b>Total</b> ({this.handleTotalItems()})<b>:</b>
              </h4>

              {this.handleTotal()}
            </div>

            {confirm === undefined ? (
              <>
                <p></p>
                {/* <div className="ButtonRightNoUnderline"> */}
                <Button
                  variant="primary"
                  onClick={() =>
                    this.props.handleDeleteOrderModal(
                      this.props.order,
                      this.props.index
                    )
                  }
                >
                  <b>Delete Order</b>
                </Button>
                {/* </div> */}
              </>
            ) : (
              <></>
            )}

            <div
              className="BottomBorder"
              style={{ paddingTop: ".7rem", marginBottom: ".7rem" }}
            ></div>
            <div
              className="cardTitle"
              style={{ marginTop: ".4rem", marginBottom: ".5rem" }}
            >
              <h5>Responses</h5>
              {this.verifyOrderStatus(this.props.order, confirm)}
            </div>

            {/* {confirm !== undefined ? (
              <> */}
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
            {/* </>
            ) : (
              <></>
            )} */}

            {confirm === undefined && orderReplies.length === 0 ? (
              <>
                <p style={{ textAlign: "center", paddingTop: ".5rem" }}>
                  (Currently, there are no messages for this order.)
                </p>
              </>
            ) : (
              <></>
            )}

            {orderReplyMessages}
            <p></p>
            {confirm !== undefined ? (
              <>
                <div className="ButtonRightNoUnderline">
                  <Button
                    variant="primary"
                    onClick={() =>
                      this.props.handleCustomerReplyModalShow(confirm)
                    }
                  >
                    <b>Add Message</b>
                  </Button>
                </div>
              </>
            ) : (
              <></>
            )}
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default YourOrder;
