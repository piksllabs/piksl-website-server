window.addEventListener('load', async function() {
    if (window.innerWidth < 767) {
        let br = document.createElement("br");
        $("#loading").appendTo("#mobile");
        document.getElementById("loadingimg").style.width = "10%";
        $("#tokeninfo").appendTo("#upperinnermobile");
        document.getElementById("tokeninfo").style.marginBottom = "-2.5%";
        document.getElementById("upperinnermobile").appendChild(br.cloneNode());
        $("#imgbox").appendTo("#upperinnermobile");
        document.getElementById("upperinnermobile").appendChild(br.cloneNode());
        $("#pricesale").appendTo("#upperinnermobile");
        document.getElementById("upperinnermobile").appendChild(br.cloneNode());
        $("#properties").appendTo("#upperinnermobile");
        document.getElementById("upperinnermobile").appendChild(br.cloneNode());
        $("#listings").appendTo("#upperinnermobile");
        document.getElementById("upperinnermobile").appendChild(br.cloneNode());
        $("#offers").appendTo("#upperinnermobile");
        document.getElementById("upperinnermobile").appendChild(br.cloneNode());
        $("#details").appendTo("#upperinnermobile");
        document.getElementById("upperinnermobile").appendChild(br.cloneNode());
        $("#transactionhistory").appendTo("#upperinnermobile");
        $("#buysellmodal").appendTo("#upperinnermobile");
        this.document.getElementById("mobile").style.paddingBottom = "20%";
    } else {
        //alert('More than 960');
    }
});