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


    document.getElementById("upper").style.height = (h - headerheight) + "px";
    document.getElementById("fashiontext").style.minheight = (h - headerheight) + "px";
    document.getElementById("fashiontext").style.marginTop = -(h - headerheight) + "px";
    document.getElementById("projects").style.minheight = (h - headerheight) + "px";

    document.getElementById("subheading").style.height = (h - (headerheight + document.getElementById("roadmaptitle").offsetHeight)) + "px";
    document.getElementById("subheading").style.marginTop = -(document.getElementById("roadmaptitle").offsetHeight / 2) + "px";

    document.getElementById("upper").style.top = headerheight + "px";
    document.getElementById("subheading").style.top = headerheight + "px";
    document.getElementById("roadmaptitle").style.top = (headerheight) + "px";

    if (window.innerWidth < 767) {
        document.getElementById("projectstitle").style.top = (headerheight + document.getElementById("roadmaptitle").offsetHeight * 10) + "px";
        document.getElementById("venturestitle").style.top = (headerheight + document.getElementById("roadmaptitle").offsetHeight * 10) + "px";
        document.getElementById("pikslspacetitle").style.top = (headerheight + document.getElementById("roadmaptitle").offsetHeight * 10) + "px";
    } else {
        document.getElementById("projectstitle").style.top = (headerheight + document.getElementById("roadmaptitle").offsetHeight / 1.5) + "px";
        document.getElementById("venturestitle").style.top = (headerheight + document.getElementById("roadmaptitle").offsetHeight / 1.5) + "px";
        document.getElementById("pikslspacetitle").style.top = (headerheight + document.getElementById("roadmaptitle").offsetHeight / 1.5) + "px";
    }

}



window.addEventListener('scroll', function() {
    var element1 = document.querySelector('#projects');

    var position1 = element1.getBoundingClientRect();


    if (position1.top < (window.innerHeight / 2)) {
        document.querySelector('#subheading').style.opacity = "0";
    } else {
        document.querySelector('#subheading').style.opacity = "1";
    }
});




window.addEventListener('load', async function() {
    if (window.innerWidth < 767) {

        $("#outer").appendTo("#mobile");

        pheading = document.getElementsByClassName("pheading");
        for (let i = 0; i < pheading.length; i++) {
            pheading[i].style.fontSize = "250%";
            pheading[i].className = "pheading vertcenter";
        }
        psub = document.getElementsByClassName("psub");
        for (let i = 0; i < psub.length; i++) {
            psub[i].style.fontSize = "110%";
        }
        points = document.getElementsByClassName("points");
        for (let i = 0; i < points.length; i++) {
            points[i].style.marginLeft = "5%";
            points[i].style.marginRight = "5%";
        }
    }
});