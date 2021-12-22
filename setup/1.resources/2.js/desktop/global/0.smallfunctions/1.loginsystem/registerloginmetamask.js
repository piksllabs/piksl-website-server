async function registerloginmetamask(ethaddress) {
    const result2 = await fetch(apiurl + '/users/registerloginmetamask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ethaddress
        })
    }).then((res) => res.json())
    return result2;
}