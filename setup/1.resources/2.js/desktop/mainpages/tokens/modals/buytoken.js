async function buytoken(listingid) {
    let { loggedinaddress } = await getcurrentaddress()

    if (loggedinaddress == "") {
        showmodal("loginmodal");
    } else {
        buytoken2(listingid);
    }
}

async function buytoken2(listingid) {
    buysellmodal.style.display = "block";
    showmodal("buy");

    let listdetails = JSON.parse(document.getElementById(listingid).getAttribute("listingdetails"));
    let listprice = listdetails.listprice / 10e17;



    document.getElementById("modalheading").innerHTML = "BUY";
    document.getElementById("modalsubheading").innerHTML = "Checkout summary";

    document.getElementById("checkoutimg").setAttribute("src", document.getElementById("tokenimg").src);
    document.getElementById("checkoutsmallprice").innerHTML = parseFloat(parseFloat(listprice).toFixed(3));
    document.getElementById("checkoutprice").innerHTML = parseFloat(parseFloat(listprice).toFixed(3));
    document.getElementById("checkoutsmallusdprice").innerHTML = "(" + await ethtousd(parseFloat(parseFloat(listprice).toFixed(3))) + ")";
    document.getElementById("checkoutusdprice").innerHTML = "(" + await ethtousd(parseFloat(parseFloat(listprice).toFixed(3))) + ")";
    document.getElementById("buytokenid").innerHTML = "#" + tokenid;

    document.getElementById("continuebuybutton").addEventListener("click", async function() {
        continuebuy(listingid);
    });
}

async function continuebuy(listingid) {
    let tokenid = gettokenid();
    let { ispikslwallet, loggedinaddress } = getcurrentaddress();
    let listdetails = JSON.parse(document.getElementById(listingid).getAttribute("listingdetails"));
    console.log(listdetails);
    let ownerethaddress = listdetails.ownerethaddress;
    let listprice = String(listdetails.listprice);
    let expirationtimestamp = listdetails.expirationtimestamp;
    let sign = listdetails.listsignature;

    if (!ispikslwallet) {
        showmodal("requestsignature");

        var web3 = new Web3(Web3.givenProvider);

        window.contract = await new web3.eth.Contract(marketplace_abi, marketplaceaddress);
        let buyresult;

        try {
            buyresult = await window.contract.methods.piksltransfer(ownerethaddress, loggedinaddress, tokenid, listprice, expirationtimestamp, sign).send({ from: loggedinaddress, value: listprice });

            let listprice2 = parseFloat(listprice) / 10e17;
            listingdone(buyresult, listprice2, "", "purchase");
        } catch (e) {
            showmodal("metamaskdecline")
        }
    } else {
        gaspriceestimation(listingid);


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
                const result = await fetch(apiurl + '/marketplace/buy', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        tokenid: tokenid,
                        ethaddress: loggedinaddress,
                        jwttoken: token,
                        password: password,
                        ownerethaddress: ownerethaddress,
                        listprice: listprice,
                        expirationtimestamp: expirationtimestamp,
                        sign: sign
                    })
                }).then((res) => res.json())

                console.log(result.data);
                listprice2 = listprice / 10e17;
                listingdone(result.data, listprice2, "", "purchase");
            }

        });



    }

}