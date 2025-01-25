import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import CloseButton from "react-bootstrap/CloseButton";

{
  /*    
        FrontEnd Name
            ENV
        Merchant : DashName
            ENV

        supported Regions: "USA,Canada,Mexico,EU",
            200
        description: "The best store",
            4000
            
            Not YET either
        supportedPayments: "Dash 2-Party, DashPay," 
            400

           No to BELOW 
        contact: "email@gmail",
            200
        location: "Fargo, ND",  
            200
        
          */
}

class AboutUsEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      supportedRegionsInput: this.props.AboutUsDoc.details.supportedRegions,
      validSupportedRegions: true,
      tooLongSupportedRegionsError: false,

      descriptionInput: this.props.AboutUsDoc.details.description,
      validDescription: true,
      tooLongDescriptionError: false,

      supportedPaymentsInput: "",
      //Maybe use Link for Supported Payments
      linkInput: "",
      validLink: true,
      tooLongLinkError: false,
    };
  }

  onChange = (event) => {
    // console.log(event.target.value);
    //console.log(`id = ${event.target.id}`);

    if (event.target.id === "formSupportedRegion") {
      event.preventDefault();
      event.stopPropagation();
      this.supportedRegionsValidate(event.target.value);
    }

    if (event.target.id === "formDescription") {
      event.preventDefault();
      event.stopPropagation();
      this.descriptionValidate(event.target.value);
    }
    //Maybe use Link for Supported Payments
    // if (event.target.id === "formLink") {
    //   event.preventDefault();
    //   event.stopPropagation();
    //   this.linkValidate(event.target.value);
    // }
  };

  supportedRegionsValidate = (supportedRegions) => {
    let regex = /^\S.{1,200}\S$/;
    let valid = regex.test(supportedRegions);

    if (valid) {
      this.setState({
        supportedRegionsInput: supportedRegions,
        tooLongSupportedRegionsError: false,
        validSupportedRegions: true,
      });
    } else {
      if (supportedRegions.length > 200) {
        this.setState({
          supportedRegionsInput: supportedRegions,
          tooLongSupportedRegionsError: true,
          validSupportedRegions: false,
        });
      } else {
        this.setState({
          supportedRegionsInput: supportedRegions,
          validSupportedRegions: false,
        });
      }
    }
  };

  descriptionValidate = (description) => {
    let regex1 = /^.[\S\s]{0,4000}$/;

    let valid1 = regex1.test(description);

    let regex2 = /^(?:[^\r\n]*(?:\r\n?|\n)){0,6}[^\r\n]*$/;

    let valid2 = regex2.test(description);

    if (valid1 && valid2) {
      this.setState({
        descriptionInput: description,
        validDescription: true,
        tooLongDescriptionError: false,
      });
    } else {
      if (description.length > 4000 || !valid2) {
        this.setState({
          descriptionInput: description,
          validDescription: false,
          tooLongDescriptionError: true,
        });
      } else {
        this.setState({
          descriptionInput: description,
          validDescription: false,
        });
      }
    }
  };

  // linkValidate = (link) => {
  //   let regex = /^[\S\s]{0,350}$/;
  //   //let regex = /^\S.{1,30}\S$/;

  //   let valid = regex.test(link);

  //   if (valid) {
  //     this.setState({
  //       linkInput: link,
  //       validLink: true,
  //       tooLongLinkError: false,
  //     });
  //   } else {
  //     if (link.length > 350) {
  //       this.setState({
  //         linkInput: link,
  //         validLink: false,
  //         tooLongLinkError: true,
  //       });
  //     } else {
  //       this.setState({
  //         linkInput: link,
  //         validLink: false,
  //       });
  //     }
  //   }
  // };

  handleSubmitClick = (event) => {
    event.preventDefault();
    //console.log(event.target.ControlTextarea1.value);

    let newStoreAboutUs;

    newStoreAboutUs = {
      supportedRegions: this.state.supportedRegionsInput, //.toLocaleLowerCase(),
      description: this.state.descriptionInput,
      //supportedPayments: this.state.supportedPaymentsInput,
    };

    console.log(newStoreAboutUs);
    this.props.handleAboutUsConfirmModal(newStoreAboutUs);
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

    let changesMade = false;

    if (
      this.props.AboutUsDoc.details.supportedRegions !==
        this.state.supportedRegionsInput ||
      this.props.AboutUsDoc.details.description !== this.state.descriptionInput
    ) {
      changesMade = true;
    }
    // if (
    //   this.props.AboutUsDoc.details.description !== this.state.descriptionInput
    // ) {
    //   changesMade = true;
    // }

    return (
      <>
        {/* <h4 style={{ marginBottom: ".1rem" }}>
          <b>You are Offering:</b>
        </h4>

        <div className="BottomBorder" style={{ paddingTop: ".5rem" }}></div> */}

        <Form
          noValidate
          onSubmit={this.handleSubmitClick}
          onChange={this.onChange}
        >
          {/* SUPPORTED REGIONS FORM BELOW */}
          <Form.Group className="mb-3" controlId="formSupportedRegion">
            <h5 style={{ marginTop: ".2rem", marginBottom: ".2rem" }}>
              Supported Regions
            </h5>
            <Form.Control
              type="text"
              placeholder="Enter supported regions here.."
              defaultValue={this.props.AboutUsDoc.details.supportedRegions}
              //required
              isInvalid={this.state.tooLongSupportedRegionsError}
              isValid={this.state.validSupportedRegions}
            />
            <p className="smallertext">(e.g. "USA, Thailand, EU, Mongolia")</p>
            <p></p>
            <Form.Control.Feedback type="invalid">
              Supported Regions is too long.
            </Form.Control.Feedback>
            {/* <Form.Control.Feedback type="valid">
              City/Town name is acceptable!
            </Form.Control.Feedback> */}
          </Form.Group>

          {/* POST DESCRIPTION FORM BELOW */}

          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label>
              <h5 style={{ marginTop: ".5rem", marginBottom: ".2rem" }}>
                Description
              </h5>
            </Form.Label>
            <Form.Control
              // onChange={this.onChange}
              as="textarea"
              rows={3}
              placeholder="Put description here.."
              defaultValue={this.props.AboutUsDoc.details.description}
              //required
              isInvalid={this.state.tooLongDescriptionError}
              isValid={this.state.validDescription}
            />
            <p></p>
            {this.state.tooLongDescriptionError ? (
              <Form.Control.Feedback className="floatLeft" type="invalid">
                Sorry, this is too long! Please use less than 4000 characters.
              </Form.Control.Feedback>
            ) : (
              <></>
            )}
            <p></p>
            Description can include things like:
            <ul>
              <li>Why you wanted to start a store, or what you stand for.</li>
              <li>You can add contact info or social media if you want.</li>

              {/* <li>
                IMPORTANT: Ensure you spell your receiving handle correctly if
                you are getting fiat.
              </li> */}

              <li>
                "Please wait up to 12 hours for confirm in Name-Wallet. I may be
                asleep."
              </li>
              <li>
                "IMPORTANT: Please send payment amount to the 2-Party, so we can
                ship as quickly as possible."
              </li>
              <li>
                "After payment, We will send your package's tracking number to
                you in the 2-Party messaging."
              </li>
              {/* <li>Best time to send is 1:00 PM UTC.</li> */}
            </ul>
          </Form.Group>

          {/* Date FORM BELOW */}
          {/* <Form.Group className="mb-3" controlId="formDate">
                <h5 style={{ marginTop: ".2rem", marginBottom: ".2rem" }}>
                  <b>Date of Event</b>
                </h5>
                <Form.Control
                  type="text"
                  placeholder="Enter date (Optional)"
                  required
                  isInvalid={this.state.tooLongDateError}
                  isValid={this.state.validDate}
                />
                <p className="smallertext">
                  (e.g."Friday, 2nd of January" or "Every Saturday")
                </p>
                <p></p>
                <Form.Control.Feedback type="invalid">
                  Date info is too long.
                </Form.Control.Feedback>
              </Form.Group> */}

          <div className="ButtonRightNoUnderline">
            {this.state.validSupportedRegions &&
            this.state.validDescription &&
            changesMade ? ( //&&this.state.validLink
              <Button variant="primary" type="submit">
                <b>Edit About Us</b>
              </Button>
            ) : (
              <Button variant="primary" disabled>
                <b>Edit About Us</b>
              </Button>
            )}
          </div>
        </Form>
      </>
    );
  }
}

export default AboutUsEdit;
