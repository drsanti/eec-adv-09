const application = (mcu) => {

    const c = new Container('My IoT-based Controll Application', 'bg-success', null);
    const b1 = new Button('Toggle LED0 and Beep', 'btn-danger', c.id, action1);
    const b2 = new Button('Toggle LED3 and Beep', 'btn-warning', c.id, action2);

    function action1() {
        mcu.led_inv(0);
        mcu.beep();
    }

    function action2() {
        mcu.led_inv(3);
        mcu.beep();
    }

    let g = new Grid(2, 3);
}
