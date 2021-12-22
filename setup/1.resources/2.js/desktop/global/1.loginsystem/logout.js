async function logoutuser() {
    window.localStorage.clear();
    document.getElementById("profilelink").style.display = "block";
    document.getElementById("profileprofile").style.display = "none";
    console.log("logged out")
    location.reload();
}