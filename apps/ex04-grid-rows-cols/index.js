const application = (mcu) => {

    const container = new Container('Hello World', 'bg-info', null);
    container.setTitle('Grid and Container Example');


    const grid = new Grid(1, 2, container.id);
    const r0c0 = grid.getSlotId(0, 0);
    const r0c1 = grid.getSlotId(0, 1)

    const b1 = new Button('Toggle LED0 and Beep-Low', 'btn-success', r0c0, action1);
    const b2 = new Button('Toggle LED3 and Beep-High', 'btn-primary', r0c1, action2);

    function action1() {
        mcu.led_inv(0);
        mcu.beep(2000, 100);
    }

    function action2() {
        mcu.led_inv(3);
        mcu.beep(4000, 100);
    }

    // mcu.repeat(20, 100, n => mcu.beep(n * 100));
    mcu.repeat(20, 100, (n, t) => {
        mcu.beep(n * 100);
        mcu.endTicker(t);
    });

    //mcu.sequence([100, 200, 800, 1200, 1500], 2000, v => mcu.led_flash(0, v));
    //mcu.sequence([100, 200, 800, 1200, 1500], 100, v => mcu.beep(v));

    mcu.repeat(10, 800, n => {
        mcu.sequence([0, 1, 2, 3, 3, 2, 1, 0], 100, v => mcu.led_flash(v, 100));
    }, () => {
        mcu.beep(4000, 2000);
    });

}
