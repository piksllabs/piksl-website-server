// let balethwei;
// let baleth;
let balweth;

// let wrapgascost;
async function swaptokens() {
    buysellmodal.style.display = "block";
    showmodal("loadingmodal");
    document.getElementById("modalheading").innerHTML = "SWAP TOKENS"
    document.getElementById("modalsubheading").innerHTML = "Convert Tokens"

    //onloadswaptokens();
    getbalances();

}

async function getbalances() {
    const { ispikslwallet, loggedinaddress } = getcurrentaddress();

    if (!ispikslwallet) {
        var web3 = new Web3(Web3.givenProvider);
        balethwei = await web3.eth.getBalance(loggedinaddress);
        baleth = await web3.utils.fromWei(balethwei);
        console.log(baleth);

        window.wethcontract = await new web3.eth.Contract(WETH_ABI, WETH_ADDRESS);

        balweth = await web3.utils.fromWei(await window.wethcontract.methods.balanceOf(loggedinaddress).call())

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
    }

    let input1 = document.getElementById("currencyinput1").value;
    let input2 = document.getElementById("currencyinput2").value;

    if (input1 == "eth") {
        loadeverything("input1");
    } else {
        loadeverything("input2");
    }
}

window.addEventListener("load", async function() {
    document.getElementById("currencyinput1").addEventListener("change", async function() {
        let input1 = document.getElementById("currencyinput1").value;
        let input2 = document.getElementById("currencyinput2").value;

        if (input1 == "eth") {
            $('#currencyinput2').val('weth').change();
        } else if (input1 == "weth") {
            $('#currencyinput2').val('eth').change();
        }
        input1 = document.getElementById("currencyinput1").value;
        input2 = document.getElementById("currencyinput2").value;
        console.log(input1, input2);
        getinputs();
    });
    document.getElementById("currencyinput2").addEventListener("change", async function() {
        let input1 = document.getElementById("currencyinput1").value;
        let input2 = document.getElementById("currencyinput2").value;

        if (input2 == "eth") {
            $('#currencyinput1').val('weth').change();
        } else if (input2 == "weth") {
            $('#currencyinput1').val('eth').change();
        }
        input1 = document.getElementById("currencyinput1").value;
        input2 = document.getElementById("currencyinput2").value;
        console.log(input1, input2);
        getinputs();
    });
});

async function getinputs() {
    let input1 = document.getElementById("currencyinput1").value;
    let input2 = document.getElementById("currencyinput2").value;

    if (input1 == "eth") {
        loadeverything("input1");
    } else {
        loadeverything("input2");
    }
}

async function loadeverything(input) {
    if (input == "input1") {
        ethbalinput = "balanceinput1";
        wethbalinput = "balanceinput2";
    } else if (input == "input2") {
        ethbalinput = "balanceinput2";
        wethbalinput = "balanceinput1";
    }

    const { ispikslwallet, loggedinaddress } = getcurrentaddress();

    if (!ispikslwallet) {
        document.getElementById(ethbalinput).innerHTML = `Balance : ${parseFloat(parseFloat(baleth).toFixed(3))}(&#926;)`
        document.getElementById(wethbalinput).innerHTML = `Balance : ${parseFloat(parseFloat(balweth).toFixed(3))}(&#926;)`
            //showmodal("wrapether");
        fillswaptokensform();

    } else {
        document.getElementById(ethbalinput).innerHTML = `Balance : ${parseFloat(parseFloat(baleth).toFixed(3))}(&#926;)`
        document.getElementById(wethbalinput).innerHTML = `Balance : ${parseFloat(parseFloat(balweth).toFixed(3))}(&#926;)`
        await swapestimategasfees();
        //showmodal("wrapether");
        fillswaptokensformpiksl(baleth, balethwei);
    }
    showmodal("swaptokens");
}


async function swapestimategasfees() {
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
    console.log(wrapgaslimit);
    let wrapgasprice = await getcurrentgasprice();
    wrapgascost = wrapgaslimit * (wrapgasprice / 10e8);
}


let highestswapbal;
async function fillswaptokensformpiksl(baleth, balethwei) {
    let input1 = document.getElementById("currencyinput1").value;
    let input2 = document.getElementById("currencyinput2").value;
    if (input1 == "eth") {
        console.log(wrapgascost)
        let highestbaleth = baleth - wrapgascost;
        highestswapbal = highestbaleth;
    } else {}


    document.getElementById("maxswapeth").addEventListener("click", async function() {

        if (input1 == "eth") {
            document.getElementById("maxswapeth").style.display = "none";
            document.getElementById("maxloadimgswap").style.display = "block";
            console.log(wrapgascost)

            document.getElementById("swapinput1amount").value = parseFloat(parseFloat(highestswapbal).toFixed(3));
            document.getElementById("maxloadimgswap").style.display = "none";
            document.getElementById("maxswapeth").style.display = "block";
            inusd("swapinput1amount");
            oninputswaptokens("swapinput1amount");
        } else {
            document.getElementById("swapinput1amount").value = parseFloat(parseFloat(balweth).toFixed(3));
            inusd("swapinput1amount");
            oninputswaptokens("swapinput1amount");
        }

    });


    document.getElementById("swapinput1amount").addEventListener("input", async function() {
        oninputswaptokens("swapinput1amount");
    });

    document.getElementById("swapinput2amount").addEventListener("input", async function() {
        oninputswaptokens("swapinput2amount");
    });

}

async function fillswaptokensform() {
    let input1 = document.getElementById("currencyinput1").value;
    let input2 = document.getElementById("currencyinput2").value;

    if (input1 == "eth") {
        var web3 = new Web3(Web3.givenProvider);
        window.wethcontract = await new web3.eth.Contract(WETH_ABI, WETH_ADDRESS);
        let swapgaslimit = await window.wethcontract.methods.deposit().estimateGas({ from: loggedinaddress, value: balethwei });
        let swapgasprice = await getcurrentgasprice();
        swapgascost = swapgaslimit * (swapgasprice / 10e8)
        let highestbaleth = baleth - swapgascost;
        highestswapbal = highestbaleth;
    }

    document.getElementById("maxswapeth").addEventListener("click", async function() {

        if (input1 == "eth") {
            document.getElementById("maxswapeth").style.display = "none";
            document.getElementById("maxloadimgswap").style.display = "block";
            var web3 = new Web3(Web3.givenProvider);

            document.getElementById("swapinput1amount").value = parseFloat(parseFloat(highestswapbal).toFixed(3));
            document.getElementById("maxloadimgswap").style.display = "none";
            document.getElementById("maxswapeth").style.display = "block";
            inusd("swapinput1amount");
            oninputswaptokens("swapinput1amount");
        } else {
            document.getElementById("swapinput1amount").value = parseFloat(parseFloat(balweth).toFixed(3));
            inusd("swapinput1amount");
            oninputswaptokens("swapinput1amount");
        }
    });

    document.getElementById("swapinput1amount").addEventListener("input", async function() {
        oninputswaptokens("swapinput1amount");
    });

    document.getElementById("swapinput2amount").addEventListener("input", async function() {
        oninputswaptokens("swapinput2amount");
    });
}

async function oninputswaptokens(input) {
    let input2;
    if (input == "swapinput1amount") {
        input2 = "swapinput2amount";
    } else {
        input2 = "swapinput1amount";
    }
    let ethvalue = document.getElementById(input).value;

    document.getElementById(input2).value = ethvalue;
    inusd(input2);

    let { ispikslwallet } = getcurrentaddress();
    if (ispikslwallet) {
        document.getElementById("swapgaspriceineth").innerHTML = parseFloat(parseFloat(wrapgascost).toFixed(3)) + "&#926;";
        document.getElementById("swapgaspriceinusd").innerHTML = "(" + await ethtousd(parseFloat(parseFloat(wrapgascost).toFixed(3))) + ")";
        document.getElementById("swapgasfees").style.display = "flex";
    }
}

async function swapnow() {
    let errors = await checkswaperrors();
    console.log(errors);
    if (errors == true) {
        let input1 = document.getElementById("currencyinput1").value;
        let input2 = document.getElementById("currencyinput2").value;
        parsedtoken = await parseJwt(token);
        let ispikslwallet = parsedtoken.pikslwallet;
        let loggedinaddress = parsedtoken.ethaddress;
        let password = parsedtoken.password;
        let ethvalue = document.getElementById("swapinput1amount").value;
        let ethvalueinwei = ethvalue * 10e17;

        if (!ispikslwallet) {
            showmodal("requestsignature");
            document.getElementById("requestsignaturep").innerHTML = "Accept the transaction request in your wallet and wait for your conversion to process."

            var web3 = new Web3(Web3.givenProvider);

            if (input1 == "eth") {
                try {
                    window.wethcontract = await new web3.eth.Contract(WETH_ABI, WETH_ADDRESS);
                    let wrapresult = await window.wethcontract.methods.deposit().send({ from: loggedinaddress, value: ethvalueinwei });
                    swapconfirmation(ethvalue, input1)
                } catch (e) {
                    showmodal("metamaskdecline");
                }
            } else {
                try {
                    window.wethcontract = await new web3.eth.Contract(WETH_ABI, WETH_ADDRESS);
                    let wrapresult = await window.wethcontract.methods.withdraw(String(ethvalueinwei)).send({ from: loggedinaddress });
                    swapconfirmation(ethvalue, input1)
                } catch (e) {
                    showmodal("metamaskdecline");
                }
            }

        } else {
            showmodal("loadingmodal");

            if (input1 == "eth") {
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
                swapconfirmation(ethvalue, input1);
            } else {
                let result = await fetch(apiurl + '/wallet/unwrapweth', {
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
                swapconfirmation(ethvalue, input1);
            }

        }
    }




}


async function checkswaperrors() {
    let input = document.getElementById("currencyinput1").value;
    let swapamount = document.getElementById("swapinput1amount").value;
    let swaperror = document.getElementById("swaperror");
    let swaperrorbox = document.getElementById("swaperrorbox");

    console.log(highestswapbal);
    async function checkswapvalidity() {
        if (isNaN(parseFloat(swapamount)) == true) {
            swaperror.innerHTML = "Entered amount is not valid";
            swaperrorbox.style.display = "block";
            console.log("yo")
            return false
        } else {
            // senderrorbox.style.display = "none";
            return true
        }
    }

    async function checkswapbalances() {
        if (input == "eth") {
            if (parseFloat(swapamount) > baleth) {
                swaperror.innerHTML = "Insufficient funds";
                swaperrorbox.style.display = "block";
                console.log("hmm")
                return false
            } else if (parseFloat(swapamount) < baleth && parseFloat(swapamount) > highestswapbal) {
                swaperror.innerHTML = "Insufficient funds for gas";
                swaperrorbox.style.display = "block";
                console.log("hmm2")
                return false
            } else {
                // senderrorbox.style.display = "none";
                return true
            }
        } else {
            if (wrapgascost > baleth) {
                swaperror.innerHTML = "Insufficient funds for gas";
                swaperrorbox.style.display = "block";
                console.log("hmm3")
                return false
            } else if (parseFloat(swapamount) > balweth) {
                swaperror.innerHTML = "Insufficient funds";
                swaperrorbox.style.display = "block";
                console.log("hmm")
                return false
            } else {
                //  senderrorbox.style.display = "none";
                return true
            }
        }
    }

    document.getElementById("swapinput1amount").addEventListener("click", async function() {
        swaperrorbox.style.display = "none";
    })

    document.getElementById("swapinput2amount").addEventListener("click", async function() {
        swaperrorbox.style.display = "none";
    })

    let validity = await checkswapvalidity();
    let balances = await checkswapbalances();
    console.log(validity, balances)

    if (validity == true && balances == true) {
        return true
    } else {
        return false
    }
}


async function swapconfirmation(ethvalue, input) {
    showmodal("emptymodal");
    document.getElementById("modalsubheading").innerHTML = "Conversion Successful"
    let emptycenter = document.getElementById("emptycenter");
    emptycenter.innerHTML = "";
    let p = document.createElement("p");
    if (input == "eth") {
        p.innerHTML = `You successfully converted ${ethvalue}(&#926;) to WETH`;
    } else {
        p.innerHTML = `You successfully converted ${ethvalue}WETH to ETH`;
    }

    p.style.color = "#818181"
    let br = document.createElement("br");
    let br2 = document.createElement("br");
    let backbutton = document.createElement("button");
    backbutton.setAttribute("class", "bluebuttonhollow");
    backbutton.setAttribute("onclick", "location.reload()");
    backbutton.innerHTML = "Close"
    emptycenter.appendChild(p);
    emptycenter.appendChild(br);
    emptycenter.appendChild(backbutton);
}