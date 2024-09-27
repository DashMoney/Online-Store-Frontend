export default function dapiClientNoWallet(theNetwork) {
  return {
    network: theNetwork,
    dapiAddresses: [
      "35.165.50.126:1443",
      "52.10.229.11:1443",
      "54.149.33.167:1443",
      "52.24.124.162:1443",
      "54.187.14.232:1443",
    ],

    apps: {
      DPNSContract: {
        contractId: "GWRSAVFMjXx8HpQFaNJMqBV7MBgMK4br5UESsB4S31Ec",
      },
      ONLINESTOREContract: {
        contractId: "C7w3BAZHvoijzDrRv9MvsvAGgqdSBS2Nbc341kkrpovV",
      },
      ProxyContract: {
        contractId: "7Y342Md8nmw5qFBwBCmpnrbqV9ELhgUfRdNpiLjYkzLD",
      },
    },
  };
}

//dapiClientNoWallet(this.state.whichNetwork)
//dapiClientNoWallet(this.props.whichNetwork)
