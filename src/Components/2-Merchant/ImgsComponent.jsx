import React from "react";
//import Badge from "react-bootstrap/Badge";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

class ImgsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stringURLInput: "",
      tooLongStringURLError: false,
      validStringURL: false,
    };
  }

  //FLOW

  /**
   * 1) EMPTY TEXT FORM -> WHEN NOT EMPTY -> SUBMIT IMG
   * 2) IMG ABOVE -> ADD IMAGE BUTTON AND REMOVE IMG
   * 3) ADD IMG BUTTON ADD TEXT FORM THEN SUBMIT IMG
   *
   * NEED AN ARRAY OF TEXT FOR THE IMAGES IN THE PARENT COMPONENT
   * 
   * imgStateArray={this.state.imgStateArray}
    addFieldOfImg={this.addFieldOfImg(URLSTRING)}
    removeFieldOfImg={this.removeFieldOfImg}
   *
   */

  //THESE FIELDS NEED TO BE COMBINED WITH THE SUBMIT

  onChange = (event) => {
    // console.log(event.target.value);

    //console.log(`id = ${event.target.id}`);

    if (event.target.id === "formStringURL") {
      event.preventDefault();
      event.stopPropagation();
      this.stringURLValidate(event.target.value);
    }
  };

  stringURLValidate = (stringURL) => {
    let regex = /^\S{1,250}$/;
    let valid = regex.test(stringURL);

    if (valid) {
      this.setState({
        stringURLInput: stringURL,
        tooLongStringURLError: false,
        validStringURL: true,
      });
    } else {
      if (stringURL.length > 250) {
        this.setState({
          stringURLInput: stringURL,
          tooLongStringURLError: true,
          validStringURL: false,
        });
      } else {
        this.setState({
          stringURLInput: stringURL,
          validStringURL: false,
        });
      }
    }
  };

  submitAndResetForm = () => {
    this.props.addFieldOfImg(this.state.stringURLInput);
    document.getElementById("formImgReset").reset();
    this.setState({
      stringURLInput: "",
      validStringURL: false,
    });
  };

  render() {
    //if(this.props.)

    let ImgArray = this.props.imgStateArray.map((imgObj, index) => {
      return (
        <Image
          style={{ marginBottom: ".8rem" }}
          src={imgObj}
          key={index}
          index={index}
          fluid
        />
      );
    });

    return (
      <>
        {/* <Form style={{ marginBottom: "1rem" }}>
          <div className="cardTitle">
            

            <Button
              variant="primary"
              //type="submit"
              style={{
                paddingLeft: "2rem",
                paddingRight: "2rem",
                marginLeft: "1rem",
              }}
              noValidate
              onClick={() => this.()}
            >
              Add
            </Button>
          </div>
        </Form> */}

        <h4 style={{ textDecoration: "underline" }}>Images of Item</h4>

        {ImgArray}

        {this.props.imgStateArray.length > 0 ? (
          <>
            <Button
              onClick={() => this.props.removeFieldOfImg()}
              style={{
                //marginTop: "0.5rem",
                marginBottom: "1rem",
              }}
            >
              Remove
            </Button>
          </>
        ) : (
          <>
            <p>(Images will add here..)</p>
          </>
        )}
        {/* <div
          className="BottomBorder"
          style={{ paddingTop: ".2rem", marginBottom: ".3rem" }}
        ></div> */}
        <Form
          id="formImgReset"
          noValidate
          //onSubmit={this.handleSubmitClick}
          //onChange={this.onChange}
        >
          {/* URL FORM BELOW */}
          <Form.Group
            className="mb-3"
            controlId="formStringURL"
            onChange={this.onChange}
          >
            {/* <h5 style={{ marginTop: ".2rem", marginBottom: ".2rem" }}>
            <b>Image</b>
          </h5> */}
            <Form.Control
              type="text"
              placeholder="Enter image URL"
              defaultValue={this.state.stringURLInput}
              //required
              isInvalid={this.state.tooLongStringURLError}
              isValid={this.state.validURL}
            />
            <p></p>
            <Form.Control.Feedback type="invalid">
              URL is too long.
            </Form.Control.Feedback>
          </Form.Group>
        </Form>

        {this.props.imgStateArray.length === 5 ? (
          <>
            <p className="textsmaller">(Limit of 5 images per item)</p>
          </>
        ) : (
          <></>
        )}

        {this.state.validStringURL && this.props.imgStateArray.length <= 4 ? (
          <>
            <div className="d-grid gap-2" style={{ marginTop: "1rem" }}>
              <Button
                variant="primary"
                onClick={() => this.submitAndResetForm()}
              >
                <b>Add Image URL</b>
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="d-grid gap-2" style={{ marginTop: "1rem" }}>
              <Button
                variant="primary" //type="submit"
                disabled
              >
                <b>Add Image URL</b>
              </Button>
            </div>
          </>
        )}
      </>
    );
  }
}

export default ImgsComponent;
