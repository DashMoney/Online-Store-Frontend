export default function dapiClientNoWallet(theNetwork) {
  return {
    network: theNetwork,

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

//dapiClientNoWallet(this.state.whichNetwork)
//dapiClientNoWallet(this.props.whichNetwork)
