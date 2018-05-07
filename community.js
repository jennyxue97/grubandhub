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

const categories = ['Share','Help','Tips'];
var showCategoryDrop = false;
var filters = false;

function addNewPost(){
    var data = getValidateForm();
    var currentContent = document.getElementById("content").innerHTML;
    var newData = "<div class='post'> <div class='postpic'> <img src=" + data.image + "> </div>" +
    "<div class='postinfo'> <div class='postheader'> <div class='posttitle'> <a href='communityPage.html'>" + data.title.toUpperCase() +
    "</a> </div> <div class='postfooter'>" + data.category + "</div> </div> <div class='postdescription'><p>" + 
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
    if (!showCategoryDrop){
        showCategoryDrop = true;
        var dropDown = document.getElementById('categories');
        var categoryDropdown = document.createElement('div');
        categoryDropdown.id = 'categoryDropdown';

        var categoryOptions = document.createElement('table');
        categoryOptions.id = 'categoryOptions';

        var buttons = createCategoryOption();

        var row;
        for (var i=0; i<buttons.length;i++){
            if (i%3==0){
                row = categoryOptions.insertRow(i/3);
            }
            var cell = row.insertCell(i%3);
            cell.id = categories[i];
            cell.className = 'categorylabel';
            cell.appendChild(buttons[i]);
        }
        categoryDropdown.appendChild(categoryOptions)

        var cancelSubmit = createCancelAndSubmitButton();
        var controls = document.createElement('div');
        controls.id='controls';
        for (var i=0;i<cancelSubmit.length;i++){
            controls.appendChild(cancelSubmit[i]);
        }
        categoryDropdown.appendChild(controls);
        dropDown.appendChild(categoryDropdown);
    }else{
        showCategoryDrop = false;
        closeCategoryOption();
    }

}

function applyFilter(){
    if (!filters){
        var tags = document.getElementById('tags');
        var tag = document.createElement('button');
        tag.id = 'filter'
        tag.className = 'dropdowntoggle';
        tag.innerHTML = 'Help';
        tags.appendChild(tag);
        tag.onclick = removeFilter;

        document.getElementById('subtitle').innerHTML = "RESULTS";
    }
    closeCategoryOption();
    filters = true;
}

function removeFilter(){
    filters = false;
    document.getElementById('filter').remove();
    document.getElementById('subtitle').innerHTML = "MOST RECENT";
}

function createCategoryOption(){
    var buttons = []
    for (var i=0; i<categories.length;i++){
        var label = document.createElement('label');
        var checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        label.appendChild(checkBox);
        label.appendChild(document.createTextNode(categories[i]));
        buttons.push(label);
    }
    return buttons;
}

function closeCategoryOption(){
    showCategoryDrop = false;
    document.getElementById("categoryDropdown").remove();
}

function createCancelAndSubmitButton(){
    var buttons = []
    var cancel = document.createElement('button');
    cancel.className = 'controlButton';
    cancel.type = 'submit';
    cancel.innerHTML = 'cancel';
    cancel.onclick = closeCategoryOption;
    buttons.push(cancel);

    var confirm = document.createElement('button');
    confirm.className = 'controlButton';
    confirm.type = 'submit';
    confirm.innerHTML = 'confirm';

    confirm.onclick = applyFilter;
    buttons.push(confirm);
    return buttons;
}

function displayShrimpFriedRice(){
    document.getElementById("content").innerHTML = "<div class='fooditem'> <div class='foodtitle'> <a href='community.html'>SHRIMP FRIED RICE</a> </div> " + 
    "<div class='foodpic'> <img id='food' src='assets/shrimp_fried_rice.jpg'> </div> " + 
    "<div class='foodfooter'> <div class='footerinfo' id='foodcuisine'> CHINESE </div>" + 
    "<div class='footerinfo' id='fooddifficulty'> INTERMEDIATE </div> <div class='footerinfo' id='fooddifficulty'>" +
    "45 MIN </div> </div> </div>"
}