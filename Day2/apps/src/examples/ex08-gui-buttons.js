/**
 * ex08-gui-buttons
 */
import GameEngine from '../libs/GameEngine'
import WebGui from '../libs/ECC-Web-Gui';

new GameEngine({
    models:     ['nancy'], //!!'mulan', 'mousey', 'ortiz', 'doozy', 'nancy', 'pubg'
    onReady:    ready,
    onLoaded:   loaded,
    onUpdate:   update
})


function ready(engine, objs) {
    engine.setCameraPosition(0, 1, 6);

}

function loaded(engine, animator, character, name) {
    createButtons(engine)
}

let dir = 0;
function update(engine, animator, character, name) {
    character.rotation.y += 0.01*dir;
}


function createButtons(engine) {
    const btnc = WebGui.createContainer('Control Panel', 'pink', 5, 5);
    const btnNames = ['RotateY+', 'RotateY-', 'Labels', 'Axes', 'Grids'];
    const btnTypes = ['red', 'green', 'blue', 'yellow', 'pink'];
    for (let i = 0; i < btnTypes.length; i++) {
        WebGui.createButton(btnc, btnNames[i], i, btnTypes[i], buttonActions);
    }
    function buttonActions(btn) {
        if (btn.id == 0) {
            dir = +1;
        } else if (btn.id == 1) {
            dir = -1;
        } else if (btn.id == 2) {
            engine.toggleLabels();
        } else if (btn.id == 3) {
            engine.toggleAxes();
        } else if (btn.id == 4) {
            engine.toggleGrids();
        }
    }
}
