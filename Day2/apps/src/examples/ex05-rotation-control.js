/**
 * ex05-rotation-control
 */
import GameEngine from '../libs/GameEngine'


new GameEngine({
    models:     ['mulan'], //!!'mulan', 'mousey', 'ortiz', 'doozy', 'nancy', 'pubg'
    onReady:    ready,
    onLoaded:   loaded,
    onUpdate:   update
})


function ready(engine, objs) {
    engine.setCameraPosition(0, 1, 6);
}

function loaded(engine, animator, character, name) {

}

let rad = 0.0;
function update(engine, animator, character, name) {
    character.rotation.x = 0;
    character.rotation.y = rad;
    character.rotation.z = 0;

    rad += 0.01;
    if(rad > 2*Math.PI) {
        rad = 0.0;
    }
}
