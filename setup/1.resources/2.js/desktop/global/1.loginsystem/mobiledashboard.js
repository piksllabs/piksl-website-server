window.onload = function() {
    if (window.innerWidth < 767) {
        let br = document.createElement("br");
        $("#loading").appendTo("#mobile");
        document.getElementById("loadingimg").style.width = "10%";
        $("#mainprofile").appendTo("#upperinnermobile");
        document.getElementById("upperinnermobile").appendChild(br.cloneNode());
        $("#mainwallet").appendTo("#upperinnermobile");
        document.getElementById("mainwallet").style.width = "100%";
        document.getElementById("mainwallet").style.marginLeft = "0%";
        let walletdiv = document.createElement("div");
        walletdiv.className = "containerdivs";
        walletdiv.style.padding = "2.5%";
        $("#balancestitle").appendTo(walletdiv);
        $("#ethbalance").appendTo(walletdiv);
        $("#wethbalance").appendTo(walletdiv);
        $("#usdtbalance").appendTo(walletdiv);
        $("#othersbalance").appendTo(walletdiv);
        $("#balances").remove()
        $(walletdiv).insertBefore("#brbal");
        document.getElementById("ethbalance").style.width = "100%";
        document.getElementById("wethbalance").style.width = "100%";
        document.getElementById("usdtbalance").style.width = "100%";
        document.getElementById("othersbalance").style.width = "100%";

        document.getElementById("upperinnermobile").appendChild(br.cloneNode());
        $("#mainnfts").appendTo("#upperinnermobile");
        document.getElementById("mainnfts").style.width = "100%";
        document.getElementById("mainnfts").style.marginLeft = "0%";



        // $("#tokeninfo").appendTo("#upperinnermobile");
        // document.getElementById("tokeninfo").style.marginBottom = "-2.5%";
        // document.getElementById("upperinnermobile").appendChild(br.cloneNode());
        // $("#imgbox").appendTo("#upperinnermobile");
        // document.getElementById("upperinnermobile").appendChild(br.cloneNode());
        // $("#pricesale").appendTo("#upperinnermobile");
        // document.getElementById("upperinnermobile").appendChild(br.cloneNode());
        // $("#properties").appendTo("#upperinnermobile");
        // document.getElementById("upperinnermobile").appendChild(br.cloneNode());
        // $("#listings").appendTo("#upperinnermobile");
        // document.getElementById("upperinnermobile").appendChild(br.cloneNode());
        // $("#offers").appendTo("#upperinnermobile");
        // document.getElementById("upperinnermobile").appendChild(br.cloneNode());
        // $("#details").appendTo("#upperinnermobile");
        // document.getElementById("upperinnermobile").appendChild(br.cloneNode());
        // $("#transactionhistory").appendTo("#upperinnermobile");
        // $("#buysellmodal").appendTo("#upperinnermobile");
    } else {
        //alert('More than 960');
    }
}