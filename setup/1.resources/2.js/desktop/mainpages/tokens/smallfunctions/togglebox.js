async function togglediv(input) {
    let currentdiv = document.getElementById(input + "div");
    let currentarrow = document.getElementById(input + "arrow");
    if (currentdiv.style.display == "none") {
        currentdiv.style.display = "block";
        currentarrow.setAttribute("class", "arrowdark up");
    } else {
        currentdiv.style.display = "none";
        currentarrow.setAttribute("class", "arrowdark down");
    }
}