import React from "react";
//import Badge from "react-bootstrap/Badge";
import Form from "react-bootstrap/Form";

import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

class SelectSingleOrVariant extends React.Component {
  render() {
    return (
      <>
        <p></p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {this.props.whichVariantForm === "Single" ? (
            <ButtonGroup className="me-2" aria-label="single-variants">
              <Button variant="primary" style={{ textDecoration: "underline" }}>
                <b
                  style={{
                    fontSize: "larger",
                    paddingLeft: ".8rem",
                    paddingRight: ".8rem",
                  }}
                >
                  Single
                </b>
              </Button>

              <Button
                variant="primary"
                onClick={this.props.triggerVariantsButton}
              >
                <b
                  style={{
                    fontSize: "larger",
                    paddingLeft: ".6rem",
                    paddingRight: ".6rem",
                  }}
                >
                  Variants
                </b>
              </Button>
            </ButtonGroup>
          ) : (
            <ButtonGroup className="me-2" aria-label="First group">
              <Button
                variant="primary"
                onClick={this.props.triggerSingleButton}
              >
                <b
                  style={{
                    fontSize: "larger",
                    paddingLeft: ".8rem",
                    paddingRight: ".8rem",
                  }}
                >
                  Single
                </b>
              </Button>

              <Button variant="primary" style={{ textDecoration: "underline" }}>
                <b
                  style={{
                    fontSize: "larger",
                    paddingLeft: ".6rem",
                    paddingRight: ".6rem",
                  }}
                >
                  Variants
                </b>
              </Button>
            </ButtonGroup>
          )}
        </div>

        <p></p>
      </>
    );
  }
}

export default SelectSingleOrVariant;
