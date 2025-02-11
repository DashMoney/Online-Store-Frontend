import React from "react";

import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import CreditsOnPage from "../CreditsOnPage";

import MerchantItems from "./MerchantItems";

class YourInventoryPage extends React.Component {
  // componentDidMount() {
  //   if (this.props.isLoginComplete && this.props.InitialPullInventory) {
  //     this.props.pullInitialTriggerRENTALS();
  //   }
  // }

  render() {
    //THIS IS WHERE THE COMPARE FOR SAVE/EDIT BUTTON / TAG GOES
    //compare the InventoryRaw.items to the Inventory of the JSON.stringify so just comparing if the strings are the same easy and clean
    let needToSaveInventory = false;
    if (
      JSON.stringify(this.props.Inventory) !==
      JSON.stringify(this.props.InventoryInitial)
    ) {
      needToSaveInventory = true;
    }
    return (
      <>
        <div className="bodytext">
          <CreditsOnPage
            identityInfo={this.props.identityInfo}
            uniqueName={this.props.uniqueName}
            showModal={this.props.showModal}
          />

          {/* <div id="sidetextonlysides">
            {this.props.isLoadingWallet ? (
              <>
                <div className="paddingBadge">
                  <b>Wallet Balance</b>

                  <h4>Loading..</h4>
                </div>
              </>
            ) : (
              <>
                <div className="paddingBadge">
                  <b>Wallet Balance</b>
                  <h4 style={{ color: "#008de4" }}>
                    <b>{handleDenomDisplay(this.props.whichNetwork,this.props.accountBalance, 1)}</b>
                  </h4>
                </div>
              </>
            )}
          </div> */}
          {/* Save Changes */}

          {needToSaveInventory && !this.props.isLoadingInventory ? (
            <>
              <div className="d-grid gap-2">
                <Button
                  // size="lg"
                  variant="success"
                  onClick={() => this.props.showModal("SaveInventoryModal")}
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

          <div className="d-grid gap-2">
            {!this.props.isLoadingInventory &&
            this.props.Inventory.length <= 14 ? (
              <>
                <Button
                  variant="primary"
                  onClick={() => this.props.handleSelectedPage("Add Item")}
                >
                  <b style={{ fontSize: "larger" }}>Add Item</b>
                </Button>
              </>
            ) : (
              <>
                <Button variant="primary" disabled>
                  <b style={{ fontSize: "larger" }}>Add Item</b>
                </Button>
              </>
            )}
          </div>
          {this.props.Inventory.length > 14 ? (
            <>
              <p className="textsmaller">(Limit of 15 items)</p>
            </>
          ) : (
            <></>
          )}

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

          <p></p>
          <MerchantItems
            whichNetwork={this.props.whichNetwork}
            Inventory={this.props.Inventory}
            identity={this.props.identity}
            uniqueName={this.props.uniqueName}
            handleSelectedItem={this.props.handleSelectedItem}
            //
            moveItemUpDown={this.props.moveItemUpDown}
            needToSaveInventory={needToSaveInventory}
            //
            isLoadingWallet={this.props.isLoadingWallet}
            accountHistory={this.props.accountHistory}
            mode={this.props.mode}
            isLoadingYourInventory={this.props.isLoadingYourInventory}
            isYourInventoryRefreshReady={this.props.isYourInventoryRefreshReady}
            refreshYourInventory={this.props.refreshYourInventory}
            //handleYourItemMsgModalShow={this.props.handleYourItemMsgModalShow}
          />
        </div>
      </>
    );
  }
}

export default YourInventoryPage;
