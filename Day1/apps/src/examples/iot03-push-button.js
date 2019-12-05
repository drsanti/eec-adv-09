/**
 * iot03-push-button
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

    ui.createText({
        text: "Press the switches on the microcontroller board and check beep sound, LED2 and LED3",
        iconLeft: 'info-circle',
        className: 'info'
    })

    ai.psw.sub(PSW.ID0, psw0_action);
    ai.psw.sub(PSW.ID1, psw1_action);

    function psw0_action() {
        ai.buz.beep(1000)
    }

    function psw1_action() {
        ai.buz.beep(4000)
    }

    ai.psw.sub(PSW.ID2, psw2_action);
    ai.psw.sub(PSW.ID3, psw3_action);

    function psw2_action() {
        ai.led.toggle(LED.ID2)
    }

    function psw3_action() {
        ai.led.toggle(LED.ID3)
    }
}
