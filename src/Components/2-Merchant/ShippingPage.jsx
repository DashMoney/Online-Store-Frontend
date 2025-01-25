import React from "react";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
//import Form from "react-bootstrap/Form";
import handleDenomDisplay from "../UnitDisplay";

import CreditsOnPage from "../CreditsOnPage";

class ShippingPage extends React.Component {
  //https://stackoverflow.com/questions/37620694/how-to-scroll-to-bottom-in-react
  scrollToTop = () => {
    this.positionStart.scrollIntoView({
      behavior: "instant",
      block: "start",
      inline: "nearest",
    });
  };

  componentDidMount() {
    this.scrollToTop();
    this.props.pullInitialTriggerABOUTUS();
  }
  render() {
    // I THINK i WILL MAKE SOME CARDS
    // HOW DOES THE CUSTOMER SELECT? WHAT IT LOOK LIKE
    // use buttons like Nearby Dapp!! <- no just use a dropdown

    let needToSaveShipping = false;
    if (
      JSON.stringify(this.props.ShippingOptions) !==
      JSON.stringify(this.props.ShippingInitial)
    ) {
      needToSaveShipping = true;
    }

    let cardBkg;
    let cardText;

    if (this.props.mode === "primary") {
      cardBkg = "white";
      cardText = "dark";
    } else {
      cardBkg = "dark";
      cardText = "white";
    }

    let shipOptions = this.props.ShippingOptions.map((opt, index) => {
      return (
        <Card
          id="card"
          key={index}
          index={index}
          bg={cardBkg}
          text={cardText}
          style={{ marginBottom: "0.5rem" }}
        >
          <Card.Body>
            <Card.Title>
              {needToSaveShipping ? (
                <>
                  <p
                    className="textsmaller"
                    style={{
                      marginTop: "1rem",
                      textAlign: "center",
                      color: "red",
                    }}
                  >
                    <b> *Save Changes to Platform*</b>{" "}
                  </p>
                </>
              ) : (
                <></>
              )}
              <div className="cardTitle">
                <span>{opt[0]}</span>
                <span
                  style={{
                    color: "#008de3",
                  }}
                >
                  {handleDenomDisplay(this.props.whichNetwork, opt[2])}
                </span>
              </div>
            </Card.Title>
            <Button
              // size="lg"
              variant="success"
              onClick={() => this.props.handleEditShippingOption(index)}
            >
              <b>Edit Option</b>
            </Button>
          </Card.Body>
        </Card>
      );
    });

    return (
      <>
        <div
          className="bodytext"
          ref={(el) => {
            this.positionStart = el;
          }}
        >
          <CreditsOnPage
            identityInfo={this.props.identityInfo}
            uniqueName={this.props.uniqueName}
            showModal={this.props.showModal}
          />

          {needToSaveShipping &&
          !this.props.isLoadingInventory &&
          this.props.InventoryDoc !== "" ? (
            <>
              <div className="d-grid gap-2">
                <Button
                  // size="lg"
                  variant="success"
                  onClick={() => this.props.showModal("SaveShippingModal")}
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

          <h2 style={{ marginBottom: ".8rem" }}>Shipping Options</h2>

          {this.props.isLoadingAboutUs || this.props.isLoadingInventory ? (
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

          {this.props.AboutUsDoc === "" && !this.props.isLoadingAboutUs ? (
            <>
              <p>
                Supported Regions: "Add Supported Regions in the <b>About Us</b>
                "
              </p>
            </>
          ) : (
            <></>
          )}

          {this.props.AboutUsDoc !== "" && !this.props.isLoadingAboutUs ? (
            <>
              <p>
                Supported Regions:{" "}
                <b>{this.props.AboutUsDoc.details.supportedRegions}</b>
              </p>
            </>
          ) : (
            <></>
          )}

          {this.props.InventoryDoc === "" ? (
            <p
              className="smallertext"
              style={{
                textAlign: "center",
                marginRight: "1rem",
                marginLeft: "1rem",
              }}
            >
              You must have an inventory, before you can add shipping options.
              Please save an item to your inventory first.
            </p>
          ) : (
            <></>
          )}

          {this.props.ShippingOptions.length === 0 &&
          this.props.InventoryDoc !== "" ? (
            <p
              className="smallertext"
              style={{
                textAlign: "center",
                marginRight: "1rem",
                marginLeft: "1rem",
              }}
            >
              Shipping is optional. If no options are added, customers can
              submit orders without shipping.
            </p>
          ) : (
            <></>
          )}

          {shipOptions}

          {this.props.ShippingOptions.length >= 8 ? (
            <>
              <p className="textsmaller">(Limit of 8 Shipping Options)</p>
            </>
          ) : (
            <></>
          )}

          <div className="d-grid gap-2">
            {!this.props.isLoadingInventory &&
            this.props.ShippingOptions.length <= 7 &&
            this.props.InventoryDoc !== "" ? (
              <>
                <Button
                  variant="primary"
                  onClick={() => this.props.showModal("ShippingCreateModal")}
                >
                  <b style={{ fontSize: "larger" }}>Add Shipping Option</b>
                </Button>
              </>
            ) : (
              <>
                <Button variant="primary" disabled>
                  <b style={{ fontSize: "larger" }}>Add Shipping Option</b>
                </Button>
              </>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default ShippingPage;
