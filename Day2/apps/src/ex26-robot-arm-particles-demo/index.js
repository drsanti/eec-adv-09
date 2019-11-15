/**
 * Example-26: Robot Arm and Particles Demo
 * 
 * Dr.Santi Nuratch
 * Embedded Computing and Control Laboratory
 * 26 March, 2019
 */



import {Engine, SPE} from '../libs/ECC-CGP-Engine';
import WebGui from '../libs/ECC-Web-Gui';

const engine = new Engine({
    graphics:{
        sceneType:"env",
        ambientLight: {
            enabled: true
        },
        pointLight: {
            enabled: true,
            intensity: 5
        },
        directionalLight: {
            enabled: false
        }
    },
    physics:{
        debug:{
            enabled: false
        },
       
    }
});

engine.init( {
    envPath: 'images/snow',
    models: [ 
        'models/arm001.gltf',
    ]
}).then( () => {
    userInit();
    engine.setCameraPosition(0, 10, 40);
    engine.start( callback );
});


/**
 * RobotArm class
 */
function RobotArm( engine, x, y, z ) {

    const THREE  = Engine.GRAPHICS;
     this.joints = [];
    this.pivots = [];
    this.alpha  = 0;
    this.delta  = 0.01 + Math.random()/50;

    const parts = [];
    parts.push(engine.getMeshByName("Base"));
    parts.push(engine.getMeshByName("J000"));
    parts.push(engine.getMeshByName("J001"));
    parts.push(engine.getMeshByName("J002"));

    for(let i=0; i<parts.length; i++) {
        parts[i].visible = true;
        this.joints.push(parts[i].clone());
        this.pivots.push(new THREE.Object3D());
        parts[i].visible = false;
    }

    for( let i=0; i<this.pivots.length; i++) {
        this.pivots[i].add( this.joints[i] ); 
        if( i>0 ) {
            this.joints[i].position.x = 0; 
            this.pivots[i-1].add( this.pivots[i] );
            
        } 
        if( i>1 ) {
            this.pivots[i].position.x = 6; 
        }
    }
    //!! The last one, the tip
    this.pivots.push(new THREE.Object3D());
    // Position and add to the parent
    this.pivots[this.pivots.length-1].position.x = 6; 
    this.pivots[this.pivots.length-2].add(this.pivots[this.pivots.length-1]); 

    //!! The base position
    this.pivots[0].position.set( x, y, z );

    //!! Particle
    this.particle = new Particles(engine, x, y, z);

    //!! Add to the scene
    engine.getScene().add( this.pivots[0] );

    
}

RobotArm.prototype.update = function() {
    this.pivots[0].rotation.y = Math.cos(this.alpha/4) * Math.PI;
    this.pivots[1].rotation.z = Math.PI/2 + Math.sin(this.alpha);
    this.pivots[2].rotation.z = Math.cos(this.alpha);
    this.pivots[3].rotation.z = Math.sin(this.alpha) - Math.cos(this.alpha/2);
    this.alpha+=this.delta;

    this.particle.particleGroup.tick( this.delta ); 

    var position = new Engine.GRAPHICS.Vector3();
    position.setFromMatrixPosition( this.pivots[this.pivots.length-1].matrixWorld );
    this.particle.emitter.position.value = position;
}


//!! Global variables
let eccLogo;
let Robot1, Robot2, Robot3, Robot4;
function userInit() {
    Robot1 = new RobotArm( engine, -10, 0, -10 );
    Robot2 = new RobotArm( engine, -10, 0, +10 );
    Robot3 = new RobotArm( engine, +10, 0, -10 );
    Robot4 = new RobotArm( engine, +10, 0, +10 );

    eccLogo = engine.getMeshByName("ecclogo");
    eccLogo.rotation.x = Math.PI/2; 
    eccLogo.scale.set( 1.2, 1.2, 1.2);
    eccLogo.position.set(0, 0, 0);
}


let beta = 0;
function callback( arg ) {
    Robot1.update();
    Robot2.update();
    Robot3.update();
    Robot4.update();

    if(engine.getKeyDown('f', 1000)) {
        engine.applyForceToRayBody(1000);
    }
    if(engine.getKeyDown('l', 1000)) {
        engine.toggleLabels();
    }
    if(engine.getKeyDown('x', 1000)) {
        engine.toggleAxes();
    }
    if(engine.getKeyDown('d', 1000)) {
        engine.toggleDebug();
    }
    if(engine.getKeyDown('m', 1000)) {
        engine.toggleAxesOfMesh(J000);
        engine.toggleAxesOfMesh(J001);
        engine.toggleAxesOfMesh(J002);
    }

    Plotter_Analyzer_Update(arg);
    plotter();
    eccLogo.rotation.x = Math.cos(beta/4)*Math.PI*2;
    eccLogo.rotation.y = Math.sin(beta)*Math.PI*2;
    beta += 0.01;
}

/**
 * Particle class 
 */ 
function Particles( engine ) {

    const PARTICLE_COUNT = 1500;
    const THREE = Engine.GRAPHICS;

    this.particleGroup = null;
    this.emitter = null;
   
    this.particleGroup = new SPE.Group({
        texture: {
            value: new THREE.TextureLoader().load( 'images/particles/smokeparticle.png' )
        },
        maxParticleCount: PARTICLE_COUNT
    });

    this.emitter = new SPE.Emitter({
        particleCount: PARTICLE_COUNT,
        maxAge: 3,
        position: {
            value: new THREE.Vector3(0, 0, 0)
        },
        acceleration: {
            value:  new THREE.Vector3(0, -10-Math.random()*5, 0),
            spread: new THREE.Vector3(15, 0, 15)
        },
        velocity: {
            value: new THREE.Vector3(0, 5+Math.random()*10, 0)
        },
        color: {
            //value: [ new THREE.Color( 0.5, 0.5, 0.5 ), new THREE.Color() ],
            value: [ new THREE.Color( 0x888888+Math.random()*0x777777 ), new THREE.Color( 0x888888+Math.random()*0x777777  ), new THREE.Color( 0x888888+Math.random()*0x777777  ) ],
            spread: new THREE.Vector3(.2, .2, .2),
        },
        size: {
            value: [ 1 + Math.random(), 0 ]
        },
       
    });
    this.particleGroup.addEmitter( this.emitter );
    engine.getScene().add( this.particleGroup.mesh );
}

//!! Plotter_Analyzer
let Plotter_Analyzer = {
    created:        false,
    container:      null,
    oscilloscopr:   null,
};
function Plotter_Analyzer_Update( arg ) {
    if( !Plotter_Analyzer ) return;

    if( Plotter_Analyzer.created === false ) {
        Plotter_Analyzer.created = true;
        Plotter_Analyzer.oscContainer = WebGui.createContainer("Computational Time (mS) of <span style='color:#ff0a0a'><b>Graphics</b></span> and <span style='color:#09ff67'><b>Physics</b></span>", '', 0, 0);
        Plotter_Analyzer.oscilloscope = WebGui.createOscilloscope( Plotter_Analyzer.oscContainer, 380, 100, {points: 300, mainGrids: false} );
        
        Plotter_Analyzer.oscilloscope.setMin   (null,   0  );
        Plotter_Analyzer.oscilloscope.setMax   (null,  +20 );
        Plotter_Analyzer.oscilloscope.setOffset(null,  -10 ); //!! -(max/2)

        //Plotter_Analyzer.oscilloscope.setEnable(2, false);
        //Plotter_Analyzer.oscilloscope.setEnable(3, false);
    }
    const tg = engine.getGraphicsTime();
    const tp = engine.getPhysicsTime();//arg.physics.processingTime;
    const ta = tg + tp; 
    const td = engine.getDeltaTime();
    Plotter_Analyzer.oscilloscope.addData([ tg, tp, ta, td ]);
}


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
        Plotter.oscContainer = WebGui.createContainer("Robot1 <span style='color:#ff0a0a'><b>Quaternion</b></span> Rotation", '', 400, 0);
        Plotter.oscilloscope = WebGui.createOscilloscope( Plotter.oscContainer, 380, 100, {points: 300, mainGrids: false} );
    }
    Plotter.oscilloscope.addData([ Robot1.pivots[0].quaternion.y , Robot1.pivots[1].quaternion.z, Robot1.pivots[2].quaternion.z,Robot1.pivots[3].quaternion.z ]);
}
