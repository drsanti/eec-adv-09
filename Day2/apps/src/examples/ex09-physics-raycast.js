/**
 * ex09-physics-raycast
 */
import GameEngine from '../libs/GameEngine'


new GameEngine({
    models:     ['doozy'], //!!'mulan', 'mousey', 'ortiz', 'doozy', 'nancy', 'pubg'
    onReady:    ready,
    onLoaded:   loaded,
    onUpdate:   update
})


function ready(engine, objs) {
    engine.setCameraPosition(0, 1, 6);
    engine.physics.enabled=true;
}

function loaded(engine, animator, character, name) {

}

const KEY_DELAY     = 100;
const FORCE_SCALE   = 200;
function update(engine, animator, character, name) {
    if (engine.getKeyDown('f', KEY_DELAY)) {
        engine.applyForceToRayBody(FORCE_SCALE);
    }
}
