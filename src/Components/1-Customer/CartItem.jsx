import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import handleDenomDisplay from "../UnitDisplay";

class CartItem extends React.Component {
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

    let theItem = this.props.Inventory.find((item) => {
      return item.itemId === this.props.item[0].itemId; //This is from the cart
    }); //this gets active as well

    let theVariant = theItem.variants.find((vari) => {
      return vari[0] === this.props.item[0].variant;
    });

    return (
      <Card id="card" key={this.props.index} bg={cardBkg} text={cardText}>
        <Card.Body>
          <Card.Title className="cardTitle">
            <div>
              <p style={{ marginBottom: "0rem" }}>{theItem.name}</p>
              <p style={{ color: "#008de4" }}>{theVariant[0]}</p>
              {/* {theVariant[0] !== "" ? <>{theVariant[0]}</> : <></>} */}
            </div>

            <span>
              Qty:<span> </span>
              <b> {this.props.item[1]}</b>
            </span>
          </Card.Title>

          {/* <Card.Text>{this.props.item.description}</Card.Text> */}
          <p></p>
          <div className="cardTitle">
            <Button
              variant="primary"
              onClick={() =>
                this.props.handleEditCartItemModal(this.props.index)
              }
            >
              <b>Edit Item</b>
            </Button>
            <h4 style={{ color: "#008de4" }}>
              <b>
                {handleDenomDisplay(
                  this.props.whichNetwork,
                  theVariant[2],
                  this.props.item[1]
                )}
              </b>
            </h4>
          </div>
        </Card.Body>
      </Card>
    );
  }
}

export default CartItem;
