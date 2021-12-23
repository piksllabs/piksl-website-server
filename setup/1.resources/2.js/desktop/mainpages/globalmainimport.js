function gettokenid() {
    url = window.location.href;
    tokenid = url.substring(url.indexOf("=") + 1);
    return tokenid;
}

async function getownedby(tokenid) {
    const result = await fetch(apiurl + '/tokens/getownedby', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            tokenid: tokenid
        })
    }).then((res) => res.json())
    console.log(result.data)
    return result.data
}

async function getbalance(ethaddress) {
    const result = await fetch(apiurl + '/wallet/getbalance', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ethaddress
        })
    }).then((res) => res.json())
    console.log(result.data)
    return result.data;
}

async function getwethbalance(loggedinaddress) {
    const result = await fetch(apiurl + '/wallet/getwethbalance', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ethaddress: loggedinaddress
        })
    }).then((res) => res.json())
    return result.data;
}

async function sendether() {
    token = localStorage.getItem('token')
    parsedtoken = await parseJwt(token);
    const fromaddress = parsedtoken.ethaddress;
    const toaddress = document.getElementById("sendaddress").value;
    const valueineth = document.getElementById("sendamount").value;
    const password = document.getElementById("sendpassword").value;
    console.log("sending...")
    const result = await fetch(apiurl + '/wallet/sendether', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            fromaddress: fromaddress,
            toaddress: toaddress,
            valueineth: valueineth,
            password: password
        })
    }).then((res) => res.json())
    console.log(result.data)




}



async function checkpassword(ethaddress, password) {
    const result = await fetch(apiurl + '/users/checkpassword', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            password: password,
            ethaddress: ethaddress
        })
    }).then((res) => res.json())

    console.log(result.status);
    return result.status
}