let checkedcat = {};
async function filterbyattributes(input1, input2) {
    totalsupply = await gettotalsupply();

    if (totalsupply != 10000) {

    } else {
        filterbyattributes2(input1, input2);
    }
}

async function filterbyattributes2(input1, input2) {
    console.log("routea");
    await loadloading();
    console.log(input1, input2);
    if (checkedcat[input1]) {
        console.log("routeb");
        if (checkedcat[input1].includes(input2)) {
            console.log("routec");
            checkedcat[input1] = await removefromarray(checkedcat[input1], input2);
            document.getElementById(`${input1 + input2}`).checked = false;
            if (checkedcat[input1].length == 0) {
                console.log("routed");
                delete checkedcat[input1];
            }
        } else {
            console.log("routee");
            checkedcat[input1].push(input2);
        }
    } else {
        console.log("routef");
        checkedcat[input1] = [input2];
    }
    console.log(checkedcat);
    calculatetokens(checkedcat, input1, input2);
}


let finalcattokens;
let finalcattokensarray = [];
async function calculatetokens(checkedcat, input1, input2) {
    let keys = Object.keys(checkedcat);
    console.log(keys);
    finalcattokensarray = [];


    for (let i = 0; i < keys.length; i++) {
        let curarray = checkedcat[keys[i]];
        tokenscurrentcat = [];
        for (let j = 0; j < curarray.length; j++) {
            let tokens = rarity[keys[i]][curarray[j]];
            for (let k = 0; k < tokens.length; k++) {
                tokenscurrentcat.push(tokens[k]);
            }
        }
        finalcattokensarray.push(tokenscurrentcat);
    }
    console.log(finalcattokensarray);
    newfinaltokens = [];
    cleartable();
    catdone = false;
    populate(total, total + 20);
    //document.getElementById("description").scrollIntoView();
}

async function addbuttons(keys) {
    document.getElementById("buttons").innerHTML = "";
    console.log(keys);
    for (let i = 0; i < keys.length; i++) {
        let curarray = checkedcat[keys[i]];
        for (let j = 0; j < curarray.length; j++) {
            let button = document.createElement("button");
            let span = document.createElement("span");
            button.setAttribute("class", "graybuttonhollow iconbtn");
            button.setAttribute("style", "font-size:80%; padding:10px; padding-right:10px; margin-right:0.5%; margin-bottom: 0.5%;");
            button.setAttribute("onclick", `filterbyattributes('${keys[i]}', '${checkedcat[keys[i]][j]}')`)
            span.setAttribute("class", "icon crossicon");
            span.innerHTML = checkedcat[keys[i]][j];
            button.appendChild(span);
            document.getElementById("buttons").appendChild(button);
        }
    }
}