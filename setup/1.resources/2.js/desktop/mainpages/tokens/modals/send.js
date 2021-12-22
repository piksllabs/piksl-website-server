async function sendtokens() {
    buysellmodal.style.display = "block";
    showmodal("loadingmodal");
    document.getElementById("modalheading").innerHTML = "SEND TOKENS"
    document.getElementById("modalsubheading").innerHTML = "Transfer Tokens to Address"

    onloadsendtokens();
}


window.addEventListener("load", async function() {
    document.getElementById("sendcurrency").addEventListener("change", async function() {
        let input = document.getElementById("sendcurrency").value;
        fillbalances(input);
        oninputsendtokens();
    });
});


//balweth;
async function onloadsendtokens() {
    const { ispikslwallet, loggedinaddress } = getcurrentaddress();
    let input = document.getElementById("sendcurrency").value;

    if (!ispikslwallet) {
        var web3 = new Web3(Web3.givenProvider);
        balethwei = await web3.eth.getBalance(loggedinaddress);
        baleth = await web3.utils.fromWei(balethwei);
        window.wethcontract = await new web3.eth.Contract(WETH_ABI, WETH_ADDRESS);
        balweth = await web3.utils.fromWei(await window.wethcontract.methods.balanceOf(loggedinaddress).call())

        fillbalances(input);
        //showmodal("wrapether");
        fillsendtokensform();

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

        fillbalances(input);
        //showmodal("wrapether");
        fillsendtokensformpiksl(baleth, balethwei);
    }
}

async function fillbalances(input) {
    if (input == "eth") {
        document.getElementById("sendbalance").innerHTML = `Balance : ${parseFloat(parseFloat(baleth).toFixed(3))}(&#926;)`
    } else {
        document.getElementById("sendbalance").innerHTML = `Balance : ${parseFloat(parseFloat(balweth).toFixed(3))}(&#926;)`
    }
    sendestimategasfees();
    showmodal("send");
}

let sendgascost;


async function sendestimategasfees() {
    document.getElementById("sendgasdetails").style.display = "none";
    document.getElementById("sendgasloading").style.display = "block";
    parsedtoken = await parseJwt(token);
    let loggedinaddress = parsedtoken.ethaddress;
    let password = parsedtoken.password;

    let input = document.getElementById("sendcurrency").value;

    if (input == "eth") {
        let result = await fetch(apiurl + '/wallet/estimategassendether', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fromaddress: loggedinaddress,
                toaddress: "0x000000000000000000000000000000000000dEaD",
                valueineth: (baleth / 1.5),
                password: password
            })
        }).then((res) => res.json())
        let wrapgaslimit = result.data;
        console.log(wrapgaslimit);
        let wrapgasprice = await getcurrentgasprice();
        sendgascost = wrapgaslimit * (wrapgasprice / 10e8);
    } else {
        let result = await fetch(apiurl + '/wallet/estimategassendweth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fromaddress: loggedinaddress,
                toaddress: "0x000000000000000000000000000000000000dEaD",
                sendamount: balweth,
                password: password
            })
        }).then((res) => res.json())
        console.log(result)
        let wrapgaslimit = result.data;
        console.log(wrapgaslimit);
        let wrapgasprice = await getcurrentgasprice();
        sendgascost = wrapgaslimit * (wrapgasprice / 10e8);
    }
    document.getElementById("sendgasdetails").style.display = "block";
    document.getElementById("sendgasloading").style.display = "none";
    oninputsendtokens();
}

let highestsendbal;
async function fillsendtokensformpiksl(baleth, balethwei) {

    document.getElementById("maxsend").addEventListener("click", async function() {
        let input = document.getElementById("sendcurrency").value;
        let sendaddress = "0x000000000000000000000000000000000000dEaD";

        if (input == "eth") {
            document.getElementById("maxsend").style.display = "none";
            document.getElementById("maxloadimgsend").style.display = "block";
            console.log(sendgascost)
            console.log(baleth)
            let highestbaleth = baleth - sendgascost;
            highestsendbal = highestbaleth;
            console.log(highestbaleth)
            document.getElementById("sendamount").value = parseFloat(parseFloat(highestbaleth).toFixed(3));
            document.getElementById("maxloadimgsend").style.display = "none";
            document.getElementById("maxsend").style.display = "block";
            inusd("sendamount");
        } else {
            let highestbaleth = balweth;
            highestsendbal = highestbaleth;
            document.getElementById("sendamount").value = parseFloat(parseFloat(highestbaleth).toFixed(3));
            inusd("sendamount");
        }
        oninputsendtokens();
    });
    document.getElementById("sendamount").addEventListener("input", async function() {
        oninputsendtokens();
    });


}
async function fillsendtokensform() {
    document.getElementById("maxsend").addEventListener("click", async function() {
        const { ispikslwallet, loggedinaddress } = getcurrentaddress();
        let input = document.getElementById("sendcurrency").value;
        let sendaddress = "0x000000000000000000000000000000000000dEaD";
        document.getElementById("maxsend").style.display = "none";
        document.getElementById("maxloadimgsend").style.display = "block";
        var web3 = new Web3(Web3.givenProvider);
        let highestbaleth;
        if (input == "eth") {
            let sendgaslimit = await web3.eth.estimateGas({
                from: loggedinaddress,
                to: sendaddress,
                value: (balethwei / 1.5)
            });
            let sendgasprice = await getcurrentgasprice();
            sendgascost = sendgaslimit * (sendgasprice / 10e8)
            highestbaleth = baleth - sendgascost;
            highestsendbal = highestbaleth;
        } else {
            highestbaleth = balweth;
            highestsendbal = highestbaleth;
        }


        document.getElementById("sendamount").value = parseFloat(parseFloat(highestbaleth).toFixed(3));
        document.getElementById("maxloadimgsend").style.display = "none";
        document.getElementById("maxsend").style.display = "block";
        inusd("sendamount");
    });

}

async function oninputsendtokens() {
    let { ispikslwallet } = getcurrentaddress();
    if (ispikslwallet) {
        document.getElementById("sendgaspriceineth").innerHTML = parseFloat(parseFloat(sendgascost).toFixed(3)) + "&#926;";
        document.getElementById("sendgaspriceinusd").innerHTML = "(" + await ethtousd(parseFloat(parseFloat(sendgascost).toFixed(3))) + ")";
        document.getElementById("sendgasfees").style.display = "flex";
    }
}

async function sendnow() {
    let errors = await checksenderrors();
    console.log(errors);
    if (errors != false) {
        let input = document.getElementById("sendcurrency").value;
        let sendaddress = errors;
        let sendamount = document.getElementById("sendamount").value;

        const { ispikslwallet, loggedinaddress } = getcurrentaddress();

        if (!ispikslwallet) {
            showmodal("requestsignature");
            document.getElementById("requestsignaturep").innerHTML = "Accept the transaction request in your wallet and wait for your transfer to process."
            var web3 = new Web3(Web3.givenProvider);

            if (input == "eth") {
                try {
                    let result = await web3.eth.sendTransaction({
                        from: loggedinaddress,
                        to: sendaddress,
                        value: (sendamount * 10e17)
                    });
                    console.log(result);
                    sendconfirmation(sendamount, input, sendaddress);
                } catch (e) {
                    showmodal("metamaskdecline");
                }
            } else {
                window.wethcontract = await new web3.eth.Contract(WETH_ABI, WETH_ADDRESS);
                let wrapresult = await window.wethcontract.methods.transfer(sendaddress, String(sendamount * 10e17)).send({ from: loggedinaddress });
                sendconfirmation(sendamount, input, sendaddress);
            }

        } else {
            showmodal("loadingmodal");
            parsedtoken = await parseJwt(token);
            let ispikslwallet = parsedtoken.pikslwallet;
            let loggedinaddress = parsedtoken.ethaddress;
            let password = parsedtoken.password;

            if (input == "eth") {
                let result = await fetch(apiurl + '/wallet/sendether', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        fromaddress: loggedinaddress,
                        toaddress: sendaddress,
                        valueineth: sendamount,
                        password: password
                    })
                }).then((res) => res.json())
                console.log(result)
                sendconfirmation(sendamount, input, sendaddress);
            } else {
                let result = await fetch(apiurl + '/wallet/sendweth', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        fromaddress: loggedinaddress,
                        toaddress: sendaddress,
                        sendamount: sendamount,
                        password: password
                    })
                }).then((res) => res.json())
                console.log(result)
                sendconfirmation(sendamount, input, sendaddress);
            }

        }

    } else {


    }



}

async function checksenderrors() {
    let input = document.getElementById("sendcurrency").value;
    let sendaddress = document.getElementById("sendaddress").value;
    let sendamount = document.getElementById("sendamount").value;
    let senderror = document.getElementById("senderror");
    let senderrorbox = document.getElementById("senderrorbox");

    let validaddress = await checkifvalidaddress(sendaddress);

    async function checkvalidity() {
        if (validaddress == "error") {
            senderror.innerHTML = "Recepient address is not valid";
            senderrorbox.style.display = "block";
            return false
        } else if (isNaN(parseFloat(sendamount)) == true) {
            senderror.innerHTML = "Entered amount is not valid";
            senderrorbox.style.display = "block";
            return false
        } else {
            // senderrorbox.style.display = "none";
            return true
        }
    }

    async function checkbalances() {
        if (input == "eth") {
            if (parseFloat(sendamount) > baleth) {
                senderror.innerHTML = "Insufficient funds";
                senderrorbox.style.display = "block";
                console.log("hmm")
                return false
            } else if (parseFloat(sendamount) < baleth && parseFloat(sendamount) > highestsendbal) {
                senderror.innerHTML = "Insufficient funds for gas";
                senderrorbox.style.display = "block";
                return false
            } else {
                // senderrorbox.style.display = "none";
                return true
            }
        } else {
            if (sendgascost > baleth) {
                senderror.innerHTML = "Insufficient funds for gas";
                senderrorbox.style.display = "block";
                return false
            } else if (parseFloat(sendamount) > balweth) {
                senderror.innerHTML = "Insufficient funds";
                senderrorbox.style.display = "block";
                console.log("hmm")
                return false
            } else {
                //  senderrorbox.style.display = "none";
                return true
            }
        }
    }

    document.getElementById("sendamount").addEventListener("click", async function() {
        senderrorbox.style.display = "none";
    })

    document.getElementById("sendaddress").addEventListener("click", async function() {
        senderrorbox.style.display = "none";
    })

    let validity = await checkvalidity();
    let balances = await checkbalances();
    console.log(validity)

    if (validity == true && balances == true) {
        return validaddress
    } else {
        return false
    }
}




async function checkifvalidaddress(sendaddress) {
    const { ispikslwallet, loggedinaddress } = getcurrentaddress();

    if (!ispikslwallet) {
        var web3 = new Web3(Web3.givenProvider);
        try {
            const address = web3.utils.toChecksumAddress(sendaddress);
            return address
        } catch (e) {
            return "error"
        }
    } else {
        let result = await fetch(apiurl + '/wallet/checkvalidaddress', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ethaddress: sendaddress
                })
            }).then((res) => res.json())
            //console.log(result)

        if (result.data == "error") {
            return "error"
        } else {
            return result.data
        }
    }

}
async function sendconfirmation(ethvalue, input, sendaddress) {
    showmodal("emptymodal");
    document.getElementById("modalsubheading").innerHTML = "Transfer Successful"
    let emptycenter = document.getElementById("emptycenter");
    emptycenter.innerHTML = "";
    let p = document.createElement("p");
    if (input == "eth") {
        p.innerHTML = `You successfully transferred ${ethvalue}(&#926;) to ${await shortenaddress(sendaddress)}`;
    } else {
        p.innerHTML = `You successfully transferred ${ethvalue}WETH to ${await shortenaddress(sendaddress)}`;
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