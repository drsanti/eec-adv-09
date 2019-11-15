/* 
 * Example 10 -- Mouse Following
 */


import {Engine, SPE} from '../libs/ECC-CGP-Engine';
//import SPE    from '../libs/particles/SPE';


const engine = new Engine();

engine.init( {
    envPath: 'images/bridge',
    models: [ 
        'models/scene000.gltf',
    ]
}).then( () => {
    userInit();
    
    engine.start( callback );
});


//!! Global variables
let particleGroup, emitter;

function userInit() {
    //engine.getControl().enabled = false;
    engine.setCameraPosition( -3, 5, -15 );
    initParticles();
}


function callback( arg ) {
    particleGroup.tick( arg.timing.deltaTime/1000 );   

    //const p = 
    if(engine.getRayIntersec()) {
        emitter.position.value = engine.getRayIntersec().point;
    }
    
}


// Create particle group and emitter
function initParticles() {

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
            value: [ new THREE.Color( 'lime' ), new THREE.Color( 'red' ), new THREE.Color( 'yellow' ) ],
            spread: new THREE.Vector3(.1, .1, .1),
        },
        size: {
            value: [ 1, 0 ]
        },
        particleCount: 1500
    });
    particleGroup.addEmitter( emitter );
    scene.add( particleGroup.mesh );
}
