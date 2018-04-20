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

const cuisine = ['American', 'Chinese', 'French', 'German', 'Italian', 'Mexican', 'Vietnamese'];
var showCuisines = false;

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

function showCuisineDropDown(){
    if (!showCuisines){
        showCuisines = true;
        var dropDown = document.getElementById('dropdown');
        var cuisineDropDown = document.createElement('div');
        cuisineDropDown.id = 'cuisineDropDown';

        var cuisineOptions = document.createElement('table');
        cuisineOptions.id = 'cuisineOptions';

        var buttons = createCuisineCheckboxes();

        var row;
        for (var i=0; i<buttons.length;i++){
            if (i%3==0){
                row = cuisineOptions.insertRow(i/3);
            }
            var cell = row.insertCell(i%3);
            cell.id = cuisine[i];
            cell.className = 'cuisineLabel';
            cell.appendChild(buttons[i]);
        }
        cuisineDropDown.appendChild(cuisineOptions)

        var cancelSubmit = createCancelAndSubmitButton(1);
        var controls = document.createElement('div');
        controls.id='controls';
        for (var i=0;i<cancelSubmit.length;i++){
            controls.appendChild(cancelSubmit[i]);
        }
        cuisineDropDown.appendChild(controls);
        dropDown.appendChild(cuisineDropDown);
    }
}

function createCuisineCheckboxes(){
    var buttons = []
    for (var i=0; i<cuisine.length;i++){
        var label = document.createElement('label');
        var checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        label.appendChild(checkBox);
        label.appendChild(document.createTextNode(cuisine[i]));
        buttons.push(label);
    }
    return buttons;
}

function createCancelAndSubmitButton(dropdown){
    var buttons = []
    var cancel = document.createElement('button');
    cancel.className = 'controlButton';
    cancel.type = 'submit';
    cancel.innerHTML = 'cancel';
    if (dropdown == 1){
        cancel.onclick = closeCuisineDropDown;
    }else{
        cancel.onclick = closeTimeLimit;
    }
    buttons.push(cancel);

    var confirm = document.createElement('button');
    confirm.className = 'controlButton';
    confirm.type = 'submit';
    confirm.innerHTML = 'confirm';

    if (dropdown == 1){
        confirm.onclick = applyFilters;
    }else{
        confirm.onclick = applyTimeLimit;
    }
    buttons.push(confirm);
    return buttons;
}

function closeCuisineDropDown(){
    // var dropDown = document.getElementById('dropdown');
    document.getElementById('cuisineDropDown').remove();
    showCuisines = false;
}

function closeTimeLimit(){
    document.getElementById('timeDropDown').remove();
}

function applyFilters(){
    document.getElementById('alfredo').remove();
    document.getElementById('benedict').remove();
    document.getElementById('bunBoHue').remove();
    document.getElementById('chicken').remove();
    document.getElementById('chickenAvocado').remove();
    displayShrimpFriedRice();
    var tags = document.getElementById('tags');
    var tag = document.createElement('button');
    tag.id = 'tag'
    tag.className = 'dropdowntoggle';
    tag.innerHTML = 'Chinese';
    tags.appendChild(tag);
    closeCuisineDropDown();
}

function applyTimeLimit(){
    // document.getElementById('alfredo').remove();
    // document.getElementById('bunBoHue').remove();
    // document.getElementById('chicken').remove();
    displayShrimpFriedRice();
    var tags = document.getElementById('tags');
    var tag = document.createElement('button');
    tag.id = 'tag'
    tag.className = 'dropdowntoggle';
    tag.innerHTML = '30 min';
    tags.appendChild(tag);
    closeTimeLimit();
}

function showTimeLimit(){
    var dropDown = document.getElementById('dropdown');
    var timeDropDown = document.createElement('div');
    timeDropDown.id = 'timeDropDown';

    var inputLine = document.createElement('div');
    inputLine.id = 'inputLine';
    var label = document.createElement('label');
    label.innerHTML = 'Less than ';
    var input = document.createElement('input');
    input.id = 'timeLimit';
    var otherLabel = document.createElement('label');
    otherLabel.innerHTML = ' minutes';
    inputLine.appendChild(label);
    inputLine.appendChild(input);
    inputLine.appendChild(otherLabel);
    timeDropDown.appendChild(inputLine);

    var cancelSubmit = createCancelAndSubmitButton(2);
    var controls = document.createElement('div');
    controls.id='controls';
    for (var i=0;i<cancelSubmit.length;i++){
        controls.appendChild(cancelSubmit[i]);
    }
    timeDropDown.appendChild(controls);
    dropDown.append(timeDropDown);
}

function displayShrimpFriedRice(){
    document.getElementById("content").innerHTML = "<div class='fooditem'> <div class='foodtitle'> <a href='courseChapter1.html'>SHRIMP FRIED RICE</a> </div> " + 
    "<div class='foodpic'> <a href='courseChapter1.html'><img id='food' src='assets/shrimp_fried_rice.jpg'> </div> </a> " + 
    "<div class='foodfooter'> <div class='footerinfo' id='foodcuisine'> CHINESE </div>" + 
    "<div class='footerinfo' id='fooddifficulty'> INTERMEDIATE </div> <div class='footerinfo' id='fooddifficulty'>" +
    "45 MIN </div> </div> </div>"
}