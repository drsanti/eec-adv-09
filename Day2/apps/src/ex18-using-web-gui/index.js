/**
 * Example-18: Using the ECC-Web-Gui
 * 
 * Dr.Santi Nuratch
 * Embedded Computing and Control Laboratory
 * ECC-Lab, INC-KMUTT
 * 09 March, 2019
 */

 
/**
 * Press key 'a' or click 'Add Const.' button to add the constraint
 * Press key 'r' or click 'Rem Const.' button to remove the constraint
 * Press key 'l' or click 'Labels' button to show/hide labels
 * Press key 'f' to apply force to raycastted body
 * Press key 'd' to show/hide body-debugger
 * Press key '0' to use method #0
 * Press key '1' to use method #1
 * Click 'Axes' button to toggle visibility of the world axes 
 * Click 'Grids' button to toggle visibility of ground-grid
 * 
 * Change value of the Y-Down to control the static box (bodyB)
 * Apply the constraint or force to the bodyB and see closely in the indicators and plotters
 */



import { WebGui }                from '../libs/ECC-Web-Gui';
import { Engine, CANNON, THREE } from '../libs/ECC-CGP-Engine';

//!! Create the engine with physics enabled
const engine = new Engine({
    
    physics:{
        enabled: true,     //!! Enable the physics engine
    },
    graphics: {
        axes: {
            enabled: true,
            size: 3
        }
    }
});

//!! Engine initialization options
const initOpts = {
    envPath: 'images/park',     //!! Environment texture (CubeMapTexture)
    models: [                   //!! GLTF models
        'models/scene001.gltf', //!! Grround, Walls and Basic Primitive objects
        'models/boxes001.gltf',
    ]
};

//!! Initialise the engine with the given options, the initOpts object
engine.init( initOpts ).then( ( params ) => {
    uerInit( params )
    engine.start( callback );               //!! Start and provide the callback function
});

//!! Targets
const TARGET_A_NAME = 'CubeRedWood001';             //!! Mesh name for target A
const TARGET_B_NAME = 'CubeDarkWood001';            //!! Mesh name for target B
let   bodyA = undefined;                            //!! Rigid-body A
let   bodyB = undefined;                            //!! Rigid-body B

//!! Constraint parameters
let   p2pConstraint = undefined;
const maxForce      = 1000;
let   isAdded       = false;

//!! Lines
let lineA  = undefined;     //!! OriginA to hookA
let lineB  = undefined;     //!! OriginB to hookA(hookB)

//!! Pivots
let pivotA = undefined;     //!! hookA location
let pivotB = undefined;     //!! hookB location

const OPACITY_VAL = 0.7;    //!! Material opacity
let   method = 1;           //!! Calculation method

//!! User initialization function
function uerInit( params ) {

    //!! Get the target rigid bodies
    bodyA = engine.getBodyByMeshName( TARGET_A_NAME );
    bodyB = engine.getBodyByMeshName( TARGET_B_NAME );
    bodyB.mass = 3;

    if( !bodyA || !bodyB ) {
        throw "Cannot find the rigid body A|B. Check the target name";
    }

    //!! Make them transparent
    bodyB.threemesh.material.transparent = true;
    bodyB.threemesh.material.opacity = OPACITY_VAL;

    bodyA.threemesh.material.transparent = true;
    bodyA.threemesh.material.opacity = OPACITY_VAL;
    
    //!! Add axes to the bodies
    engine.addAxesToBody(bodyA, 1.5);
    engine.addAxesToBody(bodyB, 1.5);

    //!! Change bodyA to static, set its position and reset its rotation
    engine.setBodyToStatic(bodyA);
    bodyA.position.set(0, 10, 0);   //!! Up
    bodyA.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 1, 1), 0); //!! Reset roration
   
    //!! Damping makes the movement slow down with time
    bodyB.linearDamping  = 0.1;    
    bodyB.angularDamping = 0.1;

    //!! Pivots
    pivotA = new CANNON.Vec3(0, -2, 0);   //!! Change the pivotA and check the result
    pivotB = new CANNON.Vec3(0, +4, 0);   //!! Change the pivotB and check the result

    //!! Create point-to-point constraint of the bodyA and bodyB
    p2pConstraint = new CANNON.PointToPointConstraint(
        bodyA, pivotA,
        bodyB, pivotB,
        maxForce
    );
}

function createPointToPointLine(p1, p2) {

    //!! Geometry and material
    let geometry = new THREE.BufferGeometry();
    let material = new THREE.LineBasicMaterial( { vertexColors: THREE.VertexColors } );

    let positions = []; //!! Point array (x, y, z)
    let colors    = []; //!! Color array (r, g, b)
    
    //!! Ponts
    positions.push(p1.x); positions.push(p1.y); positions.push(p1.z);    //!! p1: x, y, z
    positions.push(p2.x); positions.push(p2.y); positions.push(p2.z);    //!! p2: x, y, z

    //!! Colors
    colors.push(0); colors.push(1); colors.push(1);    //!! c1: r, g, b
    colors.push(1); colors.push(1); colors.push(0);    //!! c2:  r, g, b

    //!! Adds attributes, the positions and colors
    geometry.addAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );
    geometry.addAttribute( 'color'   , new THREE.Float32BufferAttribute( colors   , 3 ) );

    //!! Computes bounding
    //geometry.computeBoundingSphere(); //!! Not required in this case

    //!! Creates line and adds to scene
    let line =  new THREE.Line( geometry, material );
    engine.getScene().add( line );

    return line;
}

function updatePointToPointLine(ln, p1, p2) {

    let positions = ln.geometry.attributes.position.array;
    let i=0;
    //!! P1
    positions[i++] = p1.x;
    positions[i++] = p1.y;
    positions[i++] = p1.z;
    //!! P2
    positions[i++] = p2.x;
    positions[i++] = p2.y;
    positions[i++] = p2.z;
    ln.geometry.attributes.position.needsUpdate = true; 

    //!! Computes bounding
    //geometry.computeBoundingSphere(); //!! Not required in this case
}

//!! Add Constraint
function addConstraint() {

    if( isAdded === true ) return;   //!! It is added, return

    //!! Add the point-to-point to the physics world
    engine.addConstraint( p2pConstraint ); 
    isAdded = true;

    if( !lineA ) {  //!! If the lines are not created, create them

        //!! Origin of bodyA to hookA
        lineA = createPointToPointLine( bodyA.position, bodyA.position.vadd(pivotA) );

        //!! Origin of bodyB to hookA (hookA and tipB are located in the same location)
        lineB = createPointToPointLine( bodyB.position, bodyA.position.vadd(pivotA) );
    }
}

//!! Remove Constraint
function removeConstraint() {
     //!! Remove the point-to-point from the physics world
     engine.removeConstraint( p2pConstraint );   
     isAdded = false;  
}

//!! Engine callback function
function callback( args ) {

    if( !bodyA || !bodyB ) return;

    if( method == 0 ) {
        if( lineA ) { //!! If the lines are created, update them
            updatePointToPointLine( lineA, bodyA.position, bodyA.position.vadd( pivotA ) ); //!! OriginA-to-hookA
            updatePointToPointLine( lineB, bodyB.position, bodyA.position.vadd( pivotA ) ); //!! OriginB-to-hookB
        }
    }
    else if( method == 1 ) {
        if( lineA ) { //!! If the lines are created, update them

            //!! pinA is sticked to the bottom face of the static box
            let pinA = new CANNON.Vec3().copy( bodyA.position );
            pinA.y  -= 1;

            //!! HookA
            let hookA = new CANNON.Vec3();
            bodyA.position.vadd(pivotA, hookA);

            //!! Direction from hookA to originB  
            let dir = new CANNON.Vec3();
            hookA.vsub(bodyB.position, dir);
            dir.normalize();

            //!! Offset vector from originB to the top face of the bodyB
            let offset = new CANNON.Vec3();
            dir.mult(bodyB.threemesh.scale.y, offset);

            //!! pinB is sticked to the bottom face of the bynamic box (bodyB)
            let pinB = new CANNON.Vec3();
            bodyB.position.vadd(offset, pinB);

            //!! Update the lines
            updatePointToPointLine(lineA, pinA, hookA ); //!! OriginA-to-hookA
            updatePointToPointLine(lineB, pinB, hookA ); //!! OriginB-to-hookA
        }
    }

    if( engine.getKeyDown('a', 1000) ) {
       addConstraint();
    }

    else if( engine.getKeyDown('r', 1000) ) {
       removeConstraint();
    }

    else if( engine.getKeyDown('f', 1000) ) {
        engine.applyForceToRayBody( 300 );      //!! Appy force to raycasted body   
    }
    else if( engine.getKeyDown('l', 2000) ) {   
        engine.toggleLabels();                  //!! show/hide labels
    }

    else if( engine.getKeyDown('0', 2000) ) {   //!! Calculation method #0   
        method = 0;
    }
    else if( engine.getKeyDown('1', 2000) ) {   //!! Calculation method #1  
        method = 1;
    }
    else if( engine.getKeyDown('x', 2000) ) {   //!! Toggle axes      
       engine.toggleAxes();
    }
    else if( engine.getKeyDown('d', 2000) ) {   //!! Toggle body-debug
        engine.toggleDebug();
    }

    /**
     * Update scalar and vector controls
     */
    if(0 == args.frameCount % 5 ) {

        WebGui.updateScalar( Y_Pos, bodyB.threemesh.position.y );
        WebGui.updateVector( Vec2, bodyB.threemesh.position );
        WebGui.updateVector( Vec3, bodyB.threemesh.position );
        WebGui.updateVector( Vec4, bodyB.quaternion );

       
    }

    /**
     * Update plotters
     */
    if(0 == args.frameCount % 2 ) {
        WebGui.updatePlotter(Plot1, bodyB.position );
        WebGui.updatePlotter(Plot2, bodyB.threemesh.rotation );
        WebGui.updatePlotter(Plot3, bodyB.quaternion );
    }

    /**
     * Update oscilloscope
     */
    if(oscilloscope)
        oscilloscope.addData( [ bodyB.quaternion.x, bodyB.quaternion.y, bodyB.quaternion.z, bodyB.quaternion.w ] );
}



/**
 * Create a scalar control
 */
WebGui.createScalar(
    "Y-Down",       //!! Window title
    2,              //!! x position
    2,              //!! y position
    'yellow',       //!! container style, 'red', 'green', 'blue', 'yellow', 'pink' 
    "Y",            //!! variable name displayed on the left-hand side
    -20,            //!! minumum value
    +20,            //!! maximum value
    10,             //!! initial value
    'vy',           //!! display style, 'vx', 'vy', 'vz', 'vw'
    function( key, val ){   //!! callback function, called when the value is changed
        bodyA.position.set( 0, val, 0 );    //!! Change y-position of the bodyB
    }
);

/**
 * Creat scalar and used it as indicator, no callback is required
 */
const Y_Pos = WebGui.createScalar("Y-Position", 2, 54, 'green', "Y", -20, +20, 10, 'vy');


/**
 * Create vector2 (point; x, y) control
 */
const Vec2 = WebGui.createVector2(
    "Point",        //!! Window title
    100,            //!! x position       
    2,              //!! y position
    'yellow',       //!! container style, 'red', 'green', 'blue', 'yellow', 'pink'    
    false,          //!! don't use inline mode, use single-column mode
    -20,            //!! minumum value   
    +20,            //!! maximum value
    10,             //!! initial value
    function( key, val ){    //!! callback function, called when the value (x or y) is changed
        console.log( key + ": " + val );
    }
);

/**
 * Create vector3 (x, y, z)
 */
const Vec3 = WebGui.createVector3("Vector", 200, 2, 'green', false, -20, +20, 10, function( key, val ){
    console.log( key + ": " + val );
});

/**
 * Create vector4 (x, y, z, w)
 */
const Vec4 = WebGui.createVector4("Quaternion", 300, 2, '', true, -20, +20, 10, function( key, val ){
    console.log( key + ": " + val );
});

/**
 * Create plotter
 */
const Plot1 = WebGui.createPlotter( 
    "Target Position",          //!! window title
    2,                          //!! x position
    120,                        //!! y position
    "green",                    //!! window style ('red', 'green' 'blue', 'yellow', 'pink')
    [ true, true, true, false ],//!! enables[true, true, true, true]
    [  200,  200,  200,  200 ], //!! npts   [200, 200, 200, 200]
    [   0,    0,    0,     0 ], //!! min    [-5, -5, -5, -5]
    [  10,   10,   10,    10 ], //!! max    [+5, +5, +5, +5]
    [   0,    -5,    0,     0 ]  //!! offste [0, 0, 0, 0]
);

/**
 * Create plotter with full default settings (null means use defult values/settings)
 */
const Plot2 = WebGui.createPlotter( "Euler Rotation", 2, 300, "blue", null, null, null, null, null);

/**
 * Create plotter with some default settings (null means use defult values/settings)
 */
const Plot3  = WebGui.createPlotter( "Quaternion Rotation", 2, 480, "yellow", [1,1,1,1], null, [-1,-1,-1,-1], [1,1,1,1], null);




/**
 * Create a blank container
 */
const btnc = WebGui.createContainer('Single-Column Buttons', 'pink', 700, 2);

/**
 * Single-Column Buttons
 */
const btnNames = ['Add Const.', 'Rem Const.', 'Labels', 'Axes', 'Grids'];
const btnTypes = ['red', 'green', 'blue', 'yellow', 'pink'];
for(let i=0; i<btnTypes.length; i++) {
    WebGui.createButton(btnc, btnNames[i], i, btnTypes[i], buttonActions);
}

/**
 * Button callback funtion
 */
function buttonActions( evt ) {
    if(evt.id == 0) {
        addConstraint();   
    }
    else if(evt.id == 1) {
        removeConstraint();   
    }
    else if(evt.id == 2) {
        engine.toggleLabels(); 
    }
    else if(evt.id == 3) {
        engine.toggleAxes();    
    }
    else if(evt.id == 4) {
        engine.toggleGrids();    
    }
}

/**
 * Single-Row Buttons
 */
const btnc2 = WebGui.createContainer('Single-Row Buttons', 'red', 300, 60);
for(let i=0; i<btnTypes.length; i++) {
    WebGui.createButton(btnc2, btnNames[i], i, btnTypes[i], buttonActions, {inline: true});
}


/**
 * Oscilloscope
 */
const oscContainer = WebGui.createContainer('Oscilloscope', '', 300, 120);
const oscilloscope = WebGui.createOscilloscope( oscContainer, 380, 100, 200 );
