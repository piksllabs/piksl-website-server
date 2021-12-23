async function registeruser() {
    const name = document.getElementById("regname").value;
    const email = document.getElementById("regemail").value;
    const password = document.getElementById("regpassword").value;
    const confirmpass = document.getElementById("regconfirmpassword").value;
    const errordiv = document.getElementById("regerror");
    const errormsg = document.getElementById("regerrormsg");
    console.log(name);
    console.log(password, confirmpass)
    console.log(validateEmail(email));
    document.getElementById("regform").addEventListener("click", function() {
        errordiv.style.display = 'none';
    });

    if (name == '' || email == '' || password == '' || confirmpass == '') {
        errordiv.style.display = 'flex';
        errormsg.innerHTML = "Please fill all required fields."
    } else if (password != confirmpass) {
        errordiv.style.display = 'flex';
        errormsg.innerHTML = "Passwords do not match."
    } else if (password.length < 8) {
        errordiv.style.display = 'flex';
        errormsg.innerHTML = "Password should be atleast 8 characters long."
    } else if (!validateEmail(email)) {
        errordiv.style.display = 'flex';
        errormsg.innerHTML = "Please enter a valid email address."
    } else {
        let result = await register(name, email, password);
        console.log(result.data)
        if (result.data == "ok") {
            window.open("/dashboard", "_self");
        }
    }
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}