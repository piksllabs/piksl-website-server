async function acceptoffer(listingid) {
    let { loggedinaddress } = await getcurrentaddress()

    if (loggedinaddress == "") {
        buysellmodal.style.display = "block";
        showmodal("loginmodal");
    } else {
        acceptoffer2(listingid);
    }
}

async function acceptoffer2(listingid) {
    buysellmodal.style.display = "block";
    showmodal("buy");

    let listdetails = JSON.parse(document.getElementById(listingid).getAttribute("listingdetails"));
    let listprice = listdetails.offeramount / 10e17;



    document.getElementById("modalheading").innerHTML = "ACCEPT OFFER";
    document.getElementById("modalsubheading").innerHTML = "Offer Summary";
    document.getElementById("buyp").innerHTML = "Continue to accept this offer";

    document.getElementById("checkoutimg").setAttribute("src", document.getElementById("tokenimg").src);
    document.getElementById("checkoutsmallprice").innerHTML = parseFloat(parseFloat(listprice).toFixed(3));
    document.getElementById("checkoutprice").innerHTML = parseFloat(parseFloat(listprice).toFixed(3));
    document.getElementById("checkoutsmallusdprice").innerHTML = "(" + await ethtousd(parseFloat(parseFloat(listprice).toFixed(3))) + ")";
    document.getElementById("checkoutusdprice").innerHTML = "(" + await ethtousd(parseFloat(parseFloat(listprice).toFixed(3))) + ")";

    document.getElementById("continuebuybutton").addEventListener("click", async function() {
        continueacceptoffer(listingid);
    });

}


async function continueacceptoffer(listingid) {
    let tokenid = gettokenid();
    let { ispikslwallet, loggedinaddress } = getcurrentaddress();
    let listdetails = JSON.parse(document.getElementById(listingid).getAttribute("listingdetails"));
    console.log(listdetails);
    let offerethaddress = listdetails.offerethaddress;
    let offeramount = String(listdetails.offeramount);
    let offerexpirationtimestamp = listdetails.offerexpirationtimestamp;
    let offersign = listdetails.offersign;

    if (!ispikslwallet) {
        showmodal("requestsignature");
        document.getElementById("requestsignaturep").innerHTML = "Accept the transaction request in your wallet and wait for the transaction to process."

        var web3 = new Web3(Web3.givenProvider);

        window.contract = await new web3.eth.Contract(marketplace_abi, marketplaceaddress);
        let buyresult;

        try {
            buyresult = await window.contract.methods.piksltransfer(loggedinaddress, offerethaddress, tokenid, offeramount, offerexpirationtimestamp, offersign).send({ from: loggedinaddress, value: 0 });

            let listprice2 = parseFloat(offeramount) / 10e17;
            listingdone(buyresult, listprice2, "", "acceptoffer");
        } catch (e) {
            showmodal("metamaskdecline")
        }
    } else {
        gaspriceestimationacceptoffer(listingid);


        document.getElementById("gaspriceestimationconfirmbutton").addEventListener("click", async function() {
            let token = localStorage.getItem("token");
            token = parseJwt(token);
            let password = token.password;
            const check = await checkpassword(loggedinaddress, password);
            if (check == "error") {
                document.getElementById("requestpasswordloginerror").style.display = "flex";
            } else {
                showmodal("loadingmodal");
                let token = localStorage.getItem("token");
                const result = await fetch(apiurl + '/marketplace/acceptoffer', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        tokenid: tokenid,
                        ethaddress: loggedinaddress,
                        password: password,
                        offerethaddress: offerethaddress,
                        listprice: offeramount,
                        expirationtimestamp: offerexpirationtimestamp,
                        sign: offersign
                    })
                }).then((res) => res.json())

                console.log(result.data);
                listprice2 = offeramount / 10e17;
                listingdone(result.data, listprice2, "", "acceptoffer");
            }

        });



    }

}

async function gaspriceestimationacceptoffer(listingid) {
    console.log(listingid);
    let listdetails = JSON.parse(document.getElementById(listingid).getAttribute("listingdetails"));
    console.log(listdetails);
    let offerethaddress = listdetails.offerethaddress;
    let offeramount = String(listdetails.offeramount);
    let offerexpirationtimestamp = listdetails.offerexpirationtimestamp;
    let offersign = listdetails.offersign;
    let token = localStorage.getItem("token");
    token = parseJwt(token);
    let password = token.password;


    showmodal("loadingmodal");
    document.getElementById("gasestimationamount").style.display = "none";
    document.getElementById("modalsubheading").innerHTML = "Transaction Details";
    await estimategasacceptoffer(offerethaddress, offeramount, offerexpirationtimestamp, offersign, password);
    showmodal("gaspriceestimation");
}

async function estimategasacceptoffer(offerethaddress, offeramount, offerexpirationtimestamp, offersign, password) {
    let { ispikslwallet, loggedinaddress } = await getcurrentaddress();
    console.log(offerethaddress, offeramount, offerexpirationtimestamp, offersign, password)
    const result = await fetch(apiurl + '/marketplace/estimategasacceptoffer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            tokenid: tokenid,
            ethaddress: loggedinaddress,
            password: password,
            offerethaddress: offerethaddress,
            listprice: offeramount,
            expirationtimestamp: offerexpirationtimestamp,
            sign: offersign
        })
    }).then((res) => res.json())

    let gaslimit = result.data
    let gasprice = (await getgasprice()) / 10e8;
    let totalgasprice = (parseInt(gaslimit) * parseFloat(gasprice)).toFixed(3);
    document.getElementById("gaspriceineth").innerHTML = totalgasprice;
    document.getElementById("gaspriceinusd").innerHTML = "(" + await ethtousd(totalgasprice) + ")";

    document.getElementById("gasestimationtotal").style.display = "none";
    document.getElementById("gasestimationhr").style.display = "none";
    document.getElementById("gasestimationp").innerHTML = "Confirm the free transaction (+ gas fees) to process the offer"

}