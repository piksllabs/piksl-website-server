let rowno = 1;
let loopno = 0;

async function createlistings(tokenid, listed) {
    // console.log("tokenid is:" + tokenid);
    let divrow = document.createElement("div");
    divrow.setAttribute("class", "row");
    divrow.setAttribute("id", "row" + String(rowno));
    document.getElementById("coltable").appendChild(divrow)


    let name = "#" + String(tokenid)
    let alink = document.createElement("a");
    alink.setAttribute("href", "/dripclub/tokenid=" + String(tokenid))
    let divcol = document.createElement("div");
    divcol.setAttribute("class", "column");
    let divcard = document.createElement("div");
    divcard.setAttribute("class", "card pointer ");
    divcard.setAttribute("id", "card" + String(tokenid));
    divcard.setAttribute("onmouseover", `changecard('${String(tokenid)}')`);
    divcard.setAttribute("onmouseout", `changecardback('${String(tokenid)}')`);
    let img = document.createElement("img");
    img.setAttribute("src", apiurl + "/dripclub/tokens/images/" + String(tokenid) + ".png");
    img.setAttribute("class", "tokenimg");
    img.setAttribute("style", "width:100%; border-radius: 12.5px; border-bottom-left-radius:0px;  border-bottom-right-radius:0px");
    let br = document.createElement("br");
    let pcol = document.createElement("p");
    pcol.innerHTML = "Drip Club";
    pcol.setAttribute("id", "pcol" + String(tokenid));
    pcol.setAttribute("style", "font-size: 80%; margin-top: 1%; color: #808080; font-weight:bold; ")
    let ptitle = document.createElement("p");
    ptitle.setAttribute("style", "font-size: 100%; ")
    ptitle.setAttribute("id", "ptitle" + String(tokenid));
    ptitle.innerHTML = name;

    //Listed
    let pricep = document.createElement("p");
    pricep.innerHTML = "Price";
    pricep.setAttribute("class", "pricep");
    pricep.setAttribute("id", "pricep" + String(tokenid));
    let price = document.createElement("p");
    price.innerHTML = "2.34";
    price.setAttribute("id", "price" + tokenid);
    price.setAttribute("class", "price icon ethicon");
    let twodivs = document.createElement("div");
    twodivs.setAttribute("class", "twodivs");
    let leftdiv = document.createElement("div");
    leftdiv.setAttribute("class", "leftdiv ");
    let rightdiv = document.createElement("div");
    rightdiv.setAttribute("class", "rightdiv");

    if (listed == "listed") {
        twodivs.appendChild(leftdiv);
        twodivs.appendChild(rightdiv);
        leftdiv.appendChild(pcol);
        leftdiv.appendChild(ptitle);
        rightdiv.appendChild(pricep);
        rightdiv.appendChild(price);
        divcard.appendChild(img);
        divcard.appendChild(br);
        divcard.appendChild(twodivs);
        divcol.appendChild(divcard);
    } else {
        twodivs.appendChild(leftdiv);
        twodivs.appendChild(rightdiv);
        leftdiv.appendChild(pcol);
        leftdiv.appendChild(ptitle);

        divcard.appendChild(img);
        divcard.appendChild(br);
        divcard.appendChild(twodivs);
        divcol.appendChild(divcard);
    }
    alink.appendChild(divcol);
    let d = document.createElement("div");
    d.setAttribute("id", "d");
    d.setAttribute("class", "heaveup containerdivs");
    d.appendChild(alink);

    let columnno;
    if (window.innerWidth < 767) {
        columnno = 2;
    } else {
        columnno = 4;
    }

    if (loopno % columnno == 0) {
        rowno = rowno + 1;
        let divrow2 = document.createElement("div");
        divrow2.setAttribute("class", "row");
        divrow2.setAttribute("id", "row" + String(rowno));
        document.getElementById("coltable").appendChild(divrow2)
    }
    document.getElementById("row" + String(rowno)).appendChild(d);
    loopno++;
    total++;
    tokensleftarray = await removefromarray(tokensleftarray, parseInt(tokenid));
    console.log(tokensleftarray.length);
}