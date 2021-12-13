
// import Engine from '../libs/ECC-CGP-Engine';


import {Engine, CANNON, THREE} from '../libs/ECC-CGP-Engine';


const engine = new Engine({
    physics: {
        enabled: false, //!! Disable the physics engine
    }
});
 

console.log(engine);


// instantiate a loader
// const loader = new THREE.TextureLoader();

// // load a resource
// loader.load(
// 	// resource URL
// 	'models/temp/cube2/leather-red.png',

// 	// onLoad callback
// 	function ( texture ) {
// 		// in this example we create the material when the texture is loaded
// 		const material = new THREE.MeshBasicMaterial( {
// 			map: texture
// 		 } );
// 	},

// 	// onProgress callback currently not supported
// 	undefined,

// 	// onError callback
// 	function ( err ) {
// 		console.error( 'An error happened.' );
// 	}
// );



let Target = null;


engine.init({
    envPath: "images/bridge",
    models: [
        "models/temp/cube2/cube2.gltf"
    ]
}).then(() => {

    //!! START/INIT
    Target = engine.getMeshByName("sofa");
    

    // Load Color Map
    const diffuse = new THREE.TextureLoader().load( 'models/temp/cube2/leather-red.png' );

    // Create Material with the diffuse
    const material = new THREE.MeshBasicMaterial( { map: diffuse} );

    // Assign the Material to the Target
    Target.material = material;  
    

    // Optionals
    material.map.needsUpdate = true; 
    material.needsUpdate = true


    //!! LOOP 60fps
    engine.start(()=>{

    });
    engine.setCameraPosition(30, 20, 20);
});
