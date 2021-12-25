let pageaddress;

window.addEventListener('load', async function() {
    loading();
    pageaddress = await findpageaddress();
    console.log(pageaddress)
    dashboard();
    totalsupply = await gettotalsupply();

    if ((totalsupply != 10000)) {

    } else {
        showmytokens();
    }

    //graphBalance(pageaddress);
    document.getElementById("walletaddress").innerHTML = await shortenaddress(pageaddress);
    document.getElementById("walletaddress").name = pageaddress;
    let p2 = document.createElement("p")
    p2.innerHTML = "No activity";
    p2.style.color = "#808080";
    let center2 = document.createElement("center")
    center2.appendChild(p2);
    document.getElementById("highestbuy").innerHTML = "";
    document.getElementById("highestsell").innerHTML = "";
    document.getElementById("highestbuy").style.display = "block";
    document.getElementById("highestsell").style.display = "block";
    document.getElementById("highestbuy").appendChild(center2.cloneNode(true));
    document.getElementById("highestsell").appendChild(center2.cloneNode(true));

    if (localStorage.getItem("token")) {
        let {
            loggedinaddress
        } = await getcurrentaddress();

        if (loggedinaddress == pageaddress) {
            document.getElementById("walletbuttons").style.display = "flex";
        }
    }

});

async function dashboard() {
    console.log("dashboard");

    // let balance = await getbalance(loggedinaddress)
    // console.log(balance)
    let rand = Math.floor(Math.random() * 10000);
    document.getElementById("pfp").setAttribute("src", "/3.images/back/blankperson.png")

    // let promises = []
    // promises.push(getuserdetails(pageaddress));
    // promises.push(getmainname(pageaddress));

    let user1 = Promise.resolve(getuserdetails(pageaddress));

    user1.then(async function(user) {
        console.log(user);

        let mainname = await getmainname(user);
        console.log(mainname)

        document.getElementById("dashboardname").innerHTML = mainname;
        if (user.username != "") {
            document.getElementById("dashboardusername").innerHTML = user.username + " | ";
        } else {
            document.getElementById("dashboardusername").innerHTML = user.username;
        }
        if (user.ensname != "") {
            document.getElementById("dashboardaddress").innerHTML = user.ensname;
        } else {
            document.getElementById("dashboardaddress").innerHTML = await shortenaddress(pageaddress);
        }
        if (user.pikslwallet == true) {
            document.getElementById("typeofwallet").innerHTML = "Piksl Wallet"
        }
    });


    // document.getElementById("walletbalance").innerHTML = balance;

    populatedetails(pageaddress);
}

async function populatepiechart(tokens) {
    google.charts.load('current', {
        'packages': ['corechart']
    });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'TokenIDs');
        data.addColumn('number', 'Qty');
        console.log(tokens)
        for (let i = 0; i < tokens.length; i++) {
            data.addRow(["#" + tokens[i], 1]);
        }

        var options = {
            backgroundColor: 'transparent',
            fontName: 'Google Sans',
            legend: {
                alignment: 'center',
                textStyle: {
                    color: '#818181'
                },
                scrollArrows: {
                    inactiveColor: "#414141",
                    activeColor: "#818181"
                },
                pagingTextStyle: {
                    color: "#818181"
                }
            },
            width: '100%',
            pieHole: 0.5,
            pieSliceText: 'none',
            pieSliceBorderColor: "#ffffff",
            slices: {
                0: {
                    color: '#818181'
                },
                1: {
                    color: '#ce1b69'
                }
            },
            pieStartAngle: 100,
            pieSliceTextStyle: {
                color: 'black',
            },
            tooltip: {
                textStyle: {
                    color: 'white',
                    showColorCode: true,
                    bold: true
                },
                isHtml: true
            }
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));

        chart.draw(data, options);
    }

    /* let chartw = document.getElementById("piechart").clientWidth;
    let charth = document.getElementById("piechart").clientHeight;
    document.getElementById("centerlabel").style.left = parseFloat(chartw / 2.65) + "px"
    console.log(chartw, charth) */

}

async function findpageaddress() {

    let pageaddress;
    url = window.location.href;
    urladdress = url.substring(url.indexOf("=") + 1);
    if (urladdress.substring(0, 2) == "0x") {
        pageaddress = urladdress;
    } else {
        token = localStorage.getItem('token')
        parsedtoken = await parseJwt(token);
        pageaddress = parsedtoken.ethaddress;
    }
    return pageaddress;
}

async function getmainname(user) {
    if (user.name) {
        data = user.name;
    } else {
        if (user.username) {
            data = "@" + user.username;
        } else {
            if (user.ensname) {
                data = user.ensname;
            } else {
                data = await shortenaddress(user.ethaddress);
            }
        }
    }
    return data;
}


async function showmytokens() {
    const result = await fetch(apiurl + '/tokens/getmytokens', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ethaddress: pageaddress
        })
    }).then((res) => res.json())

    let tokensarray = result.data;

    console.log(tokensarray)

    document.getElementById("ownednfts").innerHTML = "";
    let rowno = 1;
    let loopno = 0;
    let divrow = document.createElement("div");
    divrow.setAttribute("style", "display:flex;");
    divrow.setAttribute("id", "row1");
    divrow.setAttribute("class", "row1 vertcenter");
    document.getElementById("ownednfts").appendChild(divrow.cloneNode(true));


    for (let i = 0; i < tokensarray.length; i++) {


        let divouter = await makecard(tokensarray, i);

        if (loopno % 5 == 0) {
            rowno = rowno + 1;
            let divrow2 = document.createElement("div");
            divrow2.setAttribute("style", "display:flex;");
            divrow2.setAttribute("id", "row" + String(rowno));
            divrow2.setAttribute("class", "vertcenter row" + String(rowno));

            document.getElementById("ownednfts").appendChild(divrow2.cloneNode(true));
        }
        if (rowno == 4) {
            break;
        } else {
            let a = document.getElementById("row" + String(rowno)).appendChild(divouter.cloneNode(true));;
            loopno++;
        }

    }
    if (tokensarray.length == 0) {
        console.log("yo")
        let center = document.createElement("center");
        let p = document.createElement("p");
        p.setAttribute("style", "color:#808080");
        p.innerHTML = "This wallet seems empty."
        center.appendChild(p)
        document.getElementById("ownednfts").appendChild(center);

        let p2 = document.createElement("p")
        p2.innerHTML = "No activity";
        p2.style.color = "#808080";
        let center2 = document.createElement("center")
        center2.appendChild(p2);
        document.getElementById("highestbuy").innerHTML = "";
        document.getElementById("highestsell").innerHTML = "";
        document.getElementById("highestbuy").style.display = "block";
        document.getElementById("highestsell").style.display = "block";
        document.getElementById("highestbuy").appendChild(center2.cloneNode(true));
        document.getElementById("highestsell").appendChild(center2.cloneNode(true));
    } else {
        populatepiechart(tokensarray);
    }
    if (tokensarray.length > 10) {
        document.getElementById("morenfts").innerHTML = "+" + (tokensarray.length - 10) + " more";
    } else {
        document.getElementById("morenfts").innerHTML = "";
    }

    document.getElementById("totaltokens").innerHTML = "Total Tokens : x" + tokensarray.length;
    let totaleval = tokensarray.length * await getfloorprice();
    document.getElementById("totaleval").innerHTML = getethfixed(totaleval);
    document.getElementById("totalevalinusd").innerHTML = await ethtousd(totaleval);


}

async function makecard(tokensarray, i) {
    let divw = document.getElementById("ownednfts").clientWidth;

    let divouter = document.createElement("div");
    divouter.setAttribute("class", "divouter")
    divouter.setAttribute("style", `width:${divw / 5}px; padding:1%`);
    let alink = document.createElement("a");
    alink.setAttribute("href", "/dripclub/tokenid=" + String(tokensarray[i]));
    let img = document.createElement("img");
    img.setAttribute("src", apiurl + "/dripclub/tokens/images/" + String(tokensarray[i]) + ".png");
    img.setAttribute("style", `width:100%; border-radius: 50%; margin-top:2.5%`);

    alink.appendChild(img);
    divouter.appendChild(alink);
    return divouter;
}

async function populatedetails(pageaddress) {

    console.log("details");
    let promises = []
        //Total Balance
    let totalbalineth = Promise.resolve(gethtml("https://etherscan.io/tokenholdings?a=" + pageaddress, 2))
        .then(async function(value) {
            let totalbal = value;
            console.log(totalbal);
            let a1;
            let b1;

            a1 = totalbal.getElementById("HoldingsETH").innerHTML;
            b1 = totalbal.getElementById("HoldingsUSD").innerHTML;
            // } catch (e) {
            //     a1 = 0;
            //     b1 = 0;
            // }
            let totalbalineth = await parseIntoFloat(a1);
            let totalbalinusd = await parseIntoFloat(b1);
            console.log(totalbalineth, totalbalinusd);
            document.getElementById("totalbalineth").innerHTML = await addcommas(await getethfixed(totalbalineth));
            document.getElementById("totalbalinusd").innerHTML = "($" + await addcommas(totalbalinusd) + ")";
            document.getElementById("balancemainloading").style.display = "none";
            document.getElementById("balancemain").style.display = "block";
            return totalbalineth
        });

    let ethbal = Promise.resolve(getbalance(pageaddress))
        .then(async function(value) {
            let ethbal = value;
            document.getElementById("ethbal").innerHTML = await addcommas(await getethfixed(ethbal));
            document.getElementById("ethbalinusd").innerHTML = "(" + await ethtousd(ethbal) + ")";
            return ethbal;
        });

    let wethbal = Promise.resolve(getwethbalance(pageaddress))
        .then(async function(value) {
            let wethbal = value;
            document.getElementById("wethbal").innerHTML = await addcommas(await getethfixed(wethbal));
            document.getElementById("wethbalinusd").innerHTML = "(" + await ethtousd(wethbal) + ")";
            return wethbal;
        });

    let usdtbal = Promise.resolve(gethtml("https://etherscan.io/token/0xdac17f958d2ee523a2206206994597c13d831ec7?a=" + pageaddress, 1))
        .then(async function(value) {
            let usdtbalc = value;
            let usdtbalhtml;
            let usdtbala;
            let usdtbal;
            try {
                usdtbalhtml = usdtbalc.getElementById("ContentPlaceHolder1_divFilteredHolderBalance").innerHTML;
                usdtbala = usdtbalhtml.substring(usdtbalhtml.lastIndexOf('>') + 1);
                usdtbal = await parseIntoFloat(usdtbala.substring(0, usdtbala.lastIndexOf('USDT')));
            } catch (e) {
                usdtbalhtml = 0;
                usdtbala = 0;
                usdtbal = 0;
            }

            console.log(usdtbal)
            document.getElementById("usdtbal").innerHTML = await ethtousd(usdtbal);
            document.getElementById("usdtbalinusd").innerHTML = "(" + await ethtousd(usdtbal) + ")";
            return usdtbal;
        });
    endloading();

    let otherbal = Promise.resolve(parseFloat(await ethToFloatUsd(await totalbalineth)) - (parseFloat(await ethToFloatUsd(await ethbal)) + parseFloat(await ethToFloatUsd(await wethbal)) + parseFloat(await usdtbal)))
        .then(async function(value) {
            console.log(totalbalineth, ethbal, wethbal, usdtbal);
            let otherbal = value;
            document.getElementById("otherbal").innerHTML = await addcommas(parseFloat(parseFloat(otherbal).toFixed(2)));
            document.getElementById("otherbalinusd").innerHTML = "(" + await addcommas(parseFloat(parseFloat(otherbal).toFixed(2))) + ")";

        });


    //Highest
    // let abc1 = Promise.resolve(gethtml("https://etherscan.io/address-analytics?m=normal&a=" + pageaddress + "&lg=en&cc=USD#balance", 2));
    // abc1.then(async function(value) {
    //     console.log(value);
    //     let highestbal = value.getElementById("high_bal_eth_value").innerHTML;
    //     console.log(highestbal);
    //     let highestbal1 = await parseIntoFloat(highestbal.substring(0, highestbal.lastIndexOf('ETH')));
    //     console.log(highestbal1);
    //     if (highestbal1 == "-Infinity") {
    //         let bal = 0;
    //         document.getElementById("highestethbal").innerHTML = await addcommas(await getethfixed(bal));
    //         document.getElementById("highestethbalinusd").innerHTML = await ethtousd(bal);
    //     } else {
    //         document.getElementById("highestethbal").innerHTML = await addcommas(await getethfixed(highestbal1));
    //         document.getElementById("highestethbalinusd").innerHTML = await ethtousd(highestbal1);
    //     }
    //     document.getElementById("loadinghigh").style.display = "none";
    //     document.getElementById("highvalues").style.display = "block";

    // })
    // let abc2 = Promise.resolve(gethtml("https://etherscan.io/address-analytics?m=normal&a=" + pageaddress + "&lg=en&cc=USD#txfees", 2));
    // abc2.then(async function(value) {
    //     let totalgasfeescont = await parseHTML(value.getElementById("container_7").innerHTML);
    //     console.log(totalgasfeescont)
    //     let totalgasfeeseth = totalgasfeescont.querySelectorAll(".mb-1")[2].innerHTML;
    //     console.log(totalgasfeeseth);
    //     document.getElementById("totalgasfees").innerHTML = await addcommas(await getethfixed(await parseIntoFloat(totalgasfeeseth.substring(0, totalgasfeeseth.lastIndexOf('Eth')))));
    //     document.getElementById("totalgasfeesinusd").innerHTML = await ethtousd(await parseIntoFloat(totalgasfeeseth.substring(0, totalgasfeeseth.lastIndexOf('Eth'))));
    //     document.getElementById("loadinggas").style.display = "none";
    //     document.getElementById("gasvalues").style.display = "block";
    // })
}

async function getfloorprice() {
    if (!localStorage.getItem("floorprice")) {
        let result = await fetch(apiurl + '/marketplace/getallvalidlistings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        }).then((res) => res.json())

        sortedarray = await sortarraylowtohigh(result.data);
        console.log(getethfixed(sortedarray[0].listprice));
        return getethfixed((sortedarray[0].listprice) / 10e17);
    }

}

async function sortarraylowtohigh(resultjson) {
    resultijson = []
    for (let i = 0; i < resultjson.length; i++) {
        resulti = JSON.parse(resultjson[i].listing)
        resultijson.push(resulti);
    }
    console.log(resultijson);
    let sortedarraydesc = resultijson.slice().sort((a, b) => b.listprice - a.listprice);
    let sortedarray = sortedarraydesc.reverse();
    return sortedarray
}

function copytoclipboard(input) {
    /* Get the text field */
    var copyText = document.getElementById(input).name;
    copy(copyText);
    document.getElementById("myTooltip").innerHTML = "Copied!";

    function copy(input) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(input);
        } else if (window.clipboardData) {
            window.clipboardData.setData("Text", input);
        }
    }
}


async function changecopytextback() {
    document.getElementById("myTooltip").innerHTML = "Copy to clipboard";
}