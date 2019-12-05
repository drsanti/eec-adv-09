
/**
 * iot05-adc-gauge
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
        text: "Change the resistance of the POTs and/or move your hand over the board to see the changes",
        iconLeft: 'info-circle',
        className: 'info'
    })

    ai.adc.sub(ADC.ID0, adc0_action);
    ai.adc.sub(ADC.ID1, adc1_action);
    ai.adc.sub(ADC.ID2, adc2_action);
    ai.adc.sub(ADC.ID3, adc3_action);

    const g3 = ui.createGauge({useInline: true, useAdaptiveColor: true, min:0, max: 100, hue: 30});
    const g2 = ui.createGauge({useInline: true, useAdaptiveColor: true, min:0, max: 100, hue: 150});
    const g1 = ui.createGauge({useInline: true, useAdaptiveColor: true, min:0, max: 100, hue: 200});
    const g0 = ui.createGauge({useInline: true, useAdaptiveColor: true, min:0, max: 100, hue: 350});

    function adc0_action(adc) {
        g0.setValue(adc.val);
    }

    function adc1_action(adc) {
        g1.setValue(adc.val);
    }

    function adc2_action(adc) {
        g2.setValue(adc.val);
    }

    function adc3_action(adc) {
        g3.setValue(adc.val);
    }

}
