//This will be the replacement for the connect wallet modal

import React from "react";

import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Form from "react-bootstrap/Form";

import Alert from "react-bootstrap/Alert";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pastedText: "",
      searchedMnem: "",
      validated: true,
      validityCheck: false,
    };
  }
  onChange = (event) => {
    //console.log(event.target.value);
    if (this.formValidate(event.target.value) === true) {
      event.preventDefault();
      event.stopPropagation();
      this.setState({
        validityCheck: true,
      });
    } else {
      event.preventDefault();
      event.stopPropagation();
      this.setState({
        validityCheck: false,
      });
    }
  };
  handleSubmitClick = (event) => {
    event.preventDefault();
    //console.log(event.nativeEvent.submitter.id); //Found it - identifies the button pressed

    if (this.formValidate(event.target.validationCustom01.value)) {
      this.props.handleAccountLogin(event.target.validationCustom01.value);

      console.log("Successful login");
    } else {
      console.log(`Invalid Mnemonic: ${event.target.validationCustom01.value}`);
    }
  };

  formValidate = (mnemonic) => {
    let regex = /^([a-z]+[ ]){11}[a-z]+$/m;
    let valid = regex.test(mnemonic);

    if (valid) {
      this.setState({
        searchedMnem: mnemonic,
      });
      return true;
    } else {
      return false;
    }
  };

  render() {
    return (
      <>
        {/* <h2 id="title-bar">
          <b>Money for a new Economy!</b>
        </h2> */}

        {/* <h4 id="title-bar">
          <b>Better crypto storage through obfuscation and social backups.</b>
        </h4> */}

        {/* <h2 id="title-bar">
          <b>A new Money for a new Economy!</b>
        </h2> */}

        <div className="heading-shift">
          {/* <b>
              Interact with New Dash Wallet, Chat in totally new way, use Social
              Media and explore more web3 Dapps, run on Dash Decentralized
              Platform -Splawik21
            </b> */}

          {/* <p>
            Why send $100 or $200 on an expensive hardware or metal wallet when
            you can spend less than a $1 and use the rest to invest in your
            favorite coin.
          </p> */}
        </div>

        {/* <p></p>
        <Alert variant="warning">
          <Alert.Heading>Testnet - New Version Deployed</Alert.Heading>

          <p>
            New version of Testnet deployed, prior version's data has been
            wiped. Frontend has not been updated.
          </p>
          <p>
            Check out Proposal on Dash Central and as soon as it shows passing,
            I will update frontend and get started on new development.
          </p>
          <p>
            <b>
              <a
                rel="noopener noreferrer"
                target="_blank"
                href="https://www.dashcentral.org/p/DashMoney-Creating-P2P-Markets-Q2-2024"
              >
                https://www.dashcentral.org/p/DashMoney-Creating-P2P-Markets-Q2-2024
              </a>
            </b>
          </p>
        </Alert>
        <p></p> */}

        {/* <p></p>
        <Alert variant="warning">
          <Alert.Heading>Testnet Updating - IN PROGRESS</Alert.Heading>

          <p>
            Issue with Credit Withdrawals being corrected on testnet. Awaiting
            testnet Platform v1.0.0-dev.11 and updated testnet nodes. This
            notice will be removed when that is complete.
          </p>
        </Alert>
        <p></p> */}

        {/* <p></p>
        <Alert variant="warning">
          <Alert.Heading>Testnet Updating - IN PROGRESS</Alert.Heading>

          
          <p>
            Once testnet nodes have successfully updated. The Data Contracts
            will be recreated, and this site will be functional again. This
            notice will be removed when that is complete.
          </p>
        </Alert>
        <p></p> */}

        {/* <div className="heading-shift">
          <p>
            <b>With Dash, you will never think of crypto the same way again.</b>
          </p>
        </div> */}

        {/* <h1 id="title-bar">
          <b>Your Money, your way!</b>
        </h1>

        <div className="heading-shift">
          <p>
            <b>
              Dash is a crypto for connecting people together, like it was
              always meant to be.
            </b>
          </p>
        </div> */}
        <div className="bodytext">
          <Form
            noValidate
            onSubmit={this.handleSubmitClick}
            onChange={this.onChange}
          >
            <Form.Group className="mb-3" controlId="validationCustom01">
              {/* <Form.Label>Account Login</Form.Label>  */}
              <h3>
                <b>Account Login</b>
                {/* <Badge bg="primary" pill>
                Account Login
              </Badge> */}
              </h3>
              <Form.Control
                type="text"
                placeholder="Enter 12 words here..."
                required
                //isInvalid={!this.state.validityCheck}
                isValid={this.state.validityCheck}
              />

              <div className="d-grid gap-2" style={{ marginTop: "2rem" }}>
                <Button variant="primary" type="submit" size="lg">
                  <b>Login</b>
                </Button>
              </div>

              <Form.Control.Feedback type="invalid">
                Please provide valid mnemonic.
              </Form.Control.Feedback>

              <Form.Control.Feedback type="valid">
                Mnemonic looks good, so long as everything is spelled correctly.
              </Form.Control.Feedback>

              <p></p>
              <ul>
                <li>
                  The 12 word phrase provided upon creation of your account.
                </li>
                <li>No spaces at the beginning or the end.</li>
                <li>Use lowercase for all words.</li>
                <li>Only one space between words.</li>
              </ul>
            </Form.Group>

            {/* <Button variant="primary" type="submit">
            <b>Login</b>
          </Button> */}
            {/* }  */}
          </Form>
          <div className="BottomBorder"></div>
          <p></p>
          <p className="bodytext">
            If you do not have an account, <b>Create New Account</b> below.
          </p>
          <p></p>
          <div className="footer">
            <div className="d-grid gap-2">
              <Button
                variant="primary"
                size="lg"
                onClick={() => this.props.showModal("CreateNewWalletModal")}
              >
                <b>Create New Account</b>
              </Button>
            </div>
            {this.props.DashMoneyLFKeys.length === 0 ? (
              <>
                <p></p>
                <p>
                  <b>First-Time</b> logins may take up to a minute, but
                  subsequent logins will be much faster. Thank you for your
                  patience.
                </p>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default LoginForm;
