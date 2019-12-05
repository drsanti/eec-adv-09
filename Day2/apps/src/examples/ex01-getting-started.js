/**
 * ex01-getting started
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

function update(engine, animator, character, name) {

}
