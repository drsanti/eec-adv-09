/**
 * ex13-multiple-characters.js
 */
import GameEngine from '../libs/GameEngine'

new GameEngine({
    models:     ['mulan', 'mousey', 'ortiz', 'doozy', 'nancy', 'pubg'],
    onReady:    ready,
    onLoaded:   loaded,
    onUpdate:   update
})


function ready(engine, objs) {
    engine.setCameraPosition(3, 6, 15);
}

function loaded(engine, animator, character, name) {

}

function update(engine, animator, character, name) {
    if(name == 'mulan') {
        animator.playAnimationByKeyboard();
    }
}
