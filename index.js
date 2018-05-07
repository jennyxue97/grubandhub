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
const difficulties = ['Beginner','Intermediate','Advanced'];
var showCuisines = false;
var showTime = false;
var showDifficultyDropdown = false;

var cuisineTag = false;
var timeTag = false;
var difficultyTag = false;

function submitForm(){
    var isValid = true;
    var query = document.getElementById("searchbar").value;
    if (query.toLowerCase() == "") {
        isValid = false;
    }

    if (!isValid) {
        document.getElementById("searchbar").value = "";
        window.location.reload(false); 
        document.getElementById("subtitle").innerHTML = "RECOMMENDED";
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

        if (showTime){
            closeTimeLimit();
        }
        if (showDifficultyDropdown){
            closeDifficultyDropdown();
        }

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
    }else{
        closeCuisineDropDown();
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
    }else if(dropdown ==2){
        cancel.onclick = closeTimeLimit;
    }else{
        cancel.onclick = closeDifficultyDropdown;
    }
    buttons.push(cancel);

    var confirm = document.createElement('button');
    confirm.className = 'controlButton';
    confirm.type = 'submit';
    confirm.innerHTML = 'confirm';

    if (dropdown == 1){
        confirm.onclick = applyFilters;
    }else if (dropdown ==2){
        confirm.onclick = applyTimeLimit;
    }else{
        confirm.onclick = applyDifficulty;
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
    showTime = false;
    document.getElementById('timeDropDown').remove();
}

function applyFilters(){
    if (!cuisineTag){
        if (document.getElementById('alfredo') != null){
            document.getElementById('alfredo').remove();
        }
        if (document.getElementById('benedict') != null){
            document.getElementById('benedict').remove();
        }
        if (document.getElementById('bunBoHue') != null){
            document.getElementById('bunBoHue').remove();
        }
        if (document.getElementById('chicken') != null){
            document.getElementById('chicken').remove();
        }
        if (document.getElementById('chickenAvocado') != null){
            document.getElementById('chickenAvocado').remove();
        }

        displayShrimpFriedRice();
        var tags = document.getElementById('tags');
        var tag = document.createElement('button');
        tag.id = 'cuisineTag'
        tag.className = 'dropdowntoggle';
        tag.innerHTML = 'Chinese';
        tags.appendChild(tag);
        tag.onclick = removeCuisineTag;
    }
    closeCuisineDropDown();
    cuisineTag = true;
}

function removeCuisineTag(){
    cuisineTag = false;
    if (!difficultyTag && !cuisineTag && !timeTag){
        window.location.href = "index.html";
    }else{
        document.getElementById('cuisineTag').remove();
    }
}

function applyTimeLimit(){
    if (!timeTag){
        displayShrimpFriedRice();
        var tags = document.getElementById('tags');
        var tag = document.createElement('button');
        tag.id = 'timeTag'
        tag.className = 'dropdowntoggle';
        tag.innerHTML = '30 min';
        tags.appendChild(tag);
        tag.onclick = removeTimeTag;
    }
    closeTimeLimit();
    timeTag = true;
}

function removeTimeTag(){
    timeTag = false;
    if (!difficultyTag && !cuisineTag && !timeTag){
        window.location.href = "index.html";
    }else{
        document.getElementById('timeTag').remove();
    }
}

function showTimeLimit(){
    if (!showTime){
        showTime = true;
        if (showCuisines){
            closeCuisineDropDown();
        }
        if (showDifficultyDropdown){
            closeDifficultyDropdown();
        }
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
    }else{
        closeTimeLimit();
    }
}

function showDifficulty(){
    if (!showDifficultyDropdown){
        showDifficultyDropdown = true;
        if (showTime){
            closeTimeLimit();
        }
        if (showCuisines){
            closeCuisineDropDown();
        }
        var dropDown = document.getElementById('dropdown');
        var difficultyDropdown = document.createElement('div');
        difficultyDropdown.id = 'difficultyDropdown';

        var difficultyOptions = document.createElement('table');
        difficultyOptions.id = 'difficultyOptions';

        var buttons = createDifficultyOptions();

        var row;
        for (var i=0; i<buttons.length;i++){
            if (i%3==0){
                row = difficultyOptions.insertRow(i/3);
            }
            var cell = row.insertCell(i%3);
            cell.id = difficulties[i];
            cell.className = 'difficultyLabel';
            cell.appendChild(buttons[i]);
        }
        difficultyDropdown.appendChild(difficultyOptions);

        var cancelSubmit = createCancelAndSubmitButton(3);
        var controls = document.createElement('div');
        controls.id='controls';
        for (var i=0;i<cancelSubmit.length;i++){
            controls.appendChild(cancelSubmit[i]);
        }
        difficultyDropdown.appendChild(controls);
        dropDown.appendChild(difficultyDropdown);
    }else{
        closeDifficultyDropdown();
    }
}

function createDifficultyOptions(){
    var buttons = []
    for (var i=0; i<difficulties.length;i++){
        var label = document.createElement('label');
        var checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        label.appendChild(checkBox);
        label.appendChild(document.createTextNode(difficulties[i]));
        buttons.push(label);
    }
    return buttons;
}

function closeDifficultyDropdown(){
    if (document.getElementById('difficultyDropdown') != null){
        showDifficultyDropdown = false;
        document.getElementById('difficultyDropdown').remove();
    }
}

function applyDifficulty(){
    if (!difficultyTag){
        displayShrimpFriedRice();
        var tags = document.getElementById('tags');
        var tag = document.createElement('button');
        tag.id = 'difficultyTag'
        tag.className = 'dropdowntoggle';
        tag.innerHTML = 'Intermediate';
        tags.appendChild(tag);
        tag.onclick = removeDifficultyTag;
    }
    closeDifficultyDropdown();
    difficultyTag = true;
}

function removeDifficultyTag(){
    difficultyTag = false;
    if (!difficultyTag && !cuisineTag && !timeTag){
        window.location.href = "index.html";
    }else{
        document.getElementById('difficultyTag').remove();
    }
}

function displayShrimpFriedRice(){
    document.getElementById("content").innerHTML = "<div class='fooditem'> <div class='foodtitle'> <a href='courseChapter1.html'>SHRIMP FRIED RICE</a> </div> " + 
    "<div class='foodpic'> <a href='courseChapter1.html'><img id='food' src='assets/shrimp_fried_rice.jpg'> </div> </a> " + 
    "<div class='foodfooter'> <div class='footerinfo' id='foodcuisine'> CHINESE </div>" + 
    "<div class='footerinfo' id='fooddifficulty'> INTERMEDIATE </div> <div class='footerinfo' id='fooddifficulty'>" +
    "30 MIN </div> </div> </div>";
    document.getElementById("subtitle").innerHTML = "RESULTS";
}