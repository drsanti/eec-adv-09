/**
 * ex03-panel
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

    const panel1 = ui.createPanel({
        text: "LED0 & LED1 Control Panel",
        className: "danger text-warning"
     });

     new ui.createButton({
        text:"Toggle LED0",
        parentId: panel1.getBodyId(),
        className: "info",
        callback: ()=>ai.led.inv(LED.ID0)
     });

     new ui.createButton({
        text:"Toggle LED1",
        parentId: panel1.getBodyId(),
        className: "success",
        callback: ()=>ai.led.inv(LED.ID1)
    });
}
