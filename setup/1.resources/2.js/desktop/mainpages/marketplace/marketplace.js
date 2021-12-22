let total = 1;

let tokensleftarray;
let rarity;

let orglistings;
let listings;
let totalsupply;
window.addEventListener('load', async function() {


    tokensleftarray = await removefromarray((Array.from(Array(10001).keys())), 0);
    orglistings = await getallvalidlistings();
    listings = await sortarraylowtohigh(orglistings);
    localStorage.setItem("listings", JSON.stringify(listings));

    if (totalsupply != 10000) {

    } else {
        await details();
    }

    console.log(listings);
    populate(total, total + 20);
    scroll();
    windowh = window.innerHeight;
    headerheight = document.getElementById("sidebarhead").scrollHeight;
    var hmargin = $('#headerbar').outerHeight(true);
    let h = windowh - (hmargin + headerheight);
    console.log(h);
    document.getElementById("sortsidebar").style.cssText += 'top:' + (hmargin + (25 * hmargin / 100)) + "px";
    if (window.innerWidth < 767) {} else {
        document.getElementById("scrollbar").style.height = (h - ((17.5 * h) / 100)) + "px";
    }
    document.getElementById("loadcolimg").style.marginTop = ((h - ((17.5 * h) / 100)) / 2) + "px";
    categories();


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

async function changecard(input) {
    document.getElementById("pcol" + input).style.color = "#111111";
    document.getElementById("ptitle" + input).style.color = "#111111";
    try {
        document.getElementById("pricep" + input).style.color = "#111111";
    } catch (e) {}

}

async function changecardback(input) {
    document.getElementById("pcol" + input).style.color = "#808080";
    document.getElementById("ptitle" + input).style.color = "#ffffff";
    try {
        document.getElementById("pricep" + input).style.color = "#808080";
    } catch (e) {}

}

async function details() {
    console.log(listings);
    if (listings.length > 0) {
        document.getElementById("floorprice").innerHTML = (await getethfixed(parseFloat(listings[0].listprice) / 10e17));
    }

    html = await gethtml("https://etherscan.io/token/" + contract, 1)
    html2 = html.getElementById("ContentPlaceHolder1_tr_tokenHolders").innerHTML;
    html3 = html2.substring(html2.lastIndexOf('mr-3') + 1);
    html4 = html3.substring(html3.indexOf('>') + 1);
    holders = html4.substring(0, html4.indexOf('</div>'));
    if ((await parseIntoFloat(holders)) != 0) {
        document.getElementById("totalholders").innerHTML = holders;
    }

    html5 = html.getElementById("ContentPlaceHolder1_divSummary").innerHTML;
    html6 = html5.substring(html5.indexOf("hash-tag text-truncate") + 1);
    html7 = html6.substring(0, html6.indexOf("</span>"));
    totalitems = html7.substring(html7.lastIndexOf('>') + 1);
    if ((await parseIntoFloat(totalitems)) != 0) {
        document.getElementById("totalitems").innerHTML = totalitems;
    }
}

async function scroll() {
    window.addEventListener('scroll', async function() {
        let p = document.body.offsetHeight;
        let w = window.innerHeight;
        var s = window.scrollY;
        //console.log("p:" + p, "w" + w, "s:" + s, "t:" + (s + w));
        if (s + w >= ((p) - (10 * p / 100))) {
            populate(total, total + 20);
        }
    });
}

async function getallvalidlistings() {
    let result = await fetch(apiurl + '/marketplace/getallvalidlistings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    }).then((res) => res.json())

    console.log(result.data);
    return result.data
}


async function removefromarray(arr, val) {
    let a = arr;
    let v = val;
    const index = a.indexOf(v);
    if (index > -1) {
        a.splice(index, 1);
    }
    return a;
}

function shuffle(array) {
    let currentIndex = array.length,
        randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]
        ];
    }

    return array;
}



function togglehideshow(abc) {
    let displayval = document.getElementById(abc).style.display
    if (displayval == "block") {
        document.getElementById(abc).style.display = "none";
    } else if (displayval == "none") {
        document.getElementById(abc).style.display = "block";
    }
}

function sortByValue(jsObj) {
    var sortedArray = [];
    for (var i in jsObj) {
        // Push each JSON Object entry in array by [value, key]
        sortedArray.push([jsObj[i], i]);
    }
    return sortedArray.sort();
}




// (function($) {
//     $(window).on("load", function() {
//         $("#scrollbar").mCustomScrollbar();
//     });
// })(jQuery);

// $("#scrollbar").mCustomScrollbar({
//     axis: "y",
//     theme: "light-3",
//     setTop: '-500px'
// });

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

async function loadcollection() {
    document.getElementById("maincollection").style.display = "block";
    document.getElementById("loadcol").style.display = "none";
}

async function loadloading() {
    document.getElementById("maincollection").style.display = "none";
    document.getElementById("loadcol").style.display = "block";
}