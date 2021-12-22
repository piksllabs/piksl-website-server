async function listingdone(result, listprice, listtimeframe, confirmationtype) {
    console.log(result)
    let listprice2
    if (listprice != "null") {
        listprice2 = listprice;
    }
    if (result == "error") {
        document.getElementById("modalsubheading").innerHTML = "Oops!";
        showmodal("metamaskdecline");

    } else if (confirmationtype == "purchase") {
        document.getElementById("modalsubheading").innerHTML = "Purchase Confirmed";
        showmodal("listingconfirmed");
        document.getElementById("listingconfirmedp").innerHTML = `You successfully bought item for ${listprice2}&#926.`;
        document.getElementById("listingconfirmedimg").setAttribute("src", apiurl + "/dripclub/tokens/images/" + String(tokenid) + ".png")
        document.getElementById("confirmimg").style.display = "block";

    } else if (confirmationtype == "acceptoffer") {
        document.getElementById("modalsubheading").innerHTML = "Offer Accepted";
        showmodal("listingconfirmed");
        document.getElementById("listingconfirmedp").innerHTML = `You successfully sold item for ${listprice2}&#926.`;
        document.getElementById("listingconfirmedimg").setAttribute("src", apiurl + "/dripclub/tokens/images/" + String(tokenid) + ".png")
        document.getElementById("confirmimg").style.display = "block";

    } else if (confirmationtype == "makeoffer" && result != "already exists") {
        document.getElementById("modalsubheading").innerHTML = "Offer Confirmed";
        showmodal("listingconfirmed");
        document.getElementById("listingconfirmedp").innerHTML = `You successfully made an offer for ${listprice2}&#926 on Drip Club #${tokenid}`;
        document.getElementById("listingconfirmedimg").setAttribute("src", apiurl + "/dripclub/tokens/images/" + String(tokenid) + ".png")
        document.getElementById("confirmimg").style.display = "block";

    } else if (confirmationtype == "makeoffer" && result == "already exists") {
        document.getElementById("modalsubheading").innerHTML = "Oops!";
        showmodal("listingconfirmed");
        document.getElementById("listingconfirmedp").innerHTML = `A similar offer for ${listprice2}&#926 on Drip Club #${tokenid} already exists from you. Change offer amount or cancel previous offer.`;
        document.getElementById("confirmimg").style.display = "none";
    } else if (confirmationtype == "cancellation") {
        document.getElementById("modalsubheading").innerHTML = "Cancellation Confirmed";
        showmodal("listingconfirmed");
        document.getElementById("listingconfirmedp").innerHTML = `The listing is now cancelled and your item is no longer listed for sale.`;
        document.getElementById("listingconfirmedimg").setAttribute("src", apiurl + "/dripclub/tokens/images/" + String(tokenid) + ".png")
        document.getElementById("confirmimg").style.display = "block";
    } else {
        document.getElementById("modalsubheading").innerHTML = "Listing Confirmed";
        showmodal("listingconfirmed");
        document.getElementById("listingconfirmedp").innerHTML = `Your item is now listed for sale for ${listprice2}&#926; and is valid for ${listtimeframe}.`;
        document.getElementById("listingconfirmedimg").setAttribute("src", apiurl + "/dripclub/tokens/images/" + String(tokenid) + ".png");
        document.getElementById("confirmimg").style.display = "block";
    }
}