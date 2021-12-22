window.addEventListener('load', async function() {

    if (window.innerWidth < 767) {

        $("#outer").appendTo("#mobile");

        document.getElementById("upper3").innerHTML = "";
        let img = document.createElement("img");
        img.src = "3.images/back/prop.png";
        document.getElementById("upper3").appendChild(img);

        document.getElementById("chainimg").src = "/3.images/back/blockchain2.png";
        document.getElementById("chaintext").style.marginLeft = "2.5%";
        document.getElementById("chaintext").style.marginRight = "2.5%";
        document.getElementById("chaintext").style.fontSize = "125%";
        document.getElementById("market").style.paddingRight = "10%";
        document.getElementById("market").style.paddingLeft = "10%";
        document.getElementById("market").style.fontSize = "80%";
        document.getElementById("support").style.paddingTop = "25%";
        // document.getElementById("marketimg").src = "/3.images/back/marketbanner.png";
    }
});