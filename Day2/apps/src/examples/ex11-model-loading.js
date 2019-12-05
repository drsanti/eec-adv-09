/**
 * ex11-model-loading.js
 */
import GameEngine from '../libs/GameEngine'

new GameEngine({
    models:     ['ortiz'], //!!'mulan', 'mousey', 'ortiz', 'doozy', 'nancy', 'pubg'
    onReady:    ready,
    onLoaded:   loaded,
    onUpdate:   update
})

const assetName  = 'models/boxes001.gltf';
const targetName = 'CubeRedWood001';
let   targetBox;
function ready(engine, objs) {
    engine.setCameraPosition(3, 6, 15);
    engine.physics.enabled=true;
    engine.loadModel(assetName).then( (model) => {
        targetBox = engine.getBodyByMeshName(targetName);
    });
}

function loaded(engine, animator, character, name) {

}

function update(engine, animator, character, name) {
    if(engine.getKeyDown('n', 200)) {
        engine.toggleLabels();
    }
    if (engine.getKeyDown('f', 200)) {
        engine.applyForceToRayBody(500);
    }
    if(targetBox) {
        targetBox.angularVelocity.set(0, 20, 0);
    }
}
