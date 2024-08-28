import LocalForage from "localforage";

export default function dapiClient(
  theNetwork,
  theMnemonic,
  theSkipSynchronizationBeforeHeight
) {
  return {
    network: theNetwork,
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
        contractId: "C7w3BAZHvoijzDrRv9MvsvAGgqdSBS2Nbc341kkrpovV",
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
