/**
 * ex06-led
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
        className: 'bg-primary',
        text: "LED Indicator Control Panel"
    });
    const led1 = ui.createLed({margin:100, className: 'red',    parentId: panel1.getBodyId()});
    const led2 = ui.createLed({margin:100, className: 'green',  parentId: panel1.getBodyId()});
    const led3 = ui.createLed({margin:100, className: 'yellow', parentId: panel1.getBodyId()});
    const led4 = ui.createLed({margin:100, className: 'blue',   parentId: panel1.getBodyId()});

    setInterval(()=>{
        led1.toggle();
        led2.toggle();
        led3.toggle();
        led4.toggle();
    },200);
}
