/**
 * Example-22: Rigid-body clonig and multiple constraints (chaining)
 * 
 * Dr.Santi Nuratch
 * Embedded Computing and Control Laboratory
 * ECC-Lab, INC-KMUTT
 * 16 March, 2019
 */


import Engine from '../libs/ECC-CGP-Engine';
import WebGui from '../libs/ECC-Web-Gui';

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
            enabled: true,
        }
    }
});

//!! Initialze and start the engine
engine.init( {
    envPath: 'images/snow',        //!! Environmant directory
    models: [ 
        'models/scene000.gltf',     //!! Ground and walls
        'models/boxes001.gltf',     //!! Colored cube
    ]
}).then( () => {
    //!! Change camera position and update control
    engine.getCamera().position.set(-30, 30, -30);
    engine.getControl().update();
    userInit();
    engine.start( callback );   //!! Start the engine and give it the callback
});

function userInit() {
    cloneBodies("CubeRedWood001");
}


let bodies = [];
let constraints = [];
let constraints_Added = true;
const NumRigidBodies = 15;
const SCALER = 0.95;

//!! Clone rigid-body including its mesh
function cloneBodies( srcName ) {

    //!! Get target mesh, used as prototype pbject
    let src = engine.getMeshByName(srcName);
    src.position.set(0, 0, 0);
    const scale = src.scale.x;
    let scl = scale;
    let mass = 5;
    //!! Clone and create rigid-body 11 objects
    for( let i=0; i<NumRigidBodies; i++) {

        //!! Clone mesh
        let mesh = engine.cloneMesh( src, 'Cube'+i );   //!! 'Cube' tells the engine to create bube-collider
        engine.getScene().add(mesh);                    //!! Add to the main scene
        scl *= SCALER;
        mesh.scale.set (scl, scl, scl);

        //!! Create rigid-body, position and add into the physics
        let body = engine.createBodyFromMesh( mesh );
        body.mass = mass * (SCALER/3);
        body.name = mesh.name;
        body.position.y = 3;
        body.position.x = -(scl*(NumRigidBodies/2)) + i*scl*2;
        bodies.push( body );
        engine.getWorld().add( body );
    }
    //!! Remove the prototype object. Note: remove the src will remove all mesh-debug, toggleMeshDebug will not work
    //engine.removeBody( engine.getBodyByMeshName(src.name) );

    //!! Make head, the first one will be static
    engine.setBodyToStatic( bodies[0] );    //!! Static
    bodies[0].quaternion.setFromAxisAngle( new Engine.Vec3( 0, 0, 1), -Math.PI/2 );
    bodies[0].threemesh.visible = false;    //!! Hidden

    //!! Create point-to-point constraints and add to the physics
    scl = scale;
    for(let i=1; i<bodies.length; i++) {
        scl *= SCALER;
        let p2p = new Engine.PHYSICS.PointToPointConstraint(
            bodies[i-1], new Engine.Vec3(+scl+0.2, 0, 0),
            bodies[i-0], new Engine.Vec3(-scl-0.2, 0, 0),
            10,
        );
        constraints.push(p2p);      //!! Add to array
        engine.addConstraint(p2p);  //!! Add to physics
    }
    constraints_Added = true;
}

//!! Add Constraints
function addConstraints() {
    if( constraints_Added === true ) return;
    constraints.forEach(c => {
        engine.addConstraint( c );      
    });
    constraints_Added = true;
}

//!! Remove Constraints
function removeConstraints() {
    if( constraints_Added === false ) return;
    constraints.forEach(c => {
        engine.removeConstraint( c );      
    });    
    constraints_Added = false;
}


let alpha = 0;
function callback() {

    if( engine.getKeyDown("f", 500) ) {
        engine.applyForceToRayBody( 1000 );
    }
    else if( engine.getKeyDown("l", 1000) ) {
        engine.toggleLabels();
    }
    else if( engine.getKeyDown("a", 1000) ) {
        addConstraints();
    }
    else if( engine.getKeyDown("r", 1000) ) {
        removeConstraints();    
    }
    else if( engine.getKeyDown("x", 1000) ) {
        engine.addAxesToBody( bodies[0] );    
    }
    else if( engine.getKeyDown("d", 1000) ) {
        engine.toggleDebug();  
    }

    //!! Make head (hidden object) move
    if( constraints_Added ) {
        bodies[0].position.x = 10 * Math.sin(Math.PI*2*alpha);
        bodies[0].position.z = 10 * Math.cos(Math.PI*2*alpha*4);
        bodies[0].position.y = 20 + 5 * Math.cos(Math.PI*2*alpha*5);
        bodies[1].angularVelocity.set(0, 10, 0);
        alpha += Math.PI/5000;
    }

    plotter(bodies[bodies.length-1]);      //!! Plotter
}



/*************************************************************************************************/
/*                                         WebGui                                                */
/*************************************************************************************************/

//!! Plotter
let Plotter = {
    created:        false,
    container:      null,
    oscilloscopr:   null,
};
function plotter( target ) {
    if( !target) return;
    if( Plotter.created === false ) {
        Plotter.oscContainer = WebGui.createContainer('Quaternion of ' + target.name, '', 2, 2);
        Plotter.oscilloscope = WebGui.createOscilloscope( Plotter.oscContainer, 380, 100, 500 );
        Plotter.created = true;
        return;
    }
    
    const q = target.quaternion;  //!! Get quatanion of the WheelBodies[0]
    Plotter.oscilloscope.addData([q.x, q.y, q.z, q.w]);
}

//!! Buttons for Add/Remove Constraints 
const btnNames = ['Add Const.', 'Rem Const.'];
const btnTypes = ['red', 'green'];
const btnFuncs = [addConstraints, removeConstraints];
const btnc = WebGui.createContainer('Add/Remove Constraints', 'blue', 2, 230);
for(let i=0; i<btnTypes.length; i++) {
    WebGui.createButton(btnc, btnNames[i], i, btnTypes[i], btnFuncs[i]);
}
