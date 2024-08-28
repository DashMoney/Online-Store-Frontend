import React from "react";

import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import CreditsOnPage from "../CreditsOnPage";

import handleDenomDisplay from "../UnitDisplay";

import Orders from "./Orders";

class OrdersPage extends React.Component {
  // componentDidMount() {
  //   if (this.props.isLoginComplete && this.props.InitialPullMerchant) {
  //     this.props.pullInitialTriggerMERCHANT();
  //   }
  // }

  render() {
    return (
      <>
        <div className="bodytext">
          <CreditsOnPage
            identityInfo={this.props.identityInfo}
            uniqueName={this.props.uniqueName}
            showModal={this.props.showModal}
          />

          {this.props.isMerchantOrdersRefreshReady ? (
            <>
              <div className="d-grid gap-2" id="button-edge-noTop">
                <Button
                  variant="primary"
                  onClick={() => {
                    this.props.refreshMerchantOrders();
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
              <p></p>
            </>
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
              <p></p>
            </>
          )}

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

          {this.props.isLoadingOrders ? (
            <></>
          ) : (
            <>
              <Orders
                whichNetwork={this.props.whichNetwork}
                Inventory={this.props.Inventory}
                UnconfirmedOrders={this.props.UnconfirmedOrders}
                ConfirmedOrders={this.props.ConfirmedOrders}
                UnconfirmedOrdersNames={this.props.UnconfirmedOrdersNames}
                OrderReplies={this.props.OrderReplies}
                //
                handleSelectedItem={this.props.handleSelectedItem}
                handleConfirmOrderModal={this.props.handleConfirmOrderModal}
                handleMerchantReplyModalShow={
                  this.props.handleMerchantReplyModalShow
                }
                handleMerchantOrderFilter={this.props.handleMerchantOrderFilter}
                handleDeleteBlockConfirmModal={
                  this.props.handleDeleteBlockConfirmModal
                }
                //
                identity={this.props.identity}
                uniqueName={this.props.uniqueName}
                isLoadingWallet={this.props.isLoadingWallet}
                accountHistory={this.props.accountHistory}
                mode={this.props.mode}
                DisplayOrders={this.props.DisplayOrders}
                //
                isLoadingOrders={this.props.isLoadingOrders}
                isOrdersRefreshReady={this.props.isOrdersRefreshReady}
                refreshOrders={this.props.refreshOrders}
              />
            </>
          )}
        </div>
      </>
    );
  }
}

export default OrdersPage;
