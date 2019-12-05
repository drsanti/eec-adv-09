/**
 * iot01-led-button
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

    ui.createButton({
        text: 'LED0 On',
        className: 'danger',
        callback:   on
    });

    ui.createButton({
        text: 'LED0 Off',
        className: 'secondary',
        callback:   off
    });

    function on() {
        ai.led.on(LED.ID0);
        ai.buz.beep(2000);
    }

    function off() {
        ai.led.off(LED.ID0);
        ai.buz.beep(1000);
    }
}
