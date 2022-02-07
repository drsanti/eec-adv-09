
import Engine from '../libs/ECC-CGP-Engine';

const engine = new Engine({
    physics: {
        enabled: false, //!! Disable the physics engine
    }
});
 

let Target = null;

let clicked = false;


engine.init({
    envPath: "images/bridge",
    models: [
        "models/temp/cube.gltf"
    ]
}).then(() => {

    // Initial (run only one time)
    addEventListener('click', ()=> {
        clicked = true; // Executed when Left-CLick
    });

   
    // Infinite loop
    engine.start(()=>{

        if(clicked == true) {
            clicked = false;
            Target = engine.doRaycast()[0].mesh; // Select and object using Left-Click
            console.log(Target.name, 'is selected');
        }

        if(Target == null) {                    // Check if the Target is null
            return;
        }

        // Do something with the Target below.
        //
        //

    });
    engine.setCameraPosition(30, 20, 20);
});
