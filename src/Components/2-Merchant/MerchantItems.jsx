import React from "react";

import MerchantItem from "./MerchantItem";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class MerchantItems extends React.Component {
  render() {
    let today = new Date();
    let yesterday = new Date(today);

    yesterday.setDate(yesterday.getDate() - 1);

    let inventoryLength = this.props.Inventory.length;

    let items = this.props.Inventory.map((item, index) => {
      //console.log(post);
      return (
        // <div key={index} style={{ marginBottom: "0.1rem" }}>
        <Col key={index} lg={4}>
          <MerchantItem
            whichNetwork={this.props.whichNetwork}
            // key={index}
            mode={this.props.mode}
            index={index}
            item={item}
            today={today}
            yesterday={yesterday}
            identity={this.props.identity} //For if my review so can edit
            //uniqueName={this.props.uniqueName}
            handleSelectedItem={this.props.handleSelectedItem}
            //
            moveItemUpDown={this.props.moveItemUpDown}
            inventoryLength={inventoryLength}
            needToSaveInventory={this.props.needToSaveInventory}
          />
        </Col>
        // </div>
      );
    });

    return (
      <>
        <Row className="justify-content-md-center">{items}</Row>
      </>
    );
  }
}

export default MerchantItems;
