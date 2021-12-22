async function makeoffer() {
    let { loggedinaddress } = await getcurrentaddress()

    if (loggedinaddress == "") {
        showmodal("loginmodal");
    } else {
        makeoffer2();
    }
}

async function makeoffer2() {
    buysellmodal.style.display = "block";
    showmodal("loadingmodal");

    document.getElementById("modalheading").innerHTML = "MAKE OFFER";
    document.getElementById("modalsubheading").innerHTML = "Make offer on item";

    let { ispikslwallet, loggedinaddress } = getcurrentaddress();

    if (!ispikslwallet) {
        makeoffermetamask();
    } else {
        console.log("hmm")
        makeofferpiksl(loggedinaddress);
    }
}

async function makeoffermetamask() {
    var web3 = new Web3(Web3.givenProvider);
    window.wethcontract = await new web3.eth.Contract(WETH_ABI, WETH_ADDRESS);
    const balweth = await web3.utils.fromWei(await window.wethcontract.methods.balanceOf(loggedinaddress).call())
    document.getElementById("makeofferbalanceweth").innerHTML = `Balance : ${parseFloat(parseFloat(balweth).toFixed(3))}(&#926;)`

    document.getElementById("maxofferweth").addEventListener("click", async function() {
        document.getElementById("makeofferamount").value = parseFloat(parseFloat(balweth).toFixed(3));
        inusd("makeofferamount");
        insufficienterror(balweth);
    });

    document.getElementById("makeofferamount").addEventListener("input", async function() {
        insufficienterror(balweth);
    });

    ifzerowethbalance(balweth);

}

async function makeofferpiksl(loggedinaddress) {
    console.log("log" + loggedinaddress)
    const balweth = await getwethbalance(loggedinaddress);
    console.log(balweth)
    document.getElementById("makeofferbalanceweth").innerHTML = `Balance : ${parseFloat(parseFloat(balweth).toFixed(3))}(&#926;)`

    document.getElementById("maxofferweth").addEventListener("click", async function() {
        document.getElementById("makeofferamount").value = parseFloat(parseFloat(balweth).toFixed(3));
        inusd("makeofferamount");
        insufficienterror(balweth);
    });

    document.getElementById("makeofferamount").addEventListener("input", async function() {
        insufficienterror(balweth);
    });
    ifzerowethbalance(balweth);
}

async function ifzerowethbalance(balweth) {
    if (balweth == 0) {
        document.getElementById("insufficienterror").style.display = "block";
        document.getElementById("insufficienterror").innerHTML = "You do not have any WETH in your wallet. Wrap some ether to enable offers."
        document.getElementById("insufficienterror").style.color = "#2081e2"
        document.getElementById("processofferp").style.display = "none";
        document.getElementById("continuemakeoffer").style.display = "none";
    } else {
        document.getElementById("insufficienterror").innerHTML = "Offer amount is greater than your available WETH balance. Wrap ether or enter a smaller amount."
        document.getElementById("insufficienterror").style.color = "#2081e2"
        document.getElementById("insufficienterror").style.display = "none";
        document.getElementById("continuemakeoffer").style.display = "block";
        document.getElementById("processofferp").style.display = "block";
    }
    showmodal("makeoffer");
}

async function insufficienterror(balweth) {
    if (isNaN(parseFloat(document.getElementById("makeofferamount").value)) == true) {
        if (document.getElementById("makeofferamount").value == "") {
            document.getElementById("insufficienterror").style.display = "none";
            document.getElementById("continuemakeoffer").style.display = "block";
            document.getElementById("processofferp").style.display = "block";
        } else {
            document.getElementById("insufficienterror").innerHTML = "Enter a valid offer amount."
            document.getElementById("insufficienterror").style.display = "block";
            document.getElementById("continuemakeoffer").style.display = "none";
            document.getElementById("processofferp").style.display = "none";
        }
    } else if (document.getElementById("makeofferamount").value > balweth) {
        document.getElementById("insufficienterror").innerHTML = "Offer amount is greater than your available WETH balance. Wrap ether or enter a smaller amount."
        document.getElementById("insufficienterror").style.display = "block";
        document.getElementById("continuemakeoffer").style.display = "none";
        document.getElementById("processofferp").style.display = "none";
    } else {
        document.getElementById("insufficienterror").style.display = "none";
        document.getElementById("continuemakeoffer").style.display = "block";
        document.getElementById("processofferp").style.display = "block";
    }
    showmodal("makeoffer");
}


async function continuemakeoffer() {
    console.log(parseFloat(document.getElementById("makeofferamount").value))
    if (parseFloat(document.getElementById("makeofferamount").value) <= 0 || isNaN(parseFloat(document.getElementById("makeofferamount").value)) == true) {
        document.getElementById("insufficienterror").style.display = "block";
        document.getElementById("insufficienterror").innerHTML = "Enter a valid offer amount."
        document.getElementById("insufficienterror").style.color = "#2081e2"
        document.getElementById("processofferp").style.display = "none";

    } else {
        showmodal("loadingmodal");
        let listprice = parseFloat(document.getElementById("makeofferamount").value) * 10e17;
        console.log(listprice);
        let listtimeinseconds = document.getElementById("makeoffertimeframe").value;
        let listtimeframe = document.getElementsByName(listtimeinseconds)[0].innerHTML;

        let { ispikslwallet, loggedinaddress } = getcurrentaddress();

        if (!ispikslwallet) {
            showmodal("loadingmodal");
            checkallowance(listprice, listtimeinseconds, listtimeframe);
        } else {
            checkallowancepiksl(listprice, listtimeinseconds, listtimeframe);

        }
    }
}

async function checkallowancepiksl(listprice, listtimeinseconds, listtimeframe) {
    parsedtoken = await parseJwt(token);
    let loggedinaddress = parsedtoken.ethaddress;
    let password = parsedtoken.password;
    const result = await fetch(apiurl + '/wallet/checkwethallowance', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ethaddress: loggedinaddress,
            password: password
        })
    }).then((res) => res.json())

    balallowance = result.data;

    if (balallowance > 1000000000000) {
        continueoffer(listprice, listtimeinseconds, listtimeframe);
    } else {
        requestallowance();
    }
}

async function checkallowance(listprice, listtimeinseconds, listtimeframe) {
    var web3 = new Web3(Web3.givenProvider);
    window.wethcontract = await new web3.eth.Contract(WETH_ABI, WETH_ADDRESS);
    const balallowance = await window.wethcontract.methods.allowance(loggedinaddress, marketplaceaddress).call();
    console.log(balallowance)
    if (balallowance > 1000000000000) {
        continueoffer(listprice, listtimeinseconds, listtimeframe);
    } else {
        requestallowance();
    }
}
async function requestallowance() {
    showmodal("loadingmodal");
    parsedtoken = await parseJwt(token);
    let ispikslwallet = parsedtoken.pikslwallet;
    let loggedinaddress = parsedtoken.ethaddress;

    if (!ispikslwallet) {
        showmodal("requestsignature");
        document.getElementById("modalsubheading").innerHTML = "Confirm Access"
        document.getElementById("requestsignaturep").innerHTML = "Making offers requires a one-time free transaction (+ gas fees) to set up your wallet for offers. This transaction will allow your WETH to be transferred to the token owners if they accept your offers."


        var web3 = new Web3(Web3.givenProvider);
        window.wethcontract = await new web3.eth.Contract(WETH_ABI, WETH_ADDRESS);
        let wethallowanceamount = web3.utils.toBN(BigInt(1e59).toString(16));

        try {
            const balallowance = await window.wethcontract.methods.approve(marketplaceaddress, wethallowanceamount).send({ from: loggedinaddress });
            confirmapproveweth();
        } catch (e) {
            showmodal("metamaskdecline");

        }
    } else {
        let password = parsedtoken.password;
        let p = document.createElement("p");
        p.style.fontSize = "90%";
        p.innerHTML = "Making offers requires a one-time free transaction (+ gas fees) to set up your wallet for offers. This transaction will allow your WETH to be transferred to the token owners if they accept your offers."
        document.getElementById("emptycenter").appendChild(p);
        document.getElementById("emptytransaction").style.display = "block";

        const result = await fetch(apiurl + '/wallet/estimategaswethapprove', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ethaddress: loggedinaddress,
                password: password
            })
        }).then((res) => res.json())

        let approvegaslimit = result.data;
        let approvegasprice = await getcurrentgasprice();
        let approvegascost = approvegaslimit * (approvegasprice / 10e8)
        console.log(approvegascost)
        document.getElementById("emptygaspriceineth").innerHTML = parseFloat(parseFloat(approvegascost).toFixed(3)) + "&#926;";
        document.getElementById("emptygaspriceinusd").innerHTML = "(" + await ethtousd(parseFloat(parseFloat(approvegascost).toFixed(3))) + ")";
        showmodal("emptymodal");


        document.getElementById("emptyconfirmbutton").addEventListener("click", async function() {
            showmodal("loadingmodal");
            confirmapproveweth();
        });


    }

}

async function confirmapproveweth() {
    parsedtoken = await parseJwt(token);
    let ispikslwallet = parsedtoken.pikslwallet;
    let loggedinaddress = parsedtoken.ethaddress;

    if (!ispikslwallet) {

    } else {
        let password = parsedtoken.password;
        const result2 = await fetch(apiurl + '/wallet/approveweth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ethaddress: loggedinaddress,
                password: password
            })
        }).then((res) => res.json())
    }
    document.getElementById("emptytransaction").style.display = "none";
    let emptycenter = document.getElementById("emptycenter");
    emptycenter.innerHTML = "";
    let p = document.createElement("p");
    p.innerHTML = "Transaction successful. Proceed to your offer."
    p.style.color = "#818181";
    let br = document.createElement("br");
    let br2 = document.createElement("br");
    let continuebutton = document.createElement("button");
    continuebutton.setAttribute("class", "bluebutton");
    continuebutton.setAttribute("onclick", "showmodal('makeoffer')");
    continuebutton.innerHTML = "Continue";
    emptycenter.appendChild(p);
    emptycenter.appendChild(br);
    emptycenter.appendChild(continuebutton);
    showmodal("emptymodal");

}



async function continueoffer(listprice, listtimeinseconds, listtimeframe) {
    parsedtoken = await parseJwt(token);
    let ispikslwallet = parsedtoken.pikslwallet;
    let loggedinaddress = parsedtoken.ethaddress;
    let tokenid = gettokenid();
    console.log(listprice, listtimeinseconds, listtimeframe)
    let offerexpirationtimestamp = await getexpirationtimestamp(listtimeinseconds);
    // let params = {
    //     tokenid: tokenid,
    //     offerethaddress: loggedinaddress,
    //     offeramount: listprice,
    //     offerexpirationtimestamp: offerexpirationtimestamp
    // }
    // let offermsg = JSON.stringify(params);
    // console.log(offermsg)

    const msg0 = `tokenid : ${tokenid},fromaddress : ${loggedinaddress},listprice : ${listprice},expirationtimestamp : ${offerexpirationtimestamp}`
    const msg1 = msg0.split(/\s/).join('');
    const msg = msg1.toLowerCase();

    if (!ispikslwallet) {
        showmodal("requestsignature");
        document.getElementById("requestsignaturep").innerHTML = "Making an offer is completely free without any gas fees. Accept the signature request in your wallet and wait for your offer to process. "
        let { loggedinaddress } = await getcurrentaddress();
        var web3 = new Web3(Web3.givenProvider);
        const offermsghash = web3.utils.sha3(web3.utils.toHex(msg), { encoding: "hex" });
        let offersign;
        try {
            offersign = await web3.eth.personal.sign(offermsghash, loggedinaddress);

            const result = await fetch(apiurl + '/marketplace/registeroffermetamask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    tokenid: tokenid,
                    offerethaddress: loggedinaddress,
                    offeramount: listprice,
                    offerexpirationtimestamp: offerexpirationtimestamp,
                    offersign: offersign
                })
            }).then((res) => res.json())

            console.log(result.data)

            let listprice2 = parseFloat(listprice) / 10e17;
            listingdone(result.data, listprice2, listtimeframe, "makeoffer")
        } catch (e) {
            showmodal("metamaskdecline");
        }
    } else {
        showmodal("requestpassword");
        document.getElementById("modalsubheading").innerHTML = "Confirm Offer";
        document.getElementById("requestpasswordp").innerHTML = "Making an offer is completely free without any gas fees. Enter your account password to confirm the offer:"


        document.getElementById("requestpasswordconfirmbutton").addEventListener("click", async function() {
            let password = document.getElementById("requestpasswordinput").value;
            console.log(password)
            const check = await checkpassword(loggedinaddress, password);
            if (check == "error") {
                document.getElementById("requestpasswordloginerror").style.display = "flex";
            } else {
                const result = await fetch(apiurl + '/marketplace/registerofferpiksl', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        tokenid: tokenid,
                        offerethaddress: loggedinaddress,
                        offeramount: listprice,
                        offerexpirationtimestamp: offerexpirationtimestamp,
                        offermsg: msg,
                        password: password
                    })
                }).then((res) => res.json())

                console.log(result.data)
                let listprice2 = parseFloat(listprice) / 10e17;
                listingdone(result.data, listprice2, listtimeframe, "makeoffer")
            }

        });

    }


}