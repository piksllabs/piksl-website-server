function loading() {
    if (document.getElementById("loading")) {
        w = window.innerWidth;
        h = window.innerHeight;
        header = document.getElementById("headerbar");
        headerheight = header.offsetHeight;
        console.log(h - headerheight);
        document.getElementById("loading").style.height = (h - headerheight) + "px";
        document.getElementById("loadingimg").style.display = "block";
    } else {}
}

function endloading() {
    document.getElementById("loading").style.display = "none";
    document.getElementById("upper").style.display = "block";
    document.getElementById("uppermobile").style.display = "block";
}