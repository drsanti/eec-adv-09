function Container(options /*title, className, parentId*/ ) {
    options = options || {};
    this.text = options.text || '';
    this.style = options.style || 'bg-dark';
    this.parent = options.parent;
    this.id = null;

    this.create(this.text, this.style, this.parent);
}
Container.prototype.create = function (title, className, parentId) {
    this.id = this.generateUid("ctn");
    const html = `
        <div class="card text-white ${className}">
            <div class="card-header" id="cardTitle">
                ${title ? title : ''}
            </div>
            <div class="card-body" id="${this.id}"></div>
        </div>`;

    const div = document.createElement('div');
    div.innerHTML = html;

    if (parentId && parentId != '') {
        document.getElementById(parentId).appendChild(div);
    } else {
        document.body.appendChild(div);
    }
    return this;
}
Container.prototype.getBody = function () {
    return document.getElementById(this.id);
}
Container.prototype.setTitle = function (title) {
    document.getElementById(`cardTitle`).innerHTML = title ? title : '';
}
Container.prototype.generateUid = function (prefix) {
    return `uid-${prefix ? prefix : ''}-${Math.floor(Math.random() * 10000000)}`
}
