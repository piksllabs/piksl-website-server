async function gaspriceestimation(listingid) {
    console.log(listingid);
    let listdetails = JSON.parse(document.getElementById(listingid).getAttribute("listingdetails"));
    console.log(listdetails);
    let ownerethaddress = listdetails.ownerethaddress;
    let listprice = String(listdetails.listprice);
    let expirationtimestamp = listdetails.expirationtimestamp;
    let sign = listdetails.listsignature;
    let token = localStorage.getItem("token");
    token = parseJwt(token);
    let password = token.password;


    showmodal("loadingmodal");
    document.getElementById("gasestimationethprice").innerHTML = document.getElementById("currentprice").innerHTML;
    document.getElementById("gasestimationusdprice").innerHTML = document.getElementById("currentpriceinusd").innerHTML;
    document.getElementById("modalsubheading").innerHTML = "Transaction Details";
    await estimategas(ownerethaddress, listprice, expirationtimestamp, sign, password);
    showmodal("gaspriceestimation");
}

async function estimategas(ownerethaddress, listprice, expirationtimestamp, sign, password) {
    let { ispikslwallet, loggedinaddress } = await getcurrentaddress();
    console.log(ownerethaddress, listprice, expirationtimestamp, sign, password, loggedinaddress)
    const result = await fetch(apiurl + '/wallet/estimategastransfertoken', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            tokenid: tokenid,
            ethaddress: loggedinaddress,
            password: password,
            ownerethaddress: ownerethaddress,
            listprice: listprice,
            expirationtimestamp: expirationtimestamp,
            sign: sign
        })
    }).then((res) => res.json())

    let gaslimit = result.data
    let gasprice = (await getgasprice()) / 10e8;
    let totalgasprice = (parseInt(gaslimit) * parseFloat(gasprice)).toFixed(3);
    document.getElementById("gaspriceineth").innerHTML = totalgasprice;
    document.getElementById("gaspriceineth").setAttribute("class", "icon ethicon")
    document.getElementById("gaspriceinusd").innerHTML = "(" + await ethtousd(totalgasprice) + ")";

    let currentprice = document.getElementById("currentprice").innerHTML;
    currentprice = currentprice.substring(0, currentprice.length - 1);
    let totalpriceineth = parseFloat(currentprice) + parseFloat(totalgasprice);
    document.getElementById("totalpriceineth").innerHTML = (totalpriceineth).toFixed(3);
    document.getElementById("totalpriceineth").setAttribute("class", "icon ethicon")
    document.getElementById("totalpriceinusd").innerHTML = "(" + await ethtousd(totalpriceineth) + ")";



}

async function getgasprice() {
    let result = await (await fetch("https://www.etherchain.org/api/gasPriceOracle")).json();
    let currentbasefee = result.currentBaseFee;
    let recommendedbasefee = result.recommendedBaseFee;
    let a = currentbasefee;
    let b = currentbasefee + ((recommendedbasefee - currentbasefee) / 2)
    let c = recommendedbasefee
    let lowbasefee = (a + b) / 2;
    let avrbasefee = b;
    let highbasefee = (b + c) / 2;
    console.log(lowbasefee, avrbasefee, highbasefee)
    return lowbasefee;
}