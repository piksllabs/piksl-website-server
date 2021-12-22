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