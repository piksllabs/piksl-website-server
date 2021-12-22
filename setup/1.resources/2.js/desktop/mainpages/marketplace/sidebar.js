async function categories() {
    const result = await fetch(apiurl + '/metadata/getrarityjson', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: ''
    }).then((res) => res.json())

    rarity = result.data;
    let keys = Object.keys(rarity);
    let keyslen = keys.length;

    for (let i = 0; i < keyslen; i++) {
        let cat = rarity[keys[i]]
        let catkeys = Object.keys(cat)

        let divcat = document.createElement("div");

        let divcatname = document.createElement("div");
        divcatname.setAttribute("class", "catname pointer");
        divcatname.setAttribute("style", "display:flex;");
        divcatname.setAttribute("onclick", "togglehideshow('element" + keys[i] + "');");

        let pname = document.createElement("p");
        pname.setAttribute("style", "width:80%");
        pname.innerHTML = keys[i]
        let iname = document.createElement("i");
        iname.setAttribute("style", "display:inline-block;margin-right:5% ");
        iname.setAttribute("class", " arrow down");
        let pname2 = document.createElement("p");
        pname2.setAttribute("style", "font-size: 75%;display:inline-block;");
        pname2.innerHTML = catkeys.length + "&nbsp &nbsp";

        let divcatnameright = document.createElement("div");
        divcatnameright.setAttribute("style", "width:20%;");

        divcatnameright.appendChild(pname2)
        divcatnameright.appendChild(iname)


        divcatname.appendChild(pname)
        divcatname.appendChild(divcatnameright)
        divcat.appendChild(divcatname)
        document.getElementById("categories").appendChild(divcat);

        let catelement = document.createElement("div");
        catelement.setAttribute("class", "catelement");
        catelement.setAttribute("id", "element" + keys[i]);
        catelement.setAttribute("style", "display:block;");
        divcat.appendChild(catelement);

        for (let j = 0; j < catkeys.length; j++) {
            let divlabel = document.createElement("label");
            divlabel.setAttribute("class", "container");
            divlabel.setAttribute("style", "width:90%");
            divlabel.innerHTML = catkeys[j];

            let divinput = document.createElement("input");
            divinput.setAttribute("class", "container");
            divinput.setAttribute("type", "checkbox");
            divinput.setAttribute("id", `${String(keys[i]) + String(catkeys[j])}`);
            divinput.setAttribute("onchange", "filterbyattributes('" + keys[i] + "','" + catkeys[j] + "')");
            let divspan = document.createElement("span");
            divspan.setAttribute("class", "checkmark");

            let divname3 = document.createElement("div");
            let pname3 = document.createElement("p");

            pname3.innerHTML = cat[catkeys[j]].length;

            divname3.setAttribute("style", "font-size:80%; margin-right:0%; width:10%");
            divlabel.appendChild(divinput);
            divlabel.appendChild(divspan);
            let divouter = document.createElement("div");
            divouter.setAttribute("style", "display:flex;");
            divouter.appendChild(divlabel);
            divname3.appendChild(pname3);
            divouter.appendChild(divname3);
            catelement.appendChild(divouter);
        }
        let catheight = catelement.offsetHeight

        if (catkeys.length > 5) {
            catelement.style.height = 200 + "px";
        } else {
            // catelement.style.height = catheight + "px";
        }
        catelement.style.display = "none";
    }
}