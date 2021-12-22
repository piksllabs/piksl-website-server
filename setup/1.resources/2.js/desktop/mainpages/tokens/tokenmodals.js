async function checksellconditions(input) {
    if (input == "buy") {
        buytoken();
    } else if (input == "sell") {
        selltoken();
    } else if (input == "changeprice") {
        changeprice();
    } else if (input == "cancellisting") {
        cancellisting();
    } else if (input == "makeoffer") {
        makeoffer();
    }

}