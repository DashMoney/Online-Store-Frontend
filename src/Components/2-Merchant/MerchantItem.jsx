// Item and the Schedule of Accepted
import React from "react";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import Badge from "react-bootstrap/Badge";
import Carousel from "react-bootstrap/Carousel";

import Image from "react-bootstrap/Image";
import handleDenomDisplay from "../UnitDisplay";

import VariantTable from "./Variants/VariantTable";

class MerchantItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      copiedName: false,
    };
  }

  handleAvail = () => {
    if (this.props.item.active) {
      return (
        <Badge bg="primary">
          <b>Active</b>
        </Badge>
      );
    } else {
      return (
        <Badge bg="warning">
          <b>Inactive</b>
        </Badge>
      );
    }
  };

  // handleVariant = (theVariant) => {
  //   if (
  //     this.props.item.active &&
  //     (theVariant.qty >= 1 || theVariant.qty === "")
  //   ) {
  //     return (
  //       <div className="cardTitle">
  //         {/* <span style={{ color: "#008de4" }}>
  //           <b>{theVariant[0]}</b>
  //         </span> */}
  //         <span style={{ color: "#008de4" }}>
  //           {handleDenomDisplay(this.props.whichNetwork,this.props.item.price)}
  //         </span>
  //       </div>
  //     );
  //     // <span style={{ color: "#008de4" }}>
  //     //   <b>Active</b>
  //     // </span>
  //     // <span style={{ color: "#008de4" }}>
  //     //       {handleDenomDisplay(this.props.whichNetwork,this.props.item.price)}
  //     //     </span>
  //     // <Badge bg="primary">
  //     //   <b>Active</b>
  //     // </Badge>
  //   } else {
  //     return (
  //       <div className="cardTitle">
  //         {/* <span style={{ color: "#008de4" }}>
  //           <b>{theVariant[0]}</b>
  //         </span> */}
  //         <Badge bg="warning">
  //           <b>Unavail</b>
  //         </Badge>
  //         <span style={{ color: "#008de4" }}>
  //           {handleDenomDisplay(this.props.whichNetwork,this.props.item.price)}
  //         </span>
  //       </div>
  //     );
  //   }
  // };

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
    let carouselImgs = this.props.item.imgArray.map((img, index) => {
      return (
        <Carousel.Item index={index} key={index}>
          <Image
            src={img}
            fluid //rounded
          />
        </Carousel.Item>
      );
    });

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
            <Card.Title className="cardTitle">
              <h5>
                {" "}
                <b //style={{ color: "#008de4" }}
                >
                  {this.props.item.name}
                </b>
              </h5>
              {this.handleAvail()}
            </Card.Title>
            {this.props.needToSaveInventory ? (
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
            {this.props.item.imgArray.length > 0 ? (
              <>
                <Carousel
                  slide={false}
                  interval={null}
                  style={{ marginBottom: "1rem" }}
                >
                  {carouselImgs}
                </Carousel>
              </>
            ) : (
              <></>
            )}

            <p style={{ textAlign: "center" }}>{this.props.item.description}</p>
            <p></p>
            {this.props.item.variants.length === 1 ? (
              <>
                {this.props.item.variants[0][1] !== "" ? (
                  <div className="cardTitle">
                    <Badge bg="primary">
                      Qty: <b>{this.props.item.variants[0][1]}</b>
                    </Badge>
                    <h5>
                      Price:{" "}
                      <b
                        style={{
                          color: "#008de4",
                        }}
                      >
                        {handleDenomDisplay(
                          this.props.whichNetwork,
                          this.props.item.variants[0][2]
                        )}
                      </b>
                    </h5>
                  </div>
                ) : (
                  <h5
                    style={{
                      textAlign: "center",
                    }}
                  >
                    Price:{" "}
                    <b
                      style={{
                        color: "#008de4", // marginRight: "1rem"
                      }}
                    >
                      {handleDenomDisplay(
                        this.props.whichNetwork,
                        this.props.item.variants[0][2]
                      )}
                    </b>
                  </h5>
                )}
              </>
            ) : (
              <>
                <VariantTable
                  whichNetwork={this.props.whichNetwork}
                  item={this.props.item}
                  mode={this.props.mode}
                />
              </>
            )}

            <p></p>
            <div className="d-grid gap-2">
              <Button
                // size="lg"
                variant="primary"
                onClick={() => this.props.handleSelectedItem(this.props.item)}
              >
                <b>View/Edit Item</b>
              </Button>
            </div>
            <p></p>

            <div className="BottomBorder" style={{ paddingTop: ".5rem" }}></div>
            <p></p>
            <div className="TwoButtons">
              {this.props.index !== 0 ? (
                <>
                  <Button
                    variant="primary"
                    onClick={() =>
                      this.props.moveItemUpDown(this.props.index, "up")
                    }
                  >
                    <b>Move Up</b>
                  </Button>
                </>
              ) : (
                <></>
              )}
              {this.props.index !== this.props.inventoryLength - 1 ? (
                <>
                  <Button
                    variant="primary"
                    onClick={() =>
                      this.props.moveItemUpDown(this.props.index, "down")
                    }
                  >
                    <b>Move Down</b>
                  </Button>
                </>
              ) : (
                <></>
              )}
            </div>
            <p></p>
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default MerchantItem;
