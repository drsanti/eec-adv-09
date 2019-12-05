/*************************************************************************************
 *                                      Engine Setup
 *************************************************************************************/

import { THREE, Engine, Animator } from './ECC-CGP-Engine';


export default function GameEngine(options) {

    const models    = options.models    || ['mousey'];  //!! "mulan", "mousey", "ortiz", "doozy", "nancy", "pubg"
    const format    = options.format    || 'gltf';      //! 'gltf', 'glb'
    const onReady   = options.onReady   || null;
    const onLoaded  = options.onLoaded  || null;
    const onUpdate  = options.onUpdate  || null;

    let animators = [];

    const defaultPositions = [
        new THREE.Vector3( 0, 0,  0),
        new THREE.Vector3(+2, 0,  0),
        new THREE.Vector3(-2, 0,  0),
        new THREE.Vector3( 0, 0, +2),
        new THREE.Vector3( 0, 0, -2),
        new THREE.Vector3(+2, 0, +2),
        new THREE.Vector3(+2, 0, -2),
        new THREE.Vector3(-2, 0, +2),
        new THREE.Vector3(-2, 0, -2)
    ];
    let currentIdx = 0;

    function getNextPosition() {
        let pos = defaultPositions[currentIdx];
        currentIdx = (currentIdx + 1) % defaultPositions.length;
        return pos;
    }

    const engine = new Engine({
        physics: {
            enabled: options.usePhysics || false, //!! Enable the physics engine
            debug: {
                enabled: false //!! Disable mesh debugging
            }
        },
        graphics: {
            useReflection: true,
            axes: {
                enabled: options.useAxes || true,
            },
            grids: {
                enabled: false,
                color: 'black'
            },
            renderer: {
                antialias: false,
            }
        },
    });


    engine.init().then((obj) => {
        engine.start(callback);

        //!! Engine ready
        if (onReady) onReady(engine, obj);

        //!! Load all models
        models.map(model_name => {
            new Animator(model_name, engine, init, format);
        })

        engine.animators = animators;
    });

    //!! A model is loaded
    function init(anim) {
        animators.push(anim);
        anim.character.position.copy(getNextPosition());
        if (onLoaded) {
            onLoaded(engine, anim, anim.character, anim.getCharacterName())
        }
    }

    //!! Engine callback
    function callback() {
        animators.map((anim) => {
            anim.update();
            if (onUpdate) {
                onUpdate(engine, anim, anim.character, anim.getCharacterName());
            }
        });

    }
}
