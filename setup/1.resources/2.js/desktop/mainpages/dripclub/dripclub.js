window.addEventListener('resize', calculate);

window.addEventListener('load', function() {
    calculate();
});

function calculate() {
    w = window.innerWidth;
    h = window.innerHeight;
    header = document.getElementById("headerbar");
    headerheight = header.offsetHeight;
    console.log(h - headerheight);

    if (window.innerWidth < 767) {
        document.getElementById("mosaicouterdiv").style.minHeight = (h - headerheight) + "px";
        document.getElementById("gridbanner").style.height = (h - headerheight) + "px";
        document.getElementById("gridtext").style.background = "#111111";
        document.getElementById("gridtext").style.paddingTop = "25%";
        document.getElementById("gridtext").style.paddingRight = "10%";
        document.getElementById("gridtext").style.paddingLeft = "10%";
        document.getElementById("gridtext").style.fontSize = "75%";


        document.getElementById("blockchainbanner").style.minHeight = (h - headerheight) + "px";
    } else {
        document.getElementById("gridbanner").style.height = (h - headerheight) + "px";
        document.getElementById("blackscreen").style.height = (h - headerheight) + "px";
        document.getElementById("gradientback").style.height = (h - headerheight) + "px";
        document.getElementById("nftmain").style.height = (h - headerheight) + "px";
        document.getElementById("nfthat").style.height = (h - headerheight) + "px";
        document.getElementById("nftbeard").style.height = (h - headerheight) + "px";
        document.getElementById("nftglasses").style.height = (h - headerheight) + "px";
        document.getElementById("nftclothes").style.height = (h - headerheight) + "px";
        document.getElementById("nfthair").style.height = (h - headerheight) + "px";
        document.getElementById("nftcats").style.paddingTop = (h - headerheight) + "px";
        document.getElementById("blockchainbanner").style.minHeight = (h - headerheight) + "px";
        document.getElementById("mosaicouterdiv").style.minHeight = (h - headerheight) + "px";
    }

    if (window.innerWidth > 767) {

        document.getElementById("upper1").style.top = headerheight + "px";
        document.getElementById("gradientback").style.top = headerheight + "px";
        document.getElementById("gridbanner").style.top = headerheight + "px";
        document.getElementById("blackscreen").style.top = headerheight + "px";
        document.getElementById("upper3").style.top = headerheight + "px";
        document.getElementById("nftguy").style.top = headerheight + "px";
    }
}


window.addEventListener('scroll', function() {
    var element1 = document.querySelector('#li1');
    var element2 = document.querySelector('#li2');
    var element3 = document.querySelector('#li3');
    var element4 = document.querySelector('#li4');
    var element5 = document.querySelector('#li5');

    var position1 = element1.getBoundingClientRect();
    var position2 = element2.getBoundingClientRect();
    var position3 = element3.getBoundingClientRect();
    var position4 = element4.getBoundingClientRect();
    var position5 = element5.getBoundingClientRect();



    if (position1.top < (window.innerHeight / 2)) {
        element1.style.color = "white";
        element2.style.color = "#414141";
        element3.style.color = "#414141";
        element4.style.color = "#414141";
        element5.style.color = "#414141";
        element1.style.fontSize = "300%";
        element2.style.fontSize = "250%";
        element3.style.fontSize = "250%";
        element4.style.fontSize = "250%";
        element5.style.fontSize = "250%";


    }
    if (position2.top < (window.innerHeight / 2)) {
        element2.style.color = "white";
        element1.style.color = "#414141";
        element3.style.color = "#414141";
        element4.style.color = "#414141";
        element5.style.color = "#414141";
        element2.style.fontSize = "300%";
        element1.style.fontSize = "250%";
        element3.style.fontSize = "250%";
        element4.style.fontSize = "250%";
        element5.style.fontSize = "250%";

    }
    if (position3.top < (window.innerHeight / 2)) {
        element3.style.color = "white";
        element2.style.color = "#414141";
        element1.style.color = "#414141";
        element4.style.color = "#414141";
        element5.style.color = "#414141";
        element3.style.fontSize = "300%";
        element2.style.fontSize = "250%";
        element1.style.fontSize = "250%";
        element4.style.fontSize = "250%";
        element5.style.fontSize = "250%";

    }
    if (position4.top < (window.innerHeight / 2)) {
        element4.style.color = "white";
        element2.style.color = "#414141";
        element3.style.color = "#414141";
        element1.style.color = "#414141";
        element5.style.color = "#414141";
        element4.style.fontSize = "300%";
        element2.style.fontSize = "250%";
        element3.style.fontSize = "250%";
        element1.style.fontSize = "250%";
        element5.style.fontSize = "250%";

    }
    if (position5.top < (window.innerHeight / 2)) {
        element5.style.color = "white";
        element2.style.color = "#414141";
        element3.style.color = "#414141";
        element4.style.color = "#414141";
        element1.style.color = "#414141";
        element5.style.fontSize = "300%";
        element2.style.fontSize = "250%";
        element3.style.fontSize = "250%";
        element4.style.fontSize = "250%";
        element1.style.fontSize = "250%";


    }
});



window.addEventListener('scroll', function() {
    if (window.innerWidth > 767) {


        var element1 = document.querySelector('#texthat');
        var element2 = document.querySelector('#texthair');
        var element3 = document.querySelector('#textglasses');
        var element4 = document.querySelector('#textbeard');
        var element5 = document.querySelector('#textclothes');

        var nfthat = document.querySelector('#nfthat');
        var nftglasses = document.querySelector('#nftglasses');
        var nfthair = document.querySelector('#nfthair');
        var nftbeard = document.querySelector('#nftbeard');
        var nftclothes = document.querySelector('#nftclothes');
        var nftmain = document.querySelector('#nftmain');
        var nftguy = document.querySelector('#nftguy');

        var position1 = element1.getBoundingClientRect();
        var position2 = element2.getBoundingClientRect();
        var position3 = element3.getBoundingClientRect();
        var position4 = element4.getBoundingClientRect();
        var position5 = element5.getBoundingClientRect();
        var nftguyposition = nftguy.getBoundingClientRect();

        if (position1.bottom > (window.innerHeight / 1.25)) {
            console.log("hat")
            nfthat.style.opacity = "1";
            nftglasses.style.opacity = "0.2";
            nfthair.style.opacity = "0.2";
            nftbeard.style.opacity = "0.2";
            nftclothes.style.opacity = "0.2";
            nftmain.style.opacity = "0.2";
        }


        if (position4.bottom < (window.innerHeight / 1.1)) {
            console.log("beard")
            nfthat.style.opacity = "0.2";
            nftglasses.style.opacity = "0.2";
            nfthair.style.opacity = "0.2";
            nftbeard.style.opacity = "1";
            nftclothes.style.opacity = "0.2";
            nftmain.style.opacity = "0.2";
        }

        if (position3.bottom < (window.innerHeight / 1.1)) {
            console.log("glasses")
            nfthat.style.opacity = "0.2";
            nftglasses.style.opacity = "1";
            nfthair.style.opacity = "0.2";
            nftbeard.style.opacity = "0.2";
            nftclothes.style.opacity = "0.2";
            nftmain.style.opacity = "0.2";
        }

        if (position2.bottom < (window.innerHeight / 1.1)) {
            console.log("hair")
            nfthat.style.opacity = "0.2";
            nftglasses.style.opacity = "0.2";
            nfthair.style.opacity = "1";
            nftbeard.style.opacity = "0.2";
            nftclothes.style.opacity = "0.2";
            nftmain.style.opacity = "0.2";
        }


        if (position5.bottom < (window.innerHeight / 1.1)) {
            console.log("clothes")
            nfthat.style.opacity = "0.2";
            nftglasses.style.opacity = "0.2";
            nfthair.style.opacity = "0.2";
            nftbeard.style.opacity = "0.2";
            nftclothes.style.opacity = "1";
            nftmain.style.opacity = "0.2";
        }

        if (position1.bottom < (window.innerHeight / 1)) {
            document.querySelector('#propertiesbanner').style.display = "none";
        } else {
            document.querySelector('#propertiesbanner').style.display = "block";
        }

    }



});