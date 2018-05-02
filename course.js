window.onload = function () {
    setUpVideo();
    addMaterialCheckboxes();

    document.getElementById("chat-input").addEventListener("keydown", function(e) {
        // Enter is pressed
        if (e.keyCode == 13) { askQuestion()};
    });
};

window.onkeydown = function(e) {
    var key = e.keyCode ? e.keyCode : e.which;
    // Enter key or right arrow
    if (key == 39 /*|| key == 13*/) {
        document.getElementById("continue-button").click();
    }
    // Left arrow
    if (key == 37) {
        document.getElementById("previous-button").click();
    }
 }

function addMaterialCheckboxes(){
    var items = document.getElementsByClassName("material-item");
    for (var idx = 0; idx < items.length; idx++) {
        items[idx].insertAdjacentHTML('afterbegin', '<input type="checkbox" style="font-size: 1.5em;">&nbsp;');
    }
}

function askQuestion(){
    var question = document.createElement('div');
    question.className = "chat-question";
    question.innerHTML = document.getElementById("chat-input").value;
    document.getElementById("chat-text").appendChild(question);
    document.getElementById("chat-input").value = "";
    setTimeout(function () {
        var answer = document.createElement('div');
        answer.className = "chat-answer";
        answer.innerHTML = "Sorry, the chat service is currently unavailable, please check back in a few minutes.";
        document.getElementById("chat-text").appendChild(answer);
    }, 1000);
}


// get the video in html (note there are many pages and this js file is to work with all of them)
var iframe = document.getElementsByTagName("iframe")[0];
// Object from Youtube API
var player;

/*
https://developers.google.com/youtube/player_parameters
*/
function setUpVideo() {
    // Load the IFrame Player API code asynchronously. Needs to be done here in JS (according to API)
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/player_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

// This function initializes YouTube player after the API code downloads.
function onYouTubeIframeAPIReady() {
    console.log("hit");
    player = new YT.Player("video", {
        events: {
            onReady: playVideo
        }
    });
}

// This function plays video without sound,
// once the player is ready.
function playVideo() {
    player.playVideo();
    player.mute();
}

function changeTime(seconds) {
    player.seekTo(seconds);
}