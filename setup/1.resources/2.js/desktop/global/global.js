window.addEventListener('load', async function() {

    loading();
    profile();
});


async function checkifonsale(tokenid) {
    const result = await fetch(apiurl + '/tokens/checkifonsale', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            tokenid: tokenid
        })
    }).then((res) => res.json())

    return result.data;
}

function roundnumber(num) {
    return Math.round((parseFloat(num) + Number.EPSILON) * 1000) / 1000
}

async function gettotalsupply() {
    const result5 = await fetch(apiurl + '/marketplace/totalsupply', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    }).then((res) => res.json())
    console.log(result5.data)
    return result5.data
}

if (window.innerWidth < 960) {
    // document.getElementById("desktopheader").style.display = "none";
} else {
    //alert('More than 960');
}

async function changelogocolor() {
    document.getElementById("logo").style.cursor = "pointer";
    document.getElementById("logosvg").style.fill = "#D09E53";
}

async function changelogocolorback() {
    document.getElementById("logosvg").style.fill = "white";
}