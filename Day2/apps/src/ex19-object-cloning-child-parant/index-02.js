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
    engine.start();             //!! Start without callback function
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

function calculatePosition() {
    /*
    for(let i=0; i< clonedObjects.length; i++) {
        let o = clonedObjects[i]; 
        o.position.x = i*o.scale.x*2; 
    }
    */

    /*
    for(let i=0; i< clonedObjects.length; i++) {
        let o = clonedObjects[i]; 
        let a = (2*Math.PI/clonedObjects.length) * i;
        o.position.x = 40 * Math.cos( a ); 
        o.position.z = 40 * Math.sin( a ); 
        o.rotation.x = a;
    }
    */

   for(let i=0; i< clonedObjects.length; i++) {
    let o = clonedObjects[i]; 
    let a = (10*Math.PI/clonedObjects.length) * i;
    let r = i/5;
    o.position.x = r * Math.cos( a ); 
    o.position.z = r * Math.sin( a ); 
    o.position.y = r/3;
    o.rotation.x = a;
}
}