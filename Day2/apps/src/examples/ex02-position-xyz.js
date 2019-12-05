/**
 * ex02-position-xyz
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
    character.position.x = -0.5;
    character.position.y = 0;
    character.position.z = +2;
}

function update(engine, animator, character, name) {

}
