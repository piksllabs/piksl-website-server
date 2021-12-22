let balethwei;
let baleth;
let wrapgascost;
async function wrapether() {
    buysellmodal.style.display = "block";
    showmodal("loadingmodal");
    document.getElementById("modalheading").innerHTML = "WRAP ETHER"
    document.getElementById("modalsubheading").innerHTML = "Convert ETH to WETH"

    onloadwrapether();
}

async function onloadwrapether() {
    const { ispikslwallet, loggedinaddress } = getcurrentaddress();

    if (!ispikslwallet) {
        var web3 = new Web3(Web3.givenProvider);
        balethwei = await web3.eth.getBalance(loggedinaddress);
        baleth = await web3.utils.fromWei(balethwei);
        document.getElementById("balanceeth").innerHTML = `Balance : ${parseFloat(parseFloat(baleth).toFixed(3))}(&#926;)`

        window.wethcontract = await new web3.eth.Contract(WETH_ABI, WETH_ADDRESS);

        const balweth = await web3.utils.fromWei(await window.wethcontract.methods.balanceOf(loggedinaddress).call())
        document.getElementById("balanceweth").innerHTML = `Balance : ${parseFloat(parseFloat(balweth).toFixed(3))}(&#926;)`
        showmodal("wrapether");
        fillwrapetherform();

    } else {
        let balances = [];
        balances.push(getbalance(loggedinaddress));
        balances.push(getwethbalance(loggedinaddress));
        balances = await Promise.all(balances);
        console.log(balances);
        baleth = balances[0];
        balweth = balances[1];
        balethwei = baleth * 10e17;
        console.log(balethwei)
        document.getElementById("balanceeth").innerHTML = `Balance : ${parseFloat(parseFloat(baleth).toFixed(3))}(&#926;)`
        document.getElementById("balanceweth").innerHTML = `Balance : ${parseFloat(parseFloat(balweth).toFixed(3))}(&#926;)`
        wrapestimategasfees();
        showmodal("wrapether");
        fillwrapetherformpiksl(baleth, balethwei);
    }
}

async function wrapestimategasfees() {
    parsedtoken = await parseJwt(token);
    let loggedinaddress = parsedtoken.ethaddress;
    let password = parsedtoken.password;
    let result = await fetch(apiurl + '/wallet/estimategaswethwrap', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ethaddress: loggedinaddress,
            password: password,
            balethwei: balethwei
        })
    }).then((res) => res.json())
    let wrapgaslimit = result.data;
    let wrapgasprice = await getcurrentgasprice();
    wrapgascost = wrapgaslimit * (wrapgasprice / 10e8);
}

async function fillwrapetherformpiksl(baleth, balethwei) {

    document.getElementById("maxeth").addEventListener("click", async function() {

        document.getElementById("maxeth").style.display = "none";
        document.getElementById("maxloadimg").style.display = "block";
        console.log(wrapgascost)
        let highestbaleth = baleth - wrapgascost;
        document.getElementById("ethamount").value = parseFloat(parseFloat(highestbaleth).toFixed(3));
        document.getElementById("maxloadimg").style.display = "none";
        document.getElementById("maxeth").style.display = "block";
        inusd("ethamount");
        oninputwrapether("ethamount");
    });

    document.getElementById("ethamount").addEventListener("input", async function() {
        oninputwrapether("ethamount");
    });
    document.getElementById("wethamount").addEventListener("input", async function() {
        oninputwrapether("wethamount");
    });
}

async function fillwrapetherform() {
    document.getElementById("maxeth").addEventListener("click", async function() {
        document.getElementById("maxeth").style.display = "none";
        document.getElementById("maxloadimg").style.display = "block";
        var web3 = new Web3(Web3.givenProvider);
        window.wethcontract = await new web3.eth.Contract(WETH_ABI, WETH_ADDRESS);
        let wrapgaslimit = await window.wethcontract.methods.deposit().estimateGas({ from: loggedinaddress, value: balethwei });
        let wrapgasprice = await getcurrentgasprice();
        wrapgascost = wrapgaslimit * (wrapgasprice / 10e8)
        let highestbaleth = baleth - wrapgascost;

        document.getElementById("ethamount").value = parseFloat(parseFloat(highestbaleth).toFixed(3));
        document.getElementById("maxloadimg").style.display = "none";
        document.getElementById("maxeth").style.display = "block";
        inusd("ethamount");
        oninputwrapether("ethamount");
    });

    document.getElementById("ethamount").addEventListener("input", async function() {
        oninputwrapether("ethamount");
    });

    document.getElementById("wethamount").addEventListener("input", async function() {
        oninputwrapether("wethamount");
    });
}

async function oninputwrapether(input) {
    let input2;
    if (input == "ethamount") {
        input2 = "wethamount";
    } else {
        input2 = "ethamount";
    }
    let ethvalue = document.getElementById(input).value;

    document.getElementById(input2).value = ethvalue;
    inusd(input2);

    let { ispikslwallet } = getcurrentaddress();
    if (ispikslwallet) {
        document.getElementById("wrapgaspriceineth").innerHTML = parseFloat(parseFloat(wrapgascost).toFixed(3)) + "&#926;";
        document.getElementById("wrapgaspriceinusd").innerHTML = "(" + await ethtousd(parseFloat(parseFloat(wrapgascost).toFixed(3))) + ")";
        document.getElementById("wrapgasfees").style.display = "flex";
    }
}

async function wrapnow() {
    parsedtoken = await parseJwt(token);
    let ispikslwallet = parsedtoken.pikslwallet;
    let loggedinaddress = parsedtoken.ethaddress;
    let password = parsedtoken.password;
    let ethvalue = document.getElementById("ethamount").value;
    let ethvalueinwei = ethvalue * 10e17;

    if (!ispikslwallet) {
        showmodal("requestsignature");
        document.getElementById("requestsignaturep").innerHTML = "Accept the transaction request in your wallet and wait for your conversion to process."

        var web3 = new Web3(Web3.givenProvider);
        try {
            window.wethcontract = await new web3.eth.Contract(WETH_ABI, WETH_ADDRESS);
            let wrapresult = await window.wethcontract.methods.deposit().send({ from: loggedinaddress, value: ethvalueinwei });
            wrapconfirmation(ethvalue)
        } catch (e) {
            showmodal("metamaskdecline");
        }
    } else {
        showmodal("loadingmodal");
        let result = await fetch(apiurl + '/wallet/wrapweth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ethaddress: loggedinaddress,
                password: password,
                ethvalueinwei: ethvalueinwei
            })
        }).then((res) => res.json())
        console.log(result)
        wrapconfirmation(ethvalue)
    }


}

async function wrapconfirmation(ethvalue) {
    showmodal("emptymodal");
    document.getElementById("modalsubheading").innerHTML = "Conversion Successful"
    let emptycenter = document.getElementById("emptycenter");
    emptycenter.innerHTML = "";
    let p = document.createElement("p");
    p.innerHTML = `You successfully wrapped ${ethvalue}(&#926;) to WETH`;
    p.style.color = "#818181"
    let br = document.createElement("br");
    let br2 = document.createElement("br");
    let backbutton = document.createElement("button");
    backbutton.setAttribute("class", "bluebuttonhollow");
    backbutton.setAttribute("onclick", "makeoffer()");
    backbutton.innerHTML = "Back"
    emptycenter.appendChild(p);
    emptycenter.appendChild(br);
    emptycenter.appendChild(backbutton);
}