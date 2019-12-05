/**
 * ex05-text
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
        text: 'Using Text and Icons',
        className: 'bg-dark'
    });

    const text1 = ui.createText({
        text: "Microchip",
        iconLeft: 'microchip',
        className: 'success',
        parentId: panel1.getBodyId()
    });

    const text2 = ui.createText({
        text: "Comments",
        iconLeft: 'comments',
        className: 'warning',
        parentId: panel1.getBodyId()
    });

    const text3 = ui.createText({
        text: "Power switch",
        iconLeft: 'power-off',
        className: 'info',
        parentId: panel1.getBodyId()
    });

    const text4 = ui.createText({
        text: "Toggle switch",
        iconLeft: 'toggle-on',
        className: 'primary',
        parentId: panel1.getBodyId()
    });
}
