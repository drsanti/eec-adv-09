const application = (mcu) => {

    const b = new Button('LED0 Toggle', 'btn-danger', null, (event) => {
        mcu.led_inv(0);
        mcu.beep();
    });
}
