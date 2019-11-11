function Container(title, className, parentId) {
    this.title = title;
    this.id = null;

    this.create(title, className, parentId);
}
Container.prototype.create = function (title, className, parentId) {
    this.id = this.generateUid("ctn");
    const html = `
        <div class="card text-white ${className ? className : "bg-dark"} mb-3">
            <div class="card-header" id="cardTitle">
                ${title ? title : ''}
            </div>
            <div class="card-body" id="${this.id}"></div>
        </div>`;

    const div = document.createElement('div');
    div.innerHTML = html;

    if (parentId && parentId != '') {
        document.getElementById(parentId).appendChild(div);
    }
    else {
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
