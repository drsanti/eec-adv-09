/**
 * iot04-switch-led-indicator
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
        text: "Press the switches on the microcontroller board and check LEDs and LED-Indicators",
        iconLeft: 'info-circle',
        className: 'info'
    })

    ai.psw.sub(PSW.ID0, psw0_action);
    ai.psw.sub(PSW.ID1, psw1_action);
    ai.psw.sub(PSW.ID2, psw2_action);
    ai.psw.sub(PSW.ID3, psw3_action);

    const led1 = ui.createLed({className: 'red'});
    const led2 = ui.createLed({className: 'green'});
    const led3 = ui.createLed({className: 'yellow'});
    const led4 = ui.createLed({className: 'blue'});

    function psw0_action() {
        ai.led.flash(LED.ID0);
        ai.buz.beep();
        led1.flash(200);
    }

    function psw1_action() {
        ai.led.flash(LED.ID1);
        ai.buz.beep();
        led2.flash(200);
    }

    function psw2_action() {
        ai.led.flash(LED.ID2);
        ai.buz.beep();
        led3.flash(200);
    }

    function psw3_action() {
        ai.led.flash(LED.ID3);
        ai.buz.beep();
        led4.flash(200);
    }
}
