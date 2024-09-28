import React from "react";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import Alert from "react-bootstrap/Alert";

import handleDenomDisplay from "../UnitDisplay";

class AccountLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      extraInfo: false,
      copiedIdentity: false,
    };
  }

  handleExtraInfo = () => {
    if (this.state.extraInfo === false)
      this.setState({
        extraInfo: true,
      });
    else {
      this.setState({
        extraInfo: false,
      });
    }
  };

  handleCreditsToTopup = () => {
    let topUpAmt = (this.props.identityInfo.balance / 1000000000).toFixed(2);
    return topUpAmt;
  };

  render() {
    let buttonColor;

    if (this.props.mode === "primary") {
      buttonColor = "outline-dark";
    } else {
      buttonColor = "outline-light";
    }

    return (
      <>
        <div className="bodytext">
          <h2>
            <b>Your Account</b>
          </h2>

          {/* START OF THE NEW CONNECTED PAGE FLOW */}
          {!this.props.identityError &&
          !this.props.identityInfoError &&
          !this.props.walletError &&
          !this.props.nameError ? (
            <>
              {this.props.isLoadingWallet ? (
                <>
                  <div className="indentStuff">
                    <b>Wallet Balance</b>

                    <h4>Loading..</h4>
                  </div>
                </>
              ) : (
                <>
                  <div className="indentStuff">
                    <div className="cardTitle">
                      <div>
                        <b>Wallet Balance</b>
                        <h4 style={{ color: "#008de4" }}>
                          <b>
                            {handleDenomDisplay(
                              this.props.whichNetwork,
                              this.props.accountBalance
                            )}
                          </b>
                        </h4>
                      </div>

                      {!this.props.isLoading &&
                      !this.props.isLoadingWallet &&
                      this.props.identity === "no identity" &&
                      this.props.accountBalance === 0 ? (
                        <>
                          <Button
                            style={{ marginRight: "1rem" }}
                            variant="primary"
                            onClick={() => this.props.handleAccountRetry()}
                          >
                            <b>Retry</b>
                          </Button>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </>
              )}

              {!this.props.isLoading &&
              !this.props.isLoadingWallet &&
              this.props.identity === "no identity" &&
              this.props.accountBalance === 0 ? (
                <>
                  <p>There are insufficient funds in your wallet.</p>

                  <div className="d-grid gap-2">
                    <Button
                      size="lg"
                      variant="primary"
                      onClick={() => {
                        this.props.showModal("SendFundsModal");
                      }}
                    >
                      <b>Send Funds to Wallet</b>
                    </Button>
                  </div>
                </>
              ) : (
                <></>
              )}

              {!this.props.isLoadingIdentity &&
              this.props.identity === "no identity" &&
              this.props.accountBalance !== 0 ? (
                <>
                  <div className="d-grid gap-2">
                    <Button
                      size="lg"
                      variant="primary"
                      onClick={() => {
                        this.props.showModal("RegisterIdentityModal");
                      }}
                    >
                      <b>Register Identity</b>
                    </Button>
                  </div>
                  <p></p>
                  <div className="bodytext">
                    <p>
                      You are ready to <b>Register an Identity</b> and then
                      begin name purchasing!
                    </p>
                  </div>
                  {/* <p>
                    If this action doesn't work, Testnet Platform may be down.
                  </p> */}
                </>
              ) : (
                <></>
              )}

              <div className="ms-2 me-auto">
                {!this.props.isLoadingIdentity &&
                !this.props.isLoadingIdInfo &&
                this.props.identityInfo !== "" &&
                this.props.identity !== "no identity" ? (
                  <>
                    <p></p>

                    {/* <div className="id-line "> */}
                    {/* Insert beginning************** */}

                    <Button
                      variant="primary"
                      onClick={() => this.props.showModal("TopUpIdentityModal")}
                    >
                      <b>TopUp Identity</b>
                    </Button>

                    <span>
                      {/* <Badge className="paddingBadge" bg="primary" pill>
                        {this.props.identityInfo.balance} Credits
                        // {this.handleCreditsToTopup()} TopUps of Credits 
                      </Badge> */}

                      {this.props.identityInfo !== "" &&
                      this.props.identityInfo.balance > 450000000 ? (
                        <Badge className="paddingBadge" bg="primary" pill>
                          {this.handleCreditsToTopup()} TopUps of Credits
                        </Badge>
                      ) : (
                        <></>
                      )}
                      {this.props.identityInfo !== "" &&
                      this.props.identityInfo.balance <= 450000000 ? (
                        <Badge className="paddingBadge" bg="danger" pill>
                          {this.handleCreditsToTopup()} TopUps of Credits
                        </Badge>
                      ) : (
                        <></>
                      )}
                    </span>

                    <p></p>
                  </>
                ) : (
                  <></>
                )}

                {!this.props.isLoadingIdentity &&
                this.props.isLoadingIdInfo &&
                this.props.identityInfo !== "" &&
                this.props.identity !== "no identity" ? (
                  <>
                    <p></p>
                    <Button variant="primary" disabled>
                      <b>TopUp Identity</b>
                    </Button>

                    <span>
                      <Badge className="paddingBadge" bg="primary" pill>
                        Loading..
                      </Badge>
                    </span>

                    <p></p>
                  </>
                ) : (
                  <></>
                )}

                {!this.props.isLoadingIdentity &&
                this.props.isLoadingIdInfo &&
                this.props.identityInfo === "" &&
                this.props.isLoginComplete ? (
                  <>
                    <p></p>
                    <Button variant="primary" disabled>
                      <b>TopUp Identity</b>
                    </Button>

                    <span>
                      <Badge className="paddingBadge" bg="primary" pill>
                        Loading..
                      </Badge>
                    </span>

                    <p></p>
                  </>
                ) : (
                  <></>
                )}

                {!this.props.isLoadingProxy &&
                this.props.loggedInAs === "customer" &&
                this.props.identity !== "no identity" ? (
                  <>
                    {this.props.ProxyDoc === "" ? (
                      <>
                        <div className="indentStuff">
                          <h4>
                            <b>Create Proxy Account</b>
                          </h4>
                        </div>
                        <div className="d-grid gap-2">
                          <Button
                            size="lg"
                            variant="primary"
                            onClick={() =>
                              this.props.showModal("RegisterProxyModal")
                            }
                          >
                            <b>Register Proxy</b>
                          </Button>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}

                    {this.props.ProxyDoc !== "" &&
                    !this.props.isLoginComplete ? (
                      <>
                        <div className="indentStuff">
                          <h4>
                            <b>Connect Proxy Account</b>
                          </h4>
                        </div>
                        <p></p>
                        <Alert variant="success">
                          <Alert.Heading>Name-Wallet Required</Alert.Heading>
                          <p>
                            <b>
                              Add the IdentityId below, to your Name-Wallet's
                              Proxy Accounts.
                            </b>
                          </p>
                          <p>
                            Then <b>Reload Proxy</b> to finish login.
                          </p>
                        </Alert>
                        <div className="d-grid gap-2">
                          <Button
                            size="lg"
                            variant="primary"
                            onClick={() => this.props.startProxyRace()}
                          >
                            <b>Reload Proxy</b>
                          </Button>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}

                    {
                      //this.props.ProxyDoc !== "" &&
                      this.props.isLoginComplete ? (
                        // this.props.ProxyNameDoc !== "" &&
                        // this.props.ProxyDoc !== "" &&
                        // this.props.ProxyTuple !== undefined
                        //Pass a NOT VERIFIED, LabelName or no label! ->

                        <>
                          {this.props.loggedInAs === "customer" ? (
                            <>
                              <h4>
                                <b>Proxy Connected</b>
                              </h4>
                              <div className="indentStuff">
                                <h5 style={{ color: "#008de4" }}>
                                  <b>{this.props.ProxyNameDoc.label}*</b>
                                </h5>
                                <p style={{ marginLeft: "1rem" }}>
                                  {" "}
                                  {this.props.ProxyTuple[1]}
                                </p>
                              </div>
                            </>
                          ) : (
                            <></>
                          )}

                          <h6
                            style={{
                              //marginLeft: "1rem",
                              textAlign: "center",
                              marginBottom: "1rem",
                            }}
                          >
                            <b>Login complete!</b>
                          </h6>

                          <div
                            className="d-grid gap-2"
                            style={{
                              marginBottom: "1rem",
                            }}
                          >
                            <Button
                              variant="primary"
                              //size="lg"
                              onClick={() =>
                                this.props.handleSelectedPage("Inventory")
                              }
                            >
                              <b>Go to Inventory</b>
                            </Button>
                          </div>
                        </>
                      ) : (
                        <></>
                      )
                    }
                  </>
                ) : (
                  <></>
                )}
                {this.props.loggedInAs === "merchant" &&
                this.props.identity !== "no identity" ? (
                  <>
                    {this.props.loggedInAs === "merchant" &&
                    !this.props.isLoginComplete ? (
                      <>
                        <p>
                          As the merchant/owner of this frontend, you will need
                          to log in with the Name-Wallet "12-word" mnemonic.
                        </p>
                        <p>
                          You will have to obtain a name through logging into a
                          Name-Wallet.
                        </p>
                      </>
                    ) : (
                      <></>
                    )}

                    {this.props.loggedInAs === "merchant" &&
                    this.props.isLoginComplete ? (
                      <>
                        <div className="indentStuff">
                          <h4>
                            <b>Your Dash Name</b>
                          </h4>
                          <ul>
                            <li>
                              <h5>
                                <b>{this.props.MerchantNameDoc.label}</b>
                              </h5>
                            </li>
                          </ul>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}

                    <h6
                      style={{
                        marginLeft: "1rem",
                        marginBottom: "1rem",
                      }}
                    >
                      <b>Login complete!</b>
                    </h6>

                    <div
                      className="d-grid gap-2"
                      style={{
                        marginBottom: "1rem",
                      }}
                    >
                      <Button
                        variant="primary"
                        //size="lg"
                        onClick={() =>
                          this.props.handleSelectedPage("Inventory")
                        }
                      >
                        <b>Go to Inventory</b>
                      </Button>
                    </div>
                  </>
                ) : (
                  //     ) : (
                  //       <></>
                  //     )
                  //   }
                  // </>
                  <></>
                )}
              </div>
            </>
          ) : (
            <>
              {this.props.identityError ? (
                <>
                  <p>
                    Identity retrieval error, please refresh page and try again,
                    or check the network status with{" "}
                    <b>platform-explorer.com</b>
                  </p>
                </>
              ) : (
                <></>
              )}

              {/* Put nameError, identityInfoError and wallet Error here as well I guess or can separate out to separte component and do 'alerts' instead of texts. */}
            </>
          )}

          {/* END OF NEW CONNECTED PAGE FLOW */}

          {this.props.isLoadingIdentity ||
          this.props.isLoadingIdInfo ||
          this.props.isLoadingProxy ? (
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

          {/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */}
          {/* 
          <div className="positionButton">
            <Button
              variant={buttonColor}
              onClick={() => {
                this.handleExtraInfo();
              }}
            >
              <h3>What is a Proxy?</h3>
            </Button>
          </div> */}
          {/* MAYBE CHANGE THIS TO EXPLAIN PROXY AND NAME WALLET INFO? -> */}
          {/* {this.state.extraInfo ? (
            <>
              <p></p>
              <div className="indentStuff">
                <p>
                  The <b>first name</b> purchased for an Identity is the{" "}
                  <b>dashUniqueIdentityId</b>, and all names purchased after are{" "}
                  <b>dashAliasIdentityId</b> or "aliases". But rest assured, be
                  it the first name or an alias, it will successfully retrieve
                  your identity. (But these Dapps focus on the
                  DashUniqueIdentityID, so if you want to use a name make sure
                  it is the first.)
                </p>
                <p>
                  It is recommended that names for an Identity be related. For
                  example, JohnDoe (dashUniqueIdentityId), John-Doe
                  (dashAliasIdentityId), and JohnDoe007 (dashAliasIdentityId).
                  But do not forget, you can always do what you want, it is your
                  Dash.
                </p>
                <p>
                  A good practice is for different entities to have separate
                  Identities. For example, if the owner of Bob's Burger and
                  Chicken Palace purchased the names: BobsBurger and
                  ChickenPalace, he should purchase them under different
                  Identities.
                </p>
                <p>
                  These dapps are implemented such that you can only purchase a
                  single Identity for your account(12 word mnemonic). This is to
                  maintain a simple implementation and not add complexity in the
                  future. Currently, there is no trustless way to exchange names
                  with others.
                </p>
              </div>
            </>
          ) : (
            <></>
          )} */}
          <p></p>
          {this.props.identityInfo !== "" &&
          this.props.identity !== "no identity" ? (
            <div className="bodytext">
              <Alert variant="primary">
                <Alert.Heading>IdentityID</Alert.Heading>
                <p>{this.props.identity}</p>
                <Button
                  variant="outline-primary"
                  onClick={() => {
                    navigator.clipboard.writeText(this.props.identity);
                    this.setState({
                      copiedIdentity: true,
                    });
                  }}
                >
                  <b>Copy</b>
                </Button>
                {this.state.copiedIdentity ? <span>Copied!</span> : <></>}
              </Alert>
              <p style={{ textAlign: "center" }}>
                Your IdentityID can be used for setting up your own Dash
                Frontend or connecting a Proxy Account.
              </p>
              <p></p>
            </div>
          ) : (
            //   <div
            //    className="d-grid gap-2"
            //    style={{
            //      marginTop: "4rem",
            //      paddingLeft: "3rem",
            //     paddingRight: "3rem",
            //    }}
            //  >
            //    <Button
            //      variant="primary"
            //      //size="lg"
            //      onClick={() => this.props.showIdentityControlPage()}
            //    >
            //      <b>Identity Controls</b>
            //   </Button>
            //  </div>

            <></>
          )}

          {this.props.mnemonic !== "" ? (
            <div
              className="d-grid gap-2"
              style={{
                marginTop: "3rem",
                paddingLeft: "3rem",
                paddingRight: "3rem",
              }}
            >
              <Button
                variant="primary"
                //size="lg"
                onClick={() => this.props.showModal("LogoutModal")}
              >
                <b>Logout</b>
              </Button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </>
    );
  }
}

export default AccountLogin;
