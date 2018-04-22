window.onload = function () {
    document.getElementById("chat-input").addEventListener("keydown", function(e) {
        // Enter is pressed
        if (e.keyCode == 13) { askQuestion()};
    });

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