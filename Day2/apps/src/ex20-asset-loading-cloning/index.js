/**
 * Example-20: Asset loading and cloning
 * 
 * Dr.Santi Nuratch
 * Embedded Computing and Control Laboratory
 * 14 March, 2019
 * 
 * Update: 15 March, 2019
 */


/**
 * These are the rules:
 *    1) The rotaion of mesh of actor must be (0, 0, 0) CTRL+A R
 *    2) The scale of mesh of actor must be (1, 1, 1)   CRTL+A S
 *    3) All coliders must be scaled and rotated in object. DO NOT apply rotation, location and scale
 *    4) All objects, the actor and colliders must be placed above the ground/floor
 */

import Engine    from '../libs/ECC-CGP-Engine';
import WebGui    from '../libs/ECC-Web-Gui';

//!! Create the engine with physics enabled
const engine = new Engine({
    physics:{
        enabled:  true,             //!! Enable the physics engine
        debug:{
            enabled: false          //!! Disable mesh debugging
        }
    },
    graphics: {
        axes: {
            enabled: false,
        }
    }
});


//!! Initialze and start the engine
engine.init( {
    envPath: 'images/park',     //!! Environmant directory
    models: [ 
        'models/scene000.gltf', //!! Ground and walls
    ]
}).then( () => {
    loadCartWheels();             //!! Load and copy 
    loadCartBody();
    engine.start( callback );   //!! Start the engine and give it the callback
    engine.getCamera().position.set(-5, 20, 30);
    engine.getControl().update();
});




const WHEEL_ASSET_FILE = 'models/cartwheel001.gltf';
const CART_ASSET_FILE  = 'models/cartbody001.gltf';

const WheelBodies = [];         //!! Array for wheels
let   CartBody    = undefined;  //!! Cart body, the main part

//!! Load wheel models and make three copies
function loadCartWheels() {

    engine.loadAssets( WHEEL_ASSET_FILE ).then( function ( asset ) {

        //!! The first wheel is the loaded model, the asset.body
        WheelBodies[0] = asset.body;
        WheelBodies[0].position.x = -1.5;

        // !! More three wheels
        for(let i=1; i< 4; i++) {
            WheelBodies[i] = engine.copyAsset( asset ).body;
            WheelBodies[i].position.x = WheelBodies[0].position.x + 1*i;
        }

        //!! Change name of bodies and meshes
        const names = ['FL_Wheel', 'FR_Wheel', 'BL_Wheel', 'BR_Wheel'];
        for(let i=0; i< 4; i++) {
            WheelBodies[i].name = names[i];
            WheelBodies[i].threemesh.name = names[i];
        }
    });
}

//!! Load card body
function loadCartBody() {
    engine.loadAssets( CART_ASSET_FILE ).then( function ( asset ) {
        CartBody = asset.body;
    });
}

//!! Callback function executed every frame
let alphas = [0, 0, 0, 0];
function callback() {

    //!! Angular Velocity
    for(let i=0; i< WheelBodies.length; i++) {
        WheelBodies[i].angularVelocity.set( 5*Math.sin( Math.PI*alphas[i] ), 0, 0 );
        alphas[i] += (i+1)*Math.PI/1000;
    }

    keyAction();    //!! Keys
    plotter();      //!! Plotter
}

//!! Called by the engine callbek
function keyAction() {

    if( engine.getKeyDown ( 'l', 1000 )) {
        engine.toggleLabels();
    }
    else if( engine.getKeyDown ( 'd', 1000 )) {
        engine.toggleDebug();
    }
    else if( engine.getKeyDown ( 'x', 1000 )) {
        for(let i=0;i<WheelBodies.length; i++){ 
            engine.toggleAxesOfMesh( WheelBodies[i].threemesh.name, 2 );
        }
    }
    else if( engine.getKeyDown ( 'a', 1000 )) {
        engine.toggleAxes();
    }
    else if( engine.getKeyDown ( 'g', 1000 )) {
        engine.toggleGrids();
    }
    else if( engine.getKeyDown ( 'f', 1000 )) {
        engine.applyForceToRayBody(800);
    }
}


//!! Plotter
let Plotter = {
    created:        false,
    container:      null,
    oscilloscopr:   null,
};
function plotter() {
    if( Plotter.created === false ) {
        Plotter.oscContainer = WebGui.createContainer('Quaternion of ' + WheelBodies[0].name, '', 2, 2);
        Plotter.oscilloscope = WebGui.createOscilloscope( Plotter.oscContainer, 380, 100, 500 );
        Plotter.created = true;
        return;
    }
    if( WheelBodies.length <= 0) return;
    const q = WheelBodies[0].quaternion;  //!! Get quatanion of the WheelBodies[0]
    Plotter.oscilloscope.addData([q.x, q.y, q.z, q.w]);
}
