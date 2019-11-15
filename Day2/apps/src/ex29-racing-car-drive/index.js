/**
 * Example-29: 4-wheel racing car steering drive
 * 
 * Dr.Santi Nuratch
 * Embedded Computing and Control Laboratory
 * 05 May, 2019
 */

import Engine from '../libs/ECC-CGP-Engine';

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
        },
    },
    graphics: {
        axes: {
            enabled: false,
        },
        renderer:{
            antialias: false,
        },
        directionalLight: {
            enabled:    true,
        },
        ambientLight: {
            enabled:    true,
        }
    },
});

engine.init({
    envPath: "images/bridge",
    models: [
        "models/scene001.gltf"
    ] 
}).then( () => {
    init();
    engine.setCameraPosition(30, 20, 20);
    
});

const CarObjects = [
    {
        path: "models/car/body.gltf",
        mass: 10
    },
    {
        path: "models/car/front_left.gltf",
        mass: 1.5
    },
    {
        path: "models/car/front_right.gltf",
        mass: 1.5
    },
    {
        path: "models/car/back_left.gltf",
        mass: 1.5
    },
    {
        path: "models/car/back_right.gltf",
        mass: 1.5
    }
];

let Bodies = [ null, null, null, null ];
let WheelConstraints = [];

function init() {

    let modelCounter = 0;

    for( let i=0; i<CarObjects.length; i++ ) {

        engine.loadAssets(CarObjects[i].path, ( obj )=>{

            obj.body.position.y = 2;
            obj.body.mass =  CarObjects[i].mass;
            //obj.body.threemesh.castShadow  =true;
            console.log(obj.body.threemesh );
            Bodies[i] = obj.body;

            modelCounter++;
            if(modelCounter >= CarObjects.length) {
                buildRCar();
                engine.start( callback );
            }
        });    
    }
}


function buildRCar() {
    for( let i=1; i<=4; i++) {
        WheelConstraints.push( new Engine.PHYSICS.HingeConstraint( Bodies[0], Bodies[i], {
            pivotA: new Engine.Vec3().copy(Bodies[i].position.vsub(Bodies[0].position)),
            axisA:  new Engine.Vec3( +1.0,  +0.0, +0.0 ),
            pivotB: new Engine.Vec3( +0.0, +0.0, +0.0 ), 
            axisB:  new Engine.Vec3( +0.0, +1.0, +0.0 )
        }));
        engine.addConstraint( WheelConstraints[i-1] );
        WheelConstraints[i-1].enableMotor();    //!! Enable Motors
    }
}


let speed = 0;
const speedDelta = 0.5;
let speedNeedsUpdate = false;

let steering = 0;
const steeringDelta = Math.PI/50;
let steerigNeedsUpdate = false;


function callback() {

    if( WheelConstraints.length < 4) return;

    //!! Steering Control
    if( engine.getKeyDown("ArrowUp", 20)) {
        speed += speedDelta;
        speedNeedsUpdate = true;
    }
    else if( engine.getKeyDown("ArrowDown", 20)) {
        speed -= speedDelta;
        speedNeedsUpdate = true;
    }

    //!! Speed Control
    if( engine.getKeyDown("ArrowLeft", 20)) {
        steering -= steeringDelta;
        steerigNeedsUpdate = true;
    }
    else if( engine.getKeyDown("ArrowRight", 20)) {
        steering += steeringDelta;
        steerigNeedsUpdate = true;
    }

    //!! Update Steering
    if( steerigNeedsUpdate ) {
        WheelConstraints[0].axisA.z = steering;
        WheelConstraints[1].axisA.z = steering;
    }

    //!! Update Speed
    if( speedNeedsUpdate ) {
        WheelConstraints[0].setMotorSpeed( speed );
        WheelConstraints[1].setMotorSpeed( speed );
        WheelConstraints[2].setMotorSpeed( speed );
        WheelConstraints[3].setMotorSpeed( speed );
    }
}

setInterval( ()=>{

    //!! Steering Release
    if( steering > 0 ) {
        steering -= steeringDelta;
        steerigNeedsUpdate = true;
    }
    else if( steering < 0 ) {
        steering += steeringDelta;
        steerigNeedsUpdate = true;
    }
   
    //!! Speed Release
    if( speed > 0) {
        speed -= speedDelta;
        speedNeedsUpdate = true;
    }
    else if(speed < 0 ) {
        speed += speedDelta;
        speedNeedsUpdate = true;
    }


    //!! Be sure they are cleared to zero
    if( Math.abs(steering) < steeringDelta) {steering = 0;}
    if( Math.abs(speed) < steeringDelta) {speed = 0;} 
},100);
