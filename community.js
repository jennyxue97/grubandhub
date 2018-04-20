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

var dropped = false;

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
    if (!dropped){
        dropped = true;
        var dropdown = document.getElementById("categories");
        var share = document.createElement('button');
        share.id = 'share';
        share.innerHTML = 'Share';
        share.className = 'categoryOption';
        var help = document.createElement('button');
        help.id = 'help';
        help.innerHTML = 'Help';
        help.className = 'categoryOption';
        var tips = document.createElement('button');
        tips.id = 'tips'
        tips.innerHTML = 'Tips';
        tips.className = 'categoryOption';
        dropdown.appendChild(share);
        dropdown.appendChild(help);
        dropdown.appendChild(tips);
    }else{
        var categories = document.getElementById("categories");
        while (categories.firstChild){
            categories.removeChild(categories.firstChild);
        }
        dropped=false;
    }

}

function displayShrimpFriedRice(){
    document.getElementById("content").innerHTML = "<div class='fooditem'> <div class='foodtitle'> <a href='community.html'>SHRIMP FRIED RICE</a> </div> " + 
    "<div class='foodpic'> <img id='food' src='assets/shrimp_fried_rice.jpg'> </div> " + 
    "<div class='foodfooter'> <div class='footerinfo' id='foodcuisine'> CHINESE </div>" + 
    "<div class='footerinfo' id='fooddifficulty'> INTERMEDIATE </div> <div class='footerinfo' id='fooddifficulty'>" +
    "45 MIN </div> </div> </div>"
}