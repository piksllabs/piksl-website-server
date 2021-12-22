let metamaskaddress;
window.addEventListener('load', async function() {
    //await getmetamaskaddress()
    ethereum.on('accountsChanged', async(accounts) => {
        await getmetamaskaddress();
        if (metamaskaddress != undefined) {
            if (localStorage.getItem("token") && localStorage.getItem("ismetamaskwallet") == 'true') {
                registermetamaskuser();
            }
        }
    });
});

async function connectMetamask() {
    try {
        let result = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        metamaskaddress = result[0];
        registermetamaskuser();
    } catch (e) {
        console.log(e)
        return [];
    }
}

async function getmetamaskaddress() {
    if (window.ethereum) {
        add = await ethereum.request({ method: 'eth_accounts' });
        metamaskaddress = add[0];
    }
}

async function registermetamaskuser() {
    const ethaddress = metamaskaddress;
    console.log(ethaddress)

    let result = await registerloginmetamask(ethaddress);
    localStorage.setItem('token', result.data);
    localStorage.setItem('ismetamaskwallet', 'true');
    location.reload();

}