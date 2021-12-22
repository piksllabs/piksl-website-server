async function minttokens() {
    token = localStorage.getItem('token')
    parsedtoken = parseJwt(token);
    console.log(parsedtoken);
    let ispikslwallet = parsedtoken.pikslwallet;
    let loggedinaddress = parsedtoken.ethaddress;
    let qty = document.getElementById("qty").value;

    if (!ispikslwallet) {
        const cost = "100000000000000000";

        var web3 = new Web3(Web3.givenProvider);

        window.contract = await new web3.eth.Contract(contract_abi, contract);

        const transactionParameters = {
            to: contract,
            from: loggedinaddress,
            value: bigInt(cost).multiply(bigInt(qty.toString())).toString(16),
            data: window.contract.methods.mintPublicTokens(qty).encodeABI(),
        };


        try {
            const receipt = await window.ethereum.request({
                method: "eth_sendTransaction",
                params: [transactionParameters],
            });
            console.log(receipt);
        } catch (error) {
            console.log(error);
        }
    } else {
        console.log("ispikslwallet");
        ethaddress = parsedtoken.ethaddress;
        password = document.getElementById("mintpassword").value;

        const result = await fetch(apiurl + '/marketplace/mintdripclub', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ethaddress: ethaddress,
                password: password,
                qty: qty
            })
        }).then((res) => res.json())

        console.log(result.data)
    }
}