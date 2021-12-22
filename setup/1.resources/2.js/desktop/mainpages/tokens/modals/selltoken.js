async function selltoken() {
    let { loggedinaddress } = await getcurrentaddress()

    if (loggedinaddress == "") {
        showmodal("loginmodal");
    } else {
        selltoken2();
    }
}

async function selltoken2() {
    buysellmodal.style.display = "block";
    showmodal("sell");

    document.getElementById("modalheading").innerHTML = "SELL";
    document.getElementById("modalsubheading").innerHTML = "List Item";

    inputerrors("sell");

}

async function inputerrors(input) {
    document.getElementById(input + "amount").addEventListener("click", async function() {
        document.getElementById(input + "error").style.display = "none";
        document.getElementById(input + "p").style.display = "block";
    });

    document.getElementById(input + "amount").addEventListener("input", async function() {
        if (isNaN(parseFloat(document.getElementById(input + "amount").value)) == true) {
            if (document.getElementById(input + "amount").value == "") {
                document.getElementById(input + "error").style.display = "none";
                document.getElementById(input + "p").style.display = "block";
                document.getElementById(input + "button").style.display = "block";
            } else {
                document.getElementById(input + "error").innerHTML = "Enter valid listing amount"
                document.getElementById(input + "error").style.display = "block";
                document.getElementById(input + "p").style.display = "none";
                document.getElementById(input + "button").style.display = "none";
            }
        } else {
            document.getElementById(input + "error").style.display = "none";
            document.getElementById(input + "p").style.display = "block";
            document.getElementById(input + "button").style.display = "block";
        }
    });

}


async function continueselling(input) {
    let listprice = document.getElementById(input + "amount").value;
    console.log(listprice);

    if (input == "changeprice") {
        continueselling2(listprice, input);
    } else {
        if (document.getElementById("sellamount").value == "") {
            document.getElementById("sellerror").style.display = "block";
            document.getElementById("sellp").style.display = "none";
            document.getElementById("sellbutton").style.display = "block";
        } else {
            continueselling2(listprice, input);
        }
    }



}

async function continueselling2(listprice, input) {
    showmodal("loadingmodal");
    let listtimeinseconds = document.getElementById(input + "timeframe").value;
    let listtimeframe = document.getElementsByName(listtimeinseconds)[0].innerHTML;

    let modalbody = document.getElementById("modalbody");
    let token = window.localStorage.getItem('token');
    loggedinaddress = await parseJwt(token).ethaddress;
    let ismetamask = window.localStorage.getItem('ismetamaskwallet');

    if (ismetamask == "true") {
        showmodal("requestsignature");
        document.getElementById("requestsignaturep").innerHTML = "Listing an item is completely free without any gas fees. Accept the signature request in your wallet and wait for the listing to process. "

        document.getElementById("modalsubheading").innerHTML = "Confirm Listing"

        const result = await listtokens(tokenid, listprice, "", listtimeinseconds);
        console.log(result)
        listingdone(result, listprice, listtimeframe, "");

    } else {
        showmodal("requestpassword");
        document.getElementById("modalsubheading").innerHTML = "Confirm Listing";

        document.getElementById("requestpasswordconfirmbutton").addEventListener("click", async function() {
            let password = document.getElementById("requestpasswordinput").value;
            console.log(password)
            const check = await checkpassword(loggedinaddress, password);
            if (check == "error") {
                document.getElementById("requestpasswordloginerror").style.display = "flex";
            } else {
                const result = await listtokens(tokenid, listprice, password, listtimeinseconds);
                listingdone(result, listprice, listtimeframe, "");
            }

        });

    }
}