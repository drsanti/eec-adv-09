/**
 * ex07-scale-control
 */
import GameEngine from '../libs/GameEngine'


new GameEngine({
    models:     ['pubg'], //!!'mulan', 'mousey', 'ortiz', 'doozy', 'nancy', 'pubg'
    onReady:    ready,
    onLoaded:   loaded,
    onUpdate:   update
})


function ready(engine, objs) {
    engine.setCameraPosition(0, 1, 6);
}

function loaded(engine, animator, character, name) {

}

let factor = 1.0;
let alpha  = 0.0;
function update(engine, animator, character, name) {
    character.scale.x = factor;
    character.scale.y = factor;
    character.scale.z = factor;

    factor = 1 + Math.sin(alpha);
    alpha += 0.01;
}
