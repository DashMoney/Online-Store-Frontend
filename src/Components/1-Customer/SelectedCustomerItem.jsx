import React from "react";

import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Form from "react-bootstrap/Form";

import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";

import LowCreditsOnPage from "../LowCreditsOnPage";
//import CreditsOnPage from "../CreditsOnPage";

//import formatDate from "../TimeDisplayShort";
import handleDenomDisplay from "../UnitDisplay";

import { IoMdArrowRoundBack } from "react-icons/io";

class SelectedCustomerItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // copiedName: false,
      // copiedAddress: false,
      selectedVariantIndex: 0,
    };
  }

  handleAvail = () => {
    if (
      this.props.item.active &&
      this.props.item.variants[this.state.selectedVariantIndex][1] >= 1
    ) {
      return (
        <Badge bg="primary">
          Qty:{" "}
          <b>{this.props.item.variants[this.state.selectedVariantIndex][1]}</b>
        </Badge>
      ); // <span style={{ color: "#008de4" }}>
      //   <b>Active</b>
      // </span>
      // <Badge bg="primary">
      //   <b>Active</b>
      // </Badge>
    } else {
      return (
        // <span style={{ color: "#008de4" }}>
        //   <b>Inactive</b>
        // </span>
        <Badge bg="warning" style={{ marginRight: "1rem" }}>
          <b>Unavail</b>
        </Badge>
      );
    }
  };

  handleAvail = () => {
    if (
      this.props.item.active &&
      (this.props.item.variants[this.state.selectedVariantIndex][1] >= 1 ||
        this.props.item.variants[this.state.selectedVariantIndex][1] === "")
    ) {
      if (this.props.item.variants[this.state.selectedVariantIndex][1] === "") {
        return (
          <>
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
                  this.props.item.variants[this.state.selectedVariantIndex][2]
                )}
              </b>
            </h5>
          </>
        );
      } else {
        return (
          <div className="cardTitle">
            <Badge bg="primary">
              Qty:{" "}
              <b>
                {this.props.item.variants[this.state.selectedVariantIndex][1]}
              </b>
            </Badge>
            <h5>
              Price:{" "}
              <b
                style={{
                  color: "#008de4", // marginRight: "1rem"
                }}
              >
                {handleDenomDisplay(
                  this.props.whichNetwork,
                  this.props.item.variants[this.state.selectedVariantIndex][2]
                )}
              </b>
            </h5>
          </div>
        );
      }
    } else {
      return (
        <div className="cardTitle">
          <Badge bg="warning">
            <b>Unavail</b>
          </Badge>
          <h5>
            Price:{" "}
            <b
              style={{
                color: "#008de4", // marginRight: "1rem"
              }}
            >
              {handleDenomDisplay(
                this.props.whichNetwork,
                this.props.item.variants[this.state.selectedVariantIndex][2]
              )}
            </b>
          </h5>
        </div>
      );
    }
  };

  // handleVariant = (theVariant) => {
  //   //the variant-truple label-qty-price
  //   if (this.props.item.active) {
  //     return (
  //       <h5
  //         style={{
  //           textAlign: "center",
  //         }}
  //       >
  //         Price:{" "}
  //         <b
  //           style={{
  //             color: "#008de4", // marginRight: "1rem"
  //           }}
  //         >
  //           {handleDenomDisplay(this.props.whichNetwork,theVariant[2])}
  //         </b>
  //       </h5>
  //       // </div>
  //     );
  //   } else {
  //     return (
  //       <h5
  //         style={{
  //           textAlign: "center",
  //         }}
  //       >
  //         Price:{" "}
  //         <b
  //           style={{
  //             color: "#008de4", // marginRight: "1rem"
  //           }}
  //         >
  //           {handleDenomDisplay(this.props.whichNetwork,theVariant[2])}
  //         </b>
  //       </h5>
  //     );
  //   }
  // };

  handleRequestFilter = (selected) => {
    // this.props.handleMerchantOrderFilter(selected);
    this.setState({
      selectedVariantIndex: Number(selected),
    });
  };

  onChange = (event) => {
    event.preventDefault();
    //Payment Schedule
    if (event.target.id === "formRequestFilter") {
      event.stopPropagation();
      this.handleRequestFilter(event.target.value);
    }
  };

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
    // if (this.props.isLoginComplete && this.props.InitialPullReviews) {
    //   this.props.pullInitialTriggerREVIEWS();
    // }
  }
  render() {
    let today = new Date();
    let yesterday = new Date(today);

    yesterday.setDate(yesterday.getDate() - 1);

    let formBkg;
    let formText;

    if (this.props.mode === "primary") {
      formBkg = "light";
      formText = "dark";
    } else {
      formBkg = "dark";
      formText = "light";
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

    // if (this.props.item.variants.length === 1) {
    //   console.log("hello");
    // }

    let variant = this.props.item.variants[this.state.selectedVariantIndex];

    // console.log(variant);

    // let variants = this.props.item.variants.map((variant, index) => {
    //   return <p key={index}>{variant[0]}</p>;

    // });

    let variantList = this.props.item.variants.map((variant, index) => {
      return (
        <option key={index} value={index} style={{ fontWeight: "bold" }}>
          {variant[0]}
        </option>
      );
    });

    let cartItemObject = {
      //{itemId: Name, variant: VarName}
      itemId: this.props.item.itemId,
      variant: variant[0],
    };

    return (
      <>
        <div
          className="bodytext"
          ref={(el) => {
            this.positionStart = el;
          }}
        >
          <LowCreditsOnPage
            identityInfo={this.props.identityInfo}
            uniqueName={this.props.uniqueName}
            showModal={this.props.showModal}
          />

          {/* {this.props.LoadingItem ? (
            <>
              <p></p>
              <div id="spinner">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
              <p></p>
            </>
          ) : (
            <></>
          )} */}

          <div className="cardTitle">
            <Button
              variant="primary"
              onClick={() => this.props.handleSelectedPage("Inventory")}
            >
              <IoMdArrowRoundBack size={28} />
            </Button>
            <h5>
              {" "}
              <b //style={{ color: "#008de4" }}
              >
                {this.props.item.name}
              </b>
            </h5>
            <Button
              style={{
                borderColor: "rgba(255,255,255,0)",
                color: "rgba(255,255,255,0)",
                backgroundColor: "rgba(255,255,255,0)",
              }}
            >
              <IoMdArrowRoundBack size={28} />
            </Button>
            {/* {this.handleAvail()} */}
            {/* <span className="textsmaller">
              {formatDate(
                this.props.item.$updatedAt,
                this.props.today,
                this.props.yesterday
              )}
            </span> */}
          </div>

          <p></p>

          {this.props.item.imgArray.length > 0 ? (
            <>
              <Carousel slide={false} interval={null}>
                {carouselImgs}
              </Carousel>
            </>
          ) : (
            <></>
          )}

          <p></p>

          {/* Description */}
          <p
            style={{
              textAlign: "center",
              marginTop: "1rem",
              marginBottom: "1rem",
            }}
          >
            {this.props.item.description}
          </p>

          {/* Amount */}
          {/* <h5 style={{ marginTop: ".2rem", textAlign: "center" }}>
            {" "}
            <b style={{ color: "#008de4" }}>
              {handleDenomDisplay(this.props.whichNetwork,this.props.item.rate)}
            </b>{" "}
            per day
          </h5> */}

          {this.props.item.variants.length === 1 ? (
            <></>
          ) : (
            <>
              <Form
                noValidate
                // onSubmit={this.handleSubmitClick}
                onChange={this.onChange}
              >
                {/* REQUEST FILTER FORM BELOW */}

                <Form.Group className="mb-3" controlId="formRequestFilter">
                  <Form.Label>
                    <h5 style={{ marginTop: ".5rem", marginBottom: ".2rem" }}>
                      Select:
                    </h5>
                  </Form.Label>

                  <Form.Select
                    style={{ fontWeight: "bold" }}
                    // bg={formBkg}
                    //text={formText}
                    data-bs-theme={formBkg}
                    defaultValue={this.props.DisplayOrders}
                  >
                    {variantList}
                  </Form.Select>
                </Form.Group>
              </Form>

              <p></p>
            </>
          )}

          {this.handleAvail()}

          {/* <h5
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
              {handleDenomDisplay(this.props.whichNetwork,
                this.props.item.variants[this.state.selectedVariantIndex][2]
              )}
            </b>
          </h5> */}

          <p></p>

          {this.props.item.extraInfo !== undefined &&
          this.props.item.extraInfo !== "" ? (
            <>
              <p
                style={{
                  paddingBottom: "0.5rem",
                  whiteSpace: "pre-wrap",
                  textAlign: "center",
                }}
              >
                <b>{this.props.item.extraInfo}</b>
              </p>
            </>
          ) : (
            <></>
          )}

          <p></p>
          {this.props.CartItems.length < 10 &&
          this.props.item.active &&
          (variant[1] > 0 || variant[1] === "") ? (
            <>
              <div className="d-grid gap-2">
                <Button
                  // size="lg"
                  variant="primary"
                  onClick={() =>
                    this.props.handleAddToCartModal(cartItemObject)
                  }
                >
                  <b>Add to Cart</b>
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="d-grid gap-2">
                <Button
                  // size="lg"
                  variant="primary"
                  disabled
                >
                  <b>Add to Cart</b>
                </Button>
              </div>
            </>
          )}

          <p></p>

          <div className="BottomBorder" style={{ paddingTop: ".5rem" }}></div>

          <p></p>

          {/* <h4>
            <b>Q&A</b>
          </h4>
          {this.state.SearchedReviews.length === 0 && !this.state.LoadingDGR ? (
          <div className="bodytext">
            <p>
              This is where Customer's questions and the owner's answers will
              go.
            </p>
          </div>
           ) : (
            <></>
          )} 
          <p></p> */}

          <h4>
            <b>Comments</b>
          </h4>
          {/* {this.state.SearchedReviews.length === 0 && !this.state.LoadingDGR ? (  */}
          <div className="bodytext">
            <p>This is where Customer's reviews and Q&A will go.</p>
          </div>
          {/* ) : (
            <></>
          )}  */}
          <p></p>
          {/* Maybe Just do a thread for each item could be questions or review and helps so merchant doesn't want to change name. */}
        </div>
      </>
    );
  }
}

export default SelectedCustomerItem;
