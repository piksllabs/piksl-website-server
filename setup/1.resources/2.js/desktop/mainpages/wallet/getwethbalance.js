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