async function login(username, password) {
    const result = await fetch(apiurl + '/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    }).then((res) => res.json());

    return result;
}

function getcurrentaddress() {
    if (localStorage.getItem('token')) {
        token = localStorage.getItem('token')
        parsedtoken = parseJwt(token);
        let ispikslwallet = parsedtoken.pikslwallet;
        let loggedinaddress = parsedtoken.ethaddress;
        return { ispikslwallet, loggedinaddress }
    } else {
        let ispikslwallet = "";
        let loggedinaddress = "";
        return { ispikslwallet, loggedinaddress }
    }
}


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


function shortenaddress(xstr1) {
    let xstr = xstr1.toUpperCase();
    //const myArr = xstr.toString().substring(0, 2);
    const myArrlast = xstr.toString().substring(38, 42);
    const final = "0x" + myArrlast
    return final
}


function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}