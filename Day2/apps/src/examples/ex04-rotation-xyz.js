/**
 * ex04-rotation-xyz
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
    character.rotation.x = 0;
    character.rotation.y = Math.PI/2;
    character.rotation.z = 0;
}

function update(engine, animator, character, name) {

}
