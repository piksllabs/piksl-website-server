window.addEventListener('load', async function() {
    w = window.innerWidth;
    h = window.innerHeight;
    header = document.getElementById("headerbar");
    headerheight = header.offsetHeight;
    console.log(h - headerheight);


    if (window.innerWidth < 767) {

        $("#hero").appendTo("#mobile");

        document.getElementById("heroimg").src = "/3.images/back/herobanner2.png";
        document.getElementById("heroimg").style.width = "100%";
        document.getElementById("dripclubheading").style.fontSize = "650%";
        document.getElementById("dripclubheading").style.lineHeight = "1";
        document.getElementById("dripclubheading").style.paddingTop = "10%";
        document.getElementById("dripclubsubheading").style.fontSize = "250%";
        document.getElementById("dripclubsubheading").style.paddingTop = "10%";

        let br = document.createElement("br");

        let div = document.createElement("div");
        div.style.paddingLeft = "5%";
        div.style.paddingRight = "5%";
        div.style.background = "#111111";
        div.style.paddingBottom = "5%";
        div.style.paddingTop = "5%";
        let button1 = document.createElement("button");
        button1.className = "mobileheadingbutton";
        button1.innerHTML = "Piksl Originals";
        let button2 = document.createElement("button");
        button2.className = "mobileheadingbutton";
        button2.innerHTML = "Piksl Marketplace";
        let button3 = document.createElement("button");
        button3.className = "mobileheadingbutton";
        button3.innerHTML = "Piksl Fashion";

        let a = document.createElement("a");
        let a1 = a.cloneNode();
        let a2 = a.cloneNode();
        let a3 = a.cloneNode();
        a1.href = "/dripclub";
        a2.href = "/marketplace";
        a3.href = "/fashion";

        $(br.cloneNode()).appendTo(div);
        $(br.cloneNode()).appendTo(div);
        $(button1).appendTo(div);
        $("#div1").appendTo(a1);
        $(a1).appendTo(div);
        $(br.cloneNode()).appendTo(div);
        $(br.cloneNode()).appendTo(div);
        $(br.cloneNode()).appendTo(div);
        $(button2).appendTo(div);
        $("#div2").appendTo(a2);
        $(a2).appendTo(div);
        $(br.cloneNode()).appendTo(div);
        $(br.cloneNode()).appendTo(div);
        $(br.cloneNode()).appendTo(div);
        $(button3).appendTo(div);
        $("#div3").appendTo(a3);
        $(a3).appendTo(div);
        $(br.cloneNode()).appendTo(div);
        $(div).appendTo("#mobile");
        this.document.getElementById("mobile").style.paddingBottom = "20%";
    }
});