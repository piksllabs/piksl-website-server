function shortenaddress(xstr1) {
    let xstr = xstr1.toUpperCase();
    //const myArr = xstr.toString().substring(0, 2);
    const myArrlast = xstr.toString().substring(38, 42);
    const final = "0x" + myArrlast
    return final
}