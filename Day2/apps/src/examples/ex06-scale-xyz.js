/**
 * ex06-scale-xyz
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
    character.scale.x = 1.5;
    character.scale.y = 0.5;
    character.scale.z = 1.5;
}

function update(engine, animator, character, name) {

}
