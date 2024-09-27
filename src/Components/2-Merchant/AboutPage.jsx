import React from "react";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
//import Form from "react-bootstrap/Form";

import handleDenomDisplay from "../UnitDisplay";

class AboutPage extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     selectedCategory: "",
  //   };
  // }

  render() {
    return (
      <>
        <>
          <div
            className="bodytext" //bodytextnotop
          >
            {/* <div
              className="d-grid gap-2"
              style={{
                marginBottom: "1rem",
              }}
            >
              <Button
                variant="primary"
                size="lg"
                onClick={() => this.props.handleSelectedPage("Inventory")}
              >
                <b>Back to Shopping</b>
              </Button>
            </div> */}
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
              <></>
            )}

            <p></p>
            {this.props.CartItems.length > 0 &&
            this.props.isLoginComplete &&
            !this.props.isLoadingShoppingCart ? (
              <>
                <div
                  className="d-grid gap-2" //className="ButtonRight"
                >
                  <Button
                    size="lg"
                    variant="success"
                    onClick={() => this.props.showModal("PlaceOrderModal")}
                  >
                    <b>Place Order</b>
                  </Button>
                </div>
                <p></p>
              </>
            ) : (
              <>
                <div
                  className="d-grid gap-2" //className="ButtonRight"
                >
                  <Button size="lg" variant="success" disabled>
                    <b>Place Order</b>
                  </Button>
                </div>
                <p></p>
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
        </>{" "}
        {/* This is to close the LoadingOrder */}
      </>
    );
  }
}

export default AboutPage;
