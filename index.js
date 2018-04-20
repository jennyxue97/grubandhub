window.onload = function () {
    document.getElementById("searchbar").focus();

    document.getElementById("searchbar").addEventListener("keydown", function(e) {
        // Enter is pressed
        if (e.keyCode == 13) { submitForm()};
    });

    document.getElementById("find").onclick = function onSubmit(form) {
        submitForm();
    }
}

function submitForm(){
    var isValid = true;
    var query = document.getElementById("searchbar").value;
    if (query.toLowerCase() != "shrimp fried rice") {
        isValid = false;
    }

    if (!isValid) {
        document.getElementById("searchbar").value = "";
        window.location.reload(false); 
        return false;
    }
    else {
        displayShrimpFriedRice();
        return true;
    }
}

function displayShrimpFriedRice(){
    document.getElementById("content").innerHTML = "<div class='fooditem'> <div class='foodtitle'> <a href='courseChapter1.html'>SHRIMP FRIED RICE</a> </div> " + 
    "<div class='foodpic'> <a href='courseChapter2.html'><img id='food' src='assets/shrimp_fried_rice.jpg'> </div> </a> " + 
    "<div class='foodfooter'> <div class='footerinfo' id='foodcuisine'> CHINESE </div>" + 
    "<div class='footerinfo' id='fooddifficulty'> INTERMEDIATE </div> <div class='footerinfo' id='fooddifficulty'>" +
    "45 MIN </div> </div> </div>"
}