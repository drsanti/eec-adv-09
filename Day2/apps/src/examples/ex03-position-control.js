/**
 * ex03-position-control
 */
import GameEngine from '../libs/GameEngine'


new GameEngine({
    models:     ['mousey'], //!!'mulan', 'mousey', 'ortiz', 'doozy', 'nancy', 'pubg'
    onReady:    ready,
    onLoaded:   loaded,
    onUpdate:   update
})


function ready(engine, objs) {
    engine.setCameraPosition(0, 1, 6);
}

function loaded(engine, animator, character, name) {

}

let step = 0.02;
let dir  = 1;
function update(engine, animator, character, name) {
    character.position.x += step*dir;
    character.position.y = 0;
    character.position.z = 0;

    if(Math.abs(character.position.x) > 3) {
        dir = dir * (-1);
    }
}
