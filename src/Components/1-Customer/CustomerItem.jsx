// Item and the Schedule of Accepted
import React from "react";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";

import Image from "react-bootstrap/Image";

import handleDenomDisplay from "../UnitDisplay";
import formatDate from "../TimeDisplayShort";

class CustomerItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //copiedName: false,
      copiedAddress: false,
    };
  }

  handleAvail = () => {
    if (this.props.item.active) {
      return "";
    } else {
      return (
        <span style={{ color: "#008de4" }}>
          <b>Inactive</b>
        </span>
      );
    }
  };

  // handleNameClick = () => {
  //   navigator.clipboard.writeText(`${this.props.tuple[0]}`);
  //   this.setState({
  //     copiedName: true,
  //   });
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
          style={{ marginBottom: "0.5rem" }}
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
              {/* <span className="textsmaller">
                {formatDate(
                  this.props.item.$updatedAt
                  // this.props.today,
                  // this.props.yesterday
                )}
              </span> */}
            </Card.Title>
            {this.props.item.imgArray.length < 2 ? (
              <Carousel
                slide={false}
                interval={null}
                indicators={false}
                controls={false}
              >
                {carouselImgs}
              </Carousel>
            ) : (
              <Carousel slide={false} interval={null}>
                {carouselImgs}
              </Carousel>
            )}
            {/* <Carousel slide={false} interval={null}>
              {carouselImgs}
            </Carousel> */}

            <p></p>
            {/* Description */}
            <p style={{ marginTop: "1rem", marginBottom: "1rem" }}>
              {this.props.item.description}
            </p>
            <p></p>

            <div className="d-grid gap-2">
              <Button
                // size="lg"
                variant="primary"
                onClick={() => this.props.handleSelectedItem(this.props.item)}
              >
                <b>View Item</b>
              </Button>
            </div>
            <p></p>

            {/* Amount */}
            {this.props.item.variants.length === 1 ? (
              <>
                <h5 style={{ marginTop: ".2rem", textAlign: "center" }}>
                  Price:{" "}
                  <b style={{ color: "#008de4" }}>
                    {handleDenomDisplay(
                      this.props.whichNetwork,
                      this.props.item.variants[0][2]
                    )}
                  </b>{" "}
                </h5>
              </>
            ) : (
              <>
                <h5 style={{ marginTop: ".2rem", textAlign: "center" }}>
                  <b style={{ color: "#008de4" }}>*Selection*</b>{" "}
                </h5>
              </>
            )}

            {/* <Card.Text>{this.props.item.description}</Card.Text> */}
            {/* <p style={{ marginTop: "1rem" }}>{this.props.item.description}</p> */}
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default CustomerItem;
