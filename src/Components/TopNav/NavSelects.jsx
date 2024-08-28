import React from "react";

import Nav from "react-bootstrap/Nav";

class NavSelects extends React.Component {
  render() {
    return (
      <>
        {this.props.selectedPage === this.props.selection ? (
          <div
            className="d-grid gap-2"
            style={{ marginTop: ".4rem", marginBottom: ".4rem" }}
          >
            <Nav.Item
              className="canvasLink"
              onClick={() =>
                this.props.handleSelectedPage(this.props.selection)
              }
            >
              <h5 style={{ textDecoration: "underline" }}>
                <b>{this.props.selectionName}</b>
              </h5>
            </Nav.Item>
          </div>
        ) : (
          <div
            className="d-grid gap-2"
            style={{ marginTop: ".4rem", marginBottom: ".4rem" }}
          >
            <Nav.Item
              className="canvasLink"
              onClick={() =>
                this.props.handleSelectedPage(this.props.selection)
              }
            >
              <h5>
                <b>{this.props.selectionName}</b>
              </h5>
            </Nav.Item>
          </div>
        )}
      </>
    );
  }
}

export default NavSelects;
