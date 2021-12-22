async function changeprice() {
    let { loggedinaddress } = await getcurrentaddress()

    if (loggedinaddress == "") {
        showmodal("loginmodal");
    } else {
        changeprice2();
    }
}

async function changeprice2() {
    buysellmodal.style.display = "block";
    showmodal("changeprice");

    document.getElementById("modalheading").innerHTML = "SELL";
    document.getElementById("modalsubheading").innerHTML = "Lower price for listed item";

    inputerrors("changeprice");

    document.getElementById("changepriceamount").addEventListener("input", async function() {
        let currentprice = document.getElementById("currentprice").name;
        let listprice = document.getElementById("changepriceamount").value;
        console.log(currentprice)
        if (parseFloat(listprice) >= parseFloat(currentprice)) {
            console.log("abcd")
            document.getElementById("changepricep").style.display = "none";
            document.getElementById("changepricebutton").style.display = "none";
            document.getElementById("changepriceerror").style.display = "block";
            document.getElementById("changepriceerror").innerHTML = "The new sale price must be lower than the current price. If you need to set a higher price, cancel the listing and re-list."
        }
    })
}