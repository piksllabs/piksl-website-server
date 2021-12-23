window.addEventListener('load', async function() {
    await endloading();
    calculate();
});

function calculate() {
    w = window.innerWidth;
    h = window.innerHeight;
    header = document.getElementById("headerbar");
    headerheight = header.offsetHeight;
    console.log(h - headerheight);
    document.getElementById("fashionbanner").style.minHeight = (h - headerheight) + "px";
    document.getElementById("fashiontext").style.minHeight = (h - headerheight) + "px";
    document.getElementById("fashiontext").style.marginTop = -(h - headerheight) + "px";
    document.getElementById("fashionsubheading").style.minHeight = (h - headerheight) + "px";
    document.getElementById("upper").style.minHeight = (h - headerheight) + "px";

    if (window.innerWidth < 767) {} else {

    }

    document.getElementById("upper").style.top = headerheight + "px";
    document.getElementById("blackscreen").style.top = headerheight + "px";
}


window.addEventListener('load', async function() {
    if (window.innerWidth < 767) {
        document.getElementById("uppermobile").style.display = "block";
        $("#upperinnermobile").remove();
        $("#outer").appendTo("#uppermobile");
        let br = document.createElement("br");
        document.getElementById("fashionsubheading").style.marginLeft = "5%";
        document.getElementById("fashionsubheading").style.marginRight = "5%";
        let center = document.createElement("center");
        let p = document.createElement("p");
        p.innerHTML = "A Piksl technological venture into tokenized physical commerce."
        p.style.fontSize = "150%";
        center.appendChild(p);
        document.getElementById("fashionsubheading").innerHTML = "";
        document.getElementById("fashionsubheading").appendChild(center);
        document.getElementById("gridtext").style.paddingLeft = "10%";
        document.getElementById("gridtext").style.paddingRight = "10%";
        document.getElementById("gridtext").style.marginTop = "50%";
        document.getElementById("gridtext").style.paddingTop = "50%";
        document.getElementById("gridtext").style.paddingBottom = "50%";
        document.getElementById("gridtext").style.background = "#111111da";

        let center2 = center.cloneNode();

        let img1 = document.createElement("img");
        img1.src = "https://storage.piksl.io/3.images/card1.png";
        let img2 = document.createElement("img");
        img2.src = "https://storage.piksl.io/3.images/card2.png";
        let img3 = document.createElement("img");
        img3.src = "https://storage.piksl.io/3.images/card3.png";
        document.getElementById("fashionbanner").innerHTML = "";
        center2.appendChild(img1);
        center2.appendChild(br.cloneNode());
        center2.appendChild(br.cloneNode());
        center2.appendChild(img2);
        center2.appendChild(br.cloneNode());
        center2.appendChild(br.cloneNode());
        center2.appendChild(img3);
        center2.appendChild(br.cloneNode());
        center2.appendChild(br.cloneNode());
        document.getElementById("fashionbanner").appendChild(center2);
        img1.style.width = "75%";
        img2.style.width = "75%";
        img3.style.width = "75%";


    } else {
        //alert('More than 960');
    }
});