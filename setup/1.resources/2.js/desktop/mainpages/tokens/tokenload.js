let tokenid;
let loggedinaddress;
let ethaddress;
window.addEventListener('load', async function() {
    url = window.location.href;
    tokenid = url.substring(url.indexOf("=") + 1);

    loggedinaddress = (await getcurrentaddress()).loggedinaddress;

    totalsupply = await gettotalsupply();

    if (totalsupply != 10000) {
        properties();
        endloading();
        document.getElementById("nolistingsp").style.display = "block";
        document.getElementById("listingstable").style.display = "none";
        document.getElementById("listingsdiv").style.display = "none";
        document.getElementById("offersloading").style.display = "none";
        document.getElementById("nooffersp").style.display = "block";
        document.getElementById("offerstable").style.display = "none";
        document.getElementById("offersdiv").style.display = "none";
        document.getElementById("transactionsloading").style.display = "none";
        document.getElementById("transactionstable").style.display = "none";
        let p = document.createElement("p");
        p.innerHTML = "This item has not been minted yet."
        p.style.color = "#808080";
        document.getElementById("transactionhistory").appendChild(p);
        document.getElementById("detailstokenid").innerHTML = "#" + tokenid;
        document.getElementById("ownedbyaddress").innerHTML = "None"
        document.getElementById("makeoffersolo").setAttribute('onclick', 'shownotactivemodal()')
    } else {
        properties();
        populatealllistings();
        transactionhistory()
        populatealloffers();
    }

});

async function shownotactivemodal() {
    totalsupply = await gettotalsupply();

    if (totalsupply != 10000) {
        buysellmodal.style.display = "block";
        document.getElementById("notactive").style.display = "block";
        document.getElementById("modalheading").innerHTML = "NOT ACTIVE"
        document.getElementById("modalsubheading").innerHTML = "Marketplace not active"

    }
}
async function closemodal() {
    buysellmodal.style.display = "none";
}



async function properties() {
    const result = await fetch(apiurl + '/dripclub/metadata/tokenid=' + tokenid, {
        method: 'GET'
    }).then((res) => res.json())

    let obj = result;
    let attributes = obj["attributes"]
    let attrilen = Object.keys(attributes).length
    let counter = 0;

    document.getElementById("tokenidhead").innerHTML = "#" + tokenid;
    document.getElementById("tokenimg").setAttribute("src", apiurl + "/dripclub/tokens/images/" + String(tokenid) + ".png");


    let container = document.createElement("div");
    container.setAttribute("style", "display:flex;");
    container.setAttribute("id", "container" + String(counter));
    document.getElementById("propertiesdiv").appendChild(container);

    for (let i = 0; i < attrilen; i++) {
        let type = attributes[i].trait_type;
        let value = attributes[i].value;
        let div = document.createElement("div");
        div.setAttribute("class", "propdiv pointer smalldivs");
        div.setAttribute("id", "propdiv" + String(i));
        div.setAttribute("onmouseover", "chngdiv('" + String(i) + "')");
        div.setAttribute("onmouseout", "chngdivbck('" + String(i) + "')");
        let center = document.createElement("center");
        let typep = document.createElement("p");
        typep.innerHTML = type.toUpperCase();
        typep.setAttribute("class", "proptype")
        typep.setAttribute("id", "proptype" + String(i))
        let valuep = document.createElement("p");
        valuep.setAttribute("id", "proptext" + String(i));
        valuep.innerHTML = value;
        valuep.setAttribute("style", "font-size:80%;")

        center.appendChild(typep);
        center.appendChild(valuep);
        div.appendChild(center);

        if (i % 3 == 0) {
            counter = counter + 1;
            let container2 = document.createElement("div");
            container2.setAttribute("style", "display:flex;");
            container2.setAttribute("id", "container" + String(counter));
            document.getElementById("propertiesdiv").appendChild(container2);
        }
        document.getElementById("container" + String(counter)).appendChild(div);
    }
}

function chngdiv(abc) {
    document.getElementById('propdiv' + abc).style.backgroundColor = "#b48948";
    document.getElementById('proptype' + abc).style.color = "#111111";
    document.getElementById('proptext' + abc).style.color = "#111111";

}

function chngdivbck(abc) {
    document.getElementById('propdiv' + abc).style.backgroundColor = "#2c2c2c";
    document.getElementById('proptype' + abc).style.color = "#808080";
    document.getElementById('proptext' + abc).style.color = "#ffffff";
}




async function salepreload(ethaddress) {
    let username = await getusernamebyaddress(ethaddress);
    if (username == "") {
        owner = shortenaddress(ethaddress);
        document.getElementById("ownedbyaddress").innerHTML = owner;
        document.getElementById("ownedbyaddress").name = ethaddress;
    } else {
        document.getElementById("ownedbyaddress").innerHTML = username;
        document.getElementById("ownedbyaddress").name = ethaddress;
    }

    let a = document.createElement("a");
    a.innerHTML = await shortenaddress(contract);
    a.setAttribute("class", "bluelink");
    a.setAttribute("style", "float:right");
    a.setAttribute("href", etherscanurl + "/address/" + contract)
    a.setAttribute("target", "_blank");
    document.getElementById("detailscontractaddress").innerHTML = ""
    document.getElementById("detailscontractaddress").appendChild(a);
    document.getElementById("detailstokenid").innerHTML = "#" + tokenid;
}

async function populatealloffers() {
    const result = await fetch(apiurl + '/marketplace/getalloffers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            tokenid: tokenid
        })
    }).then((res) => res.json())

    const resultjson = result.data
    console.log(resultjson)

    if (result.status == "ok") {
        let sortedarray = await sortarrayhightolow(resultjson);

        let usernames1 = []
        for (let i = 0; i < resultjson.length; i++) {
            resulti = sortedarray[i];
            usernames1.push(getusernamebyaddress(resulti.offerethaddress));
        }
        let usernames = await Promise.all(usernames1);
        console.log(usernames);

        for (let i = 0; i < sortedarray.length; i++) {
            resulti = sortedarray[i];

            let tr1 = document.createElement("tr");
            tr1.setAttribute("id", "tr1" + i)
            let td1 = document.createElement("td");
            let td2 = document.createElement("td");
            let td3 = document.createElement("td");
            let td4 = document.createElement("td");
            let a1 = document.createElement("a");

            if (loggedinaddress.toUpperCase() == (resulti.offerethaddress).toUpperCase()) {
                a1.innerHTML = "you";
            } else {
                let username = await usernames[i];
                if (username != "error") {
                    a1.innerHTML = username;
                } else {
                    a1.innerHTML = await usernames[i];
                }
            }

            a1.setAttribute("class", "bluelink")
            td1.innerHTML = (parseFloat(resulti.offeramount) / 10e17);
            td1.setAttribute("class", "icon wethicon");
            td2.innerHTML = await ethtousd(parseFloat(resulti.offeramount) / 10e17);
            td2.style.color = "#808080";
            td3.innerHTML = await gettimeremaining((resulti.offerexpirationtimestamp));
            td3.style.color = "#808080";
            td4.appendChild(a1);
            tr1.appendChild(td1);
            tr1.appendChild(td2);
            tr1.appendChild(td3);
            tr1.appendChild(td4);

            let offeraddress = resulti.offerethaddress;
            let owneraddress = document.getElementById("ownedbyaddress").name;

            if (localStorage.getItem("token")) {
                if (offeraddress.toUpperCase() == loggedinaddress.toUpperCase()) {
                    let td5 = document.createElement("td");
                    let cancelbutton = document.createElement("button");
                    cancelbutton.setAttribute("class", "graybuttonhollow");
                    cancelbutton.setAttribute("style", "font-size: 80%; padding:7px");
                    cancelbutton.setAttribute("listingdetails", JSON.stringify(resulti));
                    cancelbutton.setAttribute("id", "cancelid" + i);
                    cancelbutton.setAttribute("onclick", "canceloffer('cancelid" + i + "')");
                    cancelbutton.innerHTML = "Cancel"
                    td5.appendChild(cancelbutton);
                    tr1.appendChild(td5);
                } else if (loggedinaddress.toUpperCase() == owneraddress.toUpperCase()) {
                    let td5 = document.createElement("td");
                    let buybutton = document.createElement("button");
                    buybutton.setAttribute("class", "bluebuttonhollow");
                    buybutton.setAttribute("style", "font-size: 80%; padding:7px");
                    buybutton.setAttribute("listingdetails", JSON.stringify(resulti));
                    buybutton.setAttribute("id", "offerid" + i);
                    buybutton.setAttribute("onclick", "acceptoffer('offerid" + i + "')");
                    buybutton.innerHTML = "Accept";
                    td5.appendChild(buybutton);
                    tr1.appendChild(td5);
                } else {

                }
            }

            document.getElementById("offerstable").appendChild(tr1);

        }
        let heightdiv = document.getElementById("tr10").offsetHeight;
        if (resultjson.length > 4) {
            document.getElementById("offersdiv").style.height = (heightdiv * 6) + "px";
            document.getElementById("offersdiv").style.overflowY = "scroll"
        }
        document.getElementById("offersloading").style.display = "none";
    } else {
        document.getElementById("offersloading").style.display = "none";
        document.getElementById("nooffersp").style.display = "block";
        document.getElementById("offerstable").style.display = "none";
        document.getElementById("offersdiv").style.display = "none";
    }
}

async function sortarrayhightolow(resultjson) {
    resultijson = []
    for (let i = 0; i < resultjson.length; i++) {
        resulti = JSON.parse(resultjson[i])
        resultijson.push(resulti);
    }
    console.log(resultijson);
    let sortedarray = resultijson.slice().sort((a, b) => b.offeramount - a.offeramount);
    return sortedarray

}

// async function gettimeremaining(timestamp) {
//     // in miliseconds
//     var units = {
//         year: 24 * 60 * 60 * 1000 * 365,
//         month: 24 * 60 * 60 * 1000 * 365 / 12,
//         day: 24 * 60 * 60 * 1000,
//         hour: 60 * 60 * 1000,
//         minute: 60 * 1000,
//         second: 1000
//     }

//     var rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })

//     var getRelativeTime = (d1, d2 = new Date()) => {
//         var elapsed = d1 - d2

//         // "Math.abs" accounts for both "past" & "future" scenarios
//         for (var u in units)
//             if (Math.abs(elapsed) > units[u] || u == 'second')
//                 return rtf.format(Math.round(elapsed / units[u]), u)
//     }

//     return getRelativeTime(+new Date(parseFloat(timestamp) * 1000));
// }

function gettimeremaining(timestamp1) {
    let timestamp = parseFloat(timestamp1) * 1000
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30;
    const msPerYear = msPerDay * 365;

    const current = Date.now();
    const elapsed = current - timestamp;
    const rtf = new Intl.RelativeTimeFormat('en', { numeric: "auto" });

    if (elapsed > 0) {
        if (elapsed < msPerMinute) {
            return rtf.format(-Math.floor(elapsed / 1000), 'seconds');
        } else if (elapsed < msPerHour) {
            return rtf.format(-Math.floor(elapsed / msPerMinute), 'minutes');
        } else if (elapsed < msPerDay) {
            return rtf.format(-Math.floor(elapsed / msPerHour), 'hours');
        } else if (elapsed < msPerMonth) {
            return rtf.format(-Math.floor(elapsed / msPerDay), 'days');
        } else if (elapsed < msPerYear) {
            return rtf.format(-Math.floor(elapsed / msPerMonth), 'months');
        } else {
            return new Date(timestamp).toLocaleDateString('en');
        }
    } else {
        if (-msPerMinute < elapsed) {
            return rtf.format(-Math.floor(elapsed / 1000), 'seconds');
        } else if (-msPerHour < elapsed) {
            return rtf.format(-Math.floor(elapsed / msPerMinute), 'minutes');
        } else if (-msPerDay < elapsed) {
            return rtf.format(-Math.floor(elapsed / msPerHour), 'hours');
        } else if (-msPerMonth < elapsed) {
            return rtf.format(-Math.floor(elapsed / msPerDay), 'days');
        } else if (-msPerYear < elapsed) {
            return rtf.format(-Math.floor(elapsed / msPerMonth), 'months');
        } else {
            return new Date(timestamp).toLocaleDateString('en');
        }
    }
}






async function populatealllistings(ethaddress) {
    const result = await fetch(apiurl + '/marketplace/getalllistings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            tokenid: tokenid
        })
    }).then((res) => res.json())

    let data = result.data;
    ethaddress = data.owner;
    const resultjson = data.listings;
    await salepreload(ethaddress);

    if (result.status == "ok") {
        let sortedarray = await sortarraylowtohigh(resultjson);
        console.log(sortedarray);

        Promise.resolve(maindetails(sortedarray, ethaddress)).then(endloading());

        usernames1 = []
        for (let i = 0; i < resultjson.length; i++) {
            resultj = sortedarray[i];
            usernames1.push(getusernamebyaddress(resultj.ownerethaddress));
        }
        let usernames = await Promise.all(usernames1);

        for (let i = 0; i < resultjson.length; i++) {
            resultj = sortedarray[i];

            let tr1 = document.createElement("tr");
            tr1.setAttribute("id", "listtr1" + i)
            let td1 = document.createElement("td");
            let td2 = document.createElement("td");
            let td3 = document.createElement("td");
            let td4 = document.createElement("td");
            let a1 = document.createElement("a");


            if (loggedinaddress.toUpperCase() == (resultj.ownerethaddress).toUpperCase()) {
                a1.innerHTML = "you";
            } else {
                let username = usernames[i];
                if (username != "error") {
                    a1.innerHTML = username;
                } else {
                    a1.innerHTML = await shortenaddress(resultj.ownerethaddress);
                }
            }
            a1.setAttribute("class", "bluelink")

            //let span = document.createElement("span");
            td1.innerHTML = (resultj.listprice / 10e17);
            td1.setAttribute("class", "icon ethicon");
            td1.setAttribute("id", "listing" + i)
            td1.setAttribute("listingdetails", JSON.stringify(resultj))
                //td1.appendChild(span);

            td2.innerHTML = await ethtousd(resultj.listprice / 10e17);
            td2.style.color = "#808080";
            td3.innerHTML = await gettimeremaining(resultj.expirationtimestamp);
            td3.style.color = "#808080";
            td4.appendChild(a1);
            tr1.appendChild(td1);
            tr1.appendChild(td2);
            tr1.appendChild(td3);
            tr1.appendChild(td4);

            let owneraddress = document.getElementById("ownedbyaddress").name;

            if (localStorage.getItem("token")) {
                let abcd = await getcurrentaddress();
                loggedinaddress = abcd.loggedinaddress;
            } else {
                loggedinaddress = ""
            }
            if (owneraddress.toUpperCase() == loggedinaddress.toUpperCase()) {
                let td5 = document.createElement("td");
                let cancelbutton = document.createElement("button");
                cancelbutton.setAttribute("class", "graybuttonhollow");
                cancelbutton.setAttribute("style", "font-size: 80%; padding:7px");
                cancelbutton.innerHTML = "Cancel"
                cancelbutton.setAttribute("onclick", "cancellisting('listing" + i + "');")
                td5.appendChild(cancelbutton);
                tr1.appendChild(td5);
            } else {
                let td5 = document.createElement("td");
                let buybutton = document.createElement("button");
                buybutton.setAttribute("class", "bluebuttonhollow");
                buybutton.setAttribute("style", "font-size: 80%; padding:7px");
                buybutton.setAttribute("onclick", "buytoken('listing" + i + "');")
                buybutton.innerHTML = "Buy"
                td5.appendChild(buybutton);
                tr1.appendChild(td5);
            }

            document.getElementById("listingstable").appendChild(tr1);

        }
        let heightdiv = document.getElementById("listtr10").offsetHeight;
        if (resultjson.length > 3) {
            document.getElementById("listingsdiv").style.height = (heightdiv * 4) + "px";
            document.getElementById("listingsdiv").style.overflowY = "scroll"
        }
        document.getElementById("listingsdiv").style.display = "none";
    } else {
        if (localStorage.getItem("token")) {
            if (ethaddress.toUpperCase() == loggedinaddress.toUpperCase()) {
                document.getElementById("notownersellbuttons").style.display = "none";
                document.getElementById("ownersellbuttons").style.display = "block";
                document.getElementById("ownedbyaddress").innerHTML = "you";
            } else {
                document.getElementById("notownersellbuttons").style.display = "block";
                document.getElementById("ownersellbuttons").style.display = "none";
            }
        }

        document.getElementById("nolistingsp").style.display = "block";
        document.getElementById("listingstable").style.display = "none";
        document.getElementById("listingsdiv").style.display = "none";
    }
    endloading()
}

async function maindetails(sortedarray, ethaddress) {
    if (sortedarray.length != 0) {
        document.getElementById("currentpriceonsale").style.display = "block";
        document.getElementById("currentpricenotonsale").style.display = "none";
        document.getElementById("currentprice").innerHTML = parseFloat(parseFloat(sortedarray[0].listprice / 10e17).toFixed(3));
        document.getElementById("currentprice").name = parseFloat(parseFloat(sortedarray[0].listprice / 10e17).toFixed(3));
        document.getElementById("currentprice").setAttribute("listingdetails", JSON.stringify(sortedarray[0]))
        document.getElementById("currentpriceinusd").innerHTML = "&nbsp;&nbsp;(" + await ethtousd(parseFloat(parseFloat(sortedarray[0].listprice / 10e17).toFixed(3))) + ")";

    }

    if (localStorage.getItem("token")) {
        if (ethaddress.toUpperCase() == loggedinaddress.toUpperCase()) {
            document.getElementById("notownerbuybuttons").style.display = "none";
            document.getElementById("ownerbuybuttons").style.display = "block";
            document.getElementById("ownedbyaddress").innerHTML = "you";
        } else {
            document.getElementById("notownerbuybuttons").style.display = "block";
            document.getElementById("ownerbuybuttons").style.display = "none";
        }
    }
}

async function sortarraylowtohigh(resultjson) {
    resultijson = []
    for (let i = 0; i < resultjson.length; i++) {
        resulti = JSON.parse(resultjson[i])
        resultijson.push(resulti);
    }
    console.log(resultijson);
    let sortedarraydesc = resultijson.slice().sort((a, b) => b.listprice - a.listprice);
    let sortedarray = sortedarraydesc.reverse();
    return sortedarray
}

async function transactionhistory() {
    const transactionsapi = await fetch(apiurl + '/tokens/gettransferevents', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            tokenid: tokenid
        })
    }).then((res) => res.json())

    const transactions = transactionsapi.data
    console.log(transactions)

    sorted = transactions.reverse();
    console.log(sorted)

    let fromuser = [];
    let touser = [];

    for (let i = 0; i < transactions.length; i++) {
        fromuser.push(getusernamebyaddress(sorted[i].from));
        touser.push(getusernamebyaddress(sorted[i].to));
    }

    let usernames = await Promise.all([
        Promise.all(fromuser),
        Promise.all(touser)
    ]);



    for (let i = 0; i < transactions.length; i++) {

        let tr1 = document.createElement("tr");
        tr1.setAttribute("id", "eventstr1" + i)
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let td4 = document.createElement("td");
        let td5 = document.createElement("td");

        if (sorted[i].from != "0x0000000000000000000000000000000000000000") {
            td1.innerHTML = "Transfer"
            td1.style.color = "#818181"
            td1.setAttribute("class", "icon transfericon")

            if (sorted[i].erc20 == "ETH") {
                td2.innerHTML = parseFloat(parseFloat(parseFloat(sorted[i].price) / 10e17).toFixed(3));
                td2.setAttribute("class", "icon ethicon");
            } else if (sorted[i].erc20 == "UNKNOWN") {
                td2.innerHTML = "";
            } else {
                td2.innerHTML = parseFloat(parseFloat(parseFloat(sorted[i].price) / 10e17).toFixed(3));
                td2.setAttribute("class", "icon wethicon");
            }

        } else {
            td1.innerHTML = "Minted"
            td1.style.color = "#818181"
            td1.setAttribute("class", "icon mintedicon")

            td2.innerHTML = "";
        }

        let afrom = document.createElement("a");
        afrom.setAttribute("class", "bluelink");

        if (loggedinaddress.toUpperCase() == (sorted[i].from).toUpperCase()) {
            afrom.innerHTML = "you";
        } else {
            let username = usernames[0][i];
            if (username != "error") {
                afrom.innerHTML = username;
            } else {
                afrom.innerHTML = usernames[0][i];
            }
        }

        //afrom.innerHTML = await shortenaddress(sorted[i].from);
        td3.appendChild(afrom);

        let ato = document.createElement("a");
        ato.setAttribute("class", "bluelink");


        if (loggedinaddress.toUpperCase() == (sorted[i].to).toUpperCase()) {
            ato.innerHTML = "you";
        } else {
            let username = usernames[1][i];
            if (username != "error") {
                ato.innerHTML = username;
            } else {
                ato.innerHTML = usernames[1][i];
            }
        }
        //ato.innerHTML = await shortenaddress(sorted[i].to);
        td4.appendChild(ato);

        let atimestamp = document.createElement("a");
        atimestamp.setAttribute("class", "bluelink target");
        atimestamp.setAttribute("target", "_blank");
        atimestamp.setAttribute("href", etherscanurl + "/tx/" + sorted[i].transactionHash)
        atimestamp.innerHTML = await gettimeremaining((sorted[i].timestamp));
        td5.appendChild(atimestamp);

        tr1.appendChild(td1);
        tr1.appendChild(td2);
        tr1.appendChild(td3);
        tr1.appendChild(td4);
        tr1.appendChild(td5);

        document.getElementById("transactionstable").appendChild(tr1);
    }
    document.getElementById("transactionsloading").style.display = "none";
}