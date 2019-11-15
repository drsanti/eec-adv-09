/*
**************************************************************************************
* ECC-Web-Gui.js
* Web-based Graphical User Interface
* This is a user interface of the WebGuiCore
*
* Dr.Santi Nuratch
* Embedded System Computing and Control Laboratory
* ECC-Lab | INC@KMUTT
*
* 09 March, 2019
***************************************************************************************
*/

import { UIContainer, UINum, UIVector, UIPlot, UIPrint, UIText, UIButton, Oscilloscope, UIUtils } from './ui/WebGuiCore';
export { UIContainer, UINum, UIVector, UIPlot, UIPrint, UIText, UIButton, Oscilloscope, UIUtils };


function WebGui() { }

/**
 * Create numerical control without container
 * @param {string}  type    type of item ('vx', 'vy', 'vz', 'vw')
 * @param {string}  name    variable name
 * @param {number}  min     minimum value
 * @param {number}  max     maximum value
 * @param {number}  max     initial value
 * @param {boolean} inline  display style, if true, all elements will be placed in single row
 * @param {number}  callback on-changed callback function
 */
WebGui.createNumItem = function ( type, name, min, max, val, inline, callback ) {
    return new UINum( name, {
        type:   type,  //!! 'vx', 'vy', 'vz', 'vw'
        min:    min,
        max:    max,
        val:    val,
        inline: inline,
        wrapper: {
            "width" : "74px"
        },
        label: {},
        value: {}
    }, function( v ){ if( callback ) callback ( v ); } )
}

/**
 * Create numeric control with its container
 * @param {string}  title   window title
 * @param {number}  x       x position
 * @param {number}  y       y position
 * @param {string}  style   type of container ('red', 'green', 'blue', 'yellow', 'pink')
 * @param {string}  name    variable name
 * @param {number}  min     minimum value
 * @param {number}  max     maximum value
 * @param {number}  val     initial value
 * @param {string}  type    type or type of control ('vx', 'vy', 'vz', 'vw')
 * @param {number}  callback   on-changed callback function
 */
WebGui.createNumber = function( title, x, y, style, name, min, max, val, type, callback ) {
    return new UINum( name, {
        type:   type,  //!! 'vx', 'vy', 'vz', 'vw'
        min:    min,
        max:    max,
        val:    val,
        wrapper: {
            "width" : "74px"
        },
        label: {
        },
        value: {
        }
    }, function( v ){ if( callback ) callback ( v, name ); } )
    .addTo( new UIContainer( title, {
        type: style,
        position: {
            x: x,
            y: y
        },
        wrapper:{},
        header:{},
        body:  {},
        footer:{}
    }).hideFooter());
}

/**
 * Create scalar control
 * @param {string}  title   window title
 * @param {number}  x       x position
 * @param {number}  y       y position
 * @param {string}  style   style of container ('red', 'green', 'blue', 'yellow', 'pink')
 * @param {string}  name    variable name
 * @param {number}  min     minimum value
 * @param {number}  max     maximum value
 * @param {number}  val     initial value
 * @param {string}  type    type orof control ('vx', 'vy', 'vz', 'vw')
 * @param {number}  callback   on-changed callback function
 */
WebGui.createScalar = function( title, x, y, style, name, min, max, val, type, callback ) {
    return WebGui.createNumber( title, x, y, style, name, min, max, val, type, callback );
}

/**
 * Create vector2 (point x, y) control
 * @param {string}  title   window title
 * @param {number}  x       x position
 * @param {number}  y       y position
 * @param {string}  style   style of container ('red', 'green', 'blue', 'yellow', 'pink')
 * @param {boolean} inline  display style, if true, all elements will be placed in single row
 * @param {number}  min     minimum value
 * @param {number}  max     maximum value
 * @param {number}  val     initial value
 * @param {number}  callback   on-changed callback function
 */
WebGui.createVector2 = function( title, x, y, style, inline, min, max, val, callback ) {
    const uiv = new UIVector( title, {
       
        container:{
            type: style,
            wrapper:{}, header:{}, body: {}, footer:{},
            position: { 
                x: x, y: y
            }
        },
        vector: {
            vx: {
                inline: inline,
                callback: function( v ){ if( callback ) callback ( 'x', v ); },
                min:min, max:max, val:val,
                wrapper: {
                    "width" : "74px"
                },
                label: {}, value: {}
            },
            vy: { 
                inline: inline,
                callback: function( v ){ if( callback ) callback ( 'y', v ); },
                min:min, max:max, val:val,
                wrapper: {
                    "width" : "74px"
                },
                label: {}, value: {}
            } 
        }   
    });
    uiv.getContainer().hideFooter();
    return uiv;
}

/**
 * Create vector3 (x, y, z) control
 * @param {string}  title    window title
 * @param {number}  x        x position
 * @param {number}  y        y position
 * @param {string}  style    style of container ('red', 'green', 'blue', 'yellow', 'pink')
 * @param {boolean} inline   display style, if true, all elements will be placed in single row
 * @param {number}  min      minimum value
 * @param {number}  max      maximum value
 * @param {number}  val      initial value
 * @param {number}  callback on-changed callback function
 */
WebGui.createVector3 = function( title, x, y, style, inline, min, max, val, callback ) {
    const uiv = new UIVector( title, {
       
        container:{
            type: style,
            wrapper:{}, header:{}, body: {}, footer:{},
            position: { 
                x: x, y: y
            }
        },
        vector: {
            vx: {
                inline: inline,
                callback: function( v ){ if( callback ) callback ( 'x', v ); },
                min:min, max:max, val:val,
                wrapper: {
                    "width" : "74px"
                },
                label: {}, value: {}
            },
            vy: { 
                inline: inline,
                callback: function( v ){ if( callback ) callback ( 'y', v ); },
                min:min, max:max, val:val,
                wrapper: {
                    "width" : "74px"
                },
                label: {}, value: {}
            },
            vz: { 
                inline: inline,
                callback: function( v ){ if( callback ) callback ( 'z', v ); },
                min:min, max:max, val:val,
                wrapper: {
                    "width" : "74px"
                },
                label: {}, value: {}
            } 
        }   
    });
    uiv.getContainer().hideFooter();
    return uiv;
}


/**
 * Create vector4 (Quaternion x, y, z, w) control
 * @param {string}  title window title
 * @param {number}  x      x position
 * @param {number}  y      y position
 * @param {string}  style  style of container ('red', 'green', 'blue', 'yellow', 'pink')
 * @param {boolean} inline display style, if true, all elements will be placed in single row
 * @param {number}  min    minimum value
 * @param {number}  max    maximum value
 * @param {number}  val    initial value
 * @param {number}  callback   on-changed callback function
 */
WebGui.createVector4 = function( title, x, y, style, inline, min, max, val, callback ) {
    const uiv = new UIVector( title, {
       
        container:{
            type: style,
            wrapper:{}, header:{}, body: {}, footer:{},
            position: { 
                x: x, y: y
            }
        },
        vector: {
            vx: {
                inline: inline,
                callback: function( v ){ if( callback ) callback ( 'x', v ); },
                min:min, max:max, val:val,
                wrapper: {
                    "width" : "74px"
                },
                label: {}, value: {}
            },
            vy: { 
                inline: inline,
                callback: function( v ){ if( callback ) callback ( 'y', v ); },
                min:min, max:max, val:val,
                wrapper: {
                    "width" : "74px"
                },
                label: {}, value: {}
            },
            vz: { 
                inline: inline,
                callback: function( v ){ if( callback ) callback ( 'z', v ); },
                min:min, max:max, val:val,
                wrapper: {
                    "width" : "74px"
                },
                label: {}, value: {}
            },
            vw: { 
                inline: inline,
                callback: function( v ){ if( callback ) callback ( 'w', v ); },
                min:min, max:max, val:val,
                wrapper: {
                    "width" : "74px"
                },
                label: {}, value: {}
            } 
        }   
    });
    uiv.getContainer().hideFooter();
    return uiv;
}

/**
 * Update scalar control
 * @param {UINum}  target UINum object
 * @param {number} val    value
 */
WebGui.updateScalar = function( target, val) {
    target.setValue( val );
    return this;  
}

/**
 * Update vector2 control
 * @param {UIVector}  target UIVector object
 * @param {number} vx x value or vector2 object 
 * @param {number} vy y value
 */
WebGui.updateVector2 = function( target, vx, vy) {
    if( typeof vx === 'object' ) {
        target.setVectorX( vx.x );
        target.setVectorY( vx.y );
    }
    else {
        target.setVectorX( vx );
        target.setVectorY( vy );
    }
    return this;  
}

/**
 * Update vector3 control
 * @param {UIVector}  target UIVector object
 * @param {number} vx x value or vector3 object 
 * @param {number} vy y value
 * @param {number} vz z value
 */
WebGui.updateVector3 = function( target, vx, vy, vz) {
    if( typeof vx === 'object' ) {
        target.setVectorX( vx.x );
        target.setVectorY( vx.y );
        target.setVectorZ( vx.z );
    }
    else{
        target.setVectorX( vx );
        target.setVectorY( vy );
        target.setVectorZ( vz );
    }
    return this;  
}

/**
 * Update vector4 control
 * @param {UIVector}  target UIVector object
 * @param {number} vx x value or vector4 object 
 * @param {number} vy y value
 * @param {number} vz z value
 * @param {number} vw w value
 */
WebGui.updateVector4 = function( target, vx, vy, vz, vw) {
    if( typeof vx === 'object' ) {
        target.setVectorX( vx.x );
        target.setVectorY( vx.y );
        target.setVectorZ( vx.z );
        target.setVectorW( vx.w );
    }
    else{
        target.setVectorX( vx );
        target.setVectorY( vy );
        target.setVectorZ( vz );
        target.setVectorW( vw );
    }
    return this;  
}


/**
 * Update vector control
 * @param {UIVector}  target  UIVector object
 * @param {object}    vector  vector object 
 */
WebGui.updateVector = function( target, vector) {
    if(vector.x && target.vx)target.setVectorX( vector.x );
    if(vector.y && target.vy)target.setVectorY( vector.y );
    if(vector.z && target.vz)target.setVectorZ( vector.z );
    if(vector.w && target.vw)target.setVectorW( vector.w );
    return this;  
}


/**
 * Create plotter
 * @param {string}  title   container/window title
 * @param {number}  x       location x 
 * @param {number}  y       location y
 * @param {string}  type    container/window type, 'red', 'green', 'blue', 'yellow', 'pink'
 * @param {array}   enabled array of boolean used to enable each channle of the plotter [true, true, true, true]
 * @param {array}   npts    array of number used to define number of point of each channle of the plotter [200, 200, 200, 200]
 * @param {array}   min     array of number used to define minimum value of each channle of the plotter [-5, -5, -5, -5]
 * @param {array}   max     array of number used to define maximum value of each channle of the plotter [+5, +5, +5, +5]
 * @param {array}   offset  array of number used to define offset value of each channle of the plotter [0, 0, 0, 0]
 */
WebGui.createPlotter = function( title, x, y, type, enabled, npts, min, max, offset ) {

    if(!enabled || !Array.isArray(enabled) ) {
        enabled = [ true, true, true, true ];
    }
    if(!npts || !Array.isArray(npts) ) {
        npts = [ 200, 200, 200, 200 ];
    }
    if(!min || !Array.isArray(min) ) {
        min = [ -5, -5, -5, -5 ];
    }
    if(!max || !Array.isArray(max) ) {
        max = [ +5, +5, +5, +5 ];
    }
    if(!offset || !Array.isArray(offset) ) {
        offset = [ 0, 0, 0, 0 ];
    }
    const plot = new UIPlot( title , {
        width:  220,
        height: 80,
        container: {
            type: type,
            position: {  x: x, y: y }
        },
        plot:{
            x:{ 
                enabled:    enabled [0],
                min:        min     [0],     
                max:        max     [0],     
                offset:     offset  [0],  
                npts:       npts    [0],
            },
            y:{ 
                enabled:    enabled [1],
                min:        min     [1],     
                max:        max     [1],     
                offset:     offset  [1],  
                npts:       npts    [1],
            },
            z:{ 
                enabled:    enabled [2],
                min:        min     [2],     
                max:        max     [2],     
                offset:     offset  [2],  
                npts:       npts    [2],
            },
            w:{ 
                enabled:    enabled [3],
                min:        min     [3],     
                max:        max     [3],     
                offset:     offset  [3],  
                npts:       npts[3],
            },
        }
    });

    return plot;
}

/**
 * Update plotter
 * @param {UIPlot}  target  plotter object
 * @param {number}  vx      x value or vector object
 * @param {number}  vy      y value
 * @param {number}  vz      z value
 * @param {number}  vw      w value
 */
WebGui.updatePlotter = function ( target, vx, vy, vz, vw) {
    let arr = [];
    if( typeof(vx) === 'object') {
        arr.push( vx.x ? vx.x : 0 );
        arr.push( vx.y ? vx.y : 0 );
        arr.push( vx.z ? vx.z : 0 );
        arr.push( vx.w ? vx.w : 0 );
        target.addData( arr );
    }
    else {
        arr.push( vx ? vx : 0 );
        arr.push( vy ? vy : 0 );
        arr.push( vz ? vz : 0 );
        arr.push( vw ? vw : 0 );
    }
    target.addData( arr );    
}

/**
 * Create multiple buttons
 * @param {string}      title       Container title
 * @param {string}      type        Container type ('red', 'green', 'blue', 'yellow', 'pink')
 * @param {number}      x           Container position x
 * @param {number}      y           Container position y
 * @param {array}       buttons     Array of button objects
 * @param {function}    callback    Shared Callback function for all buttons
 */
WebGui.createButtonMultiple = function ( title, type, x, y, buttons, callback ) {
    const uic = new UIContainer( title, {
        type: type,
        wrapper:{},
        header:{},
        body:  {},
        footer:{}
    });
    uic.setPosition(x, y).hideFooter();
    let id = 0;
    buttons.forEach( btn => {
        btn.id = id++;
        uic.addItem( new UIButton(btn.text, btn.type, function( evt ){
            if(btn.callback) {
                btn.callback( {id: btn.id, text:btn.text} );

                if( callback ) {
                    callback( {id: btn.id, text:btn.text} )
                }
            }
            
        }, btn.options ));
    });

    return uic;
}

/**
 * Create a button with its container
 * @param {string}      title       Container title
 * @param {string}      type        Container type ('red', 'green', 'blue', 'yellow', 'pink')
 * @param {number}      x           Container position x
 * @param {number}      y           Container position y
 * @param {string}      text        Button text
 * @param {string}      id          Button id
 * @param {string}      style       Button style ('red', 'green', 'blue', 'yellow', 'pink')
 * @param {function}    callback    Button callback function
 */
WebGui.createContainerAndButton = function ( title, type, x, y, text, id, style, callback ) {
    const uic = new UIContainer( title, {
        type: type,
        wrapper:{},
        header:{},
        body:  {},
        footer:{}
    });
    uic.setPosition(x, y).hideFooter();

    uic.addItem( new UIButton(text, style, callback, {id: id} ) );

    return uic;
}

/**
 * Create UIContainer object
 * @param {string}      title       Container title
 * @param {string}      type        Container type ('red', 'green', 'blue', 'yellow', 'pink')
 * @param {number}      x           Container position x
 * @param {number}      y           Container position y
 */
WebGui.createContainer = function ( title, type, x, y, callback ) {
    const uic = new UIContainer( title, {
        type: type,
        wrapper:{},
        header:{},
        body:  {},
        footer:{},
        callback
    });
    uic.setPosition(x, y).hideFooter();
    return uic;
}

/**
 * Create a button and add to container
 * @param {UIContainer} uic         Button container
 * @param {string}      text        Button text
 * @param {number}      id          Button id
 * @param {string}      type        Button type ('red', 'green', 'blue', 'yellow', 'pink')
 * @param {number}      x           Button position x
 * @param {number}      y           Button position y
 * @param {object}      options     Button options
 */
WebGui.createButton = function ( uic, text, id, type, callback, options ) {
    options = options || {};
    options.id = id;
    uic.addItem( new UIButton(text, type, callback, options ) );
    return this;
}



/**
 * Creates an oscilloscope and adds it into container
 * @param {UIContainer} uic         Oscilloscope container
 * @param {number}      width       scope canvas width
 * @param {number}      height      scope canvas height
 * @param {object}      options     Button options
 */
WebGui.createOscilloscope = function ( uic, width, height, options ) {
    options = options || {};
    const osc = new Oscilloscope( width, height, {
        controls: {
            wrapper: {
                "min-width": "82px",
                "display" : "inline-block",
                "text-align" : "left"
            },
            label: { },
            value: { }
        },
        points: options.points || 500
    });
    uic.addItem( osc );
    return osc;
}

export { WebGui };
export default WebGui;

/* EOF */
