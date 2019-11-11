function Grid(rows, cols, parentId) {
    this.create(rows, cols, parentId);
}

Grid.prototype.create = function (rows, cols, parentId) {
    let html = `
        <div class="container">
    `;
    for (let r = 0; r < rows; r++) {
        html += `
            <div class="row" id="r${r}">
        `;

        for (let c = 0; c < cols; c++) {
            html += `
                <div class="col-sm" id="r${r}c${c}"></div>
            `;
        }

        html += `
            </div>
        `;
    }
    html += `
        </div>
    `;
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

Grid.prototype.getSlotId = function (row, col) {
    return `r${row}c${col}`;
}
Grid.prototype.add = function (row, col, eleId) {
    const id = `r${row}c${col}`;
    const ele = document.getElementById(eleId);
    console.log(id);
    document.getElementById(id).innerHTML = ele;
}
