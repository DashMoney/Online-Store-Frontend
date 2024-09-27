import React from "react";
import LocalForage from "localforage";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import CloseButton from "react-bootstrap/CloseButton";

import dapiClient from "../DapiClient";
import dapiClientNoWallet from "../DapiClientNoWallet";
import Dash from "dash";

const {
  PlatformProtocol: { Identifier },
} = Dash;

class RegisterProxyModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isError: false,
      //Proxy States

      //so type in a name
      // name is owned/Taken = true
      // Contested don't matter
      nameDoc: "",

      nameTaken: false,
      nameAvailable: false,
      // nameContested: false, // Remove this ->
      searchedName: "",
      validityCheck: false,
    };
  }

  handleCloseClick = () => {
    this.props.hideModal();
  };

  onChange = (event) => {
    event.preventDefault();
    event.stopPropagation();

    this.setState({
      isError: false,
      isLoading: false,
      nameTaken: false,
      nameAvailable: false,
    });

    this.formValidate(event.target.value);
  };

  formValidate = (nameInput) => {
    let regex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]$/;
    let valid = regex.test(nameInput);

    if (valid) {
      this.setState({
        searchedName: nameInput,
        validityCheck: true,
      });
    } else {
      this.setState({
        searchedName: nameInput,
        validityCheck: false,
      });
    }
  };

  searchName = (nameToRetrieve) => {
    let client = new Dash.Client(dapiClientNoWallet(this.props.whichNetwork));

    const retrieveName = async () => {
      // Retrieve by full name (e.g., myname.dash)

      return client.platform.names.resolve(`${nameToRetrieve}.dash`);
    };

    retrieveName()
      .then((d) => {
        if (d === null) {
          this.setState({
            nameAvailable: true,
            nameTaken: false,
            isLoading: false,
            isError: false,
          });
        } else {
          console.log("Name retrieved:\n", d.toJSON());
          this.setState({
            nameDoc: d.toJSON(),
            nameTaken: true,
            nameAvailable: false,
            isLoading: false,
            isError: false,
          });
        }
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);

        this.setState({
          nameTaken: false,
          nameAvailable: false,
          isError: true,
          isLoading: false,
        });
      })
      .finally(() => client.disconnect());
  };

  createProxy = () => {
    const client = new Dash.Client(
      dapiClient(
        this.props.whichNetwork,
        this.props.mnemonic,
        this.props.skipSynchronizationBeforeHeight
      )
    );

    const submitProxyDoc = async () => {
      const { platform } = client;

      // let identity = "";
      // if (this.state.identityRaw !== "") {
      //   identity = this.state.identityRaw;
      // } else {
      //   identity = await platform.identities.get(this.state.identity);
      // }
      const identity = await platform.identities.get(this.props.identity); // Your identity ID

      const proxyProperties = {
        controlId: this.state.nameDoc.$ownerId,
      };
      //console.log('Proxy to Create: ', proxyProperties);

      const proxyDocument = await platform.documents.create(
        "ProxyContract.proxy",
        identity,
        proxyProperties
      );

      //############################################################
      //This below disconnects the document sending..***

      //return proxyDocument;

      //This is to disconnect the Document Creation***
      //############################################################

      const documentBatch = {
        create: [proxyDocument], // Document(s) to create
      };

      await platform.documents.broadcast(documentBatch, identity);
      return proxyDocument;
    };

    submitProxyDoc()
      .then((d) => {
        let returnedDoc = d.toJSON();

        returnedDoc.controlId = Identifier.from(
          returnedDoc.controlId,
          "base64"
        ).toJSON();

        console.log("Document:\n", returnedDoc);

        this.props.handleProxy(returnedDoc);

        this.props.hideModal();
      })
      .catch((e) => {
        console.error("Something went wrong with Proxy Doc creation:\n", e);
        this.setState(
          {
            isError: true,
            isLoading: false,
          },
          () => this.props.triggerProxyNotLoading()
        );
      })

      .finally(() => client.disconnect());
  };

  handleSubmitClick = (event) => {
    event.preventDefault();
    let nameToTry = event.target.validationCustom02.value;

    this.setState({
      isLoading: true,
      searchName: event.target.value,
      isError: false,
    });

    if (this.state.nameTaken) {
      //changed from nameAvailable
      if (this.state.validityCheck) {
        // if (this.formValidate(nameToTry)) {
        console.log(`Creating Proxy for: ${nameToTry}`);
        ///this is where call function to Purchase the Name ****************************************************************
        this.props.triggerProxyLoading(); //trigger for connected page spinner
        this.createProxy();
      } else {
        console.log(`Not Valid: ${nameToTry}`);
      }
    } else {
      this.searchName(nameToTry);
    }
  };

  render() {
    let modalBkg = "";
    let closeButtonColor;
    let modalBackdrop;

    if (this.props.mode === "primary") {
      modalBackdrop = "modal-backdrop-nochange";
      modalBkg = "modal-backcolor-primary";
      closeButtonColor = <CloseButton onClick={this.handleCloseClick} />;
    } else {
      modalBackdrop = "modal-backdrop-dark";
      modalBkg = "text-bg-dark";
      closeButtonColor = (
        <CloseButton onClick={this.handleCloseClick} variant="white" />
      );
    }

    return (
      <>
        <Modal
          contentClassName={modalBkg}
          backdropClassName={modalBackdrop}
          show={this.props.isModalShowing}
        >
          <Modal.Header>
            <Modal.Title>Create a Proxy</Modal.Title>
            {closeButtonColor}
          </Modal.Header>
          <Modal.Body>
            <p>
              <b>
                Enter the Dash Name that you want to associate this proxy with.
              </b>
            </p>
            <Form
              noValidate
              onSubmit={this.handleSubmitClick}
              onChange={this.onChange}
            >
              <Form.Group className="mb-3" controlId="validationCustom02">
                {this.state.isLoading ? (
                  <Form.Control
                    type="text"
                    placeholder={this.state.searchedName}
                    disabled
                  />
                ) : (
                  <Form.Control
                    type="text"
                    placeholder="Enter name here..."
                    required
                    // isInvalid={!this.state.validityCheck}
                    isValid={
                      this.state.validityCheck &&
                      !this.state.nameAvailable &&
                      !this.state.nameTaken
                    }
                  />
                )}

                {/* <Form.Control.Feedback className="floatLeft" type="valid">
                  Name looks good!
                </Form.Control.Feedback> */}

                {this.state.isError ? (
                  <Alert variant="warning" dismissible>
                    Testnet Platform is having difficulties or the identity has
                    insufficient credits.
                  </Alert>
                ) : (
                  <></>
                )}

                {/* <p className="smallertext" style={{ color: "red" }}>
                    Testnet Platform is having difficulties or the identity has
                    insufficient credits.
                  </p> */}

                {this.state.nameAvailable ? (
                  <p
                    className="smallertext"
                    style={{ color: "red", marginTop: ".2rem" }}
                  >
                    <b>{this.state.searchedName} is not owned by anyone.</b>
                  </p>
                ) : (
                  <></>
                )}

                {this.state.nameTaken ? (
                  <p
                    className="smallertext"
                    style={{ color: "green", marginTop: ".2rem" }}
                  >
                    <b>{this.state.searchedName} is available for proxy.</b>
                  </p>
                ) : (
                  <></>
                )}

                {/* {this.state.nameContested ? (
                  <p
                    className="smallertext"
                    style={{ color: "red", marginTop: ".2rem" }}
                  >
                    <b>
                      {this.state.searchedName} is a contested name. Please
                      include a number from 2-9 in your name.
                    </b>
                  </p>
                ) : (
                  <></>
                )} */}

                {this.state.isLoading ? (
                  <>
                    <p></p>
                    <div id="spinner">
                      <p></p>
                      <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    </div>
                  </>
                ) : (
                  <></>
                )}

                {this.state.validityCheck &&
                !this.state.isLoading &&
                !this.state.nameTaken ? (
                  <>
                    <p></p>
                    <Button variant="primary" type="submit">
                      <b>Check Availability</b>
                    </Button>
                  </>
                ) : (
                  <></>
                )}

                {!this.state.validityCheck ||
                (this.state.isLoading && !this.state.nameTaken) ? (
                  <>
                    <p></p>
                    <Button variant="primary" disabled>
                      <b>Check Availability</b>
                    </Button>
                  </>
                ) : (
                  <></>
                )}

                {this.state.validityCheck &&
                !this.state.isLoading &&
                this.state.nameTaken ? (
                  <>
                    <div
                      className="d-grid gap-2"
                      style={{
                        marginTop: "1rem",
                      }}
                    >
                      <Button variant="primary" type="submit">
                        <b>Create Proxy</b>
                      </Button>
                    </div>
                  </>
                ) : (
                  <></>
                )}

                {this.state.isLoading && this.state.nameTaken ? (
                  <>
                    <div
                      className="d-grid gap-2"
                      style={{
                        marginTop: "1rem",
                      }}
                    >
                      <Button variant="primary" disabled>
                        <b>Create Proxy</b>
                      </Button>
                    </div>
                  </>
                ) : (
                  <></>
                )}

                <p></p>
                <p>
                  A proxy will allow you to login to other frontends without
                  risking/exposing valuable Dash Platform documents like DPNS or
                  large amounts of Dash.(Use a Name-Wallet for valuables.)
                </p>
                <p>
                  Once the proxy is created, you will need to approve the proxy
                  in your Name-Wallet.
                </p>

                {/* <ul>
                  <li>
                    A name can consist of any combination of letters (UPPERCASE
                    or lowercase) and numbers with one hyphen (-) anywhere in
                    the middle.
                  </li>
                  <li>No spaces are allowed.</li>
                  <li>Length must be between 3 to 63 characters</li>
                  <li>
                    Examples
                    <ul>
                      <li>john</li>
                      <li>JohnDoe</li>
                      <li>John-Doe</li>
                      <li>JohnDoe001</li>
                      <li>THEJOHNDOE001</li>
                      <li>JOHN-DOE</li>
                    </ul>
                  </li>
                </ul>
                <p>
                  Interesting fact: If you own the name "JohnDoe", no one can
                  purchase any combination of UPPERCASE or lowercase characters
                  that match. Therefore, johndoe, JOHNDOE, johnDoe, etc.. would
                  all be unavailable.
                </p> */}
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.handleCloseClick}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default RegisterProxyModal;
