function Button(options /*text, className, parentId, callback*/ ) {
    options = options || {};


    this.text = options.text || "Button";
    this.className = options.className || options.style || "btn-secondary";
    this.parent = options.parent || options.parentId;
    this.callback = options.callback || options.action;


    this.id = null;
    this.div = null;
    this.create(this.text, this.className, this.parent, this.callback);
}

Button.prototype.create = function (text, className, parentId, callback) {
    this.id = this.generateUid("btn");
    const html = `<button type="button" class="btn ${className ? className : "btn-primary"}" id="${this.id}">${text}</button>`;
    this.div = document.createElement('div');
    this.div.innerHTML = html;

    //console.log(`Button: parantId ${parentId}`);

    if (parentId && parentId != '') {
        document.getElementById(parentId).appendChild(this.div);
    } else {
        document.body.appendChild(this.div);
    }
    document.getElementById(this.id).addEventListener('click', callback ? callback : (event) => {});

    return this;
}

Button.prototype.addClass = function (className) {
    document.getElementById(this.id).classList.add(className);
    return this;
}

Button.prototype.removeClass = function (className) {
    document.getElementById(this.id).classList.remove(className);
    return this;
}

Button.prototype.addTo = function (parent) {
    if (parent && parent != '') {
        if (document.getElementById(parent)) {
            document.getElementById(parent).appendChild(this.div);
        }
    }
    return this;
}
Button.prototype.addToBody = function () {
    document.body.appendChild(this.div);
    return this;
}

Button.prototype.generateUid = function (prefix) {
    return `uid-${prefix ? prefix : ''}-${Math.floor(Math.random() * 10000000)}`
}
