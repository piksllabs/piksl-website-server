function formatinusd(price) {
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    return formatter.format(price)
}

async function getethprice() {
    const result = await fetch("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD");
    const json = await result.json();
    ethprice = json.USD;
    return ethprice
}

async function ethtousd(value) {
    const result = await fetch("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD");
    const json = await result.json();
    ethprice = json.USD;
    usdprice = parseFloat(parseFloat(ethprice * value).toFixed(2));
    return formatinusd(usdprice);
}

async function usdtoeth(value) {
    const result = await fetch("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD");
    const json = await result.json();
    ethprice = json.USD;
    ethval = parseFloat(parseFloat(value / ethprice).toFixed(2));
    return ethval;
}

async function ethToFloatUsd(value) {
    const result = await fetch("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD");
    const json = await result.json();
    ethprice = json.USD;
    usdprice = parseFloat(parseFloat(ethprice * value).toFixed(2));
    return usdprice;
}


function getethfixed(eth) {
    let fixed;
    if (parseFloat(eth) >= 1) {
        fixed = parseFloat(parseFloat(eth).toFixed(2))
    } else {
        fixed = parseFloat(parseFloat(eth).toFixed(3))
    }
    return fixed
}


async function parseIntoFloat(string) {
    var str = string;
    str = str.replace(/,/g, "");
    str = str.replace("$", "")
    return parseFloat(str, 10);
}

function addcommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

async function inusd(input) {
    ethprice = await getethprice();
    let val = document.getElementById(input).value;
    let cal = val * ethprice
    if (cal > 0) {
        document.getElementById(input + "inusd").innerHTML = `(${formatinusd(cal)})`;
    }
}
/* When the user clicks on the button, 
 toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}


window.addEventListener('load', function() {
    // Get the modal
    var loginmodal = document.getElementById("loginmodal");

    // Get the button that opens the modal
    var loginbtn = document.getElementById("loginbtn");

    // Get the <span> element that loginclosebtns the modal
    var loginspan = document.getElementById("loginclosebtn");

    // When the user clicks on the button, open the modal
    loginbtn.onclick = function() {
        loginmodal.style.display = "block";
    }

    // When the user clicks on <span> (x), loginclosebtn the modal
    loginspan.onclick = function() {
        loginmodal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, loginclosebtn it
    window.onclick = function(event) {
        if (event.target == loginmodal) {
            loginmodal.style.display = "none";
        }

        var buysellmodal = document.getElementById("buysellmodal");
        if (buysellmodal) {
            if (event.target == buysellmodal) {
                buysellmodal.style.display = "none";
            }
        }
    }
});

window.addEventListener('load', function() {
    // Get the modal
    var buysellmodal = document.getElementById("buysellmodal");

    // Get the <span> element that loginclosebtns the modal
    var buysellspan = document.getElementById("buysellclosebtn");

    // When the user clicks on <span> (x), loginclosebtn the modal
    if (buysellspan) {
        buysellspan.onclick = function() {
            buysellmodal.style.display = "none";
        }
    }
});


function sell(abc) {
    checksellconditions(abc);
}


async function gethtml(link, abc) {
    let method;
    if (abc == 1) {
        method = "normal";
    } else if (abc == 2) {
        method = "browser";
    }
    const result5 = await fetch(apiurl + '/extra/gethtml', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            link: link,
            method: method
        })
    }).then((res) => res.json());

    let final = result5.data;
    let html = parseHTML(final);

    return html;
}

function parseHTML(markup) {
    if (markup.toLowerCase().trim().indexOf('<!doctype') === 0) {
        var doc = document.implementation.createHTMLDocument("");
        doc.documentElement.innerHTML = markup;
        return doc;
    } else if ('content' in document.createElement('template')) {
        // Template tag exists!
        var el = document.createElement('template');
        el.innerHTML = markup;
        return el.content;
    } else {
        // Template tag doesn't exist!
        var docfrag = document.createDocumentFragment();
        var el = document.createElement('body');
        el.innerHTML = markup;
        for (i = 0; 0 < el.childNodes.length;) {
            docfrag.appendChild(el.childNodes[i]);
        }
        return docfrag;
    }
}



function loading() {
    if (document.getElementById("loading")) {
        w = window.innerWidth;
        h = window.innerHeight;
        header = document.getElementById("headerbar");
        headerheight = header.offsetHeight;
        console.log(h - headerheight);
        document.getElementById("loading").style.height = (h - headerheight) + "px";
        document.getElementById("loadingimg").style.display = "block";
    } else {}
}

function endloading() {
    try {
        document.getElementById("loading").style.display = "none";
    } catch {}
    try {
        document.getElementById("body").style.display = "block";
    } catch {}
    try {
        document.getElementById("upper").style.display = "block";
    } catch {}
    try {
        document.getElementById("uppermobile").style.display = "block";
    } catch {}


}



async function getusernamebyaddress(ethaddress) {
    const result5 = await fetch(apiurl + '/users/getusernamebyaddress', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ethaddress: ethaddress
        })
    }).then((res) => res.json());
    return result5.data;
}





async function getuserdetails(ethaddress) {
    const result5 = await fetch(apiurl + '/users/getuserdetails', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ethaddress: ethaddress
        })
    }).then((res) => res.json());
    return result5.data;
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