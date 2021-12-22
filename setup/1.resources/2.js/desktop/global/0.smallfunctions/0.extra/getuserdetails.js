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