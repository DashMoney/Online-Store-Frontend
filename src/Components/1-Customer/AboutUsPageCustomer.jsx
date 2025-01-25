import React from "react";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

class AboutUsPageCustomer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      copiedName: false,
    };
  }

  handleNameClick = (nameLabel) => {
    navigator.clipboard.writeText(nameLabel);
    this.setState({
      copiedName: true,
    });
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
          {/* <CreditsOnPage
            identityInfo={this.props.identityInfo}
            uniqueName={this.props.uniqueName}
            showModal={this.props.showModal}
          /> */}

          <h2 style={{ textAlign: "center", marginBottom: ".8rem" }}>
            About Us
          </h2>

          {import.meta.env.VITE_FRONTEND_NAME !== undefined &&
          import.meta.env.VITE_FRONTEND_NAME !== "" ? (
            <h5>
              Frontend Name: <b>{import.meta.env.VITE_FRONTEND_NAME}</b>
            </h5>
          ) : (
            <></>
          )}

          {import.meta.env.VITE_MERCHANT_NAME !== undefined &&
          import.meta.env.VITE_MERCHANT_NAME !== "" ? (
            <>
              <h5>
                Merchant Name:{" "}
                <b
                  style={{ color: "#008de4" }}
                  onClick={() =>
                    this.handleNameClick(import.meta.env.VITE_MERCHANT_NAME)
                  }
                >
                  {import.meta.env.VITE_MERCHANT_NAME}
                </b>
                <span>{this.state.copiedName ? <span>✅</span> : <></>}</span>
              </h5>
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
          <p></p>
          {this.props.AboutUsDoc === "" && !this.props.isLoadingAboutUs ? (
            <div className="bodytext" style={{ textAlign: "center" }}>
              <p>Sorry, "About Us" has not been made yet.</p>
            </div>
          ) : (
            <></>
          )}

          {this.props.AboutUsDoc !== "" && !this.props.isLoadingAboutUs ? (
            <>
              {" "}
              <p>
                Supported Regions:{" "}
                <b>{this.props.AboutUsDoc.details.supportedRegions}</b>
              </p>
              <p style={{ whiteSpace: "pre-wrap" }}>
                {this.props.AboutUsDoc.details.description}
              </p>
            </>
          ) : (
            <></>
          )}
        </div>
      </>
    );
  }
}

export default AboutUsPageCustomer;
