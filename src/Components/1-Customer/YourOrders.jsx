import React from "react";

import YourOrder from "./YourOrder";

class YourOrders extends React.Component {
  render() {
    let today = new Date();
    let yesterday = new Date(today);

    yesterday.setDate(yesterday.getDate() - 1);

    let orders = this.props.UnconfirmedOrders.map((order, index) => {
      //console.log(post);
      return (
        <div key={index} style={{ marginBottom: "0.5rem" }}>
          <YourOrder
            //key={index}
            whichNetwork={this.props.whichNetwork}
            mode={this.props.mode}
            index={index}
            order={order}
            today={today}
            yesterday={yesterday}
            identity={this.props.identity} //For if my review so can edit
            //
            MerchantNameDoc={this.props.MerchantNameDoc}
            uniqueName={this.props.uniqueName}
            //
            handleSelectedYourOrder={this.props.handleSelectedYourOrder}
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
        </div>
      );
    });

    return <>{orders}</>;
  }
}

export default YourOrders;
