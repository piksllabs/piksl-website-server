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