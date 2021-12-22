let listingtokens;
let newfinaltokens = [];
let catdone = false;
let populated = 0;
async function populate(x, y) {
    totalsupply = await gettotalsupply();

    if ((totalsupply != 10000 && populated >= 1)) {

    } else {
        populate2(x, y);
        populated++;
    }

}


async function populate2(x, y) {
    let totalneeded = y - x;

    if (finalcattokensarray.length != 0) {
        listings = JSON.parse(localStorage.getItem("listings"));
        if (newfinaltokens.length != 0) {
            console.log(newfinaltokens);
            let total;
            if (newfinaltokens.length >= totalneeded) {
                total = totalneeded;
            } else {
                total = newfinaltokens.length;
            }
            let newfinaltokenstemp = [...newfinaltokens];
            for (let i = 0; i < total; i++) {
                if (listingtokens.includes(newfinaltokens[i])) {
                    createlistings(newfinaltokens[i], "listed");
                    document.getElementById("price" + listings[i].tokenid).innerHTML = await getethfixed(parseFloat(listings[i].listprice) / 10e17);
                } else {
                    createlistings(newfinaltokens[i]);
                }
                newfinaltokenstemp = await removefromarray(newfinaltokenstemp, newfinaltokens[i]);
            }
            newfinaltokens = newfinaltokenstemp;
            if (newfinaltokens.length == 0) {
                catdone = true;
            }
        } else if (newfinaltokens.length == 0 && catdone == false) {
            console.log("route1");

            console.log(listings);
            if (listings.length != 0) {
                console.log("route2");
                console.log(finalcattokensarray);
                listingtokens = []
                for (let i = 0; i < listings.length; i++) {
                    listingtokens.push(listings[i].tokenid);
                }
                finalcattokens = await shuffle(finalcattokensarray.reduce((join, current) => join.filter(el => current.includes(el))));
                console.log(finalcattokens.length);

                for (let i = 0; i < listingtokens.length; i++) {
                    if (finalcattokens.includes(listingtokens[i])) {
                        newfinaltokens.push(listingtokens[i]);
                        finalcattokens = await removefromarray(finalcattokens, listingtokens[i])
                    }
                }
                for (let i = 0; i < finalcattokens.length; i++) {
                    newfinaltokens.push(finalcattokens[i]);
                }
                console.log("newfinaltokens:" + newfinaltokens.length);
                console.log(newfinaltokens);
                if (newfinaltokens.length != 0) {
                    console.log("route3");
                    rowno = 1;
                    loopno = 0;
                    cleartable();
                    let total;
                    if (newfinaltokens.length >= totalneeded) {
                        total = totalneeded;
                    } else {
                        total = newfinaltokens.length;
                    }
                    let newfinaltokenstemp = [...newfinaltokens];
                    for (let i = 0; i < total; i++) {
                        if (listingtokens.includes(newfinaltokens[i])) {

                            createlistings(newfinaltokens[i], "listed");
                            document.getElementById("price" + newfinaltokens[i]).innerHTML = await getethfixed(parseFloat(await findpricebytokenid(newfinaltokens[i])) / 10e17);
                        } else {
                            createlistings(newfinaltokens[i]);
                        }
                        console.log(i, newfinaltokens[i]);
                        newfinaltokenstemp = await removefromarray(newfinaltokenstemp, newfinaltokens[i]);
                    }
                    newfinaltokens = newfinaltokenstemp;
                    loadcollection();
                    let keys = Object.keys(checkedcat);
                    addbuttons(keys);
                } else {
                    console.log("route4");
                    cleartable();
                    let p = document.createElement("p");
                    let center = document.createElement("center");
                    p.innerHTML = "No items to display."
                    center.appendChild(p);
                    document.getElementById("coltable").appendChild(center);;
                    loadcollection();
                }

            } else {
                console.log("route5");
                finalcattokens = await (finalcattokensarray.reduce((join, current) => join.filter(el => current.includes(el))));
                console.log(finalcattokens);

                if (finalcattokens.length != 0) {
                    console.log("route6");
                    rowno = 1;
                    loopno = 0;
                    cleartable();
                    for (let i = 0; i < finalcattokens.length; i++) {
                        createlistings(finalcattokens[i]);
                    }
                    loadcollection();
                    let keys = Object.keys(checkedcat);
                    addbuttons(keys);
                } else {
                    console.log("route7");
                    cleartable();
                    let p = document.createElement("p");
                    let center = document.createElement("center");
                    p.innerHTML = "No items to display."
                    center.appendChild(p);
                    document.getElementById("coltable").appendChild(center);;
                    loadcollection();
                }
            }
        }

    } else {
        console.log("route8");
        try {
            document.getElementById(`${input1 + input2}`).checked = false;
        } catch (e) {

        }
        //listings = JSON.parse(localStorage.getItem("listings"));
        document.getElementById("buttons").innerHTML = "";
        //rowno = 1;
        //loopno = 0;
        //cleartable();

        if (listings.length != 0) {
            console.log("route9");
            if (totalneeded <= listings.length) {
                console.log("route10");
                let currentlistings = [...listings];
                for (let i = 0; i < totalneeded; i++) {
                    createlistings(listings[i].tokenid, "listed");
                    document.getElementById("price" + listings[i].tokenid).innerHTML = await getethfixed(parseFloat(listings[i].listprice) / 10e17);
                    currentlistings = await removefromarray(currentlistings, listings[i]);
                }
                listings = currentlistings;
            } else {
                console.log("route11");
                let originallistings = [...listings];
                let currentlistings = [...listings];
                for (let i = 0; i < listings.length; i++) {
                    await createlistings(listings[i].tokenid, "listed");
                    document.getElementById("price" + listings[i].tokenid).innerHTML = await getethfixed(parseFloat(listings[i].listprice) / 10e17);
                    currentlistings = await removefromarray(currentlistings, listings[i]);
                }
                listings = currentlistings;
                let totalleft = totalneeded - originallistings.length;
                let arraycopy = [...tokensleftarray];
                for (let i = 0; i < totalleft; i++) {
                    createlistings(arraycopy[i]);
                }
            }
        } else {
            console.log("route12");
            let arraycopy = [...tokensleftarray];
            for (let i = 0; i < totalneeded; i++) {
                createlistings(arraycopy[i]);
            }
        }
    }



    console.log("newfinaltokens:" + newfinaltokens.length);
    loadcollection();
    endloading();
    shownotactivemodal();
}

async function cleartable() {
    document.getElementById("coltable").innerHTML = "";
    tokensleftarray = shuffle(await removefromarray((Array.from(Array(10001).keys())), 0));
    total = 1;
}

async function findpricebytokenid(tokenid) {
    for (let i = 0; i < listings.length; i++) {
        if (listings[i].tokenid == tokenid) {
            return listings[i].listprice;
        }
    }
}