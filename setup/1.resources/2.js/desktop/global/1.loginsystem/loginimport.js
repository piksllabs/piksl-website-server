let metamaskaddress;
window.addEventListener('load', async function() {
    //await getmetamaskaddress()
    ethereum.on('accountsChanged', async(accounts) => {
        await getmetamaskaddress();
        if (metamaskaddress != undefined) {
            if (localStorage.getItem("token") && localStorage.getItem("ismetamaskwallet") == 'true') {
                registermetamaskuser();
            }
        }
    });
});

async function connectMetamask() {
    try {
        let result = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        metamaskaddress = result[0];
        registermetamaskuser();
    } catch (e) {
        console.log(e)
        return [];
    }
}

async function getmetamaskaddress() {
    if (window.ethereum) {
        add = await ethereum.request({ method: 'eth_accounts' });
        metamaskaddress = add[0];
    }
}

async function registermetamaskuser() {
    const ethaddress = metamaskaddress;
    console.log(ethaddress)

    let result = await registerloginmetamask(ethaddress);
    localStorage.setItem('token', result.data);
    localStorage.setItem('ismetamaskwallet', 'true');
    location.reload();

}


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


async function profile() {
    if (window.localStorage.getItem("token")) {
        console.log("logged in");
        let token = window.localStorage.getItem("token");
        document.getElementById("profilelink").style.display = "none";
        document.getElementById("profileprofile").style.display = "block";
        loggedinaddress = await parseJwt(token).ethaddress;
        localStorage.setItem("loggedinaddress", loggedinaddress);
        console.log(loggedinaddress);
    } else {
        console.log("logged out");
        document.getElementById("profilelink").style.display = "block";
        document.getElementById("profileprofile").style.display = "none";
    }
}



async function logoutuser() {
    window.localStorage.clear();
    document.getElementById("profilelink").style.display = "block";
    document.getElementById("profileprofile").style.display = "none";
    console.log("logged out")
    location.reload();
}

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
    }
}