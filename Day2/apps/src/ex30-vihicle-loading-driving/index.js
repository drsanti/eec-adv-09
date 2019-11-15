/**
 * Example-30: loading 4-wheel racing car model usig loadVihicle() 
 * 
 * Dr.Santi Nuratch
 * Embedded Computing and Control Laboratory
 * 05 May, 2019
 */



import Engine from '../libs/ECC-CGP-Engine';
const REQUIRED_MODEL_TYPE = 1;
const TargetModels=["models/car/car_shpere.gltf", "models/car/car_cylinder.gltf"];

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
            antialias: true,
        }
    },
});

engine.init({
    envPath: "images/bridge",
    models: [
        "models/scene001.gltf"
    ] 
}).then( ( ) => {
    init();
    engine.setCameraPosition(30, 20, 20); 
});





const CarParts = [];
const WheelConstraints = [];

function init() {

    engine.loadVihicle( TargetModels[REQUIRED_MODEL_TYPE] ).then( ( vihicle ) => {
        console.log( vihicle ); 
        
        CarParts.push( engine.getBodyByMeshName( "Mesh_CarBody" ) );
        CarParts.push( engine.getBodyByMeshName( "0_Mesh_Wheel_FrontLeft" ) );
        CarParts.push( engine.getBodyByMeshName( "1_Mesh_Wheel_FrontRight" ) );
        CarParts.push( engine.getBodyByMeshName( "2_Mesh_Wheel_BackLeft" ) );
        CarParts.push( engine.getBodyByMeshName( "3_Mesh_Wheel_BackRight" ) );

        //!! Body mass
        CarParts[0].mass = 20;
        CarParts[1].mass = 20;
        CarParts[2].mass = 20;
        CarParts[3].mass = 20;
        CarParts[4].mass = 20;

        for( let i=1; i<=4; i++) {
            WheelConstraints.push( new Engine.PHYSICS.HingeConstraint( CarParts[0], CarParts[i], {
                pivotA: new Engine.Vec3().copy(CarParts[i].position.vsub(CarParts[0].position)),
                axisA:  new Engine.Vec3( +1.0, +0.0, +0.0 ),
                pivotB: new Engine.Vec3( +0.0, +0.0, +0.0 ), 
                axisB:  new Engine.Vec3( +0.0, +1.0, +0.0 )
            }));
            engine.addConstraint( WheelConstraints[i-1] );
            WheelConstraints[i-1].enableMotor();    //!! Enable Motors
        }

        engine.start( callback );
    });
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

