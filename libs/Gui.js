var Gui = Gui || {};

Gui.createDiv = function () {
    return document.createElement('div');
}


Gui.createHiddenDiv = function () {
    const div = document.createElement('div');
    div.style.visibility = 'hidden';
    return div;
}

Gui.getElement = function (id) {
    return document.getElementById(id);
}

Gui.generateUid = function (prefix) {
    return `uid-${prefix ? prefix : ''}-${Math.floor(Math.random() * 10000000)}`;
}
