window.onload = function () {
    document.getElementById("searchbar").focus();

    document.getElementById("searchbar").addEventListener("keydown", function(e) {
        // Enter is pressed
        if (e.keyCode == 13) { submitForm()};
    });

    document.getElementById("find").onclick = function onSubmit(form) {
        submitForm();
    }

    document.getElementById("new-post-submit-button").onclick = function onSubmitPost(){
        addNewPost();
    }
}

function addNewPost(){
    var data = getForm();
    var currentContent = document.getElementById("content").innerHTML;
    var newData = "<div class='post'> <div class='postpic'> <img src=" + data.image + "> </div>" +
    "<div class='postinfo'> <div class='postheader'> <div class='posttitle'>" + data.title.toUpperCase() +
    "</div> <div class='postfooter'>" + data.category + "</div> </div> <div class='postdescription'><p>" + 
    data.text + "</p> </div> </div> </div>";
    document.getElementById("content").innerHTML = newData + currentContent;
}

function submitForm(){
    var isValid = true;
    var query = document.getElementById("searchbar").value;
    // if (query.toLowerCase() != "shrimp fried rice") {
    //     isValid = false;
    // }

    // if (!isValid) {
    //     document.getElementById("searchbar").value = "";
    //     window.location.reload(false); 
    //     return false;
    // }
    // else {
    //     displayShrimpFriedRice();
    //     return true;
    // }
}

function createDropdown(){
    var dropdown = document.getElementById("categories");

}

function displayShrimpFriedRice(){
    document.getElementById("content").innerHTML = "<div class='fooditem'> <div class='foodtitle'> <a href='community.html'>SHRIMP FRIED RICE</a> </div> " + 
    "<div class='foodpic'> <img id='food' src='assets/shrimp_fried_rice.jpg'> </div> " + 
    "<div class='foodfooter'> <div class='footerinfo' id='foodcuisine'> CHINESE </div>" + 
    "<div class='footerinfo' id='fooddifficulty'> INTERMEDIATE </div> <div class='footerinfo' id='fooddifficulty'>" +
    "45 MIN </div> </div> </div>"
}