const application = (mcu) => {

    const text = 'Click to Beep';
    const className = 'btn-warning';
    const parent = null;


    let freq = 1000;
    let period = 500;

    const callback = () => {
        mcu.beep(freq, period);
        mcu.led_inv(0);
    };

    new Button(text, className, parent, callback);

    new Knob(200, 0, 100, 'knob', (v) => {
        freq = v * 50;
        mcu.beep(freq, period);
    });
}
