/**
 * ex08-gauge
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
        text: "Gauge Display Panel"
    });

    const gauge1 = ui.createGauge({parentId: panel1.getBodyId(), min:0, max:100, hue: 100, useInline: true});
    const gauge2 = ui.createGauge({parentId: panel1.getBodyId(), min:0, max:100, hue: 150, useInline: true});
    const gauge3 = ui.createGauge({parentId: panel1.getBodyId(), min:0, max:100, hue: 200, useInline: true});
    const gauge4 = ui.createGauge({parentId: panel1.getBodyId(), min:0, max:100, hue: 250, useInline: true});

    let alpha = 0;
    setInterval(()=>{
        let val = 50*(1+Math.sin(alpha));
        gauge1.setValue(val);
        gauge2.setValue(val);
        gauge3.setValue(val);
        gauge4.setValue(val);
        alpha+=0.05;
    },50);
}
