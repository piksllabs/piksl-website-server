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