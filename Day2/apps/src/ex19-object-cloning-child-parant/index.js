/**
 * Example-19: Object Cloning, Child-Parent and WebGui
 * 
 * Dr.Santi Nuratch
 * Embedded Computing and Control Laboratory
 * ECC-Lab, INC-KMUTT
 * 11 March, 2019
 */


import { WebGui }        from '../libs/ECC-Web-Gui';
import { Engine, THREE } from '../libs/ECC-CGP-Engine';

//!! Create the engine with physics enabled
const engine = new Engine({
    
    physics:{
        enabled: true,     //!! Enable the physics engine
        debug: {
            enabled: false
        }
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
        'models/boxes001.gltf', //!! Textured boxes, the wooden boxes
    ]
};

//!! Initialise the engine with the given options, the initOpts object
engine.init( initOpts ).then( ( params ) => {
    uerInit( params );          //!! User initialized function
    engine.start( callback );   //!! Start and provide the callback function
});


const TARGET_NAME   = 'CubeRedWood000';
const clonedObjects = [];   //!! Child objects (children)

const ITEMS  = 100;         //!! Number of cloned objects
const SCALE  = 0.2;         //!! Object scaler
const GAIN   = 5;           //!! Sine wave aplitude

let   PShift = 0;           //!! phase-shift
let   Cycles = 3;           //!! Number of cycles

const Parent = new THREE.Object3D();    //!! Parent object


//!! User initialized function
function uerInit() {

    //!! Target (prototype)
    const targetMesh  = engine.getMeshByName( TARGET_NAME );
    
    //!! Do checking
    if( !targetMesh ) throw "The " + TARGET_NAME + " cannot be found!";

    //!!
    //!! Object Cloning
    //!!
    for( let i=0; i< ITEMS; i++ ) {
        const mesh = targetMesh.clone();    //!! clone
        mesh.rotation.set( 0, 0, 0 );       //!! set rotation
        clonedObjects.push( mesh );         //!! add into array
        Parent.add( mesh );                 //!! append to parent
    }

    //!! Calculate children position
    calculatePosition();
    
    //!! Move parent up
    Parent.position.set( 0, GAIN+SCALE, 0 );

    //!! Add the parent (with is children) into the main scene
    engine.getScene().add( Parent );

}

//!! Calculate children position
function calculatePosition() {

    for( let i=0; i<ITEMS; i++ ) {

        //!! x, y, z positions
        let xp = i*SCALE*2 - ITEMS*SCALE + SCALE;
        let yp = GAIN * Math.sin( PShift + Cycles * 2 * Math.PI * i / (ITEMS - 0) );
        let zp = 0;

        //!! change object scale and position
        clonedObjects[i].scale.set(SCALE, SCALE, SCALE);
        clonedObjects[i].position.set( xp, yp, zp );
    }
}

//!! Buttons
const btnContainer = WebGui.createContainer( 'Controls', 'green', 0, 0 );   //!! Create container
const btnNames = [ "Lables", "Axes"  , "Grids" ];   //!! Button names
const btnTypes = [ "blue"  , "yellow", "pink"  ];   //!! Button styles
for(let i=0; i<btnTypes.length; i++) {              //!! Create buttons
    WebGui.createButton( btnContainer, btnNames[i], i, btnTypes[i], buttonActions, {wrapper:{width: '82px'}} );
}
function buttonActions( evt ) { //!! Callback function of the buttons
    if( evt.id == 0 )     {  engine.toggleLabels(); }   //!! Toggle label visibility
    else if( evt.id == 1 ){  engine.toggleAxes();   }   //!! Toggle axes visibility
    else if( evt.id == 2 ){  engine.toggleGrids();  }   //!! Toggle grids visibility
}

//!! Create numerical control for phase-shift
WebGui.createScalar("PShift", 0, 130, 'blue', "S", -Math.PI, +Math.PI, PShift, 'vx', ( val ) => {
    PShift = val;           //!! Update phase-shift
    calculatePosition();    //!! Recalculate position of objects
});

//!! Create numerical control for number of cycles
WebGui.createScalar("Cycles", 0, 190, 'pink', "C", 0.5, 5, Cycles, 'vy', ( val ) => {
    Cycles = val;           //!! Update number of cycles
    calculatePosition();    //!! Recalculate position of objects
});


//!! Parent Position Container and numerical controls
const ppc = WebGui.createContainer("Parent Position", "yellow", 100, 0);
ppc.addItem( new WebGui.createNumItem("vx", "X", -10, +10, 0, true, function( v ){
    Parent.position.x = v;  //!! Change position x
}));
ppc.addItem( new WebGui.createNumItem("vy", "Y", GAIN+SCALE, +20, GAIN+SCALE, true, function( v ){
    Parent.position.y = v;  //!! Change position y
}));
ppc.addItem( new WebGui.createNumItem("vz", "Z", -5, +5, 0, true, function( v ){
    Parent.position.z = v;  //!! Change position z
}));

//!! Parent Retation Container and numerical controls
WebGui.createVector3("Parent Rotation", 100, 64, 'pink', true, -Math.PI, +Math.PI, 0, function( key, val ){
    if( key == 'x')      { Parent.rotation.x = val; }   //!! Change rotation x
    else if( key == 'y') { Parent.rotation.y = val; }   //!! Change rotation y
    else if( key == 'z') { Parent.rotation.z = val; }   //!! Change rotation z
});


//!! Create indicator of camera posiotion
const cameraPosition = WebGui.createVector3("Camera Position (Indicator)", 100, 130, '', true, -100, +100, 5);

//!! Engine callback function
function callback( evt ) {

    //!! Update child object rotation
    clonedObjects.forEach( obj => {
        obj.rotation.y += obj.position.y/50;  
    });

    //!! Update camera position indicator
    if( evt.frameCount % 5 == 0  ) {
        WebGui.updateVector( cameraPosition, engine.getCamera().position );
    }
}
