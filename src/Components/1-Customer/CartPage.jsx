import React from "react";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
//import Form from "react-bootstrap/Form";

import handleDenomDisplay from "../UnitDisplay";

import { IoMdArrowRoundBack } from "react-icons/io";

//import MerchantItem from "./MerchantItem"; //Old old
import CartItem from "./CartItem";

class CartPage extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     selectedCategory: "",
  //   };
  // }
  handleTotalItems = () => {
    let numOfItems = 0;
    this.props.CartItems.forEach((tuple) => {
      // this.props.merchantItems.find((item)=>{
      //   return item.$id === tuple[0].$id
      // })
      numOfItems += tuple[1];
    });

    return (
      <span>
        {numOfItems} {numOfItems > 1 ? <span>items</span> : <span>item</span>}
      </span>
    );
  };

  handleTotal = () => {
    //this.prop.CartItems AND this.props.merchantItems
    let theTotal = 0;

    this.props.CartItems.forEach((cartTuple) => {
      //NEED TO GET THE PRICE FROM THE INVENTORY LIKE I GET THE QTY FROM THE INVENTORY
      // let variantFromInventory = this.props.Inventory.find((item) => {
      //   return (
      //     item.itemId === cartTuple[0].itemId &&
      //     item.variants[0] === cartTuple[0].variant
      //   );
      // });

      let theItem = this.props.Inventory.find((item) => {
        return item.itemId === cartTuple[0].itemId;
      }); //this gets active as well

      let theVariant = theItem.variants.find((vari) => {
        return vari[0] === cartTuple[0].variant;
      });

      if (theVariant[2] !== 0) {
        theTotal += cartTuple[1] * theVariant[2];
        //console.log(theTotal);
      }
    });

    return (
      <h4 className="indentMembers" style={{ color: "#008de4" }}>
        <b>{handleDenomDisplay(this.props.whichNetwork, theTotal)}</b>
      </h4>
    );
  };

  // handleCategory = (category) => {
  //   this.setState({
  //     selectedCategory: category,
  //   });
  // };

  // handleCatBack = () => {
  //   this.setState({
  //     selectedCategory: "",
  //   });
  // };

  render() {
    //First sort out items that have categories and which do not
    // let categoryItems = [];
    // let nonCatItems = [];

    // this.props.merchantItems.forEach((item) => {
    //   if (item.category === undefined || item.category === "") {
    //     nonCatItems.push(item);
    //   } else {
    //     categoryItems.push(item);
    //   }
    // });

    // Next create a list of buttons based on the category names
    // let categoryNames = categoryItems.map((item) => {
    //   return item.category;
    // });

    // let setOfCatNames = [...new Set(categoryNames)];

    // categoryNames = [...setOfCatNames];

    // let categoryButtons = categoryNames.map((category, index) => (
    //   <Button
    //     key={index}
    //     variant="primary"
    //     onClick={() => {
    //       this.handleCategory(category);
    //     }}
    //   >
    //     <b>{category}</b>
    //   </Button>
    // ));

    // // display category above or below items? -> above I think, thought about below to indicate specials but its bad design.

    // let itemsToDisplay = [];

    // if (this.state.selectedCategory === "") {
    //   itemsToDisplay = nonCatItems;
    // } else {
    //   itemsToDisplay = categoryItems.filter((item) => {
    //     return item.category === this.state.selectedCategory;
    //   });
    // }

    // let items = itemsToDisplay.map((item, index) => {
    //   //console.log(item);
    //   return (
    //     <MerchantItem
    //       handleAddToCartModal={this.props.handleAddToCartModal}
    //       key={index}
    //       mode={this.props.mode}
    //       index={index}
    //       item={item}
    //       addToCart={this.props.addToCart}
    //     />
    //   );
    // });

    let CartItems = this.props.CartItems.map((item, index) => {
      //console.log(item);
      return (
        <CartItem
          handleEditCartItemModal={this.props.handleEditCartItemModal}
          Inventory={this.props.Inventory}
          whichNetwork={this.props.whichNetwork}
          key={index}
          mode={this.props.mode}
          index={index}
          item={item}
        />
      );
    });

    return (
      <>
        <>
          <div
            className="bodytext" //bodytextnotop
          >
            <div
              className="d-grid gap-2"
              style={{
                marginBottom: "1rem",
              }}
            >
              <Button
                variant="primary"
                size="lg"
                onClick={() => this.props.handleSelectedPage("Inventory")}
              >
                <b>Back to Shopping</b>
              </Button>
            </div>
            <h2>Your Cart</h2>
            {this.props.isLoadingShoppingCart ? (
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
            {this.props.CartItems.length === 0 ? (
              <p>(Items you add to cart will appear here)</p>
            ) : (
              <>
                {CartItems}
                <p></p>
                <div className="cartTotal">
                  <h4>
                    <b>Total</b> ({this.handleTotalItems()})<b>:</b>
                  </h4>

                  {this.handleTotal()}
                </div>
              </>
            )}
            <p></p>
            {this.props.CartItems.length > 0 &&
            this.props.isLoginComplete &&
            !this.props.isLoadingShoppingCart ? (
              <>
                <div
                  className="d-grid gap-2" //className="ButtonRight"
                >
                  <Button
                    size="lg"
                    variant="success"
                    onClick={() => this.props.showModal("PlaceOrderModal")}
                  >
                    <b>Place Order</b>
                  </Button>
                </div>
                <p></p>
              </>
            ) : (
              <>
                <div
                  className="d-grid gap-2" //className="ButtonRight"
                >
                  <Button size="lg" variant="success" disabled>
                    <b>Place Order</b>
                  </Button>
                </div>
                <p></p>
              </>
            )}
            {!this.props.isLoginComplete?<>
              <p
                className="textsmaller"
                style={{ marginTop: ".5rem", textAlign: "center" }}
              >
                <b> *Sign in to place your order!*</b>{" "}
              </p>
            </>:<></>}
          </div>
        </>{" "}
        {/* This is to close the LoadingOrder */}
      </>
    );
  }
}

export default CartPage;
