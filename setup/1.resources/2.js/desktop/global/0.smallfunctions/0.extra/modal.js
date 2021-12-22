window.addEventListener('load', function() {
    // Get the modal
    var loginmodal = document.getElementById("loginmodal");

    // Get the button that opens the modal
    var loginbtn = document.getElementById("loginbtn");

    // Get the <span> element that loginclosebtns the modal
    var loginspan = document.getElementById("loginclosebtn");

    // When the user clicks on the button, open the modal
    loginbtn.onclick = function() {
        loginmodal.style.display = "block";
    }

    // When the user clicks on <span> (x), loginclosebtn the modal
    loginspan.onclick = function() {
        loginmodal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, loginclosebtn it
    window.onclick = function(event) {
        if (event.target == loginmodal) {
            loginmodal.style.display = "none";
        }

        var buysellmodal = document.getElementById("buysellmodal");
        if (buysellmodal) {
            if (event.target == buysellmodal) {
                buysellmodal.style.display = "none";
            }
        }
    }
});

window.addEventListener('load', function() {
    // Get the modal
    var buysellmodal = document.getElementById("buysellmodal");

    // Get the <span> element that loginclosebtns the modal
    var buysellspan = document.getElementById("buysellclosebtn");

    // When the user clicks on <span> (x), loginclosebtn the modal
    if (buysellspan) {
        buysellspan.onclick = function() {
            buysellmodal.style.display = "none";
        }
    }
});


function sell(abc) {
    checksellconditions(abc);
}