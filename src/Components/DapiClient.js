import LocalForage from "localforage";

export default function dapiClient(
  theNetwork,
  theMnemonic,
  theSkipSynchronizationBeforeHeight
) {
  return {
    network: theNetwork,
    dapiAddresses: [
      // "35.165.50.126:1443",
      "52.10.229.11:1443",
      "54.149.33.167:1443",
      "52.24.124.162:1443",
      "54.187.14.232:1443",
    ],
    wallet: {
      mnemonic: theMnemonic,
      adapter: LocalForage.createInstance,
      unsafeOptions: {
        skipSynchronizationBeforeHeight: theSkipSynchronizationBeforeHeight,
      },
    },
    apps: {
      DPNSContract: {
        contractId: "GWRSAVFMjXx8HpQFaNJMqBV7MBgMK4br5UESsB4S31Ec",
      },
      ONLINESTOREContract: {
        contractId: "DpMzroPo7NFXmACmAZHhsdzPTVCPxNG71PRe17xH7H9", //"E1pambYerWzGaGdQVQcf9tyL5qRKh9mKgiYW9mETupjQ", //"C7w3BAZHvoijzDrRv9MvsvAGgqdSBS2Nbc341kkrpovV",
      },
      ProxyContract: {
        contractId: "7Y342Md8nmw5qFBwBCmpnrbqV9ELhgUfRdNpiLjYkzLD",
      },
    },
  };
}

/*
dapiClient(
  this.state.whichNetwork,
  this.state.mnemonic,
  this.state.skipSynchronizationBeforeHeight
)
  dapiClient(
  this.props.whichNetwork,
  this.props.mnemonic,
  this.props.skipSynchronizationBeforeHeight
)
  */
