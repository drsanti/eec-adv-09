/**
 * Example-21: Assets and Complex Shapes Loader
 * 
 * Dr.Santi Nuratch
 * Embedded Computing and Control Laboratory
 * 17 March, 2019
 * 
 * Update: 15 March, 2019
 */


/**
 * METHOD 0 : loadAssets()  create shapes of colliders and add to main body.
 * METHOD 1 : loadComplex() creates bodies of colliders and adds LockConstraint to all bodies of collider to main body
 *                          (requires more computational time)
 */

import Engine    from '../libs/ECC-CGP-Engine';
import WebGui    from '../libs/ECC-Web-Gui';

//!! Create the engine with physics enabled
const engine = new Engine({
    physics:{
        enabled:  true,             //!! Enable the physics engine
        debug:{
            enabled: true          //!! Disable mesh debugging
        }
    },
    graphics: {
        axes: {
            enabled: true,
        }
    }
});


//!! Initialze and start the engine
engine.init( {
    envPath: 'images/park',     //!! Environmant directory
    models: [ 
        'models/scene001.gltf', //!! Ground and walls
    ]
}).then( () => {
    
    userInit();
    engine.setCameraPosition( -35, 20, -35 );
    engine.start( callback );   //!! Start the engine and give it the callback
});



const METHOD = 1; //!! 0: loadAssets(), 1: loadComplex()
const MODEL_FILE = 'models/asset_complex.gltf';

function userInit() {

    if( METHOD === 0 ) {
        engine.loadAssets(MODEL_FILE).then( (asset) => {
            console.log( asset );
        });
    }
    else if(METHOD === 1 ) {
        engine.loadComplex(MODEL_FILE).then( (asset) => {
            console.log( asset );
        });
    } 
}

function callback( arg ) {
    if( engine.getKeyDown('l', 1000)) {
        engine.toggleLabels();
    }
    if( engine.getKeyDown('d', 1000)) {
        engine.toggleDebug();
    }
    if( engine.getKeyDown('x', 1000)) {

    }
    if( engine.getKeyDown('f', 20)) {
        engine.applyForceToRayBody(1000);
    }

    plotter( arg );
}



//!! Plotter
let Plotter = {
    created:        false,
    container:      null,
    oscilloscopr:   null,
};
function plotter( arg ) {

    if( Plotter.created === false ) {
        Plotter.created = true;
        Plotter.oscContainer = WebGui.createContainer("Computational Time (mS) of <span style='color:#ff0a0a'><b>Graphics</b></span> and <span style='color:#09ff67'><b>Physics</b></span>", '', 0, 0);
        Plotter.oscilloscope = WebGui.createOscilloscope( Plotter.oscContainer, 380, 100, {points: 300, mainGrids: false} );
        
        Plotter.oscilloscope.setMin   (null,   0  );
        Plotter.oscilloscope.setMax   (null,  +20 );
        Plotter.oscilloscope.setOffset(null,  -10 ); //!! -(max/2)

        //Plotter.oscilloscope.setEnable(2, false);
        //Plotter.oscilloscope.setEnable(3, false);
    }
    const tg = arg.graphics.processingTime;
    const tp = arg.physics.processingTime;
    const ta = tg + tp; 
    const td = arg.timing.deltaTime;
    Plotter.oscilloscope.addData([ tg, tp, ta, td ]);
}
