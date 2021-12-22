window.addEventListener('load', async function() {
    w = window.innerWidth;
    h = window.innerHeight;
    header = document.getElementById("headerbar");
    headerheight = header.offsetHeight;
    bodyh = h - headerheight;


    if (window.innerWidth < 767) {
        let br = document.createElement("br");
        document.getElementById("loadingimg").style.width = "10%";
        $("#loading").appendTo("#mobile");
        let bannerdiv = document.createElement("div");
        bannerdiv.style.height = bodyh / 3 + "px";
        bannerdiv.style.backgroundImage = `url('../../../3.images/back/grid.png')`;
        bannerdiv.style.backgroundSize = "cover";
        bannerdiv.style.backgroundPosition = "center";
        console.log(document.getElementById("marketbanner").src);
        $(bannerdiv).insertBefore("#upperinnermobile");
        document.getElementById("upperinnermobile").appendChild(br.cloneNode());
        $("#collectiontitle").appendTo("#upperinnermobile");
        document.getElementById("upperinnermobile").appendChild(br.cloneNode());
        $("#prop").appendTo("#upperinnermobile");
        document.getElementById("prop").style.marginLeft = "2.5%";
        document.getElementById("prop").style.marginRight = "2.5%";

        document.getElementById("upperinnermobile").appendChild(br.cloneNode());
        $("#info").appendTo("#upperinnermobile");
        document.getElementById("info").style.marginLeft = "15%";
        document.getElementById("info").style.marginRight = "15%";
        document.getElementById("upperinnermobile").appendChild(br.cloneNode());

        let borderdiv = document.createElement("div");
        borderdiv.style.borderBottom = "2px solid #808080";
        $(borderdiv).appendTo("#upperinnermobile");
        document.getElementById("upperinnermobile").appendChild(br.cloneNode());
        $("#buttons").appendTo("#upperinnermobile");
        $("#coltable").appendTo("#upperinnermobile");
        let sidebardiv = document.createElement("div");
        sidebardiv.style.display = "none";
        sidebardiv.style.position = "sticky";
        sidebardiv.style.top = headerheight + "px";
        sidebardiv.style.zIndex = "1000";
        sidebardiv.id = "sidebardiv";

        let center = document.createElement("center");
        let donebutton = document.createElement("button");
        donebutton.className = "bluebutton";
        donebutton.innerHTML = "Done";
        donebutton.setAttribute("onclick", "done()");
        center.appendChild(donebutton);
        $(center).appendTo("#sidebarinner");
        document.getElementById("sidebarinner").style.height = bodyh + "px";
        let sidebarheadh = document.getElementById("sidebarhead").scrollHeight;
        document.getElementById("scrollbar").style.height = (h - (headerheight + sidebarheadh + donebutton.scrollHeight)) / 1.35 + "px";
        console.log(h - (headerheight + sidebarheadh + center.scrollHeight));
        $("#sidebarinner").appendTo(sidebardiv);
        $(sidebardiv).insertBefore("#uppermobile");

        let center2 = center.cloneNode();
        let filterbutton = document.createElement("button");
        filterbutton.className = "bluebutton iconbtn";
        filterbutton.setAttribute("onclick", "showfilter()")
        filterbutton.style.marginBottom = "2.5%";
        let span = document.createElement("span");
        span.innerHTML = "Filter";
        span.className = "icon filtericon";
        filterbutton.appendChild(span);
        center2.appendChild(filterbutton);

        $(center2).insertBefore("#buttons");
    } else {
        //alert('More than 960');
    }
});

async function done() {
    document.getElementById("sidebardiv").style.display = "none";
}

async function showfilter() {
    document.getElementById("sidebardiv").style.display = "block";
}