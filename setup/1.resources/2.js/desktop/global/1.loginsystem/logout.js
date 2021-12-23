async function logoutuser() {
    window.localStorage.clear();
    document.getElementById("profilelink").style.display = "block";
    document.getElementById("profileprofile").style.display = "none";
    console.log("logged out")
    url = window.location.href;
    urladdress = url.substring(url.lastIndexOf("/") + 1);
    if (urladdress == "dashboard") {
        window.open("/", "_self");
    } else {
        location.reload();
    }
}