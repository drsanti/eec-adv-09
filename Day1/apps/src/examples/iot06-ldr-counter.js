/**
 * iot06-ldr-counter
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
        text: "Move your hand over the board to see the counter on the gauge",
        iconLeft: 'info-circle',
        className: 'info'
    })

    let gauge = ui.createGauge({max:10})
    gauge.setValue(0);

    let led = ui.createLed({
        className: 'yellow'
    })

    let counter = 0;
    ai.adc.sub(ADC.ID1, light => {
        if (light.dir == "dec") {
            ai.buz.beep();
            ai.led.flash(LED.ID0);
            led.flash(500)
            counter = counter + 1;
            gauge.setValue(counter);

            if(counter == 10) {
                ai.buz.beep(500, 2000);
                counter = 0;
                gauge.setValue(counter);
            }
        }
    })
}
