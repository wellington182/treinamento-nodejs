var list = [
    {desc: "rice", amount: 1, price: "5.40"},
    {desc: "beer", amount: 12, price: "1.99"},
    {desc: "meat", amount: 1, price: "15.00"}
]

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

function setList() {
    var table = '<thead><tr><th scope="col">Descrição</th><th scope="col">Amount</th><th scope="col">Price</th><th scope="col">Action</th></tr></thead><tbody>';

    for(var i = 0; i < list.length; i++) {
        table += "<tr id=\"" + i + "\"><td>" + formatDesc(list[i].desc) + "</td><td>" + list[i].amount + "</td><td>" + formatValue(list[i].price) + "</td><td><button class=\"btn btn-default btnEdit\">Edit</button> <button class=\"btn btn-default btnDelete\">Delete</button></td></tr>";
    }

    table += "</tbody>";
    document.getElementById("tabela").innerHTML = table;   
}

var tabela = document.getElementById("tabela");
EventUtil.addHandler(tabela, "click", action);

setList();
document.getElementById("btnUpdate").style.display = "none";

function getTotal() {
    var total = 0;

    for (var i = 0; i < list.length; i++) {
        total += list[i].amount * list[i].price;
    }

    return total;
}

function formatDesc(desc) {
    var str = desc.toLowerCase();
    str = str.charAt(0).toUpperCase() + str.slice(1);

    return str;
}

function formatAmount(amount) {
    return parseInt(amount);
}

function formatValue(price) {
    var str = parseFloat(price).toFixed(2);
    str = "$" + str.toString().replace(".", ",");
    
    return str;
}

function addData() {
    if (validation()) {
        return;
    }

    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var price = document.getElementById("price").value;

    list.unshift({"desc": desc, "amount": amount, "price": price});

    resetForm();
    setList();
}

var btnAdd = document.getElementById("btnAdd");
EventUtil.addHandler(btnAdd, "click", addData);

function action(e) {
    var event = EventUtil.getEvent(e); 
    var target = EventUtil.getTarget(event);
    var id = target.parentNode.parentNode.id;
    
    if (target.className.indexOf("btnEdit") >= 0) {
        setUpdate(id);
    }
    else if (target.className.indexOf("btnDelete") >= 0){
        deleteData(id);
    }
}

function setUpdate(id) {    
    var obj = list[id];

    document.getElementById("desc").value = obj.desc;
    document.getElementById("amount").value = obj.amount;
    document.getElementById("price").value = obj.price;

    document.getElementById("btnAdd").style.display = "none";
    var btnUpdate = document.getElementById("btnUpdate");
    btnUpdate.style.display = "inline-block";
    
    var input = document.createElement("input");
    input.id = "hidden";
    input.setAttribute("type", "hidden");
    btnUpdate.appendChild(input);
    input.value = id;

}

function resetForm() {
    document.getElementById("desc").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("price").value = "";

    document.getElementById("btnAdd").style.display = "inline-block";
    document.getElementById("btnUpdate").style.display = "none";
}

var btnReset = document.getElementById("btnReset");
EventUtil.addHandler(btnReset, "click", resetForm);

function updateForm() {
    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var price = document.getElementById("price").value;
    var id = document.getElementById("hidden").value;
    
    list[id] = {"desc": desc, "amount": amount, "price": price};

    setList();
    
    resetForm();
}

var btnSave = document.getElementById("btnSave");
EventUtil.addHandler(btnSave, "click", updateForm);

function deleteData(id) {
    
    if (confirm("Delete this item?")) {
        // if (id == list.length - 1) {
        //     list.pop();
        // }
        // else if (id == 0) {
        //     list.shift();
        // }
        // else {
        //     var first = list.slice(0, id);
        //     var last = list.slice(id + 1);

        //     list = first.concat(last);
        // }
        
        // var lista = [];
        // list.forEach(function(el, ind, list) {
        //                 if (ind != id) lista.push(el);
        //            });

        // list = lista;

        list = list.filter(function(ele, ind, obj) {
            return ind != id;
        });

        setList();
        
        document.getElementById("errors").style.display = "none";
    }
}

function validation() {
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
        return true;
    } else {
        return false;
    }
}


// alert(getTotal());