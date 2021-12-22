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