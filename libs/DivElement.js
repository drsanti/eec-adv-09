function DivElement() {
    this.divEle = document.createElement('div');
    this.divEle.id = `div-${Math.floor(Math.random() * 10000000)}`;
}

DivElement.prototype.getId = function () {
    return this.divEle.id;
}

DivElement.prototype.setHtml = function (html) {
    this.divEle.innerHTML = html;
}

DivElement.prototype.getElement = function () {
    return this.divEle;
}

DivElement.prototype.addChild = function (childId) {
    const child = document.getElementById(childId);
    this.getElement().appendChild(child);
    return this;
}

DivElement.prototype.addTo = function (parantId) {
    const parent = document.getElementById(parantId);
    parent.appendChild(this.getElement);
    return this;
}

DivElement.prototype.addToBody = function () {
    document.body.appendChild(this.getElement);
    return this;
}

DivElement.prototype.addClass = function (className) {
    this.getElement().classList.add(className);
    return this;
}

DivElement.prototype.removeClass = function (className) {
    this.getElement().classList.remove(className);
    return this;
}
