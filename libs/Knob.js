function Knob(size, min, max, parentId, callback) {
    size = size || 200;
    max = max || 100;
    min = min || 0;

    var knob = pureknob.createKnob(size, size);

    // Set properties.
    knob.setProperty('angleStart', -0.75 * Math.PI);
    knob.setProperty('angleEnd', 0.75 * Math.PI);
    knob.setProperty('colorFG', 'hsl(0, 50%, 50%)');
    knob.setProperty('trackWidth', 0.3);
    knob.setProperty('valMin', min);
    knob.setProperty('valMax', max);

    // Set initial value.
    knob.setValue(50);

    var listener = function (knob, value) {
        if (callback) {
            callback(value);
            knob.setProperty('colorFG', `hsl(0, ${100 * value / max}%, 50%)`);
        }
    };

    knob.addListener(listener);

    // Create element node.
    var node = knob.node();

    // Add it to the DOM.
    var elem = document.getElementById(parentId);
    elem.appendChild(node);
}
