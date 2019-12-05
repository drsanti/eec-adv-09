/**
 * ex12-object-cloning.js
 */
import { THREE } from '../libs/ECC-CGP-Engine';
import GameEngine from '../libs/GameEngine'

new GameEngine({
    models:     ['nancy'], //!!'mulan', 'mousey', 'ortiz', 'doozy', 'nancy', 'pubg'
    onReady:    ready,
    onLoaded:   loaded,
    onUpdate:   update
})


const boxPositions = [
    {x: 0, y: 0, z: 0},
    {x: 2, y: 2, z: 0},
    {x: 4, y: 4, z: 0},
    {x: 6, y: 6, z: 0},
    {x: 8, y: 8, z: 0},
];


const assetName  = 'models/boxes001.gltf';
const targetName = 'CubeRedWood000';
let   targetBox;
function ready(engine, objs) {
    engine.setCameraPosition(3, 6, 15);
    engine.physics.enabled=true;
    engine.loadModel(assetName).then( (model) => {
        targetBox = engine.getMeshByName(targetName);
        cloenBox(engine, targetBox);
    });
}


const Parent = new THREE.Object3D(); //!! Parent object
const Boxes = [];
function cloenBox(engine, org) {

    boxPositions.map(p => {
        const box = org.clone();   //!! clone
        box.rotation.set(0, 0, 0); //!! set rotation
        box.position.x = p.x;
        box.position.y = p.y;
        box.position.z = p.z;
        Boxes.push(box);           //!! add into array
        Parent.add(box);           //!! append to parent
    });

    //!! Move parent
    Parent.position.set(-4, 1, 0);
    //!! Add the parent (with is children) into the main scene
    engine.getScene().add(Parent);
}

function loaded(engine, animator, character, name) {

}

function update(engine, animator, character, name) {
    Boxes.map(b=>{
        b.rotation.y += 0.03;
    });
}
