import React from "react";

import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";

import Button from "react-bootstrap/Button";
import handleDenomDisplay from "../../UnitDisplay";

class VariantTable extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {

  //   };
  // }

  componentDidMount() {}

  render() {
    let variantRows = [];
    if (
      // this.props.item.variants.length !== 0 &&
      this.props.item.variants !== undefined
    ) {
      for (let i = 0; i < this.props.item.variants.length; i++) {
        let variantRow = [];
        for (let j = 0; j < 3; j++) {
          let theIndex = i * 3 + j;

          if (j === 0) {
            variantRow.push(
              <td style={{ textAlign: "center" }} key={theIndex}>
                <p
                  style={{
                    //fontSize: "smaller",
                    margin: "0rem",
                  }}
                >
                  {this.props.item.variants[i][j]}
                </p>
              </td>
            );
          } else if (j === 1) {
            variantRow.push(
              <td key={theIndex} style={{ textAlign: "center" }}>
                {this.props.item.variants[i][j] === 0 ? (
                  <p
                    style={{
                      //fontSize: "smaller",
                      margin: "0rem",
                      color: "red",
                    }}
                  >
                    {this.props.item.variants[i][j]}
                  </p>
                ) : (
                  <p
                    style={{
                      //fontSize: "smaller",
                      margin: "0rem",
                    }}
                  >
                    {this.props.item.variants[i][j]}
                  </p>
                )}
              </td>
            );
          } else if (j === 2) {
            variantRow.push(
              <td style={{ textAlign: "center" }} key={theIndex}>
                <p
                  style={{
                    //fontSize: "smaller",
                    margin: "0rem",
                  }}
                >
                  {handleDenomDisplay(
                    this.props.whichNetwork,
                    this.props.item.variants[i][j]
                  )}
                </p>
              </td>
            );
          }
        }
        let addVariantRow = <tr key={i}>{variantRow}</tr>;
        variantRows.push(addVariantRow);
      }
    }

    return (
      <>
        <h5 style={{ textAlign: "center" }}>
          {" "}
          <b>Item Variants</b>
        </h5>

        {this.props.mode === "primary" ? (
          <>
            <Table responsive bordered size="md">
              <thead>
                <tr>
                  <th style={{ textAlign: "center" }}>
                    <b>Label</b>
                  </th>
                  <th style={{ textAlign: "center" }}>
                    <b>Qty</b>
                  </th>
                  <th style={{ textAlign: "center" }}>
                    <b>Price</b>
                  </th>
                </tr>
              </thead>
              <tbody>{variantRows}</tbody>
            </Table>
          </>
        ) : (
          <>
            <Table responsive bordered size="md" variant="dark">
              <thead>
                <tr>
                  <th style={{ textAlign: "center" }}>
                    <b>Label</b>
                  </th>
                  <th style={{ textAlign: "center" }}>
                    <b>Qty</b>
                  </th>
                  <th style={{ textAlign: "center" }}>
                    <b>Price</b>
                  </th>
                </tr>
              </thead>
              <tbody>{variantRows}</tbody>
            </Table>
          </>
        )}
      </>
    );
  }
}

export default VariantTable;
