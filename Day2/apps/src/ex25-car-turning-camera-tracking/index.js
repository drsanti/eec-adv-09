/**
 * Example-25: Car Turning and Camera Tracking
 * 
 * Dr.Santi Nuratch
 * Embedded Computing and Control Laboratory
 * 19 March, 2019
 */


import Engine from '../libs/ECC-CGP-Engine';
import WebGui from '../libs/ECC-Web-Gui';


//!! Create the engine with physics enabled
const engine = new Engine();

//!! Initialze and start the engine
engine.init( {
    envPath: 'images/bridge',   //!! Environmant directory
    models: [ 
        'models/scene000.gltf', //!! Ground and walls
    ]
}).then( () => {
    userInit();
    engine.getControl().enabled = false;
    engine.start( callback );   //!! Start the engine and give it the callback
});


//!! Asset files exported from Blender
const WHEEL_ASSET_FILE = 'models/cartwheel001.gltf';
const CART_ASSET_FILE  = 'models/cartbody001.gltf';

const WheelBodies = [];         //!! Array for wheels
let   CartBody    = undefined;  //!! Cart body, the main part
const GAP         = 2.1;        //!! Margin/space between cart-body and wheels


function userInit() {
    //!! Change camera position and update control
    engine.setCameraPosition( -3, 5, -15 );

    //!! Load cart parts, body and wheels
    loadCartComponets();    
}


//!! Callback function executed every frame
function callback( arg ) {
    keyAction();        //!! Keys
    plotter( arg );     //!! Plotter
    moveCamera();       //!! Camera
}

//!! Load cart componets
function loadCartComponets() {

    //!! Load wheel and make copy
    engine.loadAssets( WHEEL_ASSET_FILE ).then( function ( wheelAsset ) {
        //!! The first wheel is the loaded model, the wheelAsset.body
        WheelBodies[0] = wheelAsset.body;
        WheelBodies[0].position.x = -(GAP*2 - GAP/2);

        // !! More three wheels
        for(let i=1; i< 4; i++) {
            WheelBodies[i] = engine.copyAsset( wheelAsset ).body;
            WheelBodies[i].position.x = WheelBodies[0].position.x + GAP*i;
        }

        //!! Change name of bodies and meshes
        const NAMES = ['FL_Wheel', 'FR_Wheel', 'BL_Wheel', 'BR_Wheel'];
        for(let i=0; i< WheelBodies.length; i++) {
            WheelBodies[i].name = NAMES[i];
            WheelBodies[i].threemesh.name = NAMES[i];
            WheelBodies[i].mass = 1;
            
        }
    }).then( () => {
        //!! Load cart body, the main part of the cart
        engine.loadAssets( CART_ASSET_FILE ).then( function ( cartAsset ) {
            CartBody = cartAsset.body;  
            CartBody.mass = 5;

            //!! Wheels and cart-body are prepared
            buildCart();
        });
    });
}

const WheelConstrants = []; //!! Array of the Wheel-Constraints

function buildCart() {

    if( !CartBody || WheelBodies.length<1) {
        throw "The cart components are not completely loaded";
    }  

    //!! Prepare position and rotation of the wheels
    buildCart_Prepare();

    //!! Create Constraints
    buildCart_CreateConstraint();

    //!! Add constraints to the physics world
    buildCart_AddConstraint();

    //!! Enable all motors of the wheels
    buildCart_EnableMotors();
}

let Wheels_Prepared = false;
function buildCart_Prepare() {

    if( Constraints_Added )
        buildCart_RemoveConstraint();

    //!! Reset cart-body
    CartBody.position.x = 0;
    CartBody.position.y = 1;
    CartBody.position.z = 0;

    //!!!!!!!!!!!!!!!!!!!!
    //!! Front Wheels
    //!!!!!!!!!!!!!!!!!!!!

    //!! Front-Left wheel
    WheelBodies[0].position.z = +GAP; //!! Front
    WheelBodies[0].position.x = +GAP; //!! Left
    WheelBodies[0].quaternion.setFromAxisAngle( new Engine.Vec3( 0, 1, 0), 0 );

    //!! Front-Right Wheel
    WheelBodies[1].position.z = +GAP; //!! Front
    WheelBodies[1].position.x = -GAP; //!! Right
    WheelBodies[1].quaternion.setFromAxisAngle( new Engine.Vec3( 0, 1, 0), Math.PI );

    //!!!!!!!!!!!!!!!!!!!!
    //!! Rear Wheels
    //!!!!!!!!!!!!!!!!!!!!

    //!! Rear-Left Wheel
    WheelBodies[2].position.z = -GAP; //!! Rear
    WheelBodies[2].position.x = +GAP; //!! Left
    WheelBodies[2].quaternion.setFromAxisAngle( new Engine.Vec3( 0, 1, 0), 0 );

    //!! Rear-Right Wheel
    WheelBodies[3].position.z = -GAP; //!! Rear
    WheelBodies[3].position.x = -GAP; //!! Right
    WheelBodies[3].quaternion.setFromAxisAngle( new Engine.Vec3( 0, 1, 0), Math.PI );

    Wheels_Prepared = true;
}


/**
 * Create constraints of the four wheels
 */
let Constraints_Created = false;
function buildCart_CreateConstraint() {

    if( Constraints_Created === true ) return;

    //!! Front-Left Constraint
    WheelConstrants.push(new Engine.PHYSICS.HingeConstraint( CartBody, WheelBodies[0], {
        pivotA: new Engine.Vec3( +GAP, +0.0, +GAP ), 
        axisA:  new Engine.Vec3( +1.0, +0.0, +0.0 ),

        pivotB: new Engine.Vec3( +0.0, +0.0, +0.0 ), 
        axisB:  new Engine.Vec3( -1.0, +0.0, +0.0 ) //!! Forward rotation along x axis
    }));

    //!! Front-Right Constraint
    WheelConstrants.push(new Engine.PHYSICS.HingeConstraint( CartBody, WheelBodies[1], {
        pivotA: new Engine.Vec3( -GAP, +0.0, +GAP ), 
        axisA:  new Engine.Vec3( +1.0, +0.0, +0.0 ),

        pivotB: new Engine.Vec3( +0.0, +0.0, +0.0 ), 
        axisB:  new Engine.Vec3( +1.0, +0.0, +0.0 ) //!! Forward rotation along x axis
    }));

    //!! Rear-Left Constraint
    WheelConstrants.push(new Engine.PHYSICS.HingeConstraint( CartBody, WheelBodies[2], {
        pivotA: new Engine.Vec3( +GAP, +0.0, -GAP ), 
        axisA:  new Engine.Vec3( +1.0, +0.0, +0.0 ),

        pivotB: new Engine.Vec3( +0.0, +0.0, +0.0 ), 
        axisB:  new Engine.Vec3( -1.0, +0.0, +0.0 )   //!! Forward rotation along x axis
    }));

    //!! Rear-Right Constraint
    WheelConstrants.push(new Engine.PHYSICS.HingeConstraint( CartBody, WheelBodies[3], {
        pivotA: new Engine.Vec3( -GAP, +0.0, -GAP ), 
        axisA:  new Engine.Vec3( +1.0, +0.0, +0.0 ),

        pivotB: new Engine.Vec3( +0.0, +0.0, +0.0 ), 
        axisB:  new Engine.Vec3( +1.0, +0.0, +0.0 )  //!! Forward rotation along x axis
    }));
    Constraints_Created = true;
}

const SPD_RES = 0.1;
const DIR_RES = 0.02;

function keyAction() {

    //!! Speed can be changed in range of [-5, +5]
    if( engine.getKeyDown( 'ArrowUp') ) {
        if( MotorSpeed < 5) MotorSpeed += SPD_RES;
        updateSpeed( );
    }
    else if( engine.getKeyDown( 'ArrowDown') ) {
        if( MotorSpeed > -5) MotorSpeed -= SPD_RES;
        updateSpeed( );
    }
    else {
       if( MotorSpeed > SPD_RES) MotorSpeed -= SPD_RES;
       if( MotorSpeed < SPD_RES) MotorSpeed += SPD_RES;
        updateSpeed( );
    }
        
    //!! Gains can be changed in range of [-1, 1]
    if( engine.getKeyDown( 'ArrowLeft' ) ) {
        if(GainL > -1.0) GainL -= DIR_RES;
        if(GainR < +1.0) GainL += DIR_RES;
        updateSpeed( );
    }
    else if( engine.getKeyDown( 'ArrowRight' ) ) {
        if(GainR > -1.0) GainR -= DIR_RES;
        if(GainL < +1.0) GainL += DIR_RES;
        updateSpeed( );
    }
    else {
        if(GainL < 1.0) GainL += DIR_RES;
        if(GainR < 1.0) GainR += DIR_RES;
        updateSpeed( );
    }

    //!!
    if( engine.getKeyDown( 'd', 1000 ) ) {
        engine.toggleDebug();
    }
}

/*************************************************************************************************/
/*                                              Motor                                            */
/*************************************************************************************************/

let MotorSpeed = 0;
let GainL = 1;
let GainR = 1;

function updateSpeed() {
    if(WheelConstrants.length < 1) return;

    //WheelConstrants[0].setMotorSpeed( MotorSpeed * GainL );   //!! 0: Front-Left
    //WheelConstrants[1].setMotorSpeed( MotorSpeed * GainL );   //!! 1: Front-Right
    WheelConstrants[2].setMotorSpeed( MotorSpeed * GainL );     //!! 2: Rear-Left
    WheelConstrants[3].setMotorSpeed( MotorSpeed * GainR );     //!! 3: Rear-Right
}
function buildCart_EnableMotors() {

    //WheelConstrants[0].enableMotor();     //!! 0: Front-Left
    //WheelConstrants[1].enableMotor();     //!! 1: Front-Right
    WheelConstrants[2].enableMotor();       //!! 2: Rear-Left
    WheelConstrants[3].enableMotor();       //!! 3: Rear-Right
}


/*************************************************************************************************/
/*                                          Move Camera                                          */
/*************************************************************************************************/
/**
 * Called by engine loop, the callback
 */
function moveCamera() {
    if( !CartBody ) return;
    let target = CartBody.threemesh;
    let relativeCameraOffset = new Engine.GRAPHICS.Vector3( 0, 5, -10 );
    let cameraOffset = relativeCameraOffset.applyMatrix4( target.matrixWorld );
    const camera = engine.getCamera();
    camera.position.lerp( cameraOffset, 0.05 );
    camera.lookAt( target.position );
    
}

/*************************************************************************************************/
/*                                          Helper Functions                                     */
/*************************************************************************************************/

/**
 * Add constraints to the physics world
 */
let Constraints_Added = false;
function buildCart_AddConstraint() {

    if( Constraints_Added === true || Constraints_Created === false ) return;
    
    for( let i=0; i<WheelConstrants.length; i++ ) {
        engine.addConstraint( WheelConstrants[i] );
    } 
    Constraints_Added = true;
}

/**
 * Remove all constraints from physics world
*/
function buildCart_RemoveConstraint() {

    for( let i=0; i<WheelConstrants.length; i++ ) {
        engine.removeConstraint( WheelConstrants[i] );
    } 
    Constraints_Added = false;
    Wheels_Prepared   = false;
}

//!! Plotter
let Plotter = {
    created:        false,
    container:      null,
    oscilloscopr:   null,
};
function plotter( arg ) {
    if( !Plotter ) return;

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
