/*
 **************************************************************************************
 * ECC-CGP-Engine.js
 * Computer-based Graphics and Physics Engine
 * This is the wrapped version of the EngineCore
 *
 * Dr.Santi Nuratch
 * Embedded System Computing and Control Laboratory
 * ECC-Lab | INC@KMUTT
 *
 * 03 March, 2019
 ***************************************************************************************
 */


import {
    EngineCore,
    CANNON,
    THREE,
    Utils,
    SPE,
    Animator
} from './EngineCore';
export {
    Engine,
    EngineCore,
    CANNON,
    THREE,
    Utils,
    SPE,
    Animator
};

/**
 * Engine Class
 */
export default class Engine {

    /**
     * Constructor of the EngineCore
     * @param {object} options EngineCore options
     */
    constructor(options) {

        this.core = new EngineCore(options);
    }


    /**
     * Initialise the core engine. After the engine is iniialized, it will return the Promise and execute the provided callback
     * @param {object}    options   initialization options
     * @param {function}  callback  callback function will be called after all files are loaded
     * @return Promise
     */
    init(options, callback) {
        //return this.core.init( options, callback );
        // this.core.init( options ).then( (args) => {
        //     console.log( args );
        // });

        return new Promise((resolve, reject) => {
            this.core.init(options, callback).then((args) => {
                resolve(args);
                if (callback) {
                    callback(args);
                }


                this.scene = args.Graphics.scene;
                this.world = args.Physics.world;

                this.graphics = args.Graphics;
                this.physics = args.Physics;

                this.options = options;

                //console.log( this );
            });
        });


        // this.scene = this.core.graphics.scene;
        // this.world = this.core.physics.world;

        // this.graphics = this.core.graphics;
        // this.physics  = this.core.physics;

        // this.options = options;
    }

    /**
     * THREE
     */
    static get GRAPHICS() {
        return THREE;
    }

    /**
     * CANNON
     */
    static get PHYSICS() {
        return CANNON;
    }

    /**
     * THREE.Color
     */
    static get Color() {
        return THREE.Color;
    }

    /**
     * THREE.Vector3
     */
    static get Vector3() {
        return THREE.Vector3;
    }

    /**
     * CANNON.Vec3
     */
    static get Vec3() {
        return CANNON.Vec3;
    }

    /**
     * THREE.Vector2
     */
    static get Vector2() {
        return THREE.Vector2;
    }

    /**
     * CANNON.Vec2
     */
    static get Vec2() {
        return CANNON.Vec2;
    }

    /**
     * Retuen Zero vector (0, 0, 0)
     */
    static get ZeroVector() {
        return new CANNON.Vec3(0, 0, 0);
    }

    /**
     * Return Forward vector (0, 0, +1)
     */
    static get ForwardVector() {
        return new CANNON.Vec3(0, 0, +1);
    }

    /**
     * Return Backward vector (0, 0, -1)
     */
    static get BackwardVector() {
        return new CANNON.Vec3(0, 0, -1);
    }

    /**
     * Return Right vector (-1, 0, 0)
     */
    static get RightVector() {
        return new CANNON.Vec3(-1, 0, 0);
    }

    /**
     * Return Left vector (+1, 0, 0)
     */
    static get LeftVector() {
        return new CANNON.Vec3(+1, 0, 0);
    }

    /**
     * Return Up vector (0, +1, 0)
     */
    static get UpVector() {
        return new CANNON.Vec3(0, +1, 0);
    }

    /**
     * Return Down vector (0, -1, 0)
     */
    static get DownVector() {
        return new CANNON.Vec3(0, -1, 0);
    }

    /**
     * Returns scaled forward vector
     * @param {number} scale vector scale
     */
    getForwardVector(scale) {
        return new CANNON.Vec3(0, 0, +1).mult((scale === undefined ? 1 : scale));
    }

    /**
     * Returns scaled backward vector
     * @param {number} scale vector scale
     */
    getBackwardVector(scale) {
        return new CANNON.Vec3(0, 0, -1).mult(scale === undefined ? 1 : scale);
    }

    /**
     * Returns scaled right vector
     * @param {number} scale vector scale
     */
    getRightVector(scale) {
        return new CANNON.Vec3(-1, 0, 0).mult(scale === undefined ? 1 : scale);
    }

    /**
     * Returns scaled left vector
     * @param {number} scale vector scale
     */
    getLeftVector(scale) {
        return new CANNON.Vec3(+1, 0, 0).mult(scale === undefined ? 1 : scale);
    }

    /**
     * Returns scaled up vector
     * @param {number} scale vector scale
     */
    getUpVector(scale) {
        return new CANNON.Vec3(0, +1, 0).mult(scale === undefined ? 1 : scale);
    }

    /**
     * Returns scaled down vector
     * @param {number} scale vector scale
     */
    getDownVector(scale) {
        return new CANNON.Vec3(0, -1, 0).mult(scale === undefined ? 1 : scale);
    }

    /**
     * Loads texture
     * @param {string} path [ath to image/texture
     */
    loadImage(path) {
        return new THREE.TextureLoader().load(path);
    }



    /**
     * Start the engine
     * @param {function} callback It the callback is given, the callback will be periodically called every frame.
     */
    start(callback) {
        return this.core.start(callback);
    }


    /**
     * Stop the engine
     */
    stop() {
        return this.core.stop();
    }


    /**********************************************************************************************************/
    /*           Options           Options            Options            Options            Options           */
    /**********************************************************************************************************/

    /**
     * Returns default options
     * @return Options
     */
    getDefaultOptions() {
        return this.core.defaultOptions;
    }

    /**
     * Returns engine options
     */
    getEngineOptions() {
        return this.core.options;
    }

    /**
     * Returns graphics options
     */
    getGraphicsOptions() {
        return this.core.graphics.options;
    }

    /**
     * Returns physics options
     */
    getPhysicsOptions() {
        return this.core.physics.options;
    }

    /**
     * Returns engine default options
     */
    getEngineDefaultOptions() {
        return this.core.defaultOptions.engine;
    }

    /**
     * Returns graphics default options
     */
    getGraphicsDefaultOptions() {
        return this.core.defaultOptions.graphics;
    }

    /**
     * Returns Physics default options
     */
    getPhysicsDefaultOptions() {
        return this.core.defaultOptions.physics;
    }


    /**********************************************************************************************************/
    /*         Graphics       Graphics        Graphics        Graphics        Graphics        Graphics        */
    /**********************************************************************************************************/

    /**
     * Returns graphics object
     * @return Graphics
     */
    getGraphics() {
        return this.core.graphics;
    }

    /**
     * Returns the current scene object
     * @return Graphics.Scene
     */
    getScene() {
        return this.core.graphics.scene;
    }

    /**
     * Returns the main camera object
     * @return Graphics.Camera
     */
    getCamera() {
        return this.core.graphics.camera;
    }

    /**
     * Set camera position and update control
     * @param {number} x x position
     * @param {number} y y position
     * @param {number} z z position
     */
    setCameraPosition(x, y, z) {
        this.core.graphics.setCameraPosition(x, y, z);
        return this;
    }

    setSceneBackgroundColor(hexColor) {
        this.core.graphics.scene.background = new THREE.Color(hexColor);
        return this;
    }

    /**
     * Returns the current renderer object
     * @return Graphics.Renderer
     */
    getRenderer() {
        return this.core.graphics.renderer;
    }

    /**
     * Returns current used control
     * @return Graphics.Control
     */
    getControl() {
        return this.core.graphics.control;
    }

    /**********************************/
    /*         Grids & Axes           */
    /**********************************/

    /**
     * Show grids helper
     * @return this
     */
    showGrids() {
        this.core.graphics.addGrids();
        return this;
    }

    /**
     * Hide grids helper
     * @return this
     */
    hideGrids() {
        this.core.graphics.removeGrids();
        return this;
    }

    /**
     * Toggle grids visibility
     * @return this
     */
    toggleGrids() {
        this.core.graphics.toggleGrids();
        return this;
    }

    /**
     * Show axes helper
     * @return this
     */
    showAxes(options) {
        this.core.graphics.addAxes(options);
        return this;
    }

    /**
     * Hide axes helper
     * @return this
     */
    hideAxes() {
        this.core.graphics.removeAxes();
        return this;
    }

    /**
     * Toggle axes visibility
     * @return this
     */
    toggleAxes() {
        this.core.graphics.toggleAxes();
        return this;
    }


    /**********************************/
    /*           Lights               */
    /**********************************/

    /**
     * Returns array of ambient lights lights
     * @return Array of THREE.AmbientLight
     */
    getAmbientLights() {
        return this.core.graphics.ambientLights;
    }

    /**
     * Returns array of point lights
     * @return Array of THREE.PointLight
     */
    getPointLights() {
        return this.core.graphics.pointLights;
    }

    /**
     * Returns array of spot lights
     * @return Array of THREE.SpotLight
     */
    getSpotLights() {
        return this.core.graphics.spotLights;
    }

    /**
     * Returns array of directional lights
     * @return Array of THREE.DirectionalLight
     */
    getDirectionalLights() {
        return this.core.graphics.directionalLights;
    }

    /**
     * Set color of the target light
     * @param {THREE.Light} light target light
     * @param {THREE.Color} color color, THREE.Color or HEX color
     */
    setLightColor(light, color) {
        light.color = new Engine.Color(color);
        return this;
    }

    /**
     * Set light visibility
     * @param {THREE.Light} light target light
     * @param {boolean} visible   true: visible, false: invisible
     */
    setLightVisible(light, visible) {
        light.visible = visible;
        return this;
    }

    /**
     * Set light intensity
     * @param {THREE.Light} light target light
     * @param {number} intensity  intensity of light
     */
    setLightIntensity(light, intensity) {
        light.intensity = intensity;
        return this;
    }


    /**********************************************************************************************************/
    /*   Physics      Physics      Physics      Physics      Physics      Physics      Physics      Physics   */
    /**********************************************************************************************************/

    /**
     * Returns physics object
     */
    getPhysics() {
        return this.core.physics;
    }

    /**
     * Returns physics world
     */
    getWorld() {
        return this.core.physics.world;
    }

    /**
     * Set sub-step of physics solver
     * @param {number} steps number of steps of physics solver
     */
    setSubSteps(steps) {
        if (typeof (steps) == "number") {
            this.core.physics.options.subSteps = steps;
        }
    }

    /**
     * Creates and returns ground material. The created material is added to the physics world internally
     * @param {number} friction     Ground friction
     * @param {number} restitution  Ground restitution
     * @return CANNON.Material
     */
    createGroundMaterial(friction, restitution) {
        return this.core.physics.createGroundMaterial(friction, restitution);
    }

    /**
     * Creates and returns object (body) material. The created material is added to the physics world internally
     * @param {number} friction     Object friction
     * @param {number} restitution  Object restitution
     * @return CANNON.Material
     */
    createObjectMaterial(friction, restitution, groundMaterial) {
        return this.core.physics.createObjectMaterial(friction, restitution, groundMaterial);
    }


    /**
     * Returns a rigid body specified by mesh name
     * @param {string} name mesh name
     * @return CANNON.Body
     */
    getBodyByMeshName(name) {
        //console.log("Name: " + name);
        return this.core.physics.getBodyByMeshName(name);
    }


    /**
     * Returns all rigid bodies (array of bodies) in the current world
     * @return array of CANNON.Body
     */
    getBodiesFromWorld() {
        return this.core.physics.world.bodies;
    }

    /**
     * Returns all rigid bodies (array of bodies) in the current world
     * @return array of CANNON.Body
     */
    getBodies() {
        return this.core.physics.world.bodies;
    }

    /**
     * Set/Change the provided body to static body
     * @param {CANNON.Body} body
     */
    setBodyToStatic(body) {
        this.core.physics.changeBodyToStatic(body);
        return this;
    }

    /**
     * Set/Change the provided body to dynamic body
     * @param {CANNON.Body} body
     */
    setBodyToDynamic(body, mass) {
        this.core.physics.changeBodyToDynamic(body, mass);
        return this;
    }

    /**
     * Create body from mesh
     * @param {THREE.Mesh} mesh mesh object
     * @returns CANNON.Body
     */
    createBodyFromMesh(mesh) {
        return this.core.physics.createBodyFromMesh(mesh);
    }

    /**
     * Show body-debugger
     */
    showDebug() {
        this.core.physics.showDebug();
        return this;
    }

    /**
     * Hide body-debugger
     */
    hideDebug() {
        this.core.physics.hideDebug();
        return this;
    }

    /*
     * Toggle body-debugger visibility. This function works only when the debug is enabled in the { physics:debug{enabled: true} }
     */
    toggleDebug() {
        this.core.physics.toggleDebug();
        return this;
    }

    /**
     * Adds constraint to physics world
     * @param {Constraint} constraint
     */
    addConstraint(constraint) {
        this.core.physics.world.addConstraint(constraint);
        return this;
    }

    /**
     * Removes constraint from physics world
     * @param {Constraint} constraint
     */
    removeConstraint(constraint) {
        this.core.physics.world.removeConstraint(constraint);
        return this;
    }



    /**********************************************************************************************************/
    /*       Mesh Utility      Mesh Utility       Mesh Utility       Mesh Utility       Mesh Utility          */
    /**********************************************************************************************************/

    /**
     * Returns a mesh specified by the mesh name
     * @param {string} name mesh name
     * @return THREE.Mesh
     */
    getMeshByName(name) {
        return this.core.graphics.getMeshByName(name);
    }

    /**
     * Returns meshes (excludes helpers, lights and debuggers) in the current scene
     * @return array of THREE.Mesh
     */
    getAllMeshes() {
        return this.core.graphics.getMeshes();
    }

    /**
     * Returns meshes (excludes helpers, lights and debuggers) in the current scene
     * @return array of THREE.Mesh
     */
    getMeshes() {
        return this.core.graphics.getMeshes();
    }

    /**
     * Return all meshes (array of meshes) in the provided scene. If the scene is not provided, the current scene will be used as target scene
     * @param {THREE.Scene} scene target scene
     * @return array of THREE.Mesh
     */
    getMeshesFromScene(scene) {
        return this.core.graphics.getMeshesFromScene(scene);
    }


    /**
     * Adds axes to the mesh
     * @param {THREE.Mesh} mesh THREE Mesh or string
     * @param {number} size Axes size
     */
    addAxesToMesh(mesh, size) {
        if (mesh instanceof THREE.Mesh || mesh instanceof THREE.Group)
            this.core.graphics.addAxesToMesh(mesh, size);
        else
            this.core.graphics.addAxesToMesh(this.getMeshByName(mesh), size);
        return this;
    }

    /**
     * Adds axes to the spefied body
     * @param {CANNON.Body} body CANNON Body
     * @param {number} size Axes size
     */
    addAxesToBody(body, size) {
        this.core.graphics.addAxesToMesh(body.threemesh, size);
        return this;
    }


    /**
     * Removes axes from the spefied mesh
     * @param {THREE.Mesh} mesh THREE Mesh or mesh name
     */
    removeAxesFromMesh(mesh) {
        if (mesh instanceof THREE.Mesh || mesh instanceof THREE.Group)
            this.core.graphics.removeAxesFromMesh(mesh);
        else
            this.core.graphics.removeAxesFromMesh(this.getMeshByName(mesh));
        return this;
    }


    toggleAxesOfMesh(mesh, size) {
        let target = undefined;
        if (mesh instanceof THREE.Mesh || mesh instanceof THREE.Group) {
            target = mesh;
        } else {
            target = this.getMeshByName(mesh);
        }

        for (let i = 0; i < target.children.length; i++) {
            if (target.children[i].name.includes('_helper__axes_')) {
                this.removeAxesFromMesh(target);
                return this;
            }
        }
        this.addAxesToMesh(target, size);
        return this;
    }

    /**
     * Removes axes from the spefied body
     * @param {CANNON.Body} mesh CANNON Body
     */
    removeAxesFromBody(mesh) {
        this.core.graphics.removeAxesFromMesh(mesh.threemesh);
        return this;
    }


    /**
     * Adds axes to all meshes in the currentt scene
     * @param {number} size Axes size
     */
    addAxesToAllMeshes(size) {
        this.core.graphics.addAxesToAllMeshes(size);
        return this;
    }

    /**
     * Adds axes to all bodies in the currentt scene
     * @param {number} size Axes size
     */
    addAxesToAllBodies(size) {
        var bodies = this.getBodies();
        bodies.forEach(body => {
            this.addAxesToBody(body, size);
        });
        return this;
    }

    /**
     * Removes axes from all meshes in the currentt scene
     */
    removeAxesFromAllMeshes() {
        this.core.graphics.removeAxesFromAllMeshes();
        return this;
    }

    /**
     * Removes axes from all bodies in the currentt scene
     */
    removeAxesFromAllBodies() {
        var bodies = this.getBodies();
        bodies.forEach(body => {
            this.removeAxesFromBody(body);
        });
        return this;
    }

    /**
     * Apply reflection map to all meshes
     */
    applyReflectionMapToAllMeshes() {
        this.core.graphics.applyReflectionMap(undefined);
        return this;
    }

    /**
     * Remove reflection map from all meshes
     */
    removeReflectionMapFromAllMeshes() {
        this.core.graphics.removeReflectionMap(undefined);
        return this;
    }


    /**********************************************************************************************************/
    /*   Keyboard      Keyboard       Keyboard       Keyboard       Keyboard       Keyboard        Keyboard   */
    /**********************************************************************************************************/

    /**
     * Check key pressed, return true if the desired key is pressed
     * @param {string} key      a character or key name
     * @param {number} interval time between each key pressed
     */
    getKeyDown(key, interval) {
        return this.core.keyboard.getKeyDown(key, interval);
    }


    /**********************************************************************************************************/
    /*       Raycaster      Raycaster       Raycaster       Raycaster       Raycaster       Raycaster         */
    /**********************************************************************************************************/

    /**
     * Returns raycasting parameters of all objects
     */
    doRaycast() {
        return this.core.raycaster.doRaycast();
    }

    /**
     * Returns raycasting parameters of the first object
     */
    getRaycast() {
        const raycast = this.core.raycaster.doRaycast();
        if (raycast.length < 1) return undefined;
        return raycast[0];
    }


    /**********************************/
    /*            Ray                 */
    /**********************************/

    /**
     * Return Ray object { mesh, intersecs, ray } of the raycasting operation
     */
    getRay() {
        return this.getRaycast().ray;
    }

    /**
     * Return ray.direction of the raycasting operation
     */
    getRayDirection() {
        const ray = this.getRay();
        if (!ray) return undefined;
        return new CANNON.Vec3(ray.direction.x, ray.direction.y, ray.direction.z);
    }

    /**
     * Return ray.origin of the raycasting operation
     */
    getRayOrigin() {
        const ray = this.getRay();
        if (!ray) return undefined;
        return new CANNON.Vec3(ray.origin.x, ray.origin.y, ray.origin.z);
    }


    /**********************************/
    /*          Intersec              */
    /**********************************/

    /**
     * Return intersect of the raycasting operation
     */
    getRayIntersec() {
        const raycast = this.getRaycast();
        if (raycast) return raycast.intersect;
        return undefined;
    }

    /**
     * Return intersect.distance of the raycasting operation
     */
    getRayDistance() {
        const raycast = this.getRaycast();
        const intersect = raycast.intersect;
        if (!intersect) return undefined;
        return intersect.distance;
    }

    /**
     * Return intersect.point of the raycasting operation
     */
    getRayPoint() {
        const raycast = this.getRaycast();
        const intersect = raycast.intersect;
        if (!intersect) return undefined;
        return new CANNON.Vec3(intersect.point.x, intersect.point.y, intersect.point.z);
    }


    /**********************************/
    /*       Ray-Mesh, Ray-Body       */
    /**********************************/

    /**
     * Return intersect.object of the raycasting operation
     */
    getRayMesh() {
        const raycast = this.getRaycast();
        const mesh = raycast.mesh;
        if (mesh && mesh.parent && mesh.parent instanceof THREE.Group) {
            return mesh.parent;
        }
        return mesh;
    }

    /**
     * Returns a rigid body of the raycasting operation
     */
    getRayBody() {
        const raycast = this.getRaycast();
        if (raycast.mesh) {
            return this.getBodyByMeshName(raycast.mesh.name);
        }
        return undefined;
    }

    /**********************************/
    /*    Ray-Force, Ray-Impulse      */
    /**********************************/

    /**
     * Helper function to apply force and impulse to world point ro local point
     * @param {number} scale force or impulse scale
     * @param {number} type  0: force, 1: local force, 2: impulse, 3: local impulse
     */
    applyForceImpulseWorldLocal(scale, type) {
        const raycast = this.getRaycast();
        if (!raycast) return undefined;
        const direction = new CANNON.Vec3(raycast.ray.direction.x, raycast.ray.direction.y, raycast.ray.direction.z);
        const point = new CANNON.Vec3(raycast.intersect.point.x, raycast.intersect.point.y, raycast.intersect.point.z);
        //console.log( raycast.mesh.name );
        const body = this.getBodyByMeshName(raycast.mesh.name);
        if (!body) return
        if (type === 0) {
            body.applyForce(direction.mult(scale), point);
        } else if (type === 1) {
            body.applyLocalForce(direction.mult(scale), point);
        } else if (type === 2) {
            body.applyImpulse(direction.mult(scale), point);
        } else if (type === 3) {
            body.applyLocalImpulse(direction.mult(scale), point);
        }
        return this;
    }

    /**
     * Apply force to raycasted rigid body
     * @param {number} forceScale force scale to be applied to the raycasted body

     */
    applyForceToRayBody(forceScale) {
        this.applyForceImpulseWorldLocal(forceScale, 0);
        return this;
    }

    /**
     * Apply local force to raycasted rigid body
     * @param {number} forceScale force scale to be applied to the raycasted body
     */
    applyLocalForceToRayBody(forceScale) {
        this.applyForceImpulseWorldLocal(forceScale, 1);
        return this;
    }

    /**
     * Apply impulse to raycased rigid body
     * @param {number} impulseScale impulse scale to be applied to the raycasted body
     */
    applyImpulseToRayBody(impulseScale) {
        this.applyForceImpulseWorldLocal(impulseScale, 2);
        return this;
    }

    /**
     * Apply local impulse to raycased rigid body
     * @param {number} impulseScale impulse scale to be applied to the raycasted body
     */
    applyLocalImpulseToRayBody(impulseScale) {
        this.applyForceImpulseWorldLocal(impulseScale, 3);
        return this
    }


    /**********************************************************************************************************/
    /*       Print      Print       Print       Print       Print       Print       Print       Print         */
    /**********************************************************************************************************/

    /**
     * Print message to console window
     * @param {string} message      message to be printed to console window
     * @param {string} typeOrColor  message type or message color code
     */
    print(message, typeOrColor) {
        Utils.print(message, typeOrColor);
        return this;
    }

    /**
     * Print info-message to console window
     * @param {string} message message to be printed to console window
     */
    printInfo(message) {
        Utils.printInfo(message);
        return this;
    }

    /**
     * Print success-message to console window
     * @param {string} message message to be printed to console window
     */
    printSuccess(message) {
        Utils.printSuccess(message);
        return this;
    }

    /**
     * Print warning-message to console window
     * @param {string} message message to be printed to console window
     */
    printWarning(message) {
        Utils.printWarning(message);
        return this;
    }

    /**
     * Print danger-message to console window
     * @param {string} message message to be printed to console window
     */
    printDanger(message) {
        Utils.printDanger(message);
        return this;
    }

    /**
     * Print primary-message to console window
     * @param {string} message message to be printed to console window
     */
    printPrimary(message) {
        Utils.printPrimary(message);
        return this;
    }


    /**********************************************************************************************************/
    /*       Label      Label       Label       Label       Label       Label       Label       Label         */
    /**********************************************************************************************************/
    /**
     * Adds label to the mesh
     * @param {THREE.Mesh} mesh  target mesh
     * @param {string}     label label/text to be displayed on the mesh
     */
    addLabel(mesh, label) {
        this.core.labelRenderer.addLabel(mesh, label);
        return this;
    }

    /**
     * Changes css class name of the label
     * @param {THREE.Mesh} mesh  target mesh
     * @param {string} className css class name
     */
    setLabelClass(mesh, className) {
        this.core.labelRenderer.setLabelClass(mesh, className);
        return this;
    }

    /**
     * Adds css class name into css classList of the label element
     * @param {HREE.Mesh} mesh   target mesh
     * @param {string} className css class name
     */
    addLabelClass(mesh, className) {
        this.core.labelRenderer.addLabelClass(mesh, className);
        return this;
    }

    /**
     * Returns label of the provided mesh
     * @param {THREE.Mesh} mesh target mesh
     */
    getLabel(mesh) {
        return this.core.labelRenderer.getLabel(mesh);
    }

    /**
     * Updates label of the provided mesh
     * @param {THREE.Mesh} mesh  target mesh
     * @param {string}     label label/text to be displayed on the mesh
     */
    setLabelText(mesh, label) {
        this.core.labelRenderer.setLabelText(mesh, label);
        return this;
    }

    /**
     * Sets label position relative to the target mesh
     * @param {THREE.Mesh}    mesh     target mesh
     * @param {THREE.Vector3} position label position
     */
    setLabelPosition(mesh, position) {
        this.core.labelRenderer.setLabelPosition(mesh, position);
        return this;
    }

    /**
     * Add labels to meshes in the current scene
     */
    addLabelToObjects() {
        this.core.labelRenderer.addLabelToObjects();
        return this;
    }

    /**
     * Removes all labels from meshes in the current scene
     */
    removeLabel(mesh) {
        this.core.labelRenderer.removeLabel(mesh);
        return this;
    }

    /**
     * Removes all labels from meshes in the current scene
     */
    removeLabelFromObjects() {
        this.core.labelRenderer.removeLabelFromObjects();
        return this;
    }

    /**
     * Show labels
     */
    showLabels() {
        this.core.labelRenderer.show();
        return this;
    }


    /**
     * Hide labels
     */
    hideLabels() {
        this.core.labelRenderer.hide();
        return this;
    }

    /**
     * Toggle labels visibility
     */
    toggleLabels() {
        return this.core.labelRenderer.toggle();
        //return this;
    }

    setLabelPosition(mesh, position) {
        this.core.labelRenderer.setLabelPosition(mesh, position);
        return this;
    }

    //!*********************************************************************************************************
    //!  Asset Loader      AssetLoader       AssetLoader       AssetLoader       AssetLoader       AssetLoader *
    //!*********************************************************************************************************

    /**
     * Loads asset, the special model. This model includes actor/character and colliders.
     * @param {string}   model      GLTF file name
     * @param {function} callback   callback function
     * @return Promise
     */
    loadAssets(model, callback) {

        return this.core.assetLoader.load(model, callback);
    }


    /**
     * Loads vihicle, the special model. This model includes actors/meshes and their colliders.
     * @param {string}   model      GLTF file name
     * @param {function} callback   callback function
     * @return Promise
     */
    loadVihicle(model, callback) {

        return this.core.assetLoader.loadVihicle(model, callback);
    }

    /**
     * Clone asset
     * @param {THREE.Mesh|THREE.Group} srcAsset prototype object
     * @param {string} clonedName name of cloned object
     */
    copyAsset(srcAsset, clonedName) {
        return this.core.assetLoader.copyAsset(srcAsset, clonedName);
    }

    /**
     * Load complex actor with complex colliders. All colliders are applied by LockConstraint to the actor body
     * @param {string} model file name
     * @param {function} callback callback function
     * @return Promise
     */
    loadComplex(model, callback) {

        return this.core.assetLoader.loadComplex(model, callback);
    }

    /**
     * Loads models, adds to scene, creates rigid-body and applies reflection-map.
     * @param {string} model file name
     * @param {*} callback   callback function
     * @return Promise
     */
    loadModel(model, callback) {
        return this.core.loadModel(model, callback);
    }


    /**
     * Clone mesh or group
     * @param {THREE.Mesh | THREE.Group} srcMesh sorce object (mesh or group)
     * @param {string} clonedName name of cloned mesh or group
     */
    cloneMesh(srcMesh, clonedName) {

        let actor;
        clonedName = clonedName ? clonedName : '';

        //console.log( srcMesh );

        if (srcMesh instanceof THREE.Group) {
            actor = new THREE.Group();
            srcMesh.traverse(c => {

                if (c instanceof THREE.Mesh) {
                    let mesh = new THREE.Mesh(c.geometry, c.material);
                    mesh.name = c.name;
                    mesh.position.copy(c.position);
                    mesh.rotation.copy(c.rotation);
                    mesh.quaternion.copy(c.quaternion);
                    actor.add(mesh);
                }
            });
            actor.name = clonedName;
            actor.position.copy(srcMesh.position);
            actor.rotation.copy(srcMesh.rotation);
            actor.quaternion.copy(srcMesh.quaternion);
            actor.scale.copy(srcMesh.scale);
        } else {
            actor = new THREE.Mesh(srcMesh.geometry, srcMesh.material.clone());
            actor.name = clonedName;
            actor.position.copy(srcMesh.position);
            actor.rotation.copy(srcMesh.rotation);
            actor.quaternion.copy(srcMesh.quaternion);
            actor.scale.copy(srcMesh.scale);
        }
        return actor;
    }

    /**
     * Remove body and its components (threemesh and its children) from the world and scene
     * @param {CANNON.Body} body
     */
    removeBody(body) {
        this.core.physics.removeFarObjects([body]);
    }

    /**
     * Returns delta time in milliseconds
     */
    getDeltaTime() {
        return this.core.properties.timing.deltaTime;
    }

    /**
     * Returns processing time of graphics in milliseconds
     */
    getGraphicsTime() {
        return this.core.properties.graphics.processingTime;
    }

    /**
     * Returns processing time of physics in milliseconds
     */
    getPhysicsTime() {
        return this.core.properties.physics.processingTime;
    }

    /**
     * Returns total processing time (graphics + physics + etc.) in milliseconds
     */
    getProcessingTime() {
        return this.core.properties.timing.processingTime;
    }

    /**
     * Returns number of frames per second
     */
    getFrameRate() {
        return 1000.0 / this.core.properties.timing.deltaTime;
    }

    /**
     * Return processing load in percent
     */
    getProcessingLoad(target) {
        //!! 100% = 1000/60 mS
        if (target === 'graphics') {
            return 100 * this.core.properties.graphics.processingTime / (1000.0 / 60.0);
        } else if (target === 'physics') {
            return 100 * this.core.properties.physics.processingTime / (1000.0 / 60.0);
        } else if (target === 'total' || !target) {
            return 100 * this.core.properties.timing.processingTime / (1000.0 / 60.0);
        } else {
            throw "The target \"" + target + "\" is not supported!";
        }
    }
}
