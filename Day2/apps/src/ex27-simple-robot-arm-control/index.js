
/**
 * Example-27: Simple Robot Arm Control
 * 
 * Dr.Santi Nuratch
 * Embedded Computing and Control Laboratory
 * 08 April, 2019
 */


import Engine from '../libs/ECC-CGP-Engine';
import WebGui from '../libs/ECC-Web-Gui';

const engine = new Engine();

engine.init({
    envPath: "images/bridge",
    models: [
        "models/scene001.gltf",
        "models/RobotArm.gltf"
    ] 
}).then( () => {
    engine.setCameraPosition(-20, 10, -10);
    init();
    engine.start( callback );
});


let AutoMode   = true;
let Parts      = [];
const COUNT    = 9;   //!! Arm000 t0 Arm008
const controls = [];

function init() {
    for( let i=0; i<COUNT; i++) {
        Parts.push( engine.getMeshByName("Arm00" + i));
    }
}

let alpha = 0;
function move( ) {
    plotter();
    if( !AutoMode ) return;
    let time = alpha; alpha += 0.01;
    Parts[1].rotation.y = 2*Math.sin( time/4  );
    Parts[2].rotation.x = ( 1 + Math.sin( time/3 )) * Math.PI/3;
    Parts[3].rotation.x = ( Math.sin( time/2 )) * Math.PI/2;
    Parts[4].rotation.x = ( Math.sin( time/2.5 )) * Math.PI/2;
    Parts[5].rotation.x = ( Math.sin( time )) * Math.PI/2;
    Parts[6].rotation.z =  2*Math.sin( time*.15 );
    Parts[7].rotation.y = -(Math.sin( time*3.5 )) * Math.PI/6;
    Parts[8].rotation.y = +(Math.sin( time*3 )) * Math.PI/6;

    for( let i=0; i<Parts.length-1; i++) {
        if( i===0 || i===6 || i=== 7) {
            controls[i].setValue( Parts[i+1].rotation.y );
        }
        else if( i=== 5) {
            controls[i].setValue( Parts[i+1].rotation.z );
        }
        else {
            controls[i].setValue( Parts[i+1].rotation.x );     
        }
    }
}

function callback( arg ) {
    if( engine.getKeyDown("l", 1000) ) {
        if( engine.toggleLabels()) {
            engine.setLabelPosition(Parts[0], new Engine.GRAPHICS.Vector3(0, 0, 0))
            engine.setLabelPosition(Parts[1], new Engine.GRAPHICS.Vector3(0, 0.2, 0.2))
            engine.setLabelPosition(Parts[2], new Engine.GRAPHICS.Vector3(0, 0.4, 0.4))
        }
    }
    move( arg.timing.currentTime/1000 );
}

controls.push(WebGui.createScalar("Arm1-Rotation", 0, 0, 'green', "A1", 0, Math.PI*2, 0, 'vy', (rad) => {
    Parts[1].rotation.y = rad;
    AutoMode = false;     
}));
controls.push(WebGui.createScalar("Arm2-Rotation", 0, 52, 'green', "A2", 0, Math.PI*1, 0, 'vy', (rad) => {
    Parts[2].rotation.x = rad;
    AutoMode = false;   
}));
controls.push(WebGui.createScalar("Arm3-Rotation", 0, 104, 'green', "A3", -Math.PI/2, Math.PI/2, 0, 'vy', (rad) => {
    Parts[3].rotation.x = rad;
    AutoMode = false;   
}));
controls.push(WebGui.createScalar("Arm4-Rotation", 102, 0, 'blue', "A4", -Math.PI/2, Math.PI/2, 0, 'vz', (rad) => {
    Parts[4].rotation.x = rad;
    AutoMode = false;   
}));
controls.push(WebGui.createScalar("Arm5-Rotation", 102, 52, 'blue', "A5", -Math.PI/2, Math.PI/2, 0, 'vz', (rad) => {
    Parts[5].rotation.x = rad;
    AutoMode = false;   
}));
controls.push(WebGui.createScalar("Arm6-Rotation", 102, 104, 'blue', "A6", 0, Math.PI*2, 0, 'vz', (rad) => {
    Parts[6].rotation.z = rad;
    AutoMode = false;   
}));
controls.push(WebGui.createScalar("Arm7-Rotation", 204, 0, 'red', "A7", -Math.PI/5, Math.PI/6, 0, 'vx', (rad) => {
    Parts[7].rotation.y = rad;
    AutoMode = false;   
}));
controls.push(WebGui.createScalar("Arm7-Rotation", 204, 52, 'red', "A7", -Math.PI/5, Math.PI/6, 0, 'vx', (rad) => {
    Parts[8].rotation.y = -rad;
    AutoMode = false;   
}));

const btnc = WebGui.createContainer('Operation Mode', 'pink', 204, 104);
WebGui.createButton(btnc, "Auto/Manual", 0, "pink", ()=>{
    AutoMode = !AutoMode;  
});


//!! Plotter
let Plotter = {
    created:        false,
    container:      null,
    oscilloscopr:   null,
};
function plotter( ) {
    if( !Plotter ) return;

    if( Plotter.created === false ) {
        Plotter.created = true;
        Plotter.oscContainer = WebGui.createContainer("<span style='color:#ff0a0a'><b>Quaternion</b></span> Rotation", '', 0, 158);
        Plotter.oscilloscope = WebGui.createOscilloscope( Plotter.oscContainer, 380, 100, {points: 1200, mainGrids: false} );
    }
    Plotter.oscilloscope.addData([ Parts[1].quaternion.y , Parts[2].quaternion.x, Parts[3].quaternion.x, Parts[4].quaternion.x ]);
}
