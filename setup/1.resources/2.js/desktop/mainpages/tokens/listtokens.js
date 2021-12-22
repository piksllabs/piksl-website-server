async function listtokens(tokenid, listprice, password, listtimeinseconds) {
    token = localStorage.getItem('token')
    parsedtoken = parseJwt(token);
    console.log(parsedtoken);
    let ispikslwallet = parsedtoken.pikslwallet;
    let loggedinaddress = parsedtoken.ethaddress;

    let expirationtimestamp = await getexpirationtimestamp(listtimeinseconds);
    console.log("expiration : " + expirationtimestamp)
    let listpriceinwei

    if (listprice == "null") {
        listpriceinwei = "null";
    } else {
        listpriceinwei = parseFloat(listprice) * 10e17;
    }
    console.log(listpriceinwei)
    const msg0 = `tokenid : ${tokenid},fromaddress : ${loggedinaddress},listprice : ${listpriceinwei},expirationtimestamp : ${expirationtimestamp}`
    const msg1 = msg0.split(/\s/).join('');
    const msg = msg1.toLowerCase();

    if (!ispikslwallet) {
        var web3 = new Web3(Web3.givenProvider);

        try {
            console.log(msg)
            const msghash = web3.utils.sha3(web3.utils.toHex(msg), { encoding: "hex" });
            let sign;
            try {
                sign = await web3.eth.personal.sign(msghash, loggedinaddress);
            } catch (e) {
                sign = "error";
            }
            console.log(msg);
            console.log(msghash)
            showmodal("loadingmodal");
            if (sign == "error") {
                return (sign);
            } else {

                let token = window.localStorage.getItem('token');

                const result = await fetch(apiurl + '/marketplace/listmetamask', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        tokenid: tokenid,
                        ethaddress: loggedinaddress,
                        price: listpriceinwei,
                        expirationtimestamp: expirationtimestamp,
                        jwttoken: token,
                        msg: msg,
                        msghash: msghash,
                        sign: sign
                    })
                }).then((res) => res.json())


                console.log(result.data)
                return result.data;
            }

        } catch (error) {
            console.log(error);
        }
    } else {
        showmodal("loadingmodal");
        const result = await fetch(apiurl + '/marketplace/list', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                tokenid: tokenid,
                password: password,
                ethaddress: loggedinaddress,
                price: listpriceinwei,
                expirationtimestamp: expirationtimestamp,
                jwttoken: token,
                msg: msg
            })
        }).then((res) => res.json())

        console.log(result.data)
        return result.data;



    }
}


function getexpirationtimestamp(listtimeinseconds) {
    if (listtimeinseconds != "null") {
        const currentDate = new Date();
        let timestamp = parseInt((currentDate.getTime()) / 1000);
        let expirationtimestamp = timestamp + parseInt(listtimeinseconds);
        return expirationtimestamp;
    } else {
        let expirationtimestamp = "null";
        return expirationtimestamp;
    }
}