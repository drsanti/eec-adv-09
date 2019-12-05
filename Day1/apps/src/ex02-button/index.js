/**
 * ex02-button
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

    ["primary", "secondary", "info", "success", "warning", "danger", "default", "link"].map(c => {
        ui.createButton({
            text: c,
            className: c,
        });
    });
}
