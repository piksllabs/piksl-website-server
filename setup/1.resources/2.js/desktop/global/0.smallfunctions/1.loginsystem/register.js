async function register(name, email, password) {
    const result = await fetch(apiurl + '/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            email,
            password
        })
    }).then((res) => res.json())

    return result;
}