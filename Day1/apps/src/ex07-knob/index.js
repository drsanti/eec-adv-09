/**
 * ex07-knob
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

    const panel1  = ui.createPanel({
        className: 'bg-dark',
        text: "Knob Control Panel"
    });

    const knob1 = ui.createKnob({parentId: panel1.getBodyId(), hue: 50,  min:0, max:10});
    const knob2 = ui.createKnob({parentId: panel1.getBodyId(), hue: 100, min:0, max:20});
    const knob3 = ui.createKnob({parentId: panel1.getBodyId(), hue: 150, min:0, max:50});
    const knob4 = ui.createKnob({parentId: panel1.getBodyId(), hue: 200, min:0, max:100});
}
