import React from "react";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
//import Form from "react-bootstrap/Form";

import CreditsOnPage from "../CreditsOnPage";

import AboutUsCreate from "./AboutUsCreate";
import AboutUsEdit from "./AboutUsEdit";

class AboutUsPageMerchant extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     copiedName: false,
  //   };
  // }

  // handleNameClick = (nameLabel) => {
  //   navigator.clipboard.writeText(nameLabel);
  //   this.setState({
  //     copiedName: true,
  //   });
  // };

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
    return (
      <>
        <div
          className="bodytext" //bodytextnotop
          ref={(el) => {
            this.positionStart = el;
          }}
        >
          <CreditsOnPage
            identityInfo={this.props.identityInfo}
            uniqueName={this.props.uniqueName}
            showModal={this.props.showModal}
          />

          <h2 style={{ textAlign: "center", marginBottom: ".8rem" }}>
            About Us
          </h2>

          {import.meta.env.VITE_FRONTEND_NAME !== undefined &&
          import.meta.env.VITE_FRONTEND_NAME !== "" ? (
            <p>
              Frontend Name: <b>{import.meta.env.VITE_FRONTEND_NAME}</b>
            </p>
          ) : (
            <></>
          )}

          <p></p>
          {import.meta.env.VITE_MERCHANT_NAME !== undefined &&
          import.meta.env.VITE_MERCHANT_NAME !== "" ? (
            <>
              <p>
                Merchant Name: <b>{import.meta.env.VITE_MERCHANT_NAME}</b>
              </p>
            </>
          ) : (
            <></>
          )}

          {this.props.isLoadingAboutUs ? (
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
            // <div className="bodytext" style={{ textAlign: "center" }}>
            //   <p>Sorry, "About Us" has not been made.</p>
            // </div>
            <>
              <AboutUsCreate
                handleAboutUsConfirmModal={this.props.handleAboutUsConfirmModal}
              />
            </>
          ) : (
            <></>
          )}

          {this.props.AboutUsDoc !== "" && !this.props.isLoadingAboutUs ? (
            // <div className="bodytext" style={{ textAlign: "center" }}>
            //   <p>Sorry, "About Us" has not been made.</p>
            // </div>
            <>
              <AboutUsEdit
                handleAboutUsConfirmModal={this.props.handleAboutUsConfirmModal}
                AboutUsDoc={this.props.AboutUsDoc}
              />
            </>
          ) : (
            <></>
          )}

          {/* {this.props.AboutUsDoc === "" && !this.props.isLoadingAboutUs ? (
            <div className="bodytext" style={{ textAlign: "center" }}>
              <p>Sorry, "About Us" has not been made.</p>
            </div>
          ) : (
            <>
              <p>
                Supported Regions:{" "}
                <b>{this.props.AboutUsDoc.details.supportedRegions}</b>
              </p>
              <p style={{ whiteSpace: "pre-wrap" }}>
                {this.props.AboutUsDoc.details.description}
              </p>
            </>
          )} */}
        </div>
      </>
    );
  }
}

export default AboutUsPageMerchant;
