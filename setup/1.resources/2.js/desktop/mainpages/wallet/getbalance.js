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