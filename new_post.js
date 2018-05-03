var dom = {};

Util.events(document, {
    "DOMContentLoaded": function () {
        dom.new_post_button = Util.one(".new-post-button");
        dom.user_image_selector = Util.one("#image-path");
        dom.submit_button = Util.one(".new-post-submit-button");
        dom.cancel_button = Util.one(".new-post-cancel-button");
        dom.upload_button = Util.one(".new-post-upload-button");

        dom.new_post_button.addEventListener("click", overlay_on);
        dom.user_image_selector.setAttribute("onchange", "url()");
        dom.submit_button.addEventListener("onclick", getValidateForm);
        dom.cancel_button.addEventListener("click", overlay_off);
        Util.one("#image-path").addEventListener("change", remove_no_image_share);
<<<<<<< HEAD
=======
        Util.one("#input-title").addEventListener("change", check_title);

        var buttons = Util.all(".new-post-form-radio-holder > label > input");
        for (var b of buttons) {
            b.addEventListener("change", check_radio);
        }
>>>>>>> d45e079646621cccd31acb9460b2c84d1563dccc
    },
});

/*
https://www.w3schools.com/howto/howto_css_overlay.asp
 */
function overlay_on() {
    document.getElementById("overlay").style.display = "flex";
    document.body.style.overflow = "hidden";
}

function overlay_off() {
    document.getElementById("overlay").style.display = "none";
    document.body.style.overflow = "auto";


    // reset form
    // delete image being shown
    var user_image = Util.one(".user-image");
    user_image.src = "";
    user_image.classList.remove("visible");

    // clear text
    var fields = [Util.one("#input-title"), Util.one("#input-text")];
    for (var f of fields) {
        f.value = "";
    }

    // reset buttons
    var buttons = Util.all(".new-post-form-radio-holder > label > input");
    for (var radio of buttons) {
        radio.checked = false;
    }

    // reset errors
    remove_no_image_share();
    remove_no_title();
    remove_no_post_category();
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


function getValidateForm() {
    var form;
    try {
        form = getFormHelper()
    } catch (e) {
        if (e instanceof FormError) {
            if (e.errors.includes("no_image_share")) {
                no_image_share();
            } if (e.errors.includes("no_title")) {
                no_title();
            } if (e.errors.includes("no_post_category")) {
                no_post_category();
            }
        }
        throw e;
    }
    remove_no_image_share();
<<<<<<< HEAD
    // remove_no_title();
    // remove_no_post_category();
=======
    remove_no_title();
    remove_no_post_category();
>>>>>>> d45e079646621cccd31acb9460b2c84d1563dccc
    return form;
}

/*
https://stackoverflow.com/questions/588263/how-can-i-get-all-a-forms-values-that-would-be-submitted-without-submitting
Helper for getValidateForm, errors handled in parent function
 */
function getFormHelper() {
    var error = new FormError();
    error.errors = [];

    var user_image = Util.one(".user-image").getAttribute("src");
    var out = {image: user_image};

    var fields = [Util.one("#input-title"), Util.one("#input-text")];
    var buttons = Util.all(".new-post-form-radio-holder > label > input");

    for (var f of fields) {
        var label = f.id.substring(f.id.indexOf("#input-") + 7);
        if (label === "title" && f.value === "") {
            error.errors.push("no_title");
        }
        out[label] = f.value;
    }

    var count = 0;
    for (var radio of buttons) {
        if (radio.checked === true) {
            if (radio.value === "Share" && (user_image === "" || user_image === undefined)) {
                error.errors.push("no_image_share");
            }
            out.category = radio.value;
            break;
        }
        count += 1;
    }
    if (count === buttons.length) {
        error.errors.push("no_post_category");
    }

    if (error.errors.length !== 0) {
        throw error;
    }

    overlay_off();
    return out;
}

function FormError() {}
FormError.prototype = new Error();

function no_image_share() {
    var error_message = Util.create("div", {class: "error-message no-image-share", id: "no-image-share"});
    error_message.innerHTML = "Please upload an image for Share posts";

    var current_margin = getComputedStyle(Util.one(".new-post-title-row")).marginBottom;
    current_margin = parseFloat(current_margin.substring(0, current_margin.length - 2));  // get rid of "px"

    Util.one(".new-post").insertBefore(error_message, dom.upload_button);
    var message_height = getComputedStyle(Util.one("#no-image-share")).height;
    message_height = parseFloat(message_height.substring(0, message_height.length - 2)) + 1;  // get rid of "px"

    Util.one(".new-post-title-row").style.setProperty("margin-bottom", (current_margin-message_height).toString() + "px");

    dom.upload_button.classList.add("error-button")
}

function remove_no_image_share() {
    dom.upload_button.classList.remove("error-button");

    var message = Util.one("#no-image-share");
    if (message === null) {
        return
    }
    var current_margin = getComputedStyle(Util.one(".new-post-title-row")).marginBottom;
    current_margin = parseFloat(current_margin.substring(0, current_margin.length - 2));  // get rid of "px"

    var message_height = getComputedStyle(Util.one("#no-image-share")).height;
    message_height = parseFloat(message_height.substring(0, message_height.length - 2)) + 1;  // get rid of "px"

    Util.one(".new-post-title-row").style.setProperty("margin-bottom", (current_margin+message_height).toString() + "px");

    message.parentNode.removeChild(message);
}

<<<<<<< HEAD
=======
function check_title() {
    if (Util.one("#input-title").value === "") {
        no_title();
    } else {
        remove_no_title();
    }
}

>>>>>>> d45e079646621cccd31acb9460b2c84d1563dccc
function no_title() {
    var title_input = Util.one("#input-title");
    // title_input.setAttribute("placeholder", " Please give a title for the post");
    title_input.classList.add("error-button");
}

<<<<<<< HEAD
function no_post_category() {
    var radio_group = Util.one(".new-post-form-radio-holder");
    radio_group.classList.add("error-button");
=======
function remove_no_title() {
    var title_input = Util.one("#input-title");
    title_input.classList.remove("error-button");
}

function check_radio() {
    var buttons = Util.all(".new-post-form-radio-holder > label > input");

    for (var radio of buttons) {
        if (radio.checked === true) {
            remove_no_post_category();
            return;
        }
    }
    no_post_category();
}

function no_post_category() {
    var radio_group = Util.one(".new-post-form-radio-holder");
    radio_group.classList.add("error-button");
}

function remove_no_post_category() {
    var radio_group = Util.one(".new-post-form-radio-holder");
    radio_group.classList.remove("error-button");
>>>>>>> d45e079646621cccd31acb9460b2c84d1563dccc
}