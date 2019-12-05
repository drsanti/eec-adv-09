/**
 * ex04-layout
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
        text: 'Using layout',
        className: 'success'
    });

    const layout1 = ui.createLayout({
        rows: 1,
        cols: 4,
        parentId:
        panel1.getBodyId()
    });

    const button1 = ui.createButton({
        parentId: layout1.getRowColId(0, 0),
        className: 'warning'
    });

    const button2 = ui.createButton({
        parentId: layout1.getRowColId(0, 1),
        className: 'danger'
    });

    const button3 = ui.createButton({
        parentId: layout1.getRowColId(0, 2),
        className: 'primary'
    });

    const button4 = ui.createButton({
        parentId: layout1.getRowColId(0, 3),
        className: 'secondary'
    });
}
