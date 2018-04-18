var dom = {};

Util.events(document, {
    "DOMContentLoaded": function () {
        dom.new_post_button = Util.one(".new-post-button");
        dom.user_image_selector = Util.one("#image-path");
        dom.submit_button = Util.one(".new-post-submit-button");
        dom.cancel_button = Util.one(".new-post-cancel-button");

        dom.new_post_button.addEventListener("click", overlay_on);
        dom.user_image_selector.setAttribute("onchange", "url()");
        dom.submit_button.addEventListener("click", getForm);
        dom.cancel_button.addEventListener("click", overlay_off);

    },
});

/*
https://www.w3schools.com/howto/howto_css_overlay.asp
 */
function overlay_on() {
    document.getElementById("overlay").style.display = "flex";
}

function overlay_off() {
    document.getElementById("overlay").style.display = "none";
}

/*
https://stackoverflow.com/questions/1628826/how-to-add-an-onchange-event-to-a-select-box-via-javascript
 */
function url() {
    var input = Util.one("#image-path");
    if (input.files !== undefined) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var image = Util.one('.user-image');
            image.setAttribute("src", e.target.result);
            image.classList.add("visible");
        };
        reader.readAsDataURL(input.files[0]);
    }
}

/*
https://stackoverflow.com/questions/588263/how-can-i-get-all-a-forms-values-that-would-be-submitted-without-submitting
 */
function getForm() {
    var user_image = Util.one("#user-image").getAttribute("src");
    var out = {image: user_image};

    var fields = [Util.one("#input-title"), Util.one("#input-text")];
    var buttons = Util.all(".new-post-form-radio-holder > label > input");

    for (var f of fields) {
        var label = f.id.substring(f.id.indexOf("#input-") + 7);
        if (label === "title" && f.value === "") {
            throw new NoTitleError;
        }
        out[label] = f.value;
    }

    var count = 0;
    for (var radio of buttons) {
        if (radio.checked === true) {
            if (radio.value === "share" && user_image === "") {
                throw new NoImageSharePostError;
            }
            out.category = radio.value;
            break;
        }
        count += 1;
    }
    if (count === buttons.length) {
        throw new NoPostCategoryError;
    }

    overlay_off();
    return out;
}

function NoTitleError() {}
NoTitleError.prototype = new Error();
function NoPostCategoryError() {}
NoPostCategoryError.prototype = new Error();
function NoImageSharePostError() {}
NoImageSharePostError.prototype = new Error();