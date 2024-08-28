import React from "react";
import DashIcon from "../../Images/white-d.svg";
import DashIconBlue from "../../Images/blue-d.svg";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
//import NavDropdown from "react-bootstrap/NavDropdown";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// import Dropdown from "react-bootstrap/Dropdown";
// import NavLink from "react-bootstrap/NavLink";

// import Badge from "react-bootstrap/Badge";

import Offcanvas from "react-bootstrap/Offcanvas";

import CloseButton from "react-bootstrap/CloseButton";

import NavSelects from "./NavSelects";
import CreditsOnPage from "../CreditsOnPage";

import "./TopNav.css";

class TopNav extends React.Component {
  handleCloseClick = () => {
    this.props.toggleTopNav();
  };

  render() {
    let offCanvasBkgd;
    let closeButtonColor;

    if (this.props.mode === "primary") {
      offCanvasBkgd = "text-bg-light";
      closeButtonColor = <CloseButton onClick={this.handleCloseClick} />;
    } else {
      offCanvasBkgd = "text-bg-dark";
      closeButtonColor = (
        <CloseButton onClick={this.handleCloseClick} variant="white" />
      );
    }

    let isLoginComplete =
      this.props.uniqueName !== "" && this.props.uniqueName !== "no name";

    return (
      <>
        <Navbar
          expanded={this.props.expandedTopNav}
          className="Top"
          bg={this.props.mode}
          variant={this.props.mode}
          expand={false}
        >
          <Container>
            <Navbar.Brand>
              {this.props.mode === "primary" ? (
                <img
                  src={DashIcon}
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                  alt="Dash logo"
                />
              ) : (
                <img
                  src={DashIconBlue}
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                  alt="Dash logo"
                />
              )}
              {"   "}

              {this.props.mode === "primary" ? (
                <>
                  <b className="lightMode">
                    {import.meta.env.VITE_FRONTEND_NAME}
                  </b>

                  {this.props.whichNetwork === "testnet" ? (
                    <span className="textsmallest">testnet</span>
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <>
                  <b>{import.meta.env.VITE_FRONTEND_NAME}</b>
                  {this.props.whichNetwork === "testnet" ? (
                    <span className="textsmallest">testnet</span>
                  ) : (
                    <></>
                  )}
                </>
              )}
            </Navbar.Brand>
            <Form>
              {this.props.mode === "primary" ? (
                <div>
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    onChange={() => this.props.handleMode()}
                  />
                </div>
              ) : (
                <div>
                  <Form.Check
                    type="switch"
                    id="custom-switch-dark"
                    onChange={() => this.props.handleMode()}
                  />
                </div>
              )}
            </Form>
            <Navbar.Toggle
              //This needs to just switch itself or toggle self
              onClick={() => this.props.toggleTopNav()}
              aria-controls="basic-navbar-nav"
            />

            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand`}
              aria-labelledby={`offcanvasNavbarLabel-expand`}
              placement="end"
              className={offCanvasBkgd}
              onHide={this.props.toggleTopNav}
              style={{ width: "300px" }}
              //https://getbootstrap.com/docs/5.2/components/offcanvas/#variables
            >
              <Offcanvas.Header
                className="BottomBorder"
                style={{ paddingBottom: ".3rem" }}
              >
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand`}>
                  <h5 style={{ textAlign: "center" }}>
                    <b>{import.meta.env.VITE_FRONTEND_NAME}</b>
                    {this.props.whichNetwork === "testnet" ? (
                      <span className="textsmallest">testnet</span>
                    ) : (
                      <></>
                    )}

                    {/* <Badge
                      variant="primary"
                      pill
                      onClick={() =>
                        this.props.showModal("FrontEndExplaination")
                      }
                    >
                      <b>Dash Frontend</b>
                    </Badge> */}
                  </h5>
                </Offcanvas.Title>
                {closeButtonColor}
              </Offcanvas.Header>

              <Offcanvas.Body>
                {this.props.isLoggedIn ? (
                  <>
                    {isLoginComplete ? (
                      <div
                        onClick={() => this.props.handleSelectedPage("Login")}
                      >
                        <CreditsOnPage
                          identityInfo={this.props.identityInfo}
                          uniqueName={this.props.uniqueName}
                          showModal={this.props.showModal}
                        />
                      </div>
                    ) : (
                      <div
                        className="d-grid gap-2"
                        style={{ marginBottom: "1rem" }}
                      >
                        <Button
                          variant="primary"
                          size="lg"
                          onClick={() => this.props.handleSelectedPage("Login")}
                        >
                          <b>Complete Sign up</b>
                        </Button>
                      </div>
                    )}
                    {/* COMPLETE LOGIN BUTTON OR WALLET AND IDENTITY INFO */}
                  </>
                ) : (
                  <div
                    className="d-grid gap-2"
                    style={{ marginBottom: "1rem" }}
                  >
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={() => this.props.handleSelectedPage("Login")}
                    >
                      <b>Login/Sign up</b>
                    </Button>
                  </div>
                )}

                <Nav fill>
                  {this.props.loggedInAs === "merchant" ? (
                    <>
                      <NavSelects
                        selection="Inventory"
                        selectionName="Your Inventory"
                        selectedPage={this.props.selectedPage}
                        handleSelectedPage={this.props.handleSelectedPage}
                      />
                      <NavSelects
                        selection="Orders"
                        selectionName="Orders"
                        selectedPage={this.props.selectedPage}
                        handleSelectedPage={this.props.handleSelectedPage}
                      />
                      {/* <NavSelects
                        selection="Shipping"
                        selectionName="Shipping"
                        selectedPage={this.props.selectedPage}
                        handleSelectedPage={this.props.handleSelectedPage}
                      /> */}
                      {/* <NavSelects
                        selection="About Us"
                        selectionName="About Us"
                        selectedPage={this.props.selectedPage}
                        handleSelectedPage={this.props.handleSelectedPage}
                      /> */}
                    </>
                  ) : (
                    <></>
                  )}

                  {this.props.loggedInAs === "customer" ? (
                    <>
                      {" "}
                      <NavSelects
                        selection="Inventory"
                        selectionName="View Inventory"
                        selectedPage={this.props.selectedPage}
                        handleSelectedPage={this.props.handleSelectedPage}
                      />
                      <NavSelects
                        selection="Shopping Cart"
                        selectionName="Shopping Cart"
                        selectedPage={this.props.selectedPage}
                        handleSelectedPage={this.props.handleSelectedPage}
                      />
                      {isLoginComplete ? (
                        <NavSelects
                          selection="Orders"
                          selectionName="Your Orders"
                          selectedPage={this.props.selectedPage}
                          handleSelectedPage={this.props.handleSelectedPage}
                        />
                      ) : (
                        <Nav.Link className="canvasLinkDisabled" disabled>
                          <h5>
                            <b>Your Orders</b>
                          </h5>
                        </Nav.Link>
                      )}
                    </>
                  ) : (
                    <></>
                  )}

                  {/* <Badge
                      variant="primary"
                      pill
                      onClick={() =>
                        this.props.showModal("FrontEndExplaination")
                      }
                    >
                      <b>Dash Frontend</b>
                    </Badge> */}
                  <p></p>
                  <div
                    className="d-grid gap-2"
                    style={{
                      marginTop: ".5rem",
                      paddingLeft: "1.5rem",
                      paddingRight: "1.5rem",
                    }}
                  >
                    <Button
                      variant="primary"
                      //size="sm"
                      onClick={() =>
                        this.props.showModal("FrontEndExplaination")
                      }
                    >
                      <b>About Dash Frontend</b>
                    </Button>
                  </div>

                  {isLoginComplete ? (
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
                        onClick={() => this.props.handleSelectedPage("Login")}
                      >
                        <b>Your Account</b>
                      </Button>
                    </div>
                  ) : (
                    <></>
                  )}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      </>
    );
  }
}
export default TopNav;
