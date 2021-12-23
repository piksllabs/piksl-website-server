function loading() {
    if (document.getElementById("loading")) {
        w = window.innerWidth;
        h = window.innerHeight;
        header = document.getElementById("headerbar");
        headerheight = header.offsetHeight;
        console.log(h - headerheight);
        document.getElementById("loading").style.height = (h - headerheight) + "px";
        document.getElementById("loadingimg").style.display = "block";
        console.log("loading");
    } else {
        console.log("hmm");
    }
}

function endloading() {
    try {
        document.getElementById("loading").style.display = "none";
    } catch {}
    try {
        document.getElementById("body").style.display = "block";
    } catch {}
    try {
        document.getElementById("upper").style.display = "block";
    } catch {}
    try {
        document.getElementById("uppermobile").style.display = "block";
    } catch {}
    try {
        document.body.style.backgroundImage = "none";
    } catch {}


}