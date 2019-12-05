/**
 * iot02-beep-knob
 *
 * Asst.Prof.Dr.Santi Nuratch
 * Embedded Computing and Control Laboratory | ECC-Lab @ KMUTT
 * 21 November, 2019
 */


import './styles.scss';
import {AIotEngine, UIEngine, LED, PSW, ADC}  from '../libs/ECC-GUI-Engine';

const ai = new AIotEngine();
const ui = new UIEngine();
ai.start(() => {
    main();
});


function main() {

    let period = 100;

    let knobF = ui.createKnob({
        min: 500,
        max: 5000,
        callback: beep_action
    });
    let knobP = ui.createKnob({
        min: 100,
        max: 2000,
        hue: 70,
        callback: time_action
    });

    function beep_action(freq) {
        ai.buz.beep(freq, period);
    }

    function time_action(time) {
        period = time;
    }
}
