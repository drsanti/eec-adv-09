
import Engine from '../libs/ECC-CGP-Engine';

const engine = new Engine({
    physics: {
        enabled: false, //!! Disable the physics engine
    }
});
 

let Target = null;


engine.init({
    envPath: "images/bridge",
    models: [
        "models/temp/cube.gltf"
    ]
}).then(() => {

    //!! START/INIT
    Target = engine.getMeshByName("c1");
    console.dir(Target);
    
    
    //!! LOOP 60fps
    engine.start(()=>{

       
        

        //!! 1) Object Manipulation
        // Target.rotation.y += 0.01;
        // Target.position.z += 0.01;
        // Target.scale.y += 0.01;

        //!! Keyboard

        if(engine.getKeyDown('e', 1000)) {
            //Target = engine.doRaycast()[0].mesh; // Select and object using RayCast (key E)
            //console.dir(Target);

            Target = engine.doRaycast()[0].mesh;
            console.dir(Target);

            
        }


        if(Target == null) {                // Check if the Target is null
            return;
        }

        Target.material.map.offset.y += 0.001;

        if(engine.getKeyDown('r', 10)) {
            Target.rotation.y += 0.01;      // Rotate  
        }

        if(engine.getKeyDown('w', 10)) {    // Move Forward
            Target.position.z += 0.1;
        }
        if(engine.getKeyDown('s', 10)) {    // Move Backward
            Target.position.z -= 0.1;
        }
        if(engine.getKeyDown('a', 10)) {    // Move Left
            Target.position.x += 0.1;
        }
        if(engine.getKeyDown('d', 10)) {    // Move Right
            Target.position.x -= 0.1;
        }
    });
    engine.setCameraPosition(30, 20, 20);
});
