import React from "react";

import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";

//import LowCreditsOnPage from "../LowCreditsOnPage";
import CreditsOnPage from "../CreditsOnPage";

import YourOrders from "./YourOrders";

class YourOrdersPage extends React.Component {
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
    //   if (this.props.isLoginComplete && this.props.InitialPullCustomer) {
    //     this.props.pullInitialTriggerCUSTOMER();
    //   }
  }
  render() {
    return (
      <>
        <div
          className="bodytext"
          ref={(el) => {
            this.positionStart = el;
          }}
        >
          {/* <LowCreditsOnPage
            identityInfo={this.props.identityInfo}
            uniqueName={this.props.uniqueName}
            showModal={this.props.showModal}
          /> */}

          <CreditsOnPage
            identityInfo={this.props.identityInfo}
            uniqueName={this.props.uniqueName}
            showModal={this.props.showModal}
          />

          {this.props.isYourOrdersRefreshReady ? (
            <div className="d-grid gap-2" id="button-edge-noTop">
              <Button
                variant="primary"
                onClick={() => {
                  this.props.refreshYourOrders();
                }}
                style={{
                  fontSize: "larger",
                  paddingLeft: "1rem",
                  paddingRight: "1rem",
                }}
              >
                <b>Refresh</b>
              </Button>
            </div>
          ) : (
            <>
              <div className="d-grid gap-2" id="button-edge-noTop">
                <Button
                  variant="primary"
                  disabled
                  style={{
                    fontSize: "larger",
                    paddingLeft: "1rem",
                    paddingRight: "1rem",
                  }}
                >
                  <b>Refresh</b>
                </Button>
              </div>
            </>
          )}
          <p></p>
          <h5 style={{ marginTop: ".2rem" }}>
            <b>Your Orders</b>{" "}
          </h5>

          {this.props.isLoadingInventory || this.props.isLoadingOrders ? (
            <>
              <div id="spinner">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
              <p></p>
            </>
          ) : (
            <></>
          )}

          {this.props.UnconfirmedOrders.length === 0 ||
          this.props.isLoadingOrders ? (
            <></>
          ) : (
            <>
              <YourOrders
                whichNetwork={this.props.whichNetwork}
                mode={this.props.mode}
                identity={this.props.identity}
                MerchantNameDoc={this.props.MerchantNameDoc}
                uniqueName={this.props.uniqueName}
                //
                handleSelectedPage={this.props.handleSelectedPage}
                handleSelectedItem={this.props.handleSelectedItem}
                handleCustomerReplyModalShow={
                  this.props.handleCustomerReplyModalShow
                }
                handleDeleteOrderModal={this.props.handleDeleteOrderModal}
                //
                isLoadingInventory={this.props.isLoadingInventory}
                isLoadingOrders={this.props.isLoadingOrders}
                Inventory={this.props.Inventory}
                ShippingInitial={this.props.ShippingInitial}
                UnconfirmedOrders={this.props.UnconfirmedOrders}
                ConfirmedOrders={this.props.ConfirmedOrders}
                OrderReplies={this.props.OrderReplies}
              />
            </>
          )}

          {this.props.UnconfirmedOrders.length === 0 &&
          !this.props.isLoadingOrders ? (
            <div className="bodytext" style={{ textAlign: "center" }}>
              <p>Sorry, no orders have been made.</p>
            </div>
          ) : (
            <></>
          )}
        </div>
      </>
    );
  }
}

export default YourOrdersPage;
