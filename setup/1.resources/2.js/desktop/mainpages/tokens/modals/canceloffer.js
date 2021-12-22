async function canceloffer(listingid) {
    let { loggedinaddress } = await getcurrentaddress()

    if (loggedinaddress == "") {
        showmodal("loginmodal");
    } else {
        canceloffer2(listingid);
    }
}

async function canceloffer2(listingid) {
    document.getElementById("modalheading").innerHTML = "CANCEL OFFER";
    document.getElementById("modalsubheading").innerHTML = "Confirm cancellation";

    let listdetails = JSON.parse(document.getElementById(listingid).getAttribute("listingdetails"));

    let { ispikslwallet, loggedinaddress } = await getcurrentaddress();

    if (ispikslwallet) {
        cancelofferpiksl(listdetails);

    } else {
        buysellmodal.style.display = "block";
        showmodal("cancellisting");
        document.getElementById("cancellistingconfirmbutton").addEventListener("click", async function() {
            canceloffermetamask(listdetails);
        });
    }
}

async function cancelofferpiksl(listdetails) {
    let sign = listdetails.offersign;
    let token = window.localStorage.getItem('token');
    parsedtoken = await parseJwt(token);
    let password = parsedtoken.password;
    let loggedinaddress = parsedtoken.ethaddress;

    buysellmodal.style.display = "block";
    showmodal("loadingmodal");
    document.getElementById("emptytransaction").style.display = "block";
    document.getElementById("emptyp").innerHTML = "Canceling an offer requires a transaction to make sure it will never be fulfillable. Confirm to process your cancellation."

    const result4 = await fetch(apiurl + '/marketplace/estimategascanceloffer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ethaddress: loggedinaddress,
            password: password,
            sign: sign
        })
    }).then((res) => res.json())
    console.log(result4.data)

    let cancelgaslimit = result4.data;
    let cancelgasprice = await getcurrentgasprice();
    let cancelgascost = cancelgaslimit * (cancelgasprice / 10e8);
    document.getElementById("emptygaspriceineth").innerHTML = parseFloat(parseFloat(cancelgascost).toFixed(3));
    document.getElementById("emptygaspriceineth").setAttribute("class", "icon ethicon")
    document.getElementById("emptygaspriceinusd").innerHTML = "(" + await ethtousd(parseFloat(parseFloat(cancelgascost).toFixed(3))) + ")";
    showmodal("emptymodal");

    document.getElementById("emptyconfirmbutton").addEventListener("click", async function() {
        showmodal("loadingmodal");
        const result5 = await fetch(apiurl + '/marketplace/cancelofferpiksl', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ethaddress: loggedinaddress,
                password: password,
                sign: sign
            })
        }).then((res) => res.json())
        console.log(result5.data)

        if (result5.status == "ok") {
            const result6 = await fetch(apiurl + '/marketplace/canceloffer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    tokenid: tokenid,
                    sign: sign
                })
            }).then((res) => res.json())
            console.log(result6.data)

            listingdone(result6.data, "null", "null", "cancellation");
        }
    });

}

async function canceloffermetamask(listdetails) {
    showmodal("requestsignature");

    var web3 = new Web3(Web3.givenProvider);

    let sign = listdetails.offersign;
    console.log(sign);
    let result2;
    try {
        window.contract = await new web3.eth.Contract(marketplace_abi, marketplaceaddress);
        result2 = await window.contract.methods.updateinvalidsign(sign).send({ from: loggedinaddress })
        console.log(result2);
    } catch (error) {
        result2 = "error"
    }

    let token = window.localStorage.getItem('token');

    const result4 = await fetch(apiurl + '/marketplace/canceloffer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            tokenid: tokenid,
            sign: sign
        })
    }).then((res) => res.json())
    console.log(result4.data)

    listingdone(result4.data, "null", "null", "cancellation");

}