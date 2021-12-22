async function sendether() {
    token = localStorage.getItem('token')
    parsedtoken = await parseJwt(token);
    const fromaddress = parsedtoken.ethaddress;
    const toaddress = document.getElementById("sendaddress").value;
    const valueineth = document.getElementById("sendamount").value;
    const password = document.getElementById("sendpassword").value;
    console.log("sending...")
    const result = await fetch(apiurl + '/wallet/sendether', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            fromaddress: fromaddress,
            toaddress: toaddress,
            valueineth: valueineth,
            password: password
        })
    }).then((res) => res.json())
    console.log(result.data)




}