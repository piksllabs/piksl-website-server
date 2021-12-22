async function loginuser() {

    const username = document.getElementById("loginusername").value;
    const password = document.getElementById("loginpassword").value;
    const errordiv = document.getElementById("loginerror");
    const errormsg = document.getElementById("loginerrormsg");
    document.getElementById("loginform").addEventListener("click", function() {
        document.getElementById("loginerror").style.display = 'none';
    });

    if (username == '' || password == '') {
        errordiv.style.display = 'flex';
        errormsg.innerHTML = "Please fill all required fields."
    } else {
        let result = await login(username, password);

        if (result.status === 'ok') {
            console.log(result.data);
            localStorage.setItem('token', result.data);
            localStorage.setItem('ismetamaskwallet', 'false');
            location.reload();
        } else {
            console.log(result.data);
            errordiv.style.display = 'flex';
            errormsg.innerHTML = "Inaccurate email or password";
        }
    }
}