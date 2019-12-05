/**
 * ex10-particles-raycast.js
 */
import { Engine, SPE } from '../libs/ECC-CGP-Engine';
import GameEngine from '../libs/GameEngine'

new GameEngine({
    models:     ['doozy'], //!!'mulan', 'mousey', 'ortiz', 'doozy', 'nancy', 'pubg'
    onReady:    ready,
    onLoaded:   loaded,
    onUpdate:   update
})

function ready(engine, objs) {
    engine.setCameraPosition(3, 6, 15);
    engine.physics.enabled=true;
    initParticles(engine);
}

function loaded(engine, animator, character, name) {

}

let particleGroup, emitter;
function update(engine, animator, character, name) {
    particleGroup.tick(engine.getDeltaTime() / 1000);

    if (engine.getRayIntersec()) {
        let point = engine.getRayIntersec().point;
        emitter.position.value = point
        character.position.copy(point);
    }
}

//!! Create particle group and emitter
function initParticles(engine) {

    const THREE = Engine.GRAPHICS;
    const scene = engine.getScene();

    particleGroup = new SPE.Group({
        texture: {
            value: THREE.ImageUtils.loadTexture('images/particles/smokeparticle.png')
        }
    });

    emitter = new SPE.Emitter({
        maxAge: 3,
        position: {
            value: new THREE.Vector3(0, 0, 0)
        },
        acceleration: {
            value: new THREE.Vector3(0, -5, 0),
            spread: new THREE.Vector3(5, 0, 5)
        },
        velocity: {
            value: new THREE.Vector3(0, 10, 0)
        },
        color: {
            //value: [ new THREE.Color( 0.5, 0.5, 0.5 ), new THREE.Color() ],
            value: [new THREE.Color('lime'), new THREE.Color('red'), new THREE.Color('yellow')],
            spread: new THREE.Vector3(.1, .1, .1),
        },
        size: {
            value: [1, 0]
        },
        particleCount: 1500
    });
    particleGroup.addEmitter(emitter);
    scene.add(particleGroup.mesh);
}
