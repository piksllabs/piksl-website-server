function showmodal(input) {
    document.getElementById("buy").style.display = "none";
    document.getElementById("sell").style.display = "none";
    document.getElementById("changeprice").style.display = "none";
    document.getElementById("cancellisting").style.display = "none";
    document.getElementById("requestsignature").style.display = "none";
    document.getElementById("requestpassword").style.display = "none";
    document.getElementById("metamaskdecline").style.display = "none";
    document.getElementById("listingconfirmed").style.display = "none";
    document.getElementById("loadingmodal").style.display = "none";
    document.getElementById("gaspriceestimation").style.display = "none";
    document.getElementById("editgasfees").style.display = "none";
    document.getElementById("makeoffer").style.display = "none";
    document.getElementById("wrapether").style.display = "none";
    document.getElementById("emptymodal").style.display = "none";
    document.getElementById("loginmodal").style.display = "none";
    document.getElementById("swaptokens").style.display = "none";
    document.getElementById("send").style.display = "none";
    document.getElementById("notactive").style.display = "none";


    if (input == "metamaskdecline") {
        document.getElementById("modalsubheading").innerHTML = "Oops!";
        document.getElementById(input).style.display = "block";
    } else {
        document.getElementById(input).style.display = "block";
    }
}