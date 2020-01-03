function setConfig() {
    var texts = {
        title: "School Of Net"
    }

    document.title = texts.title;

    var title = document.getElementById("title");
    title.textContent = texts.title;
}

setConfig();