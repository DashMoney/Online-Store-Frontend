import React from "react";
import LocalForage from "localforage";

import Image from "react-bootstrap/Image";

import DashBkgd from "./Images/dash_digital-cash_logo_2018_rgb_for_screens.png";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import TopNav from "./Components/TopNav/TopNav";

import "./App.css";
import LoginForm from "./Components/0-LoginPage/LoginForm";
import AccountLogin from "./Components/0-LoginPage/AccountLogin";

import YourInventoryPage from "./Components/2-Merchant/YourInventoryPage";
import OrdersPage from "./Components/2-Merchant/OrdersPage";

import CreateItemPage from "./Components/2-Merchant/ItemModals&Pages/CreateItemPage";
import EditItemModal from "./Components/2-Merchant/ItemModals&Pages/EditItemModal";
import DeleteItemModal from "./Components/2-Merchant/ItemModals&Pages/DeleteItemModal";
import SaveInventoryModal from "./Components/2-Merchant/ItemModals&Pages/SaveInventoryModal";

import YourSelectedItem from "./Components/2-Merchant/YourSelectedItem";
import ConfirmOrderModal from "./Components/2-Merchant/ItemModals&Pages/ConfirmOrderModal";

import InventoryPage from "./Components/1-Customer/InventoryPage";
import YourOrdersPage from "./Components/1-Customer/YourOrdersPage";

import SelectedCustomerItem from "./Components/1-Customer/SelectedCustomerItem";
import AddItemToCartModal from "./Components/1-Customer/CustomerModals/AddItemToCartModal";
import EditCartItemModal from "./Components/1-Customer/CustomerModals/EditCartItemModal";
import PlaceOrderModal from "./Components/1-Customer/CustomerModals/PlaceOrderModal";
import DeleteOrderModal from "./Components/1-Customer/CustomerModals/DeleteOrderModal";

import CartPage from "./Components/1-Customer/CartPage";

import CustomerReplyModal from "./Components/1-Customer/CustomerModals/CustomerReplyModal";
import MerchantReplyModal from "./Components/2-Merchant/ItemModals&Pages/MerchantReplyModal";

import TopUpIdentityModal from "./Components/TopUpIdentityModal";
import FrontEndExplaination from "./Components/FrontEndExplaination";

import CreateNewWalletModal from "./Components/0-LoginPage/CreateNewWalletModal";
import RegisterIdentityModal from "./Components/0-LoginPage/RegisterIdentityModal";

import RegisterProxyModal from "./Components/0-LoginPage/RegisterProxyModal";

//import WalletTXModal from "./Components/WalletTXModal";

import SendFundsModal from "./Components/0-LoginPage/SendFundsModal";
import LogoutModal from "./Components/0-LoginPage/LogoutModal";

import dapiClient from "./Components/DapiClient";
import dapiClientNoWallet from "./Components/DapiClientNoWallet";

import Dash from "dash";

const {
  PlatformProtocol: { Identifier },
} = Dash;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,

      mode: import.meta.env.VITE_BKGD,
      //mode: "dark", //from .env -> import.meta.env.VITE_BKGD

      //ACCOUNT 'LOGIN' PAGE STATE
      isLoadingIdentity: true,
      isLoadingIdInfo: true,
      //isLoadingCreditTransfer: false,
      //isLoadingName: true,
      isLoadingProxy: true,
      isLoadingMerchantName: true,

      isLoadingWallet: true, //For wallet for topup

      // isIdentityControlShowing: false,

      identityError: false,
      idInfoError: false,
      nameError: false,
      //ACCOUNT 'LOGIN' PAGE STATE^^^^^^

      selectedPage: "Inventory", //"Orders",  //"Inventory" //"Orders"

      presentModal: "",
      isModalShowing: false,
      whichNetwork: import.meta.env.VITE_NETWORK,

      mnemonic: "",

      identity: "",
      identityInfo: "",
      identityRaw: "",
      identityRegisterCount: 0,
      //uniqueName: "",
      proxyName: "",

      ProxyDoc: "", //{
      //   $ownerId: "ha84h9aguia4khai4",
      //   controlId: "thisIdentity",
      //   $createdAt: Date.now() - 1000000,
      //},
      ProxyController: {
        proxyList: [],
        //proxyList: ["3498g7w4o4h9qph4"]
      },
      ProxyNameDoc: "",

      CustomerProxy1: false,
      CustomerProxy2: false,

      accountBalance: "",
      accountHistory: "",
      accountAddress: "",
      walletId: "",

      platformLogin: false,

      DashMoneyLFKeys: [],
      //
      skipSynchronizationBeforeHeight: 1029000,

      //skipSynchronizationBeforeHeightTESTNET: 1029000,

      //isLoadingInventory: false,  //FOR DEVELOPING
      //isLoadingOrders: false, //FOR DEVELOPING

      isLoadingInventory: true,
      isLoadingOrders: true,
      isLoadingShoppingCart: false,

      Inventory1: false,
      Inventory2: false,

      SelectedItem: "", // should be the item document? the item in the array and the variant
      SelectedItemIndex: "", //for editing and deleting item
      //
      SelectedCartItem: "",
      // {name: Name, variantName: VarName, price: Price }
      SelectedCartItemIndex: "",
      //

      SelectedOrder: "",
      SelectedOrderIndex: "",
      SelectedOrderNameDoc: "",

      CartItems: [
        // [
        //   {
        //     itemId: "Cool T-Shirt345",
        //     variant: "",
        //   },
        //   1,
        // ],
      ],
      //"", 10, 120000000
      //Tuples of [cartItem,Qty2Purchase]

      SelectedConfirm: "",
      SelectedConfirmIndex: "",

      SelectedReplyNameDoc: "", //Just for merchant reply

      isMerchantOrdersRefreshReady: true,
      isYourOrdersRefreshReady: true,

      Merchant1: false,
      Merchant2: false,

      InitialPullCustomer: true,
      InitialPullMerchant: true,

      //StoreFront (Document) - Unique
      //Pull this when toggle - About Page <- ***
      MerchantStore: {
        MerchantName: "Dash Online Store", // ? .env OR DPNS name??
        //
        description: "The best store",
        supportedRegions: "USA,Canada,Mexico,EU",
        //   supportedPayments: "Dash 2-Party, DashPay" //--FUTURE POSSIBILITY III--
        contact: "email@gmail",
        location: "Fargo, ND",
        //shippingCost: ?
      },

      InventoryDoc: {
        // $id: "6w6lwwwwwwwwwwg",
        // $ownerId: "47hare67867867768uifh",
        // $createdAt: Date.now() - 400000,
        // $updatedAt: Date.now() - 400000,
        // open: true, //Open or Close
        // //Inventories are separate categories??? ->
        // // FIRST TAKE - KISS
        // items: [
        //   {
        //     //ITEM -> Points to Category, Contains variants
        //     // Categoty(Plural)-Shirts, Item(singular), Variant(Type)
        //     //
        //     //Category: "Clothing", //Optional - String //--FUTURE POSSIBILITY I--
        //     //
        //     //subCategory: "Shirts", //--FUTURE POSSIBILITY III--
        //     name: "Cool T-Shirt", //Title - String
        //     itemId: "Cool T-Shirt345",
        //     description: "blah blah blah description stuff", // - String
        //     //SKU: "??", // VARIANT NAME/TYPE/SKU ///SO PUT IN THE VARIANTS!! ***
        //     variants: [["", 10, 120000000]], // "",
        //     //[{'singletonSKU', 10, 120000000}]  // singleton, qty, price
        //     //
        //     //SubVariant: "", //--FUTURE POSSIBILITY III--
        //     //Quantity: 10,
        //     //ShippingCost: "", //???   //--FUTURE POSSIBILITY II-- // I THINK FOR NOW JUST ADD STANDARD SHIPPING COST AND ADJUST IN PAYMENT??
        //     imgArray: ["https://i.imgur.com/znIcOgA.jpeg"],
        //     //linkArray: "",
        //     //price: 120000000,
        //     active: true,
        //   },
        //   {
        //     //ITEM -> Points to Category, Contains variants
        //     name: "Dash Water Bottle", //Title - String
        //     itemId: "Dash Water Bottle97",
        //     description: "blah blah blah description stuff", // - String
        //     variants: [
        //       ["Large", "", 100000000],
        //       ["Medium", 0, 90000000],
        //       ["Small", 1, 50000000],
        //     ], //[{'singletonSKU', 10, 120000000}]  // singleton, qty, price
        //     imgArray: [
        //       "https://m.media-amazon.com/images/I/61rA3Ocd1TL._AC_SX679_.jpg",
        //     ],
        //     //linkArray: "",
        //     active: true,
        //   },
        // ],
      },
      InventoryInitial: [],
      // - ConfirmedOrders
      //InventoryItems:[], // Final, Display, Calculated, Present

      //Inventory/Category (Document) - Single-First, Multiple-Later!
      Inventory: [
        // {
        //   //ITEM -> Points to Category, Contains variants
        //   // Categoty(Plural)-Shirts, Item(singular), Variant(Type)
        //   //
        //   //Category: "Clothing", //Optional - String //--FUTURE POSSIBILITY I--
        //   //
        //   //subCategory: "Shirts", //--FUTURE POSSIBILITY III--
        //   name: "Cool T-Shirt", //Title - String
        //   itemId: "Cool T-Shirt345",
        //   description: "Light-weight, breathable, tri-blend polymer that is soft and machine washable.", // - String
        //   //SKU: "??", // VARIANT NAME/TYPE/SKU ///SO PUT IN THE VARIANTS!! ***
        //   variants: [["", 10, 120000000]], // "",
        //   //[{'singletonSKU', 10, 120000000}]  // singleton, qty, price
        //   //
        //   //SubVariant: "", //--FUTURE POSSIBILITY III--
        //   //Quantity: 10,
        //   //ShippingCost: "", //???   //--FUTURE POSSIBILITY II-- // I THINK FOR NOW JUST ADD STANDARD SHIPPING COST AND ADJUST IN PAYMENT??
        //   imgArray: ["https://i.imgur.com/znIcOgA.jpeg"],
        //   //linkArray: "",
        //   //price: 120000000,
        //   active: true,
        // },
        // {
        //   //ITEM -> Points to Category, Contains variants
        //   name: "Dash Water Bottle", //Title - String
        //   itemId: "Dash Water Bottle97",
        //   description: "Keep your drink cool or hot with the best bottles on the market!", // - String
        //   variants: [
        //     ["Large", "", 100000000],
        //     ["Medium", 0, 90000000],
        //     ["Small", 1, 50000000],
        //   ], //[{'singletonSKU', 10, 120000000}]  // singleton, qty, price
        //   imgArray: [
        //     "https://m.media-amazon.com/images/I/61rA3Ocd1TL._AC_SX679_.jpg",
        //   ],
        //   //linkArray: "",
        //   active: true,
        // },
      ],

      InventoryConfirms: [], //This is only confirms after the InventoryUpdateAt. instead of separate just take the part after the inventory has returned. -> NOT USED ->

      //Inventory

      UnconfirmedOrders: [
        // {
        //   $id: "6s5grhs5sgrtwg",
        //   $ownerId: "47s4hs5tg56wfh",
        //   $createdAt: Date.now() - 4000000,
        //   $updatedAt: Date.now() - 4000000,
        //   amt: 340000000,
        //   cart: [
        //     [
        //       {
        //         itemId: "Dash Water Bottle97",
        //         variant: "Large",
        //       },
        //       1,
        //     ],
        //     [
        //       {
        //         itemId: "Cool T-Shirt345",
        //         variant: "",
        //       },
        //       2,
        //     ],
        //   ],
        //   // cart: JSON.parse(returnedDoc.cart),
        //   // comment: returnedDoc.comment,
        //   // toId: this.state.payLaterOrderSHOPPING.toId, //the MerchantId
        //   // total:
        // },
      ],

      UnconfirmedOrdersNames: [
        // { $id: "6s5grhs5sgrtwg", $ownerId: "47s4hs5tg56wfh", label: "Alice" },
      ], //UnconfirmedRequestsNames //This is only used by Merchant

      ConfirmedOrders: [
        // {
        //   $id: "6w6lwwwwwwwwwwg",
        //   $ownerId: "47hare67867867768uifh",
        //   orderId: "6s5grhs5sgrtwg",
        //   //   toId: "ajlsku4infalu", // if order is deleted..
        //   //   cart: //But this can just use $updatedAt to make sure hasn't changes since CONFIRM, NEED FOR  INITAL INVENTORY ACCOUNT
        //   cart: [
        //     [
        //       {
        //         itemId: "Dash Water Bottle97",
        //         variant: "Large",
        //       },
        //       1,
        //     ],
        //     [
        //       {
        //         itemId: "Cool T-Shirt345",
        //         variant: "",
        //       },
        //       2,
        //     ],
        //   ],
        //   amt: 340000000, //This might be okay -> ACTUALLY USED TO VERIFY STATUS SO NECESSARY
        //   $createdAt: Date.now() - 300000,
        //   $updatedAt: Date.now() - 300000,
        // },
        // {
        //   $id: "6w6lwwwwdfgdwg",
        //   $ownerId: "47hare67867867768uifh",
        //   orderId: "6s5grhs5sgrtwg",
        //   //   toId: "ajlsku4infalu", // if order is deleted..
        //   //   cart: //But this can just use $updatedAt to make sure hasn't changes since CONFIRM, NEED FOR  INITAL INVENTORY ACCOUNT
        //   cart: [
        //     [
        //       {
        //         itemId: "Dash Water Bottle97",
        //         variant: "Large",
        //       },
        //       1,
        //     ],
        //     [
        //       {
        //         itemId: "Cool T-Shirt345",
        //         variant: "",
        //       },
        //       2,
        //     ],
        //   ],
        //   amt: 340000000, //This might be okay -> ACTUALLY USED TO VERIFY STATUS SO NECESSARY
        //   $createdAt: Date.now() - 300000,
        //   $updatedAt: Date.now() - 300000,
        // },
      ],

      OrderReplies: [
        // {
        //   $id: "sdd8867td6h",
        //   confirmId: "6w6lwwwwwwwwwwg",
        //   $ownerId: "47hare67867867768uifh",
        //   $createdAt: Date.now() - 200000,
        //   $updatedAt: Date.now() - 200000,
        //   msg: "Hey Hey what you say!",
        // },
      ],

      MerchantId: import.meta.env.VITE_MERCHANT_IDENTITY,

      MerchantNameDoc: {
        label: "no name",
        //$ownerId: import.meta.env.VITE_MERCHANT_IDENTITY,
        // label: "DashMoney3", //import.meta.env.VITE_FRONTEND_NAME
      },

      DisplayOrders: "Orders", //Merchant order view? just PlacedOrders and Confirmed?

      //REVIEWS (BELOW)

      //isLoadingReviewsSearch: false,
      isLoadingYourReviews: true,

      SearchReviews1: false,
      SearchReviews2: false,

      YourReviews1: false,
      YourReviews2: false,

      YourReviews: [],
      YourReviewNames: [],

      YourReplies: [],
      //^^ Doesn't need names because they are only your replies.. -> yes

      // SearchedNameDoc: {
      //   $ownerId: "JAdeE9whiXXdxzSrz7Rd1i8aHC3XFh5AvuV7cpxcYYmN",
      //   label: "BurgerJoint",
      // },

      SearchedReviews: [
        // {
        //   $ownerId: "4h5j6j",
        //   $id: "7ku98rj",
        //   review: "Good service, would eat here again!",
        //   rating: 5,
        //   toId: "fjghtyru",
        //   $createdAt: Date.now() - 1000000,
        // },
      ],

      SearchedReviewNames: [
        // {
        //   $ownerId: "4h5j6j",
        //   label: "Alice",
        // },
      ],

      SearchedReplies: [
        // {
        //   $ownerId: "JAdeE9whiXXdxzSrz7Rd1i8aHC3XFh5AvuV7cpxcYYmN",
        //   $id: "klsui4312",
        //   reply: "Thanks Alice",
        //   reviewId: "7ku98rj",
        //   $createdAt: Date.now() - 300000,
        // },
      ],

      reviewToEdit: [], //use a function to find and pass to modal ->
      reviewToEditIndex: "",

      replyReview: [], //This is for the create reply reviewId
      replyToEdit: [],
      replyingToName: "",

      //REVIEWS STATE^^^^^^

      expandedTopNav: false,
    };
  }

  closeTopNav = () => {
    this.setState({
      expandedTopNav: false,
    });
  };

  toggleTopNav = () => {
    if (this.state.expandedTopNav) {
      this.setState({
        expandedTopNav: false,
      });
    } else {
      this.setState({
        expandedTopNav: true,
      });
    }
  };

  hideModal = () => {
    this.setState({
      isModalShowing: false,
    });
  };

  showModal = (modalName) => {
    this.setState({
      presentModal: modalName,
      isModalShowing: true,
    });
  };

  handleMode = () => {
    if (this.state.mode === "primary")
      this.setState(
        {
          mode: "dark",
        },
        () => this.setFrontendLFmode()
      );
    else {
      this.setState(
        {
          mode: "primary",
        },
        () => this.setFrontendLFmode()
      );
    }
  };

  setFrontendLFmode = () => {
    let DashFrontend = LocalForage.createInstance({
      name: "dash-frontend",
    });
    DashFrontend.setItem("mode", this.state.mode)
      .then((d) => {
        // console.log("Return from LF setitem:", d);
      })
      .catch((err) => {
        console.error("Something went wrong setting to localForage:\n", err);
      });
  };

  handleLogout = () => {
    window.location.reload();
  };

  componentDidMount() {
    LocalForage.config({
      name: "dash-frontend",
    });
    let DashFrontend = LocalForage.createInstance({
      name: "dash-frontend",
    });
    DashFrontend.getItem("mode")
      .then((modeVal) => {
        if (modeVal !== null) {
          this.setState({
            mode: modeVal,
          });
        }
      })
      .catch(function (err) {
        console.log(err);
      });
    //
    //2) GET WALLETID KEYS FOR OBTAINING IDENTITY
    //
    LocalForage.config({
      name: "dashmoney-platform-login",
    });
    let DashMoneyLF = LocalForage.createInstance({
      name: "dashmoney-platform-login",
    });

    DashMoneyLF.keys()
      .then((keys) => {
        this.setState({
          DashMoneyLFKeys: keys,
        });
        console.log(keys);
      })
      .catch(function (err) {
        console.log(err);
      });
    //****************************** */

    //NEED TO SET TESTNET OR MAINNET FOR THE DATA CONTRACTS HERE AND THEN CALL THE getInventory()
    //skipSynchronizationBeforeHeight <- ****
    //
    //WHAT ABOUT THE KEYS WELL THE WALLETS ARE DIFFERENT SO SHOULD NOT INTERFER..
    //
    //ALSO WHAT ABOUT GETTING THE OWNER NAME ? -> yes
    //  -> based on MerchantId ->

    //
    this.verifyNetworkAndSkipSync();
    //
  }

  verifyNetworkAndSkipSync = () => {
    // RUN CompDidMount

    //ALREADY SET IN COMPONENT PROPS
    // whichNetwork: import.meta.env.VITE_NETWORK,

    if (this.state.whichNetwork !== "mainnet") {
      this.setState(
        {
          whichNetwork: "testnet",
          // skipSynchronizationBeforeHeight:
          //   this.state.skipSynchronizationBeforeHeightTESTNET,
        },
        () => this.startInventoryRace()
      );
    } else {
      this.startInventoryRace();
    }
  };

  //ACCOUNT LOGIN FUNCTIONS => SIMPLE LOGIN FIRST
  triggerProxyLoading = () => {
    this.setState({
      isLoadingProxy: true,
    });
  };

  triggerProxyNotLoading = () => {
    this.setState({
      isLoadingProxy: false,
    });
  };

  //TRIGGER THE LOGIN PROCESS ->Simplest no LF setup <- CHANGING ->
  handleAccountLogin = (theMnemonic) => {
    if (this.state.DashMoneyLFKeys.length === 0) {
      this.setState(
        {
          isLoggedIn: true,
          mnemonic: theMnemonic,
        },
        () => this.getWalletAndIdentitywithMnem(theMnemonic)
      );
    } else {
      this.setState(
        {
          isLoggedIn: true,
          mnemonic: theMnemonic,
        },
        () => this.checkPlatformOnlyLogin(theMnemonic)
      );
    }
  };

  checkPlatformOnlyLogin = (theMnemonic) => {
    console.log("Called Check Platform Login");

    const clientOpts = {
      network: this.state.whichNetwork,
      wallet: {
        mnemonic: theMnemonic,
        offlineMode: true,
      },
    };

    const client = new Dash.Client(clientOpts);

    const getWalletId = async () => {
      const account = await client.getWalletAccount();

      //console.log("walletIdToTry:", walletIdToTry);

      return account.walletId;
    };

    getWalletId()
      .then((walletIdToTry) => {
        let isKeyAvail = this.state.DashMoneyLFKeys.includes(walletIdToTry);
        // console.log(`DashMoneyLF Test -> ${isKeyAvail}`);

        if (isKeyAvail) {
          console.log("This here is a login skip!!");
          //************* */
          let DashMoneyLF = LocalForage.createInstance({
            name: "dashmoney-platform-login",
          });

          DashMoneyLF.getItem(walletIdToTry)
            .then((val) => {
              //  console.log("Value Retrieved", val);
              if (
                val !== null ||
                typeof val.identity !== "string" ||
                val.identity === "" //||
                // val.name === "" ||
                // typeof val.name !== "string"
              ) {
                // console.log(val.identity);
                this.setState(
                  {
                    platformLogin: true,
                    identity: val.identity,
                    // uniqueName: val.name,
                    walletId: walletIdToTry,
                    // isLoadingProxy: false,
                    isLoadingIdentity: false,
                  },
                  () => this.handlePlatformLoginSeq(val.identity, theMnemonic)
                );
              } else {
                console.log("platform login FROM LF failed");
                //JUST DO NORMAL FULL LOGIN
                //IF LF FAILS FOR SOME REASON JUST DOES NORMAL LOGIN
                this.setState(
                  {
                    platformLogin: false,
                    identity: "",
                    //uniqueName: "",
                    walletId: walletIdToTry,
                  },
                  () => this.getWalletAndIdentitywithMnem(theMnemonic)
                );
              }
            })
            .catch((err) => {
              console.error(
                "Something went wrong getting from DashMoneyLF:\n",
                err
              );
            });
        } else {
          console.log("platform login FROM LF failed");
          //JUST DO NORMAL FULL LOGIN
          //FOR LOGIN WITH NEW MNEN BUT NOT IN LF
          this.setState(
            {
              platformLogin: false,
              walletId: walletIdToTry,
            },
            () => this.getWalletAndIdentitywithMnem(theMnemonic)
          );
        }
      })
      .catch((e) => console.error("Something went wrong:\n", e))
      .finally(() => client.disconnect());
  };

  handlePlatformLoginSeq = (theIdentity, theMnemonic) => {
    //
    this.getIdentityInfo(theIdentity);
    this.getProxyDoc(theIdentity);
    this.getWalletPlatformLogin(theMnemonic);
    //this.getAliasfromIdentity(theIdentity);
    //
  };

  handleAccountRetry = () => {
    this.setState(
      {
        isLoadingIdentity: true,
        isLoadingWallet: true,
      },
      () => this.getWalletAndIdentitywithMnem(this.state.mnemonic)
    );
  };

  // BELOW STANDARD LOGIN
  getWalletAndIdentitywithMnem = (theMnemonic) => {
    const client = new Dash.Client(
      dapiClient(
        this.state.whichNetwork,
        theMnemonic,
        this.state.skipSynchronizationBeforeHeight
      )
    );

    const retrieveIdentityIds = async () => {
      const account = await client.getWalletAccount();

      //console.log(account.getTotalBalance());
      // console.log(account.getUnusedAddress().address);
      //console.log(account.getTransactionHistory());

      this.setState({
        accountBalance: account.getTotalBalance(),
        accountAddress: account.getUnusedAddress().address,
        accountHistory: account.getTransactionHistory(),
        walletId: account.walletId,
      });

      return account.identities.getIdentityIds();
    };

    retrieveIdentityIds()
      .then((d) => {
        //  console.log("Mnemonic identities:\n", d);
        if (d.length === 0) {
          this.setState({
            isLoadingIdentity: false,
            isLoadingWallet: false,

            //These are not called so end loading
            isLoadingIdInfo: false,
            isLoadingProxy: false,

            identity: "no identity",
            //uniqueName: '', //Kicks out of platform login if identity is disabled but LF still retains.
          });
        } else {
          this.setState(
            {
              identity: d[0],
              isLoadingIdentity: false,
              isLoadingWallet: false,
              //maintain Loading bc continuing to other functions
            },
            () => this.conductFullLogin(d[0])
          );
          //   //
          //   //ADDS IDENTITY TO LF AFTER Login with already created proxy account and saves merchant login
          //   //  //******************** */
          let DashMoneyLF = LocalForage.createInstance({
            name: "dashmoney-platform-login",
          });
          let lfObject = {
            identity: d[0],
          };

          DashMoneyLF.setItem(this.state.walletId, lfObject)
            .then((d) => {
              //return DashMoneyLF.getItem(walletId);
              console.log("Return from LF setitem:", d);
            })
            .catch((err) => {
              console.error(
                "Something went wrong setting to DashMoneyLF:\n",
                err
              );
            });
          //   // //******************** */
        }
      })
      .catch((e) => {
        console.error(
          "Something went wrong getWalletAndIdentitywithMnem:\n",
          e
        );
        this.setState({
          identityError: true,
          isLoadingIdentity: false,
        });
      })
      .finally(() => client.disconnect());
  };

  conductFullLogin = (theIdentity) => {
    //THIS SHOULD CALL IDINFO, NAMES, AND ALIASES
    this.getIdentityInfo(theIdentity);
    this.getProxyDoc(theIdentity);
    this.LOGINCOMPLETEQueryTrigger(theIdentity);
    //this.getNamefromIdentity(theIdentity);
  };

  // BELOW PLATFORM LOGIN - WALLET PART
  getWalletPlatformLogin = (theMnemonic) => {
    const client = new Dash.Client(
      dapiClient(
        this.state.whichNetwork,
        theMnemonic,
        this.state.skipSynchronizationBeforeHeight
      )
    );

    const retrieveIdentityIds = async () => {
      const account = await client.getWalletAccount();

      //console.log(account.getTotalBalance());
      // console.log(account.getUnusedAddress().address);
      //console.log(account.getTransactionHistory());

      this.setState({
        accountBalance: account.getTotalBalance(),
        accountAddress: account.getUnusedAddress().address,
        accountHistory: account.getTransactionHistory(),
        //walletId: account.walletId,
      });

      return account.identities.getIdentityIds();
    };

    retrieveIdentityIds()
      .then((d) => {
        if (this.state.identity === d[0]) {
          //SHOULD IT NOT EVEN WORRY ABOUT THE IDENTITY?
          this.setState(
            {
              identity: d[0],
              isLoadingIdentity: false,
              isLoadingWallet: false,
            },
            () => this.LOGINCOMPLETEQueryTrigger(d[0])
          );
        }
      })
      .catch((e) => {
        console.error("Something went wrong getWalletPlatformLogin:\n", e);
      })
      .finally(() => client.disconnect());
  };

  getIdentityInfo = (theIdentity) => {
    // console.log("Called get identity info");

    const client = new Dash.Client(dapiClientNoWallet(this.state.whichNetwork));

    const retrieveIdentity = async () => {
      return client.platform.identities.get(theIdentity); // Your identity ID
    };

    retrieveIdentity()
      .then((d) => {
        if (d !== null) {
          console.log("Identity retrieved:\n", d.toJSON());
          let idInfo = d.toJSON();
          this.setState({
            isLoadingIdInfo: false,
            identityInfo: idInfo,
            identityRaw: d,
          });
        } else {
          console.log("No Identity Info retrieved");
          //If I have an identity then there will be something but if there isn't an identity than this is not called? ->
        }
      })
      .catch((e) => {
        console.error(
          "Something went wrong in retrieving the identityinfo:\n",
          e
        );
        this.setState({
          isLoadingIdInfo: false,
          idInfoError: true, //NEED TO HANDLE SO CAN DISPLAY ->
        });
      })
      .finally(() => client.disconnect());
  };

  // ProxyDoc: '',
  // ProxyController: {
  //   proxyList: [],
  // },
  // ProxyNameDoc: "",

  handleProxy = (proxyToAdd) => {
    // REPLACE ALL handleName ->
    //From ProxyDoc Register
    //this.loadIdentityCredits() // ADD THIS TO UPDATE THE CREDIT AMOUNT AFTER THE PROXY DOC CREATE. ->
    this.setState(
      {
        ProxyDoc: proxyToAdd,
        isLoadingProxy: false,
      },
      () => this.LOGINCOMPLETEQueryTrigger(this.state.identity)
    );
  };

  //THIS IS FOR GETTING THE PROXYDOC TO STATE AND START QUERY RACE

  getProxyDoc = (theIdentity) => {
    const client = new Dash.Client(dapiClientNoWallet(this.state.whichNetwork));

    const getDocuments = async () => {
      console.log("Called Query ProxyDoc");

      return client.platform.documents.get("ProxyContract.proxy", {
        where: [["$ownerId", "==", theIdentity]],
      });
    };

    getDocuments()
      .then((d) => {
        if (d.length === 0) {
          console.log("There are no ProxyDoc.");
          this.setState({
            isLoadingProxy: false,
          });
        } else {
          let proxyRetrieved = d[0].toJSON();

          proxyRetrieved.controlId = Identifier.from(
            proxyRetrieved.controlId,
            "base64"
          ).toJSON();

          console.log("Proxy retrieved:\n", proxyRetrieved);
          this.setState(
            {
              ProxyDoc: proxyRetrieved,
              //isLoadingProxy: false,
            },
            () => this.startProxyRace()
          );
        }
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
      })
      .finally(() => client.disconnect());
  };

  //WRITE SO CAN REUSE, FOR NAME WALLET WHEN CONNECTING PROXY
  startProxyRace = () => {
    if (!this.state.isLoadingProxy) {
      this.setState({ isLoadingProxy: true });
    }

    this.getProxyController(this.state.ProxyDoc);
    this.getProxyNameDoc(this.state.ProxyDoc);
  };

  customerProxyRace = () => {
    if (this.state.CustomerProxy1 && this.state.CustomerProxy2) {
      this.setState({
        CustomerProxy1: false,
        CustomerProxy2: false,
        isLoadingProxy: false,
      });
    }
  };

  getProxyController = (proxyDoc) => {
    const client = new Dash.Client(dapiClientNoWallet(this.state.whichNetwork));

    const getDocuments = async () => {
      // console.log("Called Query ProxyController");

      return client.platform.documents.get("ProxyContract.controller", {
        where: [["$ownerId", "==", proxyDoc.controlId]],
      });
    };

    getDocuments()
      .then((d) => {
        if (d.length === 0) {
          // console.log("There are no ProxyController.");
          this.setState(
            {
              CustomerProxy1: true,
            },
            () => this.customerProxyRace()
          );
        } else {
          let proxyControllerRetrieved = d[0].toJSON();

          proxyControllerRetrieved.proxyList = JSON.parse(
            proxyControllerRetrieved.proxyList
          );

          // console.log("Controller retrieved:\n", proxyControllerRetrieved);
          this.setState(
            {
              ProxyController: proxyControllerRetrieved,
              CustomerProxy1: true,
            },
            () => this.customerProxyRace()
          );
        }
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
      })
      .finally(() => client.disconnect());
  };

  getProxyNameDoc = (proxyDoc) => {
    const client = new Dash.Client(dapiClientNoWallet(this.state.whichNetwork));

    const retrieveNameByRecord = async () => {
      // Retrieve by a name's identity ID
      return client.platform.names.resolveByRecord(
        "identity",
        proxyDoc.controlId
      );
    };

    retrieveNameByRecord()
      .then((d) => {
        if (d.length === 0) {
          console.log("There are no ProxyNameDoc.");
          this.setState(
            {
              CustomerProxy2: true,
            },
            () => this.customerProxyRace()
          );
        } else {
          let proxyNameDocRetrieved = d[0].toJSON();

          //console.log("Name retrieved:\n", proxyNameDocRetrieved);
          this.setState(
            {
              ProxyNameDoc: proxyNameDocRetrieved,
              CustomerProxy2: true,
            },
            () => this.customerProxyRace()
          );
        }
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
      })
      .finally(() => client.disconnect());
  };

  //
  //FROM HANDLENAME() AND  getNamefromIdentity() AND getWalletPlatformLogin()
  // SO  NEW ACCOUNT  AND  NEW LOGIN             AND LOCALFORAGE
  //
  LOGINCOMPLETEQueryTrigger = (theIdentity) => {
    if (theIdentity === this.state.MerchantId) {
      this.startMerchantRace();
    } else {
      this.getYourOrders(theIdentity);
    }

    //if(this.state.platformLogin){}
  };

  // ####  ####  WRITE ACTIONS BELOW  #### ####

  registerIdentity = () => {
    //REIMPLEMENT LFOBJ CREATE WHEN GET TO THAT POINT <-

    this.setState({
      isLoadingIdentity: true,
      isLoadingIdInfo: true,
    });

    const client = new Dash.Client(
      dapiClient(
        this.state.whichNetwork,
        this.state.mnemonic,
        this.state.skipSynchronizationBeforeHeight
      )
    );

    const createIdentity = async () => {
      return client.platform.identities.register();
    };

    createIdentity()
      .then((d) => {
        console.log("Registered Identity:\n", d.toJSON());
        let idInfo = d.toJSON();
        this.setState({
          identity: idInfo.id,
          identityInfo: idInfo,
          identityRaw: d,
          uniqueName: "no name", //This sets up the next step
          isLoadingIdentity: false,
          isLoadingIdInfo: false,
          accountBalance: this.state.accountBalance - 1000000,
        });
        //
        //   //
        //   //ADDS IDENTITY TO LF AFTER Register of Identity
        //   //  //******************** */
        let DashMoneyLF = LocalForage.createInstance({
          name: "dashmoney-platform-login",
        });
        let lfObject = {
          identity: this.state.identity,
        };

        DashMoneyLF.setItem(this.state.walletId, lfObject)
          .then((d) => {
            //return DashMoneyLF.getItem(walletId);
            console.log("Return from LF setitem:", d);
          })
          .catch((err) => {
            console.error(
              "Something went wrong setting to DashMoneyLF:\n",
              err
            );
          });
        //   // //******************** */
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
        this.setState({
          identityRegisterCount: this.state.identityRegisterCount + 1,
          isLoadingIdentity: false,
          isLoadingIdInfo: false,
          identityError: true,
        });
      })
      .finally(() => client.disconnect());
  };

  doTopUpIdentity = (numOfCredits) => {
    this.setState({
      isLoadingIdInfo: true,
      identityInfo: "",
    });

    const client = new Dash.Client(
      dapiClient(
        this.state.whichNetwork,
        this.state.mnemonic,
        this.state.skipSynchronizationBeforeHeight
      )
    );

    const topupIdentity = async () => {
      const identityId = this.state.identity; // Your identity ID
      const topUpAmount = numOfCredits; // Number of duffs ie 1000

      await client.platform.identities.topUp(identityId, topUpAmount);
      return client.platform.identities.get(identityId);
    };

    topupIdentity()
      .then((d) => {
        console.log("Identity credit balance: ", d.balance);
        //Just manually add the topup amount
        this.setState({
          identityInfo: d.toJSON(),
          identityRaw: d,
          isLoadingIdInfo: false,
          accountBalance: this.state.accountBalance - 1000000,
        });
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
        this.setState({
          isLoadingIdInfo: false,
          //Add error state to handle identityInfo being set to '' or else will be stuck in loading state.. ->
        });
      })
      .finally(() => client.disconnect());
  };

  /*ACCOUNT LOGIN FUNCTIONS^^^^
   *
   *   #############
   *  ###
   *   #############
   *              ###
   *  #############
   */

  //BELOW - this is Initial Online Store!

  handleSelectedPage = (theDapp) => {
    this.setState({
      selectedPage: theDapp,
      expandedTopNav: false,
    });
  };

  handleSelectedItem = (theItem) => {
    this.setState({
      selectedPage: "Selected Item",
      SelectedItem: theItem,
      expandedTopNav: false,
    });
  };

  startInventoryRace = () => {
    if (!this.state.isLoadingInventory) {
      this.setState({ isLoadingInventory: true });
    }
    if (this.state.MerchantId !== "") {
      this.getInventory();
      this.getConfirms();
    } else {
      this.setState({
        Inventory1: false,
        Inventory2: false,

        isLoadingInventory: false,
      });
    }
  };

  inventoryRace = () => {
    if (this.state.Inventory1 && this.state.Inventory2) {
      this.setState(
        {
          Inventory1: false,
          Inventory2: false,
          isLoadingInventory: false,
          //isLoadingOrders: false,
        },
        () =>
          this.combineInventoryANDConfirms(
            this.state.InventoryDoc.items,
            this.state.ConfirmedOrders
          )
      );
    }
  };

  getInventory = () => {
    //console.log("Calling getInventory");
    // if (!this.state.isLoadingInventory) {
    //   this.setState({ isLoadingInventory: true });
    // }

    const client = new Dash.Client(dapiClientNoWallet(this.state.whichNetwork));

    const getDocuments = async () => {
      return client.platform.documents.get("ONLINESTOREContract.inventory", {
        where: [
          ["$ownerId", "==", this.state.MerchantId],
          ["$updatedAt", "<=", Date.now()],
        ],
        orderBy: [["$updatedAt", "desc"]],
      });
    };

    getDocuments()
      .then((d) => {
        if (d.length === 0) {
          //console.log("There are no Inventory");

          this.setState(
            {
              Inventory: [],
              InventoryDoc: [],
              // isLoadingInventory: false,
              Inventory1: true,
            },
            () => this.inventoryRace()
          );
        } else {
          let docArray = [];
          //console.log("Getting Inventory");

          for (const n of d) {
            let returnedDoc = n.toJSON();
            //console.log("Item:\n", returnedDoc);
            // returnedDoc.replyId = Identifier.from(
            //   returnedDoc.replyId,
            //   "base64"
            // ).toJSON();
            returnedDoc.items = JSON.parse(returnedDoc.items);
            // console.log("newItem:\n", returnedDoc);
            docArray = [...docArray, returnedDoc];
          }

          this.setState(
            {
              InventoryDoc: docArray[0],
              //Inventory: docArray[0].items,
              Inventory1: true,
            },
            () => this.inventoryRace()
          );
        }
      })
      .catch((e) => {
        console.error("Something went wrong Getting Inventory:\n", e);
      })
      .finally(() => client.disconnect());
  };

  // getConfirms = (inventoryUpdateAt) => {}; Just use same confirms for inventory and merchant orders

  getConfirms = () => {
    const client = new Dash.Client(dapiClientNoWallet(this.state.whichNetwork));

    const getDocuments = async () => {
      //console.log("Called Get Confirms");

      return client.platform.documents.get("ONLINESTOREContract.confirm", {
        where: [
          ["$ownerId", "==", this.state.MerchantId],
          ["$createdAt", "<=", Date.now()],
        ],
        orderBy: [["$createdAt", "desc"]],
      });
    };

    getDocuments()
      .then((d) => {
        //console.log("Getting YourOrdersConfirms");
        if (d.length === 0) {
          //console.log("There are no YourOrdersConfirms");

          this.setState(
            {
              InventoryConfirms: [],
              ConfirmedOrders: [],
              Inventory2: true,
            },
            () => this.inventoryRace()
          );
        } else {
          let docArray = [];

          for (const n of d) {
            let returnedDoc = n.toJSON();
            //console.log("Confirm:\n", returnedDoc);
            returnedDoc.orderId = Identifier.from(
              returnedDoc.orderId,
              "base64"
            ).toJSON();

            returnedDoc.cart = JSON.parse(returnedDoc.cart);

            // console.log("newConfirm:\n", returnedDoc);
            docArray = [...docArray, returnedDoc];
          }
          this.setState(
            {
              InventoryConfirms: docArray,
              ConfirmedOrders: docArray,
              Inventory2: true,
            },
            () => this.inventoryRace()
          );
        }
      })
      .catch((e) => {
        console.error("Something went wrong Confirms:\n", e);
      })
      .finally(() => client.disconnect());
  };

  combineInventoryANDConfirms = (theInventory, theConfirms) => {
    if (theInventory === undefined) {
      this.setState(
        {
          Inventory: [],
          InventoryInitial: [],
        },
        () => this.getMerchantName()
      );
    } else if (theInventory.length === 0) {
      this.setState(
        {
          Inventory: [],
          InventoryInitial: [],
        },
        () => this.getMerchantName()
      );
    } else if (theConfirms.length === 0) {
      this.setState(
        {
          Inventory: theInventory,
          InventoryInitial: theInventory,
        },
        () => this.getMerchantName()
      );
    } else {
      let filteredConfirms = theConfirms.filter((confirm) => {
        return confirm.$createdAt > this.state.InventoryDoc.$updatedAt;
      });
      this.combineInventoryANDConfirmsFunction(theInventory, filteredConfirms);
    }
  };

  combineInventoryANDConfirmsFunction = (theInventory, theConfirms) => {
    //Inventory.items is array.
    //take confirms docs so this needs a cart copy.

    //BELOW IS THE TICKET I THINK..

    /** I think the ticket is reduce the confirms to just a block of singleblock of reduced unique items
     * then find each item in the inventory and splice it
     */
    //*** */
    //1) CONSOLIDATE THE CONFIRMS

    // console.log(`theConfirms: ${theConfirms}`);

    let orderedItems = []; //This will be the reduced/sorted cartItem to reduce theInventory by
    let confirmsTupleToSort = []; //make this just an array of tuples

    theConfirms.forEach((confirm) => {
      //(BELOW)filters out old confirms //DO THIS IN PRIOR FUNCTION
      // if (confirm.$createdAt > this.state.InventoryDoc.$updatedAt) {
      confirm.cart.forEach((tuple) => {
        confirmsTupleToSort.push(tuple);
        // console.log(tuple);
      });
      // }
    });

    //console.log(`confirmsTupleToSort: ${confirmsTupleToSort}`);
    // console.log(`confirmsTupleToSort[0]: ${confirmsTupleToSort[0]}`);

    // [  // Cart Item Example
    //   {
    //     itemId: "Cool T-Shirt345",
    //     variant: "",
    //   },
    //   2,
    // ],

    if (confirmsTupleToSort.length !== 0) {
      //
      let totalQty = 0;
      let currentItem = confirmsTupleToSort[0][0];
      let foundIndex = 0;
      let continueSearch = true;
      //
      while (confirmsTupleToSort.length > 0 || continueSearch) {
        //
        // totalQty = 0;
        // currentItem = confirmsTupleToSort[0][0];
        // console.log(currentItem);
        // foundIndex = 0;
        continueSearch = true;

        //
        // while (continueSearch) {
        //
        //findIndex

        foundIndex = confirmsTupleToSort.findIndex((tuple) => {
          //console.log(tuple);
          return (
            currentItem.itemId === tuple[0].itemId &&
            currentItem.variant === tuple[0].variant
          );
        });
        //console.log(foundIndex);
        //
        // if not -1
        if (foundIndex !== -1) {
          //add qty to totalQty
          totalQty += confirmsTupleToSort[foundIndex][1];
          //and slice out of array

          //  console.log(`confirmsTupleToSort: ${confirmsTupleToSort}`);
          if (confirmsTupleToSort.length > 1) {
            confirmsTupleToSort.splice(foundIndex, 1);
          } else {
            //I don't think I need this the splice will return and empty array and not undefined so just simplify.
            confirmsTupleToSort = [];
          }
          // console.log(`confirmsTupleToSort: ${confirmsTupleToSort}`);
        }

        if (foundIndex === -1 || confirmsTupleToSort.length === 0) {
          //if -1
          //
          // add the current Item to the orderedItems
          orderedItems.push([currentItem, totalQty]);
          totalQty = 0;
          continueSearch = false;
          //reset total to 0
          if (confirmsTupleToSort.length !== 0) {
            currentItem = confirmsTupleToSort[0][0];
          }
          //
          foundIndex = 0;
          // change the currentItem to the nextItem
        }

        //this repeats until there are not more tuples to sort
        //
        //  }
      }
    }

    //console.log(`confirmsTupleToSort: ${confirmsTupleToSort}`);
    //console.log(`orderedItems: ${orderedItems}`);

    //2)CHANGE THIS TO INVENTORY INSTEAD OF CART CHANGES AND I THINK ITS GOOD
    //
    //and DONT FORGET TO HANDLE THE "" QTY DOESN'T MATTER ONES ->
    //

    let updatedInventory = [...theInventory];
    //
    orderedItems.forEach((removedItem) => {
      //
      let theItemIndex = theInventory.findIndex((item) => {
        return item.itemId === removedItem[0].itemId;
      });

      let theVariantIndex = theInventory[theItemIndex].variants.findIndex(
        (vari) => {
          return vari[0] === removedItem[0].variant;
        }
      );
      //
      let availQty = "";
      //
      if (updatedInventory[theItemIndex].variants[theVariantIndex][1] !== "") {
        availQty =
          updatedInventory[theItemIndex].variants[theVariantIndex][1] -
          removedItem[1];
        if (availQty >= 0) {
          updatedInventory[theItemIndex].variants[theVariantIndex][1] =
            availQty;
        } else {
          updatedInventory[theItemIndex].variants[theVariantIndex][1] = 0;
        }
      }
    });

    this.setState(
      {
        Inventory: updatedInventory,
        InventoryInitial: updatedInventory, //This is what the Save Changes to Platform will compare
      },
      () => this.getMerchantName()
    );
  };
  //
  //BELOW - For adding the name of merchant to the Item and Order
  getMerchantName = () => {
    const client = new Dash.Client(dapiClientNoWallet(this.state.whichNetwork));

    const retrieveNameByRecord = async () => {
      return client.platform.names.resolveByRecord(
        "identity",
        this.state.MerchantId
      );
    };

    retrieveNameByRecord()
      .then((d) => {
        if (d.length === 0) {
          console.log("There is no Name.");
          this.setState({
            isLoadingMerchantName: false,
          });
        } else {
          let nameRetrieved = d[0].toJSON();
          //console.log("Merchant Name retrieved:\n", nameRetrieved);
          this.setState({
            isLoadingMerchantName: false,
            MerchantNameDoc: nameRetrieved,
          });
        }
      })
      .catch((e) => {
        this.setState({
          isLoadingMerchantName: false,
        });
        console.error("Something went wrong getting merchant name:\n", e);
      })
      .finally(() => client.disconnect());
  };

  createItem = (itemObject) => {
    itemObject.imgArray = JSON.parse(itemObject.imgArray);
    itemObject.variants = JSON.parse(itemObject.variants);
    //
    this.setState({
      Inventory: [itemObject, ...this.state.Inventory],
    });
  };

  handleEditItemModal = (theItem, index) => {
    this.setState(
      {
        SelectedItem: theItem,
        SelectedItemIndex: index, //<- Need this for the editingfunction!!
      },
      () => this.showModal("EditItemModal")
    );
  };

  editItem = (itemObject) => {
    //itemObject.imgArray = JSON.parse(itemObject.imgArray);
    //itemObject.variants = JSON.parse(itemObject.variants);
    //
    //WELL ACTUALLY NEED TO CHANGE THE OBJECT IN THE ARRAY THERE IS NO $ID OR $OWNERiD ITS JUST LOCAL TO THE ITEMS ARRAY.

    let editedItems = [...this.state.Inventory];

    editedItems.splice(this.state.SelectedItemIndex, 1, itemObject);

    this.setState({
      Inventory: editedItems,
    });
  };

  handleDeleteItemModal = (theItem, index) => {
    this.setState(
      {
        SelectedItem: theItem,
        SelectedItemIndex: index, //<- Need this for the editingfunction!!
      },
      () => this.showModal("DeleteItemModal")
    );
  };

  deleteItem = () => {
    let editedItems = [...this.state.Inventory];

    editedItems.splice(this.state.SelectedItemIndex, 1);

    this.setState({
      Inventory: editedItems,
      selectedPage: "Inventory",
    });
  };

  // deleteInventory = () => {//Use to Delete all inventory? ->
  //   //console.log("Called Delete Item");

  //   this.setState({
  //     isLoadingInventory: true,
  //   });

  //   const client = new Dash.Client(
  //     dapiClient(
  //       this.state.whichNetwork,
  //       this.state.mnemonic,
  //       this.state.skipSynchronizationBeforeHeight
  //     )
  //   );

  //   const deleteNoteDocument = async () => {
  //     const { platform } = client;

  //     let identity = "";
  //     if (this.state.identityRaw !== "") {
  //       identity = this.state.identityRaw;
  //     } else {
  //       identity = await platform.identities.get(this.state.identity);
  //     }

  //     const documentId = this.state.SelectedItem.$id;

  //     // Retrieve the existing document

  //     //JUST PUT IN THE DOCUMENT THAT i ALREADY HAVE... => Done
  //     // Wrong ^^^ Can not use because changed to JSON

  //     const [document] = await client.platform.documents.get(
  //       "ONLINESTOREContract.item",
  //       { where: [["$id", "==", documentId]] }
  //     );

  //     // Sign and submit the document delete transition
  //     await platform.documents.broadcast({ delete: [document] }, identity);
  //     return document;
  //   };

  //   deleteNoteDocument()
  //     .then((d) => {
  //       //console.log("Document deleted:\n", d.toJSON());

  //       let editedInventory = this.state.Inventory;

  //       editedInventory.splice(this.state.SelectedItemIndex, 1);

  //       this.setState({
  //         Inventory: editedInventory,
  //         isLoadingOrders: false,
  //       });
  //     })
  //     .catch((e) => console.error("Something went wrong:\n", e))
  //     .finally(() => client.disconnect());
  // };

  moveItemUpDown = (theIndex, upORdown) => {
    if (upORdown === "up") {
      let editedInventory = [...this.state.Inventory];
      let firstItem = this.state.Inventory[theIndex - 1];
      let secondItem = this.state.Inventory[theIndex];
      editedInventory.splice(theIndex - 1, 2, secondItem, firstItem);
      this.setState({
        Inventory: [...editedInventory],
      });
    } else {
      let editedInventory = [...this.state.Inventory];
      let firstItem = this.state.Inventory[theIndex];
      let secondItem = this.state.Inventory[theIndex + 1];
      editedInventory.splice(theIndex, 2, secondItem, firstItem);
      this.setState({
        Inventory: [...editedInventory],
      });
    }
  };

  saveInventory = () => {
    if (this.state.InventoryDoc.length === 0) {
      this.createInventory();
    } else {
      this.editInventory();
    }
  };
  //IF INVENTORYDOC IS BLANK -> SAVEiNVENTORY WILL CREATE INVENTORY FIRST AND SUBSEQUENT WILL EDIT.
  //This works not bc the InventoryDoc length is 0 but because if there is no inventory doc there is an empty array placed there.
  //
  createInventory = () => {
    console.log("Called Create Inventory");

    this.setState({
      isLoadingInventory: true,
    });

    const client = new Dash.Client(
      dapiClient(
        this.state.whichNetwork,
        this.state.mnemonic,
        this.state.skipSynchronizationBeforeHeight
      )
    );

    const submitInventoryDoc = async () => {
      const { platform } = client;

      let identity = "";
      if (this.state.identityRaw !== "") {
        identity = this.state.identityRaw;
      } else {
        identity = await platform.identities.get(this.state.identity);
      }
      let inventoryProperties = {
        items: JSON.stringify(this.state.Inventory),
        open: true,
        shipping: "",
      };

      //console.log('Inventory to Create: ', inventoryProperties);

      // Create the document
      const inventoryDocument = await platform.documents.create(
        "ONLINESTOREContract.inventory",
        identity,
        inventoryProperties
      );

      //############################################################
      //This below disconnects the document sending..***

      //return inventoryDocument;

      //This is to disconnect the Document Creation***
      //############################################################

      const documentBatch = {
        create: [inventoryDocument], // Document(s) to create
      };

      await platform.documents.broadcast(documentBatch, identity);
      return inventoryDocument;
    };

    submitInventoryDoc()
      .then((d) => {
        let returnedDoc = d.toJSON();
        //console.log("Document:\n", returnedDoc);

        // returnedDoc.replyId = Identifier.from(
        //   returnedDoc.replyId,
        //   "base64"
        // ).toJSON();
        returnedDoc.items = JSON.parse(returnedDoc.items);

        console.log("InventoryDocument:\n", returnedDoc);

        this.setState({
          InventoryDoc: returnedDoc,
          Inventory: returnedDoc.items,
          InventoryInitial: returnedDoc.items,
          isLoadingInventory: false,
        });
      })
      .catch((e) => {
        console.error("Something went wrong with inventory creation:\n", e);
      })
      .finally(() => client.disconnect());
  };

  editInventory = () => {
    //If the items are not stringified, then need to stringify before saving

    //  console.log("Called Edit Item");
    this.setState({
      isLoadingInventory: true,
      selectedPage: "Inventory",
    });

    const client = new Dash.Client(
      dapiClient(
        this.state.whichNetwork,
        this.state.mnemonic,
        this.state.skipSynchronizationBeforeHeight
      )
    );

    const submitItemDoc = async () => {
      const { platform } = client;

      let identity = "";
      if (this.state.identityRaw !== "") {
        identity = this.state.identityRaw;
      } else {
        identity = await platform.identities.get(this.state.identity);
      }

      const [document] = await client.platform.documents.get(
        "ONLINESTOREContract.inventory",
        {
          where: [["$id", "==", this.state.InventoryDoc.$id]],
        }
      );

      if (this.state.Inventory !== this.state.InventoryInitial) {
        document.set("items", JSON.stringify(this.state.Inventory));
      }

      // if (this.state.SelectedItem.open !== itemObject.open) {
      //   document.set("open", itemObject.open);
      // }

      // if (this.state.SelectedItem.shipping !== itemObject.shipping) {
      //   document.set("shipping", itemObject.shipping);
      // }

      await platform.documents.broadcast({ replace: [document] }, identity);
      return document;

      //############################################################
      //This below disconnects the document editing..***

      //return document;

      //This is to disconnect the Document editing***
      //############################################################
    };

    submitItemDoc()
      .then((d) => {
        let returnedDoc = d.toJSON();

        returnedDoc.items = JSON.parse(returnedDoc.items);

        console.log("Edited Inventory:\n", returnedDoc);

        // returnedDoc.replyId = Identifier.from(
        //   returnedDoc.replyId,
        //   "base64"
        // ).toJSON();

        //this.combineInventoryANDConfirms()

        // let editedInventory = this.state.Inventory;

        // editedInventory.splice(this.state.SelectedItemIndex, 1, returnedDoc);

        this.setState(
          {
            InventoryDoc: returnedDoc,
            Inventory: returnedDoc.items,
            InventoryInitial: returnedDoc.items,
            isLoadingInventory: false,
          },
          () => this.loadIdentityCredits()
        );
      })
      .catch((e) => {
        console.error("Something went wrong with Edit Inventory:\n", e);
      })
      .finally(() => client.disconnect());
  };

  //SHIPPING

  //componentOnLoad
  // createShipping
  //edit Shipping

  /*
  * STORE FUNCTIONS^^^^
   
   *     ###     ###
   *    ## ##    ####
   *   ###  ##  ##  ##
   *  ###    ####    ##
   * ###      ###     ##
   *
   */
  //This needs a race query! Orders, Confirms and replies

  // pullInitialTriggerMERCHANT = () => {
  //   this.startMerchantRace();
  //   //THIS IS FOR WHEN YOU LOGIN AND GET Merchant Queries
  //   this.setState({
  //     InitialPullMerchant: false,
  //   });
  // };

  //SETTIMEOUT WAY BELOW
  allowMerchantOrdersRefresh = () => {
    this.setState({
      isMerchantOrdersRefreshReady: true,
    });
  };
  //FUNCTION FOR BUTTON TO TRIGGER - CHANGES STATE AND GOES AND LOOKS UP AND SETS STATE DIRECTLY.
  refreshMerchantOrders = () => {
    this.setState({
      isLoadingOrders: true,
      isMerchantOrdersRefreshReady: false,
    });

    this.startMerchantRace();
    //REFRESH -> TIMEOUT
    //if (!this.state.isMerchantOrdersRefreshReady) {
    const MerchantOrdersTimeout = setTimeout(
      this.allowMerchantOrdersRefresh,
      15000
    );
    // }
    //REFRESH -> TIMEOUT
  };

  //SETTIMEOUT WAY ^^^^

  handleMerchantOrderFilter = (theSelected) => {
    this.setState({
      DisplayOrders: theSelected,
    });
  };

  startMerchantRace = () => {
    if (!this.state.isLoadingOrders) {
      this.setState({ isLoadingOrders: true });
    }
    if (this.state.Inventory.length !== 0) {
      //this.getConfirms();

      this.getOrders();
      if (this.state.ConfirmedOrders.length !== 0) {
        this.getConfirmReplies(this.state.ConfirmedOrders);
      } else {
        this.setState(
          {
            OrderReplies: [],
            Merchant2: true,
          },
          () => this.merchantRace()
        );
      }
    } else {
      this.setState({
        Merchant1: false,
        Merchant2: false,

        isLoadingOrders: false,
      });
    }
  };

  merchantRace = () => {
    if (this.state.Merchant1 && this.state.Merchant2) {
      this.setState({
        Merchant1: false,
        Merchant2: false,

        isLoadingOrders: false,
      });
    }
  };

  getOrders = () => {
    //console.log("Calling getOrders");

    const client = new Dash.Client(dapiClientNoWallet(this.state.whichNetwork));

    const getDocuments = async () => {
      return client.platform.documents.get("ONLINESTOREContract.order", {
        where: [
          // ["$ownerId", "==", this.state.MerchantId],
          ["toId", "==", this.state.MerchantId],
          ["$createdAt", "<=", Date.now()],
        ],
        orderBy: [
          // ["toId", "asc"],
          ["$createdAt", "desc"],
        ],
      });
    };

    getDocuments()
      .then((d) => {
        if (d.length === 0) {
          //console.log("There are no YourOrders");

          this.setState(
            {
              Merchant1: true,
              UnconfirmedOrders: [],
            },
            () => this.merchantRace()
          );
        } else {
          let docArray = [];
          //console.log("Getting YourOrders");

          for (const n of d) {
            let returnedDoc = n.toJSON();
            //console.log("Orders:\n", returnedDoc);
            returnedDoc.toId = Identifier.from(
              returnedDoc.toId,
              "base64"
            ).toJSON();
            returnedDoc.cart = JSON.parse(returnedDoc.cart);
            //  console.log("newRequest:\n", returnedDoc);
            docArray = [...docArray, returnedDoc];
          }
          this.getOrdersNames(docArray);
          // this.setState(
          //   {
          //     Merchant1: true,
          //     UnconfirmedOrders: docArray,

          //   },
          //   () => this.merchantRace()
          // );
        }
      })
      .catch((e) => console.error("Something went wrong:\n", e))
      .finally(() => client.disconnect());
  };

  getOrdersNames = (docArray) => {
    const client = new Dash.Client(dapiClientNoWallet(this.state.whichNetwork));
    //START OF NAME RETRIEVAL

    let ownerarrayOfOwnerIds = docArray.map((doc) => {
      return doc.$ownerId;
    });

    let setOfOwnerIds = [...new Set(ownerarrayOfOwnerIds)];

    let arrayOfOwnerIds = [...setOfOwnerIds];

    //console.log("Calling getNamesforDrives");

    const getNameDocuments = async () => {
      return client.platform.documents.get("DPNSContract.domain", {
        where: [["records.identity", "in", arrayOfOwnerIds]],
        orderBy: [["records.identity", "asc"]],
      });
    };

    getNameDocuments()
      .then((d) => {
        //WHAT IF THERE ARE NO NAMES? -> THEN THIS WON'T BE CALLED
        // if (d.length === 0) {
        //console.log("No DPNS domain documents retrieved.");
        // }
        let nameDocArray = [];

        for (const n of d) {
          //console.log("NameDoc:\n", n.toJSON());
          nameDocArray = [n.toJSON(), ...nameDocArray];
        }
        //console.log(`DPNS Name Docs: ${nameDocArray}`);
        this.setState(
          {
            Merchant1: true,
            UnconfirmedOrders: docArray,
            UnconfirmedOrdersNames: nameDocArray,
          },
          () => this.merchantRace()
        );
      })
      .catch((e) => {
        console.error("Something went wrong getting Orders Names:\n", e);
      })
      .finally(() => client.disconnect());
    //END OF NAME RETRIEVAL
  };
  //What if I just use the Confirms from the Inventory pull
  // getConfirms = () => {
  //   const client = new Dash.Client(dapiClientNoWallet(this.state.whichNetwork));

  //   const getDocuments = async () => {
  //     //console.log("Called Get Req Replies");

  //     return client.platform.documents.get("ONLINESTOREContract.confirm", {
  //       where: [
  //         ["$ownerId", "==", this.state.MerchantId],
  //         ["$createdAt", "<=", Date.now()],
  //       ],
  //       orderBy: [
  //         ["$createdAt", "desc"],
  //       ],
  //     });
  //   };

  //   getDocuments()
  //     .then((d) => {
  //       //console.log("Getting YourOrdersConfirms");
  //       if (d.length === 0) {
  //         //console.log("There are no YourOrdersConfirms");

  //         this.setState(
  //           {
  //             ConfirmedOrders: [],
  //             OrderReplies: [],
  //             Merchant2: true,
  //           },
  //           () => this.merchantRace()
  //         );
  //       } else {
  //         let docArray = [];

  //         for (const n of d) {
  //           let returnedDoc = n.toJSON();
  //           //console.log("Confirm:\n", returnedDoc);
  //           returnedDoc.orderId = Identifier.from(
  //             returnedDoc.orderId,
  //             "base64"
  //           ).toJSON();

  //           // console.log("newConfirm:\n", returnedDoc);
  //           docArray = [...docArray, returnedDoc];
  //         }

  //         this.getConfirmReplies(docArray);
  //       }
  //     })
  //     .catch((e) => {
  //       console.error("Something went wrong Confirms:\n", e);
  //     })
  //     .finally(() => client.disconnect());
  // };

  getConfirmReplies = (theConfirms) => {
    const client = new Dash.Client(dapiClientNoWallet(this.state.whichNetwork));

    // This Below is to get unique set of Confirm doc ids
    let arrayOfConfirmIds = theConfirms.map((doc) => {
      return doc.$id;
    });

    //console.log("Array of Confirm Req ids", arrayOfConfirmIds);

    let setOfConfirmIds = [...new Set(arrayOfConfirmIds)];

    arrayOfConfirmIds = [...setOfConfirmIds];

    //console.log("Array of Confirm ids", arrayOfConfirmIds);

    const getDocuments = async () => {
      //console.log("Called Get Merchant Replies");

      return client.platform.documents.get("ONLINESTOREContract.reply", {
        where: [
          ["confirmId", "in", arrayOfConfirmIds],
          ["$createdAt", "<=", Date.now()],
        ],
        orderBy: [
          ["confirmId", "asc"],
          ["$createdAt", "desc"],
        ],
      });
    };

    getDocuments()
      .then((d) => {
        //console.log("Getting Confirm replies");
        if (d.length === 0) {
          //console.log("There are no ConfirmReplies");

          this.setState(
            {
              //ConfirmedOrders: theConfirms,
              OrderReplies: [],
              Merchant2: true,
            },
            () => this.merchantRace()
          );
        } else {
          let docArray = [];

          for (const n of d) {
            let returnedDoc = n.toJSON();
            //console.log("Reply:\n", returnedDoc);
            returnedDoc.confirmId = Identifier.from(
              returnedDoc.confirmId,
              "base64"
            ).toJSON();
            //console.log("newReply:\n", returnedDoc);
            docArray = [returnedDoc, ...docArray];
          }

          this.setState(
            {
              // ConfirmedOrders: theConfirms,
              OrderReplies: docArray,
              Merchant2: true,
            },
            () => this.merchantRace()
          );
        }
      })
      .catch((e) => {
        console.error("Something went wrong Merchant Replies:\n", e);
      })
      .finally(() => client.disconnect());
  };

  /// HERE (BELOW)

  handleConfirmOrderModal = (theOrder, theNameDoc) => {
    this.setState(
      {
        SelectedOrder: theOrder,
        SelectedOrderNameDoc: theNameDoc,
      },
      () => this.showModal("ConfirmOrderModal")
    );
  };

  createConfirmOrder = () => {
    // console.log("Called Create Confirm Order");

    this.setState({
      isLoadingOrders: true,
      isLoadingInventory: true,
      //selectedPage: "Inventory",
    });

    const client = new Dash.Client(
      dapiClient(
        this.state.whichNetwork,
        this.state.mnemonic,
        this.state.skipSynchronizationBeforeHeight
      )
    );

    const submitConfirmDoc = async () => {
      const { platform } = client;

      let identity = "";
      if (this.state.identityRaw !== "") {
        identity = this.state.identityRaw;
      } else {
        identity = await platform.identities.get(this.state.identity);
      }

      const confirmProperties = {
        orderId: this.state.SelectedOrder.$id,
        //toId
        amt: this.state.SelectedOrder.amt,
        cart: JSON.stringify(this.state.SelectedOrder.cart),
      };
      //console.log(' Create: ', confirmProperties);

      // Create the note document
      const confirmDocument = await platform.documents.create(
        "ONLINESTOREContract.confirm",
        identity,
        confirmProperties
      );

      //############################################################
      //This below disconnects the document sending..***

      //return confirmDocument;

      //This is to disconnect the Document Creation***
      //############################################################

      const documentBatch = {
        create: [confirmDocument], // Document(s) to create
      };

      await platform.documents.broadcast(documentBatch, identity);
      return confirmDocument;
    };

    submitConfirmDoc()
      .then((d) => {
        let returnedDoc = d.toJSON();

        // returnedDoc.itemId = Identifier.from(
        //   returnedDoc.itemId,
        //   "base64"
        // ).toJSON();

        returnedDoc.orderId = Identifier.from(
          returnedDoc.orderId,
          "base64"
        ).toJSON();

        returnedDoc.cart = JSON.parse(returnedDoc.cart);

        console.log("Order Confirm:\n", returnedDoc);

        this.setState(
          {
            ConfirmedOrders: [returnedDoc, ...this.state.ConfirmedOrders],

            isLoadingOrders: false,
            isLoadingInventory: false,
          }, //combineInventoryANDConfirms and why is it kicking over to Inventory  Page?
          () => this.loadIdentityCredits()
        );
        this.combineInventoryANDConfirms(this.state.Inventory, [
          returnedDoc,
          // ...this.state.ConfirmedOrders, //This is bc the Inventory is already updated from the InventoryDoc so its not necessary to add again -> VERIFY ->
        ]);
      })
      .catch((e) => {
        console.error("Something went wrong with Order Confirm creation:\n", e);
      })
      .finally(() => client.disconnect());
  };

  handleMerchantReplyModalShow = (theConfirm, nameDoc) => {
    this.setState(
      {
        SelectedConfirm: theConfirm,
        SelectedReplyNameDoc: nameDoc,
      },
      () => this.showModal("MerchantReplyModal")
    );
  };

  //confirmId createdAt - query
  // confirmId && msg - attributes

  createMerchantReply = (replyMsgComment) => {
    //console.log("Called Merchant Message Submit: ", replyMsgComment);

    this.setState({
      isLoadingOrders: true,
    });

    const client = new Dash.Client(
      dapiClient(
        this.state.whichNetwork,
        this.state.mnemonic,
        this.state.skipSynchronizationBeforeHeight
      )
    );

    const submitMsgDoc = async () => {
      const { platform } = client;

      let identity = "";
      if (this.state.identityRaw !== "") {
        identity = this.state.identityRaw;
      } else {
        identity = await platform.identities.get(this.state.identity);
      }

      const replyProperties = {
        confirmId: this.state.SelectedConfirm.$id,
        msg: replyMsgComment,
      };
      //console.log('Reply to Create: ', replyProperties);

      // Create the note document
      const itemDocument = await platform.documents.create(
        "ONLINESTOREContract.reply",
        identity,
        replyProperties
      );

      //############################################################
      //This below disconnects the document sending..***

      //return itemDocument;

      //This is to disconnect the Document Creation***
      //############################################################

      const documentBatch = {
        create: [itemDocument], // Document(s) to create
      };

      await platform.documents.broadcast(documentBatch, identity);
      return itemDocument;
    };

    submitMsgDoc()
      .then((d) => {
        let returnedDoc = d.toJSON();
        console.log("Document:\n", returnedDoc);

        returnedDoc.confirmId = Identifier.from(
          returnedDoc.confirmId,
          "base64"
        ).toJSON();

        this.setState(
          {
            OrderReplies: [...this.state.OrderReplies, returnedDoc],
            isLoadingOrders: false,
          },
          () => this.loadIdentityCredits()
        );
      })
      .catch((e) => {
        console.error(
          "Something went wrong with Merchant Reply Msg creation:\n",
          e
        );
      })
      .finally(() => client.disconnect());
  };

  /*
   * MERCHANT FUNCTIONS^^^^
   *                                 ###     ###
   *                                ## ##    ####
   *                               ###  ##  ##  ##
   *                              ###    ####    ##
   *                             ###      ###     ##
   *
   *
   *
   *      #############
   *     ####         ##
   *     ###
   *     ###
   *     #####        ##
   *      #############
   */
  //CUSTOMER FUNCTIONS

  handleAddToCartModal = (theCartItem) => {
    //{itemId: Name, variant: VarName}
    //itemId: this.props.item.itemId,
    //variant: variant[0],
    this.setState(
      {
        SelectedCartItem: theCartItem,
        //SelectedCartIndex: theIndex
      },
      () => this.showModal("AddItemToCartModal")
    );
  };

  handleEditCartItemModal = (theIndex) => {
    this.setState(
      {
        SelectedCartItemIndex: theIndex,
      },
      () => this.showModal("EditCartItemModal")
    );
  };

  addToCart = (theQuantity) => {
    this.handleSelectedPage("Shopping Cart");
    //{itemId: Name, variant: VarName}
    //itemId: this.props.item.itemId,
    //variant: variant[0],

    // let theItem = this.state.Inventory.find((item) => {
    //   return item.itemId === this.state.SelectedCartItem[0].itemId; //This is from the cart
    // });

    // let theVariant = theItem.variants.find((vari) => {
    //   return vari[0] === this.state.SelectedCartItem[0].variant;
    // });

    let itemIndexInTheCart = this.state.CartItems.findIndex((item) => {
      return (
        item[0].itemId === this.state.SelectedCartItem.itemId &&
        item[0].variant === this.state.SelectedCartItem.variant
      );
    });

    if (itemIndexInTheCart === -1) {
      this.setState(
        {
          CartItems: [
            [this.state.SelectedCartItem, theQuantity],
            ...this.state.CartItems,
          ],
        },
        () => console.log(this.state.CartItems)
      );
    } else {
      let newCartItems = this.state.CartItems;

      newCartItems.splice(itemIndexInTheCart, 1, [
        this.state.SelectedCartItem,
        this.state.CartItems[itemIndexInTheCart][1] + theQuantity,
      ]);

      this.setState(
        {
          CartItems: newCartItems,
        } //,() => console.log(this.state.CartItems)
      );
    }
  };

  editCart = (itemChange) => {
    // let newCartItems = this.state.CartItems;

    //   newCartItems.splice(itemIndexInTheCart, 1, [
    //     this.state.SelectedCartItem,
    //     this.state.CartItems[itemIndexInTheCart][1] + theQuantity,
    //   ]);

    //   this.setState(
    //     {
    //       CartItems: newCartItems,
    //     },
    //     () => console.log(this.state.CartItems)
    //   );

    if (itemChange === "remove from cart") {
      let newCartItems = this.state.CartItems;

      newCartItems.splice(this.state.SelectedCartItemIndex, 1);

      this.setState({
        CartItems: newCartItems,
      });
    } else {
      let newCartItems = this.state.CartItems;

      newCartItems.splice(this.state.SelectedCartItemIndex, 1, itemChange);

      this.setState({
        CartItems: newCartItems,
      });
    }
  };
  //This is just handled by attaching showModal directly to the Modal for this.
  // handlePlaceOrderModal = () => {}

  placeOrder = (theComment, theTotal) => {
    console.log("Called Place Order");
    //console.log(theTotal);
    this.hideModal();

    this.setState({
      isLoadingOrders: true,
      isLoadingShoppingCart: true,
      isLoadingInventory: true,
      selectedPage: "Inventory", //Or should this be orders ->
    });

    const client = new Dash.Client(
      dapiClient(
        this.state.whichNetwork,
        this.state.mnemonic,
        this.state.skipSynchronizationBeforeHeight
      )
    );

    const submitOrderDoc = async () => {
      const { platform } = client;

      let identity = "";
      if (this.state.identityRaw !== "") {
        identity = this.state.identityRaw;
      } else {
        identity = await platform.identities.get(this.state.identity);
      }

      const orderProperties = {
        cart: JSON.stringify(this.state.CartItems),
        amt: theTotal,
        toId: this.state.MerchantId,
        msg: theComment,
      };
      //console.log(' Create: ', orderProperties);

      // Create the note document
      const orderDocument = await platform.documents.create(
        "ONLINESTOREContract.order",
        identity,
        orderProperties
      );

      //############################################################
      //This below disconnects the document sending..***

      //return orderDocument;

      //This is to disconnect the Document Creation***
      //############################################################

      const documentBatch = {
        create: [orderDocument], // Document(s) to create
      };

      await platform.documents.broadcast(documentBatch, identity);
      return orderDocument;
    };

    submitOrderDoc()
      .then((d) => {
        let returnedDoc = d.toJSON();

        returnedDoc.toId = Identifier.from(returnedDoc.toId, "base64").toJSON();

        returnedDoc.cart = JSON.parse(returnedDoc.cart);

        console.log("Document:\n", returnedDoc);

        this.setState(
          {
            UnconfirmedOrders: [returnedDoc, ...this.state.UnconfirmedOrders],
            CartItems: [],
            isLoadingOrders: false,
            isLoadingInventory: false,
            isLoadingShoppingCart: false,
          },
          () => this.loadIdentityCredits()
        );
      })
      .catch((e) => {
        console.error("Something went wrong with Order creation:\n", e);
      })
      .finally(() => client.disconnect());
  };

  handleDeleteOrderModal = (theOrder, index) => {
    // let requestItem = this.state.Inventory.find((item) => {
    //   return item.$id === theRequest.itemId;
    // });
    this.setState(
      {
        //SelectedOrder: requestItem,
        SelectedOrder: theOrder,
        //I also need the name <- NOT FOR MY POSTS
        SelectedOrderIndex: index, //<- Need this for the editingfunction!!
      },
      () => this.showModal("DeleteOrderModal")
    );
  };

  //CHANGE ->
  deleteOrder = () => {
    //console.log("Called Delete Order");

    this.setState({
      isLoadingOrders: true,
    });

    const client = new Dash.Client(
      dapiClient(
        this.state.whichNetwork,
        this.state.mnemonic,
        this.state.skipSynchronizationBeforeHeight
      )
    );

    const deleteNoteDocument = async () => {
      const { platform } = client;

      let identity = "";
      if (this.state.identityRaw !== "") {
        identity = this.state.identityRaw;
      } else {
        identity = await platform.identities.get(this.state.identity);
      }

      const documentId = this.state.SelectedOrder.$id;

      // Retrieve the existing document

      //JUST PUT IN THE DOCUMENT THAT i ALREADY HAVE... => Done
      // Wrong ^^^ Can not use because changed to JSON

      const [document] = await client.platform.documents.get(
        "ONLINESTOREContract.order",
        { where: [["$id", "==", documentId]] }
      );

      // Sign and submit the document delete transition
      await platform.documents.broadcast({ delete: [document] }, identity);
      return document;
    };

    deleteNoteDocument()
      .then((d) => {
        //console.log("Document deleted:\n", d.toJSON());

        let editedOrders = this.state.UnconfirmedOrders;

        editedOrders.splice(this.state.SelectedOrderIndex, 1);

        this.setState({
          UnconfirmedOrders: editedOrders,
          isLoadingOrders: false,
        });
      })
      .catch((e) => console.error("Something went wrong:\n", e))
      .finally(() => client.disconnect());
  };

  // pullInitialTriggerCUSTOMER = () => {
  //   this.getYourOrders(this.state.identity);
  //   //THIS IS FOR WHEN YOU LOGIN AND GET YOUR DRIVES
  //   this.setState({
  //     InitialPullCustomer: false,
  //   });
  // };

  // pullOnPageLoadTriggerDRIVERS = () => {
  //   //THIS IS FOR WHEN YOU SELECT THE DAPP, IT LOADS MOST RECENT RIDES POSTED
  //   if (this.state.OnPageLoadDRIVERS) {
  //     this.getInitialDrives();
  //     this.setState({
  //       OnPageLoadDRIVERS: false,
  //     });
  //   }
  // };
  //CUSTOMER
  getYourOrders = (theIdentity) => {
    //console.log("Calling getYourOrders");
    if (!this.state.isLoadingOrders) {
      this.setState({ isLoadingOrders: true });
    }

    const client = new Dash.Client(dapiClientNoWallet(this.state.whichNetwork));

    const getDocuments = async () => {
      return client.platform.documents.get("ONLINESTOREContract.order", {
        where: [
          ["$ownerId", "==", theIdentity],
          //HAVE TO MAKE SURE THEY ARE ONLY FOR THIS STORE
          ["toId", "==", this.state.MerchantId],
          ["$createdAt", "<=", Date.now()],
        ],
        orderBy: [["$createdAt", "desc"]],
      });
    };

    getDocuments()
      .then((d) => {
        if (d.length === 0) {
          //console.log("There are no merchant Orders");
          this.setState({
            UnconfirmedOrders: [],
            ConfirmedOrders: [],
            OrderReplies: [],
            isLoadingOrders: false,
          });
        } else {
          let docArray = [];
          //console.log("Getting merchant Orders");

          for (const n of d) {
            let returnedDoc = n.toJSON();
            //console.log("Orders:\n", returnedDoc);
            returnedDoc.toId = Identifier.from(
              returnedDoc.toId,
              "base64"
            ).toJSON();

            returnedDoc.cart = JSON.parse(returnedDoc.cart);
            // console.log("newRequest:\n", returnedDoc);
            docArray = [...docArray, returnedDoc];
          }
          this.getYourOrdersConfirms(docArray);
        }
      })
      .catch((e) => console.error("Something went wrong:\n", e))
      .finally(() => client.disconnect());
  };

  getYourOrdersConfirms = (theDocArray) => {
    const client = new Dash.Client(dapiClientNoWallet(this.state.whichNetwork));

    // This Below is to get unique set of Order doc ids
    let arrayOfOrderIds = theDocArray.map((doc) => {
      return doc.$id;
    });

    //console.log("Array of Order Order ids", arrayOfOrderIds);

    let setOfOrderIds = [...new Set(arrayOfOrderIds)];

    arrayOfOrderIds = [...setOfOrderIds];

    //console.log("Array of Order ids", arrayOfOrderIds);

    const getDocuments = async () => {
      //console.log("Called Get Order Replies");

      return client.platform.documents.get("ONLINESTOREContract.confirm", {
        where: [
          // ["$ownerId", "in", this.state.MerchantId], //Filtered Below
          ["orderId", "in", arrayOfOrderIds],
        ],
        orderBy: [["orderId", "asc"]],
      });
    };

    getDocuments()
      .then((d) => {
        //console.log("Getting YourOrdersConfirms");
        if (d.length === 0) {
          //console.log("There are no YourOrdersConfirms");

          this.setState({
            UnconfirmedOrders: theDocArray,
            ConfirmedOrders: [],
            OrderReplies: [],
            isLoadingOrders: false,
          });
        } else {
          let docArray = [];

          for (const n of d) {
            let returnedDoc = n.toJSON();
            //console.log("Confirm:\n", returnedDoc);
            returnedDoc.orderId = Identifier.from(
              returnedDoc.orderId,
              "base64"
            ).toJSON();

            console.log("newConfirm:\n", returnedDoc);
            //Filter so that only the merchant send a confirm to the requester ->
            if (returnedDoc.$ownerId === this.state.MerchantId) {
              docArray = [...docArray, returnedDoc];
            }
          }
          this.getYourOrdersReplies(docArray, theDocArray);
        }
      })
      .catch((e) => {
        console.error("Something went wrong YourOrdersConfirms:\n", e);
      })
      .finally(() => client.disconnect());
  };

  getYourOrdersReplies = (theConfirms, theOrders) => {
    const client = new Dash.Client(dapiClientNoWallet(this.state.whichNetwork));

    // This Below is to get unique set of Confirm doc ids
    let arrayOfConfirmIds = theConfirms.map((doc) => {
      return doc.$id;
    });

    //console.log("Array of Confirm Req ids", arrayOfConfirmIds);

    let setOfConfirmIds = [...new Set(arrayOfConfirmIds)];

    arrayOfConfirmIds = [...setOfConfirmIds];

    //console.log("Array of Confirm ids", arrayOfConfirmIds);

    const getDocuments = async () => {
      //console.log("Called Get Confirm Replies");

      return client.platform.documents.get("ONLINESTOREContract.reply", {
        where: [
          ["confirmId", "in", arrayOfConfirmIds],
          ["$createdAt", "<=", Date.now()],
        ],
        orderBy: [
          ["confirmId", "asc"],
          ["$createdAt", "desc"],
        ],
      });
    };

    getDocuments()
      .then((d) => {
        //console.log("Getting YourOrdersReplies");
        if (d.length === 0) {
          //console.log("There are no YourOrdersReplies");
          this.setState({
            UnconfirmedOrders: theOrders,
            ConfirmedOrders: theConfirms,
            OrderReplies: [],
            isLoadingOrders: false,
          });
        } else {
          let docArray = [];

          for (const n of d) {
            let returnedDoc = n.toJSON();
            //console.log("Reply:\n", returnedDoc);
            returnedDoc.confirmId = Identifier.from(
              returnedDoc.confirmId,
              "base64"
            ).toJSON();
            //console.log("newReply:\n", returnedDoc);
            //docArray = [...docArray, returnedDoc];
            docArray = [returnedDoc, ...docArray];
          }

          this.setState({
            UnconfirmedOrders: theOrders,
            ConfirmedOrders: theConfirms,
            OrderReplies: docArray,
            isLoadingOrders: false,
          });
        }
      })
      .catch((e) => {
        console.error("Something went wrong Customer Replies:\n", e);
      })
      .finally(() => client.disconnect());
  };

  //SETTIMEOUT WAY BELOW

  allowYourOrdersRefresh = () => {
    this.setState({
      isYourOrdersRefreshReady: true,
    });
  };
  //FUNCTION FOR BUTTON TO TRIGGER - CHANGES STATE AND GOES AND LOOKS UP AND SETS STATE DIRECTLY.
  refreshYourOrders = () => {
    this.setState({
      isLoadingOrders: true,
      isYourOrdersRefreshReady: false, // pass to refresh button
    });

    this.getYourOrders(this.state.identity);
    //

    //REFRESH -> TIMEOUT
    //if (!this.state.isYourOrdersRefreshReady) {
    const yourOrdersTimeout = setTimeout(this.allowYourOrdersRefresh, 15000);
    // }
    //REFRESH -> TIMEOUT
  };

  handleCustomerReplyModalShow = (theConfirm) => {
    this.setState(
      {
        SelectedConfirm: theConfirm,
      },
      () => this.showModal("CustomerReplyModal")
    );
  };

  //confirmId createdAt - query
  // confirmId && msg - attributes

  createCustomerReply = (replyMsgComment) => {
    //console.log("Called Customer Message Submit: ", replyMsgComment);

    this.setState({
      isLoadingOrders: true,
    });

    const client = new Dash.Client(
      dapiClient(
        this.state.whichNetwork,
        this.state.mnemonic,
        this.state.skipSynchronizationBeforeHeight
      )
    );

    const submitMsgDoc = async () => {
      const { platform } = client;

      let identity = "";
      if (this.state.identityRaw !== "") {
        identity = this.state.identityRaw;
      } else {
        identity = await platform.identities.get(this.state.identity);
      }

      const replyProperties = {
        confirmId: this.state.SelectedConfirm.$id,
        msg: replyMsgComment,
      };
      //console.log('Reply to Create: ', replyProperties);

      // Create the note document
      const itemDocument = await platform.documents.create(
        "ONLINESTOREContract.reply",
        identity,
        replyProperties
      );

      //############################################################
      //This below disconnects the document sending..***

      //return itemDocument;

      //This is to disconnect the Document Creation***
      //############################################################

      const documentBatch = {
        create: [itemDocument], // Document(s) to create
      };

      await platform.documents.broadcast(documentBatch, identity);
      return itemDocument;
    };

    submitMsgDoc()
      .then((d) => {
        let returnedDoc = d.toJSON();
        console.log("Document:\n", returnedDoc);

        returnedDoc.confirmId = Identifier.from(
          returnedDoc.confirmId,
          "base64"
        ).toJSON();

        this.setState(
          {
            OrderReplies: [...this.state.OrderReplies, returnedDoc],
            isLoadingOrders: false,
          },
          () => this.loadIdentityCredits()
        );
      })
      .catch((e) => {
        console.error(
          "Something went wrong with Customer Reply Msg creation:\n",
          e
        );
      })
      .finally(() => client.disconnect());
  };

  /*
   *CUSTOMER FUNCTIONS^^^^
   *                                 #############
   *                                ####         ##
   *                                ###
   *                                ###
   *                                #####        ##
   *                                 #############
   *
   *
   *      ################
   *      ###          ####
   *      ################
   *      ###          ####
   *      ###           ####
   *
   */
  //REVIEWS FUNCTIONS
  handleEditReview = (review, index) => {
    this.setState(
      {
        reviewToEdit: review,
        reviewToEditIndex: index,
      },
      () => this.showModal("EditReviewModal")
    );
  };

  //PUT THE QUERY SEARCHES HERE
  //WHEN TO PULL? ->
  startSearch_REVIEW = (theInventory) => {
    //Called from  ->
    this.getSearchReviews(theInventory);
  };

  searchReviewsRace = () => {
    if (this.state.SearchReviews1 && this.state.SearchReviews2) {
      this.setState({
        SearchReviews1: false,
        SearchReviews2: false,
        //DONT HAVE TO ADD STATE TO PUSH TO DISPLAY BECAUSE THE REVIEWS AND NAMES PUSHED TOGETHER AND THEN THREADS APPEAR <- SO DO I WANT TO QUERY NAME FIRST THEN?
        isLoadingReviewsSearch: false,
      });
    }
  };

  getSearchReviews = (theIdentity) => {
    //console.log("Calling getSearchReviews");

    const client = new Dash.Client(dapiClientNoWallet(this.state.whichNetwork));

    const getDocuments = async () => {
      return client.platform.documents.get("DGRContract.dgrreview", {
        where: [
          ["toId", "==", theIdentity],
          ["$createdAt", "<=", Date.now()],
        ],
        orderBy: [["$createdAt", "desc"]],
      });
    };

    getDocuments()
      .then((d) => {
        if (d.length === 0) {
          //console.log("There are no SearchReviews");

          this.setState(
            {
              SearchReviews1: true,
              SearchReviews2: true,
              SearchedReviews: [],
            },
            () => this.searchReviewsRace()
          );
        } else {
          let docArray = [];
          //console.log("Getting Search Reviews");

          for (const n of d) {
            let returnedDoc = n.toJSON();
            //console.log("Review:\n", returnedDoc);
            returnedDoc.toId = Identifier.from(
              returnedDoc.toId,
              "base64"
            ).toJSON();
            //console.log("newReview:\n", returnedDoc);
            docArray = [...docArray, returnedDoc];
          }
          this.getSearchReviewNames(docArray);
          this.getSearchReplies(docArray);
        }
      })
      .catch((e) => console.error("Something went wrong:\n", e))
      .finally(() => client.disconnect());
  };

  getSearchReviewNames = (docArray) => {
    const client = new Dash.Client(dapiClientNoWallet(this.state.whichNetwork));
    //START OF NAME RETRIEVAL

    let ownerarrayOfOwnerIds = docArray.map((doc) => {
      return doc.$ownerId;
    });

    let setOfOwnerIds = [...new Set(ownerarrayOfOwnerIds)];

    let arrayOfOwnerIds = [...setOfOwnerIds];

    // Start of Setting Unique reviews
    let arrayOfReviews = arrayOfOwnerIds.map((id) => {
      return docArray.find((doc) => id === doc.$ownerId);
    });
    // End of Setting Unique reviews

    // arrayOfOwnerIds = arrayOfOwnerIds.map((item) =>
    //   Buffer.from(Identifier.from(item))
    // );

    //console.log("Calling getNamesforDSOmsgs");

    const getNameDocuments = async () => {
      return client.platform.documents.get("DPNSContract.domain", {
        where: [["records.identity", "in", arrayOfOwnerIds]],
        orderBy: [["records.identity", "asc"]],
      });
    };

    getNameDocuments()
      .then((d) => {
        //WHAT IF THERE ARE NO NAMES? -> THEN THIS WON'T BE CALLED
        if (d.length === 0) {
          //console.log("No DPNS domain documents retrieved.");
        }

        let nameDocArray = [];

        for (const n of d) {
          //console.log("NameDoc:\n", n.toJSON());

          nameDocArray = [n.toJSON(), ...nameDocArray];
        }
        //console.log(`DPNS Name Docs: ${nameDocArray}`);

        this.setState(
          {
            SearchedReviewNames: nameDocArray,
            SearchedReviews: arrayOfReviews, //This is a unique set of reviews only single review per reviewer
            SearchReviews1: true,
          },
          () => this.searchReviewsRace()
        );
      })
      .catch((e) => {
        console.error("Something went wrong getting Search Names:\n", e);
      })
      .finally(() => client.disconnect());
    //END OF NAME RETRIEVAL
  };

  getSearchReplies = (docArray) => {
    const client = new Dash.Client(dapiClientNoWallet(this.state.whichNetwork));

    // This Below is to get unique set of ByYou review doc ids
    let arrayOfReviewIds = docArray.map((doc) => {
      return doc.$id;
    });

    //console.log("Array of ByYouThreads ids", arrayOfReviewIds);

    let setOfReviewIds = [...new Set(arrayOfReviewIds)];

    arrayOfReviewIds = [...setOfReviewIds];

    //console.log("Array of order ids", arrayOfReviewIds);

    const getDocuments = async () => {
      //console.log("Called Get Search Replies");

      return client.platform.documents.get("DGRContract.dgrreply", {
        where: [["reviewId", "in", arrayOfReviewIds]], // check reviewId ->
        orderBy: [["reviewId", "asc"]],
      });
    };

    getDocuments()
      .then((d) => {
        let docArray = [];

        for (const n of d) {
          let returnedDoc = n.toJSON();
          //console.log("Thr:\n", returnedDoc);
          returnedDoc.reviewId = Identifier.from(
            returnedDoc.reviewId,
            "base64"
          ).toJSON();
          //console.log("newThr:\n", returnedDoc);
          docArray = [...docArray, returnedDoc];
        }

        this.setState(
          {
            SearchReviews2: true,
            SearchedReplies: docArray,
          },
          () => this.searchReviewsRace()
        );
      })
      .catch((e) => {
        console.error("Something went wrong Search Replies:\n", e);
      })
      .finally(() => client.disconnect());
  };

  pullInitialTriggerREVIEWS = () => {
    this.getYourReviews(this.state.identity);
    this.setState({
      InitialPullReviews: false,
    });
  };

  yourReviewsRace = () => {
    if (this.state.YourReviews1 && this.state.YourReviews2) {
      this.setState({
        YourReviews1: false,
        YourReviews2: false,

        isLoadingYourReviews: false,
      });
    }
  };

  getYourReviews = (theIdentity) => {
    //console.log("Calling getYourReviews");

    const client = new Dash.Client(dapiClientNoWallet(this.state.whichNetwork));

    const getDocuments = async () => {
      return client.platform.documents.get("DGRContract.dgrreview", {
        where: [
          ["toId", "==", theIdentity],
          ["$createdAt", "<=", Date.now()],
        ],
        orderBy: [["$createdAt", "desc"]],
      });
    };

    getDocuments()
      .then((d) => {
        if (d.length === 0) {
          //console.log("There are no YourReviews");

          this.setState(
            {
              YourReviews1: true,
              YourReviews2: true,
            },
            () => this.yourReviewsRace()
          );
        } else {
          let docArray = [];
          //console.log("Getting YourReviews Reviews");

          for (const n of d) {
            let returnedDoc = n.toJSON();
            //console.log("Review:\n", returnedDoc);
            returnedDoc.toId = Identifier.from(
              returnedDoc.toId,
              "base64"
            ).toJSON();
            //console.log("newReview:\n", returnedDoc);
            docArray = [...docArray, returnedDoc];
          }
          this.getYourReviewNames(docArray);
          this.getYourReplies(docArray);
        }
      })
      .catch((e) => console.error("Something went wrong:\n", e))
      .finally(() => client.disconnect());
  };

  getYourReviewNames = (docArray) => {
    const client = new Dash.Client(dapiClientNoWallet(this.state.whichNetwork));
    //START OF NAME RETRIEVAL

    let ownerarrayOfOwnerIds = docArray.map((doc) => {
      return doc.$ownerId;
    });

    let setOfOwnerIds = [...new Set(ownerarrayOfOwnerIds)];

    let arrayOfOwnerIds = [...setOfOwnerIds];

    // arrayOfOwnerIds = arrayOfOwnerIds.map((item) =>
    //   Buffer.from(Identifier.from(item))
    // );

    //console.log("Calling getNamesforDSOmsgs");

    const getNameDocuments = async () => {
      return client.platform.documents.get("DPNSContract.domain", {
        where: [["records.identity", "in", arrayOfOwnerIds]],
        orderBy: [["records.identity", "asc"]],
      });
    };

    getNameDocuments()
      .then((d) => {
        //WHAT IF THERE ARE NO NAMES? -> THEN THIS WON'T BE CALLED
        if (d.length === 0) {
          //console.log("No DPNS domain documents retrieved.");
        }

        let nameDocArray = [];

        for (const n of d) {
          //console.log("NameDoc:\n", n.toJSON());

          nameDocArray = [n.toJSON(), ...nameDocArray];
        }
        //console.log(`DPNS Name Docs: ${nameDocArray}`);

        this.setState(
          {
            YourReviewNames: nameDocArray,
            YourReviews: docArray,
            YourReviews1: true,
          },
          () => this.yourReviewsRace()
        );
      })
      .catch((e) => {
        console.error("Something went wrong getting YourReview Names:\n", e);
      })
      .finally(() => client.disconnect());
    //END OF NAME RETRIEVAL
  };

  getYourReplies = (docArray) => {
    const client = new Dash.Client(dapiClientNoWallet(this.state.whichNetwork));

    // This Below is to get unique set of ByYou review doc ids
    let arrayOfReviewIds = docArray.map((doc) => {
      return doc.$id;
    });

    //console.log("Array of ByYouThreads ids", arrayOfReviewIds);

    let setOfReviewIds = [...new Set(arrayOfReviewIds)];

    arrayOfReviewIds = [...setOfReviewIds];

    //console.log("Array of order ids", arrayOfReviewIds);

    const getDocuments = async () => {
      //console.log("Called Get Search Replies");

      return client.platform.documents.get("DGRContract.dgrreply", {
        where: [["reviewId", "in", arrayOfReviewIds]], // check reviewId ->
        orderBy: [["reviewId", "asc"]],
      });
    };

    getDocuments()
      .then((d) => {
        let docArray = [];

        for (const n of d) {
          let returnedDoc = n.toJSON();
          //console.log("Thr:\n", returnedDoc);
          returnedDoc.reviewId = Identifier.from(
            returnedDoc.reviewId,
            "base64"
          ).toJSON();
          //console.log("newThr:\n", returnedDoc);
          docArray = [...docArray, returnedDoc];
        }

        this.setState(
          {
            YourReviews2: true,
            YourReplies: docArray,
          },
          () => this.yourReviewsRace()
        );
      })
      .catch((e) => {
        console.error("Something went wrong Search Replies:\n", e);
      })
      .finally(() => client.disconnect());
  };

  handleYourReply = (reviewDoc, revieweeLabel) => {
    //First search and see if there is already a reply for the review
    let replyDoc = this.state.YourReplies.find((doc) => {
      return doc.reviewId === reviewDoc.$id;
    });

    if (replyDoc !== undefined) {
      this.setState(
        {
          replyReview: reviewDoc,
          replyToEdit: replyDoc,
          replyingToName: revieweeLabel,
        },
        () => this.showModal("EditReplyModal")
      );
    } else {
      this.setState(
        {
          replyReview: reviewDoc,
          replyToEdit: [],
          replyingToName: revieweeLabel,
        },
        () => this.showModal("CreateReplyModal")
      );
    }
  };

  createReview = (reviewObject) => {
    console.log("Called Create Review");

    this.setState({
      isLoadingReviewsSearch: true,
    });

    const client = new Dash.Client(
      dapiClient(
        this.state.whichNetwork,
        this.state.mnemonic,
        this.state.skipSynchronizationBeforeHeight
      )
    );

    const submitReviewDoc = async () => {
      const { platform } = client;

      let identity = "";
      if (this.state.identityRaw !== "") {
        identity = this.state.identityRaw;
      } else {
        identity = await platform.identities.get(this.state.identity);
      }

      const reviewProperties = {
        toId: this.state.SearchedNameDoc.$ownerId,
        review: reviewObject.review,
        rating: reviewObject.rating,
      };
      //console.log('Review to Create: ', reviewProperties);

      // Create the note document
      const dgrDocument = await platform.documents.create(
        "DGRContract.dgrreview",
        identity,
        reviewProperties
      );

      //############################################################
      //This below disconnects the document sending..***

      // return dgrDocument;

      //This is to disconnect the Document Creation***
      //############################################################

      const documentBatch = {
        create: [dgrDocument], // Document(s) to create
      };

      await platform.documents.broadcast(documentBatch, identity);
      return dgrDocument;
    };

    submitReviewDoc()
      .then((d) => {
        let returnedDoc = d.toJSON();
        console.log("Document:\n", returnedDoc);

        let review = {
          $ownerId: returnedDoc.$ownerId,
          $id: returnedDoc.$id,

          review: reviewObject.review,
          rating: reviewObject.rating,

          $createdAt: returnedDoc.$createdAt,
        };

        this.setState(
          {
            SearchedReviews: [review, ...this.state.SearchedReviews],
            isLoadingReviewsSearch: false,
          },
          () => this.sendFrontendFee()
        );
      })
      .catch((e) => {
        console.error("Something went wrong with review creation:\n", e);
      })
      .finally(() => client.disconnect());

    //THIS BELOW IS THE NAME DOC ADD, SO PROCESSES DURING DOC SUBMISSION ***
    let nameDoc = {
      $ownerId: this.state.identity,
      label: this.state.uniqueName,
    };

    this.setState({
      SearchedReviewNames: [nameDoc, ...this.state.SearchedReviewNames],
    });
    //END OF NAME DOC ADD***
  };

  editReview = (reviewObject) => {
    console.log("Called Edit Review");

    this.setState({
      isLoadingReviewsSearch: true,
    });

    const client = new Dash.Client(
      dapiClient(
        this.state.whichNetwork,
        this.state.mnemonic,
        this.state.skipSynchronizationBeforeHeight
      )
    );

    const submitReviewDoc = async () => {
      const { platform } = client;

      let identity = "";
      if (this.state.identityRaw !== "") {
        identity = this.state.identityRaw;
      } else {
        identity = await platform.identities.get(this.state.identity);
      }

      const [document] = await client.platform.documents.get(
        "DGRContract.dgrreview",
        {
          where: [["$id", "==", this.state.reviewToEdit.$id]],
        }
      );

      if (this.state.reviewToEdit.review !== reviewObject.review) {
        document.set("review", reviewObject.review);
      }

      if (this.state.reviewToEdit.rating !== reviewObject.rating) {
        document.set("review", reviewObject.rating);
      }

      await platform.documents.broadcast({ replace: [document] }, identity);
      return document;

      //############################################################
      //This below disconnects the document editing..***

      //return document;

      //This is to disconnect the Document editing***
      //############################################################
    };

    submitReviewDoc()
      .then((d) => {
        let returnedDoc = d.toJSON();
        console.log("Edited Review Doc:\n", returnedDoc);

        let review = {
          $ownerId: returnedDoc.$ownerId,
          $id: returnedDoc.$id,

          review: reviewObject.review,
          rating: reviewObject.rating,

          $createdAt: returnedDoc.$createdAt,
          $updatedAt: returnedDoc.$updatedAt,
        };

        let editedReviews = this.state.SearchedReviews;

        editedReviews.splice(this.state.reviewToEditIndex, 1, review);

        this.setState(
          {
            SearchedReviews: editedReviews,
            isLoadingReviewsSearch: false,
          },
          () => this.loadIdentityCredits()
        );
      })
      .catch((e) => {
        console.error("Something went wrong with review edit:\n", e);
      })
      .finally(() => client.disconnect());
  };

  createReply = (replyObject) => {
    console.log("Called Create Reply");

    this.setState({
      isLoadingYourReviews: true,
    });

    const client = new Dash.Client(
      dapiClient(
        this.state.whichNetwork,
        this.state.mnemonic,
        this.state.skipSynchronizationBeforeHeight
      )
    );

    const submitReviewDoc = async () => {
      const { platform } = client;

      let identity = "";
      if (this.state.identityRaw !== "") {
        identity = this.state.identityRaw;
      } else {
        identity = await platform.identities.get(this.state.identity);
      }

      const replyProperties = {
        reviewId: this.state.replyReview.$id,
        reply: replyObject.reply,
      };
      //console.log('Reply to Create: ', replyProperties);

      // Create the note document
      const dgrDocument = await platform.documents.create(
        "DGRContract.dgrreply",
        identity,
        replyProperties
      );

      //############################################################
      //This below disconnects the document sending..***

      // return dgrDocument;

      //This is to disconnect the Document Creation***
      //############################################################

      const documentBatch = {
        create: [dgrDocument], // Document(s) to create
      };

      await platform.documents.broadcast(documentBatch, identity);
      return dgrDocument;
    };

    submitReviewDoc()
      .then((d) => {
        let returnedDoc = d.toJSON();
        console.log("Document:\n", returnedDoc);

        let reply = {
          $ownerId: returnedDoc.$ownerId,
          $id: returnedDoc.$id,
          $createdAt: returnedDoc.$createdAt,

          reviewId: this.state.replyReview.$id,
          reply: replyObject.reply,
        };

        this.setState(
          {
            YourReplies: [reply, ...this.state.YourReplies],
            isLoadingYourReviews: false,
          },
          () => this.loadIdentityCredits()
        );
      })
      .catch((e) => {
        console.error("Something went wrong with reply creation:\n", e);
      })
      .finally(() => client.disconnect());
  };

  editReply = (replyObject) => {
    console.log("Called Edit Reply");

    this.setState({
      isLoadingYourReviews: true,
    });

    const client = new Dash.Client(
      dapiClient(
        this.state.whichNetwork,
        this.state.mnemonic,
        this.state.skipSynchronizationBeforeHeight
      )
    );

    const submitReplyDoc = async () => {
      const { platform } = client;

      let identity = "";
      if (this.state.identityRaw !== "") {
        identity = this.state.identityRaw;
      } else {
        identity = await platform.identities.get(this.state.identity);
      }

      const [document] = await client.platform.documents.get(
        "DGRContract.dgrreply",
        {
          where: [["$id", "==", this.state.replyToEdit.$id]],
        }
      );

      if (this.state.replyToEdit.reply !== replyObject.reply) {
        document.set("reply", replyObject.reply);
      }

      await platform.documents.broadcast({ replace: [document] }, identity);
      return document;

      //############################################################
      //This below disconnects the document editing..***

      //return document;

      //This is to disconnect the Document editing***
      //############################################################
    };

    submitReplyDoc()
      .then((d) => {
        let returnedDoc = d.toJSON();
        console.log("Edited Reply Doc:\n", returnedDoc);

        let editedReply = {
          $ownerId: returnedDoc.$ownerId,
          $id: returnedDoc.$id,
          $updatedAt: returnedDoc.$updatedAt,
          $createdAt: returnedDoc.$createdAt,

          reviewId: this.state.replyReview.$id,
          reply: replyObject.reply,
        };

        let indexOfReply = this.state.YourReplies.findIndex((reply) => {
          return reply.$id === editedReply.$id;
        });

        let editedReplies = this.state.YourReplies;

        editedReplies.splice(indexOfReply, 1, editedReply);

        this.setState(
          {
            YourReplies: editedReplies,
            isLoadingYourReviews: false,
          },
          () => this.loadIdentityCredits()
        );
      })
      .catch((e) => {
        console.error("Something went wrong with reply creation:\n", e);
      })
      .finally(() => client.disconnect());
  };

  /*
  *REVIEWS FUNCTIONS^^^^
  
   * 
   *      ################
   *      ###          ####
   *      ################
   *      ###          ####
   *      ###           ####
   *
   */

  loadIdentityCredits = () => {
    console.log("Called loadIdentityCredits");

    this.setState({
      identityInfo: "",
    });

    const client = new Dash.Client(dapiClientNoWallet(this.state.whichNetwork));

    const retrieveIdentity = async () => {
      return client.platform.identities.get(this.state.identity); // Your identity ID
    };

    retrieveIdentity()
      .then((d) => {
        //console.log("Identity retrieved:\n", d.toJSON());

        this.setState({
          identityInfo: d.toJSON(),
          identityRaw: d,
        });
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
      })
      .finally(() => client.disconnect());
  };

  render() {
    this.state.mode === "primary"
      ? (document.body.style.backgroundColor = "rgb(280,280,280)")
      : (document.body.style.backgroundColor = "rgb(20,20,20)");

    this.state.mode === "primary"
      ? (document.body.style.color = "black")
      : (document.body.style.color = "white");

    // isLoginComplete = false, merchant, or customer
    let isLoginComplete = false;
    //CHANGE TO IDENTITY -> NO, stay with names
    //this.state.identityInfo !== "" && this.state.identity !== "no identity";
    // this.state.uniqueName !== "" && this.state.uniqueName !== "no name";
    //
    //THIS IS WHERE THE RUBBER MEETS THE ROAD
    // CUSTOMER NEEDS A PROXYDOC AND VERIFIED PROXYCONTROLLER
    // MERCHANT JUST NEED THE ID MATCH.  AND THE MERCHANT NAME DOC?

    let loggedInAs = "customer"; //"customer"; // 'merchant'
    let ProxyTuple = undefined;
    let uniqueName = "No Proxy";

    if (import.meta.env.VITE_MERCHANT_IDENTITY === this.state.identity) {
      if (this.state.MerchantNameDoc.label !== "no name") {
        isLoginComplete = true;
        loggedInAs = "merchant";
        uniqueName = this.state.MerchantNameDoc.label;
      }
    } else {
      // ProxyDoc: '',
      // ProxyController: {
      //   proxyList: [],
      // },
      // ProxyNameDoc: "",
      ProxyTuple = this.state.ProxyController.proxyList.find((proxyTuple) => {
        return proxyTuple[0] === this.state.identity;
        //this.state.ProxyDoc.$id;
      });

      let isProxyApproved = false;
      //ProxyApproved could be a tuple or undefined
      if (ProxyTuple !== undefined) {
        isProxyApproved = true;
      }

      let ProxyVerified =
        this.state.ProxyDoc !== "" &&
        this.state.ProxyNameDoc !== "" &&
        isProxyApproved;

      if (
        ProxyVerified // && this.state.MerchantNameDoc.label !== "no name"
      ) {
        isLoginComplete = true;
        uniqueName = `${this.state.ProxyNameDoc.label}*`;
      }
    }

    return (
      <>
        <TopNav
          handleMode={this.handleMode}
          mode={this.state.mode}
          loggedInAs={loggedInAs}
          isLoginComplete={isLoginComplete}
          showModal={this.showModal}
          whichNetwork={this.state.whichNetwork}
          isLoggedIn={this.state.isLoggedIn}
          toggleTopNav={this.toggleTopNav}
          expandedTopNav={this.state.expandedTopNav}
          selectedPage={this.state.selectedPage}
          handleSelectedPage={this.handleSelectedPage}
          uniqueName={uniqueName}
          identity={this.state.identity}
          identityInfo={this.state.identityInfo}
        />
        <Image fluid="true" id="dash-bkgd" src={DashBkgd} alt="Dash Logo" />
        <Container className="g-0">
          {loggedInAs === "customer" ? (
            <>
              {this.state.selectedPage === "Inventory" ? (
                <>
                  <InventoryPage
                    isLoginComplete={isLoginComplete}
                    isLoadingInventory={this.state.isLoadingInventory}
                    identity={this.state.identity}
                    identityInfo={this.state.identityInfo}
                    //handleSelectedPage={this.handleSelectedPage}

                    handleSelectedItem={this.handleSelectedItem}
                    uniqueName={uniqueName}
                    mode={this.state.mode}
                    Inventory={this.state.Inventory}
                    showModal={this.showModal}
                  />
                </>
              ) : (
                <></>
              )}
            </>
          ) : (
            <></>
          )}
          {loggedInAs === "merchant" ? (
            <>
              {this.state.selectedPage === "Inventory" ? (
                <>
                  <YourInventoryPage
                    isLoadingInventory={this.state.isLoadingInventory}
                    whichNetwork={this.state.whichNetwork}
                    identity={this.state.identity}
                    identityInfo={this.state.identityInfo}
                    uniqueName={uniqueName}
                    mode={this.state.mode}
                    handleSelectedPage={this.handleSelectedPage}
                    handleSelectedItem={this.handleSelectedItem}
                    Inventory={this.state.Inventory}
                    InventoryInitial={this.state.InventoryInitial}
                    moveItemUpDown={this.moveItemUpDown}
                    //
                    showModal={this.showModal}
                    // isLoadingWallet={this.state.isLoadingWallet}
                    // accountBalance={this.state.accountBalance}
                  />
                </>
              ) : (
                <></>
              )}
            </>
          ) : (
            <></>
          )}
        </Container>
        <Container className="g-0">
          <Row className="justify-content-md-center">
            <Col md={9} lg={8} xl={7} xxl={6}>
              {/* <Col
              //md={11}
              //lg={10}
              xl={9} //xxl={8}
            > */}
              {this.state.selectedPage === "Login" ? (
                <>
                  {!this.state.isLoggedIn ? (
                    <>
                      <LoginForm
                        handleAccountLogin={this.handleAccountLogin}
                        DashMoneyLFKeys={this.state.DashMoneyLFKeys}
                        showModal={this.showModal}
                        mode={this.state.mode}
                      />
                    </>
                  ) : (
                    <></>
                  )}
                  {this.state.isLoggedIn ? ( //&&!this.state.isIdentityControlShowing
                    <>
                      <AccountLogin
                        isLoginComplete={isLoginComplete}
                        loggedInAs={loggedInAs}
                        MerchantNameDoc={this.state.MerchantNameDoc}
                        ProxyDoc={this.state.ProxyDoc}
                        ProxyTuple={ProxyTuple}
                        ProxyNameDoc={this.state.ProxyNameDoc}
                        whichNetwork={this.state.whichNetwork}
                        mnemonic={this.state.mnemonic}
                        handleAccountRetry={this.handleAccountRetry}
                        showModal={this.showModal}
                        toggleTopNav={this.toggleTopNav}
                        handleSelectedPage={this.handleSelectedPage}
                        isLoadingIdentity={this.state.isLoadingIdentity}
                        isLoadingIdInfo={this.state.isLoadingIdInfo}
                        identityRegisterCount={this.state.identityRegisterCount}
                        isLoadingProxy={this.state.isLoadingProxy}
                        startProxyRace={this.startProxyRace}
                        isLoadingWallet={this.state.isLoadingWallet}
                        identity={this.state.identity}
                        identityRaw={this.state.identityRaw}
                        identityInfo={this.state.identityInfo}
                        uniqueName={uniqueName}
                        accountBalance={this.state.accountBalance}
                        mode={this.state.mode}
                      />
                    </>
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <></>
              )}
              {loggedInAs === "merchant" ? (
                <>
                  {/* {this.state.selectedPage === "Inventory" ? (
                    <>
                      <YourInventoryPage
                        isLoadingInventory={this.state.isLoadingInventory}
                        identity={this.state.identity}
                        identityInfo={this.state.identityInfo}
                        uniqueName={uniqueName}
                        mode={this.state.mode}
                        handleSelectedPage={this.handleSelectedPage}
                        handleSelectedItem={this.handleSelectedItem}
                        Inventory={this.state.Inventory}
                        InventoryDoc={this.state.InventoryDoc}
                        moveItemUpDown={this.moveItemUpDown}
                        //
                        showModal={this.showModal}
                        // isLoadingWallet={this.state.isLoadingWallet}
                        // accountBalance={this.state.accountBalance}
                      />
                    </>
                  ) : (
                    <></>
                  )} */}
                  {this.state.selectedPage === "Orders" ? (
                    <>
                      <OrdersPage
                        isLoginComplete={isLoginComplete}
                        isLoadingInventory={this.state.isLoadingInventory}
                        isLoadingOrders={this.state.isLoadingOrders}
                        isMerchantOrdersRefreshReady={
                          this.state.isMerchantOrdersRefreshReady
                        }
                        refreshMerchantOrders={this.refreshMerchantOrders}
                        Inventory={this.state.Inventory}
                        UnconfirmedOrders={this.state.UnconfirmedOrders}
                        ConfirmedOrders={this.state.ConfirmedOrders}
                        UnconfirmedOrdersNames={
                          this.state.UnconfirmedOrdersNames
                        }
                        OrderReplies={this.state.OrderReplies}
                        handleSelectedItem={this.handleSelectedItem}
                        handleConfirmOrderModal={this.handleConfirmOrderModal}
                        handleMerchantReplyModalShow={
                          this.handleMerchantReplyModalShow
                        }
                        handleMerchantOrderFilter={
                          this.handleMerchantOrderFilter
                        }
                        //
                        // pullInitialTriggerMERCHANT={
                        //   this.pullInitialTriggerMERCHANT
                        // }
                        // InitialPullMerchant={this.state.InitialPullMerchant}
                        identity={this.state.identity}
                        identityInfo={this.state.identityInfo}
                        uniqueName={uniqueName}
                        MerchantNameDoc={this.state.MerchantNameDoc}
                        DisplayOrders={this.state.DisplayOrders}
                        //
                        mode={this.state.mode}
                        showModal={this.showModal}
                        // isLoadingWallet={this.state.isLoadingWallet}
                        // accountBalance={this.state.accountBalance}
                        //
                      />
                    </>
                  ) : (
                    <></>
                  )}

                  {this.state.selectedPage === "Add Item" ? (
                    <>
                      <CreateItemPage
                        whichNetwork={this.state.whichNetwork}
                        isLoadingInventory={this.state.isLoadingInventory}
                        identity={this.state.identity}
                        identityInfo={this.state.identityInfo}
                        uniqueName={uniqueName}
                        mode={this.state.mode}
                        accountBalance={this.state.accountBalance}
                        isLoadingWallet={this.state.isLoadingWallet}
                        Inventory={this.state.Inventory}
                        createItem={this.createItem}
                        handleSelectedPage={this.handleSelectedPage}
                      />
                    </>
                  ) : (
                    <></>
                  )}
                  {this.state.selectedPage === "Selected Item" ? (
                    <>
                      {/* DONT HANDLE THE LOGIN SEPARATED PARTS HERE DO THAT IN THE COMPONENT AND PASS THE **ISLOGINCOMPLETE** THROUGH PROPS */}
                      <YourSelectedItem
                        isLoginComplete={isLoginComplete}
                        whichNetwork={this.state.whichNetwork}
                        // could use ^^^ for allowing to add to cart
                        isLoadingInventory={this.state.isLoadingInventory}
                        identity={this.state.identity}
                        identityInfo={this.state.identityInfo}
                        uniqueName={uniqueName}
                        mode={this.state.mode}
                        //
                        handleEditItemModal={this.handleEditItemModal}
                        handleDeleteItemModal={this.handleDeleteItemModal}
                        //
                        item={this.state.SelectedItem}
                        UnconfirmedOrders={this.state.UnconfirmedOrders}
                        //
                        MerchantId={this.state.MerchantId}
                        DataContractRENTALS={this.state.DataContractRENTALS}
                        //
                        handleBlockConfirmModal={this.handleBlockConfirmModal}
                        //
                        handleSelectedPage={this.handleSelectedPage}
                        //  this ^^^ send to rsrvs if have any
                        showModal={this.showModal}
                      />
                    </>
                  ) : (
                    <></>
                  )}

                  {/* {this.state.selectedPage === "Edit Item" ? (
                    <>
                      <EditItem
                        isLoadingInventory={this.state.isLoadingInventory}
                        identity={this.state.identity}
                        identityInfo={this.state.identityInfo}
                        uniqueName={uniqueName}
                        mode={this.state.mode}
                        accountBalance={this.state.accountBalance}
                        isLoadingWallet={this.state.isLoadingWallet}
                        editItem={this.editItem}
                        handleSelectedPage={this.handleSelectedPage}
                      />
                    </>
                  ) : (
                    <></>
                  )} */}
                </>
              ) : (
                <></>
              )}

              {loggedInAs === "customer" ? (
                <>
                  {/* {this.state.selectedPage === "Inventory" ? (
                    <>
                      
                      <InventoryPage
                        isLoginComplete={isLoginComplete}
                        isLoadingInventory={this.state.isLoadingInventory}
                        identity={this.state.identity}
                        identityInfo={this.state.identityInfo}
                        //handleSelectedPage={this.handleSelectedPage}

                        handleSelectedItem={this.handleSelectedItem}
                        uniqueName={uniqueName}
                        mode={this.state.mode}
                        Inventory={this.state.Inventory}
                        showModal={this.showModal}
                      />
                    </>
                  ) : (
                    <></>
                  )} */}
                  {this.state.selectedPage === "Selected Item" ? (
                    <>
                      {/* DONT HANDLE THE LOGIN SEPARATED PARTS HERE DO THAT IN THE COMPONENT AND PASS THE **ISLOGINCOMPLETE** THROUGH PROPS */}
                      <SelectedCustomerItem
                        isLoginComplete={isLoginComplete}
                        whichNetwork={this.state.whichNetwork}
                        // could use ^^^ for allowing to schedule request
                        isLoadingInventory={this.state.isLoadingInventory}
                        identity={this.state.identity}
                        identityInfo={this.state.identityInfo}
                        uniqueName={uniqueName}
                        mode={this.state.mode}
                        //
                        item={this.state.SelectedItem}
                        UnconfirmedOrders={this.state.UnconfirmedOrders}
                        //
                        MerchantId={this.state.MerchantId}
                        MerchantNameDoc={this.state.MerchantNameDoc}
                        DataContractRENTALS={this.state.DataContractRENTALS}
                        //
                        // handleMakeRequestModal={this.handleMakeRequestModal}
                        handleAddToCartModal={this.handleAddToCartModal}
                        //
                        handleSelectedPage={this.handleSelectedPage}
                        //  this ^^^ send to rsrvs if have any
                        showModal={this.showModal}
                      />
                    </>
                  ) : (
                    <></>
                  )}
                  {this.state.selectedPage === "Orders" ? (
                    <>
                      <YourOrdersPage
                        isLoginComplete={isLoginComplete}
                        whichNetwork={this.state.whichNetwork}
                        // pullInitialTriggerCUSTOMER={
                        //   this.pullInitialTriggerCUSTOMER
                        // }
                        // InitialPullCustomer={this.state.InitialPullCustomer}
                        isLoadingInventory={this.state.isLoadingInventory}
                        isLoadingOrders={this.state.isLoadingOrders}
                        isYourOrdersRefreshReady={
                          this.state.isYourOrdersRefreshReady
                        }
                        refreshYourOrders={this.refreshYourOrders}
                        Inventory={this.state.Inventory}
                        //
                        UnconfirmedOrders={this.state.UnconfirmedOrders}
                        ConfirmedOrders={this.state.ConfirmedOrders}
                        OrderReplies={this.state.OrderReplies}
                        //
                        //handleSelectedItem={this.handleSelectedItem}
                        handleCustomerReplyModalShow={
                          this.handleCustomerReplyModalShow
                        }
                        //
                        handleDeleteOrderModal={this.handleDeleteOrderModal}
                        //
                        identity={this.state.identity}
                        identityInfo={this.state.identityInfo}
                        MerchantNameDoc={this.state.MerchantNameDoc}
                        uniqueName={uniqueName}
                        //
                        mode={this.state.mode}
                        showModal={this.showModal}
                      />
                    </>
                  ) : (
                    <></>
                  )}

                  {this.state.selectedPage === "Shopping Cart" ? (
                    <>
                      <CartPage
                        isLoginComplete={isLoginComplete}
                        whichNetwork={this.state.whichNetwork}
                        isLoadingOrders={this.state.isLoadingOrders}
                        isLoadingShoppingCart={this.state.isLoadingShoppingCart}
                        identity={this.state.identity}
                        identityInfo={this.state.identityInfo}
                        handleSelectedPage={this.handleSelectedPage}
                        handleEditCartItemModal={this.handleEditCartItemModal}
                        //handleSelectedItem={this.handleSelectedItem}
                        //
                        //MerchantNameDoc={this.state.MerchantNameDoc}
                        uniqueName={uniqueName}
                        mode={this.state.mode}
                        Inventory={this.state.Inventory}
                        CartItems={this.state.CartItems}
                        showModal={this.showModal}
                      />
                    </>
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <></>
              )}
            </Col>
          </Row>
        </Container>
        {/* #####    BELOW ARE THE MODALS    #####    */}
        {this.state.isModalShowing &&
        this.state.presentModal === "LogoutModal" ? (
          <LogoutModal
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
            handleLogout={this.handleLogout}
            closeTopNav={this.closeTopNav}
          />
        ) : (
          <></>
        )}
        {this.state.isModalShowing &&
        this.state.presentModal === "CreateNewWalletModal" ? (
          <CreateNewWalletModal
            isModalShowing={this.state.isModalShowing}
            whichNetwork={this.state.whichNetwork}
            hideModal={this.hideModal}
            mode={this.state.mode}
            closeTopNav={this.closeTopNav}
          />
        ) : (
          <></>
        )}
        {this.state.isModalShowing &&
        this.state.presentModal === "SendFundsModal" ? (
          <SendFundsModal
            isModalShowing={this.state.isModalShowing}
            accountAddress={this.state.accountAddress}
            whichNetwork={this.state.whichNetwork}
            hideModal={this.hideModal}
            mode={this.state.mode}
            closeTopNav={this.closeTopNav}
          />
        ) : (
          <></>
        )}
        {this.state.isModalShowing &&
        this.state.presentModal === "FrontEndExplaination" ? (
          <FrontEndExplaination
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
            showModal={this.state.showModal}
          />
        ) : (
          <></>
        )}
        {this.state.isModalShowing &&
        this.state.presentModal === "RegisterIdentityModal" ? (
          <RegisterIdentityModal
            isModalShowing={this.state.isModalShowing}
            registerIdentity={this.registerIdentity}
            hideModal={this.hideModal}
            mode={this.state.mode}
            skipSynchronizationBeforeHeight={
              this.state.skipSynchronizationBeforeHeight
            }
            whichNetwork={this.state.whichNetwork}
            closeTopNav={this.closeTopNav}
          />
        ) : (
          <></>
        )}
        {this.state.isModalShowing &&
        this.state.presentModal === "TopUpIdentityModal" ? (
          <TopUpIdentityModal
            accountBalance={this.state.accountBalance}
            isLoadingWallet={this.state.isLoadingWallet}
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
            whichNetwork={this.state.whichNetwork}
            doTopUpIdentity={this.doTopUpIdentity}
            closeTopNav={this.closeTopNav}
          />
        ) : (
          <></>
        )}
        {this.state.isModalShowing &&
        this.state.presentModal === "RegisterProxyModal" ? (
          <RegisterProxyModal
            triggerProxyLoading={this.triggerProxyLoading}
            triggerProxyNotLoading={this.triggerProxyNotLoading}
            handleProxy={this.handleProxy}
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
            identity={this.state.identity}
            identityRaw={this.state.identityRaw}
            mnemonic={this.state.mnemonic}
            whichNetwork={this.state.whichNetwork}
            skipSynchronizationBeforeHeight={
              this.state.skipSynchronizationBeforeHeight
            }
            closeTopNav={this.closeTopNav}
          />
        ) : (
          <></>
        )}

        {/* {this.state.isModalShowing &&
        this.state.presentModal === "RegisterNameModal" ? (
          <RegisterNameModal
            triggerNameLoading={this.triggerNameLoading}
            triggerNameNotLoading={this.triggerNameNotLoading}
            handleName={this.handleName}
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
            identity={this.state.identity}
            identityRaw={this.state.identityRaw}
            mnemonic={this.state.mnemonic}
            whichNetwork={this.state.whichNetwork}
            skipSynchronizationBeforeHeight={
              this.state.skipSynchronizationBeforeHeight
            }
            closeTopNav={this.closeTopNav}
          />
        ) : (
          <></>
        )} */}

        {this.state.isModalShowing &&
        this.state.presentModal === "EditItemModal" ? (
          <EditItemModal
            whichNetwork={this.state.whichNetwork}
            SelectedItem={this.state.SelectedItem}
            handleSelectedPage={this.handleSelectedPage}
            editItem={this.editItem}
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
          />
        ) : (
          <></>
        )}

        {this.state.isModalShowing &&
        this.state.presentModal === "DeleteItemModal" ? (
          <DeleteItemModal
            item={this.state.SelectedItem}
            deleteItem={this.deleteItem}
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
          />
        ) : (
          <></>
        )}

        {this.state.isModalShowing &&
        this.state.presentModal === "SaveInventoryModal" ? (
          <SaveInventoryModal
            saveInventory={this.saveInventory}
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
          />
        ) : (
          <></>
        )}

        {this.state.isModalShowing &&
        this.state.presentModal === "ConfirmOrderModal" ? (
          <ConfirmOrderModal
            //DataContractRENTALS={this.state.DataContractRENTALS}
            whichNetwork={this.state.whichNetwork}
            //MerchantId={this.state.MerchantId}
            //SelectedItem={this.state.SelectedItem}
            Inventory={this.state.Inventory}
            order={this.state.SelectedOrder}
            SelectedOrderNameDoc={this.state.SelectedOrderNameDoc}
            createConfirmOrder={this.createConfirmOrder}
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
          />
        ) : (
          <></>
        )}

        {this.state.isModalShowing &&
        this.state.presentModal === "CustomerReplyModal" ? (
          <CustomerReplyModal
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
            MerchantNameDoc={this.state.MerchantNameDoc}
            SelectedConfirm={this.state.SelectedConfirm}
            createCustomerReply={this.createCustomerReply}
            closeTopNav={this.closeTopNav}
          />
        ) : (
          <></>
        )}
        {this.state.isModalShowing &&
        this.state.presentModal === "MerchantReplyModal" ? (
          <MerchantReplyModal
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
            SelectedConfirm={this.state.SelectedConfirm}
            SelectedReplyNameDoc={this.state.SelectedReplyNameDoc}
            createMerchantReply={this.createMerchantReply}
            closeTopNav={this.closeTopNav}
          />
        ) : (
          <></>
        )}

        {this.state.isModalShowing &&
        this.state.presentModal === "AddItemToCartModal" ? (
          <AddItemToCartModal
            isModalShowing={this.state.isModalShowing}
            whichNetwork={this.state.whichNetwork}
            SelectedCartItem={this.state.SelectedCartItem}
            Inventory={this.state.Inventory}
            CartItems={this.state.CartItems}
            addToCart={this.addToCart}
            hideModal={this.hideModal}
            mode={this.state.mode}
          />
        ) : (
          <></>
        )}
        {this.state.isModalShowing &&
        this.state.presentModal === "EditCartItemModal" ? (
          <EditCartItemModal
            whichNetwork={this.state.whichNetwork}
            isModalShowing={this.state.isModalShowing}
            SelectedCartItemIndex={this.state.SelectedCartItemIndex}
            Inventory={this.state.Inventory}
            CartItems={this.state.CartItems}
            editCart={this.editCart}
            hideModal={this.hideModal}
            mode={this.state.mode}
          />
        ) : (
          <></>
        )}
        {this.state.isModalShowing &&
        this.state.presentModal === "PlaceOrderModal" ? (
          <PlaceOrderModal
            // isLoadingWallet={this.state.isLoadingWallet}

            whichNetwork={this.state.whichNetwork}
            MerchantNameDoc={this.state.MerchantNameDoc}
            isModalShowing={this.state.isModalShowing}
            CartItems={this.state.CartItems}
            Inventory={this.state.Inventory}
            placeOrder={this.placeOrder}
            hideModal={this.hideModal}
            mode={this.state.mode}
          />
        ) : (
          <></>
        )}
        {this.state.isModalShowing &&
        this.state.presentModal === "DeleteOrderModal" ? (
          <DeleteOrderModal
            whichNetwork={this.state.whichNetwork}
            MerchantNameDoc={this.state.MerchantNameDoc}
            Inventory={this.state.Inventory}
            order={this.state.SelectedOrder}
            deleteOrder={this.deleteOrder}
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
          />
        ) : (
          <></>
        )}
      </>
    );
  }
}

export default App;
