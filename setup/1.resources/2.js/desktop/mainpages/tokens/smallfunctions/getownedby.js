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