var EventUtil = {
    getEvent: function(e) {
        if (!e) {
            e = window.event;
        }

        return e;
    },

    getTarget: function(e) {
        return e.target || e.srcElement;
    },

    addHandler: function(el, type, handler) {
        if (el.addEventListener) {
            el.addEventListener(type, handler, false);
        }
        else if (el.attachEvent) {
            el.attachEvent("on" + type, handler);
        }
        else {
            el["on" + type] = handler;
        }
    },

    removeHandler: function(el, type, handler) {
        if (el.removeEventListener) {
            el.removeEventListener(type, handler, false);
        }
        else if (el.detachEvent) {
            el.detachEvent("on" + type, handler);
        }
        else {
            el["on" + type] = null;
        }
    }
}

function validation(evt) {
    var e = EventUtil.getEvent(evt);
    e.preventDefault();
        
    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var price = document.getElementById("price").value;
    var error = document.getElementById("errors");
    
    var errors = "";

    error.style.display = "none";

    if (desc === "") {
        errors += "<p>Fill out description</p>";
    }

    if (amount === "") {
        errors += "<p>Fill out amount</p>";
    }
    else if (amount != parseInt(amount)) {
        errors += "<p>Fill out a valid amount</p>"; 
    }

    if (price === "") {
        errors += "<p>Fill out price</p>";
    }
    else if (price != parseFloat(price)) {
        errors += "<p>Fill out a valid price</p>";
    }

    if (errors != "") {
        error.style.display = "block";
        error.innerHTML = "<h3>Error:</h3>" + errors;
    } else {
        form.submit();
    }
}

var form = document.getElementById("form");
form.addEventListener("submit", validation, false);