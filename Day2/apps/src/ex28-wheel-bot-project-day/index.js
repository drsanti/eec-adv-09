/**
 * Example-28: 2-wheel robot demo for project-day 2019
 * 
 * Dr.Santi Nuratch
 * Embedded Computing and Control Laboratory
 * 28 April, 2019
 */


import Engine from '../libs/ECC-CGP-Engine';
import WebGui from '../libs/ECC-Web-Gui';

//!! Create the engine with physics enabled
const engine = new Engine({
    physics:{
        enabled:  true,             //!! Enable the physics engine
        debug:{
            enabled: false          //!! Disable mesh debugging
        },
        world: {
            defaultContactMaterial:{
                contactEquationRelaxation: 1,
                contactEquationStiffness: 50000  
            }
        }
    },
    graphics: {
        axes: {
            enabled: false,
        }
    }
});

engine.init( {
    envPath: 'images/park',
    models: [ 
        'models/scene001.gltf',
    ]
}).then( ( m ) => {
    
    
    userInit();
    
});


const MODEL_BOT_BODY    = 'models/projectDay/bot_base.gltf';
const MODEL_BOT_WHEEL_L = 'models/projectDay/bot_wheel_L.gltf';
const MODEL_BOT_WHEEL_R = 'models/projectDay/bot_wheel_R.gltf';

const MODEL_BOT_WHEEL_F = 'models/projectDay/bot_wheel_F.gltf';
const MODEL_BOT_WHEEL_B = 'models/projectDay/bot_wheel_B.gltf';


function userInit() {
    engine.setCameraPosition(-3, 5, -15); 
    //engine.showAxes();
    loadRobotAssets();
}

let robotBody = null;
let wheelLeft = null;
let wheelRight = null;
let wheelFront = null;
let wheelBack = null;

let Wheels = [];

function loadRobotAssets() {

    engine.loadAssets( MODEL_BOT_BODY ).then( function ( bb ) {

        robotBody = bb.body;
        robotBody.mass = 5;

        engine.loadAssets( MODEL_BOT_WHEEL_L ).then( function ( wl ) {
            wheelLeft = wl.body;
            wheelLeft.mass = 1;

            engine.loadAssets( MODEL_BOT_WHEEL_R ).then( function ( wr ) {
                wheelRight = wr.body;
                wheelRight.mass = 1;

                engine.loadAssets( MODEL_BOT_WHEEL_F ).then( function ( wf ) {
                    wheelFront = wf.body;
                    wheelFront.mass = 0.5;

                    engine.loadAssets( MODEL_BOT_WHEEL_B ).then( function ( wb ) {
                        wheelBack = wb.body;
                        wheelBack.mass = 0.5;
    
                        buildRobot();
                        engine.start( callback );
                    });
                });

            });
        });
    });
}


let ConstraintArray = [];

function buildRobot() {
    //!! Left-Wheel
    ConstraintArray.push( new Engine.PHYSICS.HingeConstraint( robotBody, wheelLeft, {
        pivotA: new Engine.Vec3( +1.55, -0.05, +0 ), 
        axisA:  new Engine.Vec3( +1.0, +0.0, +0.0 ),

        pivotB: new Engine.Vec3( +0.0, +0.0, +0.0 ), 
        axisB:  new Engine.Vec3( -1.0, +0.0, +0.0 )
    }));

    //!! Right-Wheel
    ConstraintArray.push( new Engine.PHYSICS.HingeConstraint( robotBody, wheelRight, {
        pivotA: new Engine.Vec3( -1.55, -0.05, +0 ), 
        axisA:  new Engine.Vec3( +1.0, +0.0, +0.0 ),

        pivotB: new Engine.Vec3( +0.0, +0.0, +0.0 ), 
        axisB:  new Engine.Vec3( -1.0, +0.0, +0.0 )
    }));

    //!! Front-Wheel
    ConstraintArray.push( new Engine.PHYSICS.HingeConstraint( robotBody, wheelFront, {
        pivotA: new Engine.Vec3( 0, -0.6, -1.5 ), 
        axisA:  new Engine.Vec3( +1.0, +0.0, +0.0 ),

        pivotB: new Engine.Vec3( +0.0, +0.0, +0.0 ), 
        axisB:  new Engine.Vec3( -1.0, +0.0, +0.0 )
    }));

    //!! Rear-Wheel
    ConstraintArray.push( new Engine.PHYSICS.HingeConstraint( robotBody, wheelBack, {
        pivotA: new Engine.Vec3( 0, -0.6, +1.5 ), 
        axisA:  new Engine.Vec3( +1.0, +0.0, +0.0 ),

        pivotB: new Engine.Vec3( +0.0, +0.0, +0.0 ), 
        axisB:  new Engine.Vec3( -1.0, +0.0, +0.0 )
    }));

    //!! Constraints
    engine.addConstraint( ConstraintArray[0] );
    engine.addConstraint( ConstraintArray[1] );
    engine.addConstraint( ConstraintArray[2] );
   engine.addConstraint( ConstraintArray[3] );


    //!! Collission Filter
    // const G1 = 1; 
    // const G2 = 2;
    // let ground = engine.getBodyByMeshName("CubeStaticGround");
    // ground.collisionFilterGroup = G1;
    // ground.collisionFilterMask  = G2;
    // wheelLeft.collisionFilterGroup  = G2;
    // wheelRight.collisionFilterGroup = G2;
    // wheelLeft.collisionFilterMask   = G1;
    // wheelRight.collisionFilterMask  = G1;

    //!! Create ground material and add to the physics world
    const groundFriction    = 0.5;
    const groundRestitution = 0.0;
    const groundMaterial = engine.createGroundMaterial( groundFriction, groundRestitution );

    //!! Create object material and add to the physics world
    const objectFriction    = 0.7;
    const objectRestitution = 0.0;
    const objectMaterial = engine.createObjectMaterial( objectFriction, objectRestitution, groundMaterial );

    //!! Apply the created materials to the rigid bodies
    const groundBody = engine.getBodyByMeshName( "CubeStaticGround" );
    groundBody.material = groundMaterial;


    wheelLeft.material  = objectMaterial;
    wheelRight.material = objectMaterial;


    const fbMat = engine.createObjectMaterial( 0.01, 0, groundMaterial );
    wheelFront.material  = fbMat;
    wheelBack.material   = fbMat;

    robotBody.material   = fbMat;

    Wheels.push(wheelLeft);
    Wheels.push(wheelRight);
    Wheels.push(wheelFront);
    Wheels.push(wheelBack);

    ConstraintArray[0].enableMotor();       //!! 0: Front-Left
    ConstraintArray[1].enableMotor();       //!! 1: Front-Right
   

    ConstraintArray[0].setMotorSpeed( 0 );
    ConstraintArray[1].setMotorSpeed( 0 );

    robotBody.angularDamping = 0.1;
    robotBody.linearDamping = 0.1;
    robotBody.inertia.set(0.2,0.2,0.2);
    robotBody.invInertia.set(0.2,0.2,0.2);
}


function forward() {
    AutoMove = false;
    ConstraintArray[0].setMotorSpeed( 2 );
    ConstraintArray[1].setMotorSpeed( 2 );
}
function backward() {
    AutoMove = false;
    ConstraintArray[0].setMotorSpeed( -2 );
    ConstraintArray[1].setMotorSpeed( -2 );
}
function left() {
    AutoMove = false;
    ConstraintArray[0].setMotorSpeed( -2 );
     ConstraintArray[1].setMotorSpeed( +2 );
}
function right() {
    AutoMove = false;
    ConstraintArray[0].setMotorSpeed( +2 );
    ConstraintArray[1].setMotorSpeed( -2 );
}
function stop() {
    AutoMove = false;
    ConstraintArray[0].setMotorSpeed( 0 );
    ConstraintArray[1].setMotorSpeed( 0 );
}


let AutoMove = true;
let alpha = 0, s1=3, s2=3;

function callback( arg ) {

    if( engine.getKeyDown( 'f', 1000) ) {
        engine.applyForceToRayBody( 1000 );
    }
    if( engine.getKeyDown( 'l', 1000) ) {
        engine.toggleLabels();
    }

    if( engine.getKeyDown( 'ArrowUp', 1000) ) {
        forward();
    }
    else if( engine.getKeyDown( 'ArrowDown', 1000) ) {
        backward();   
    }
    else if( engine.getKeyDown( 'ArrowLeft', 1000) ) {
        left();     
    }
    else if( engine.getKeyDown( 'ArrowRight', 1000) ) {
        right();
    }
    else if( engine.getKeyDown( ' ', 1000) ) {
        stop();
    }

    plotter();

    if( AutoMove && ConstraintArray.length>0) {
        ConstraintArray[0].setMotorSpeed( s1*Math.sin( alpha ) );
        ConstraintArray[1].setMotorSpeed( -s2*Math.sin( alpha ) );    

        alpha += 0.01;
        if(alpha > 5) {
            alpha = 5 - alpha;
            s1 = 1+2*Math.random();
            s2 = 1+2*Math.random();
        }
    }
}


//!! Plotter
let Plotter = {
    created:        false,
    container:      null,
    oscilloscopr:   null,
};
function plotter( ) {
    if( !Plotter || Wheels.length < 1 ) return;

    if( Plotter.created === false ) {
        Plotter.created = true;
        Plotter.oscContainer = WebGui.createContainer("<span style='color:#ff0a0a'><b>Quaternion</b></span> Rotation", '', 0, 80);
        Plotter.oscilloscope = WebGui.createOscilloscope( Plotter.oscContainer, 380, 100, {points: 1200, mainGrids: false} );
    }
    Plotter.oscilloscope.addData([ Wheels[0].quaternion.x , Wheels[1].quaternion.x, Wheels[2].quaternion.x, Wheels[3].quaternion.x ]);
}



const btnc = WebGui.createContainer('Move', 'green', 0, 0);

WebGui.createButton(btnc, "Forward", 0, "green", ()=>{
    forward();
});
WebGui.createButton(btnc, "Backward", 0, "green", ()=>{
    backward();
});

const btnc2 = WebGui.createContainer('Turn', 'blue', 90, 0);
WebGui.createButton(btnc2, "TurnLeft", 0, "blue", ()=>{
    left();
});
WebGui.createButton(btnc2, "TurnRight", 0, "blue", ()=>{
    right();
});

const btnc3 = WebGui.createContainer('Actions', 'yellow', 180, 0);
WebGui.createButton(btnc3, "Idle", 0, "yellow", ()=>{
    stop();
});
WebGui.createButton(btnc3, "Auto", 0, "yellow", ()=>{
    AutoMove = !AutoMove;
});




/******************************************************************************/
/*                                  SOCKET                                    */
/******************************************************************************/
// var app = require('express')();
// var http = require('http').Server(app);
// var io = require('socket.io')(http);

import io from "socket.io-client";
const HOST = "http://localhost";
const PORT = 3005;
const socket = io( HOST + ":" + PORT );

//!! 
socket.on('connect', () => {

    console.log("Robot connected to " + HOST + ":" + PORT);

    socket.on( "data", ( data ) => {

        console.log("robot received data from server: " + data);

        if( data === "forward") {
            forward();
        }
        if( data === "backward") {
            backward();   
        }
        if( data === "left") {
            left();   
        }
        if( data === "right") {
            right();    
        }
        if( data === "stop") {
            stop();    
        }
        if( data === "auto") {
            stop();    
        }
    });
});

