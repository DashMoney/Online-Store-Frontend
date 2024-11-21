import React from "react";

import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";

import LowCreditsOnPage from "../LowCreditsOnPage";
import CreditsOnPage from "../CreditsOnPage";

import CustomerItems from "./CustomerItems";

class InventoryPage extends React.Component {
  componentDidMount() {
    // if (this.props.isLoginComplete && this.props.InitialPullReviews) {
    //   this.props.pullInitialTriggerREVIEWS();
    // }
  }
  render() {
    return (
      <>
        <div className="bodytext">
          <LowCreditsOnPage
            identityInfo={this.props.identityInfo}
            uniqueName={this.props.uniqueName}
            showModal={this.props.showModal}
          />

          {/* <CreditsOnPage
                    identityInfo={this.props.identityInfo}
                    uniqueName={this.props.uniqueName}
                    showModal={this.props.showModal}
                  /> */}

          {this.props.isLoadingInventory ? (
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
          )}

          {/* <Inventory
            mode={this.props.mode}
            Inventory={this.props.Inventory}
            //handleSelectedPage={this.props.handleSelectedPage}
            handleSelectedItem={this.props.handleSelectedItem}
            //SearchedReviewNames={this.props.SearchedReviewNames}
          /> */}

          <CustomerItems
            Inventory={this.props.Inventory}
            whichNetwork={this.props.whichNetwork}
            identity={this.props.identity}
            uniqueName={this.props.uniqueName}
            handleSelectedItem={this.props.handleSelectedItem}
            //
            //moveItemUpDown={this.props.moveItemUpDown}
            //needToSaveInventory={needToSaveInventory}
            //
            isLoadingWallet={this.props.isLoadingWallet}
            accountHistory={this.props.accountHistory}
            mode={this.props.mode}
            isLoadingYourInventory={this.props.isLoadingYourInventory}
            isYourInventoryRefreshReady={this.props.isYourInventoryRefreshReady}
            refreshYourInventory={this.props.refreshYourInventory}
            //handleYourItemMsgModalShow={this.props.handleYourItemMsgModalShow}
          />

          {this.props.Inventory.length === 0 &&
          !this.props.isLoadingInventory ? (
            <div className="bodytext" style={{ textAlign: "center" }}>
              <p>Sorry, there are no items available.</p>
            </div>
          ) : (
            <></>
          )}
        </div>
      </>
    );
  }
}

export default InventoryPage;
