function main(mcu) {

    //!! Print message to the console window
    console.log("Example08 works!");

    //!! Beep control variables
    let frequency = 1000;
    let period = 100;

    //!! Fequenfy control
    new Knob({
        min: 500,
        max: 5000,
        action: (f) => {
            frequency = f;
            sound();
        }
    });

    //!! Period control
    new Knob({
        min: 10,
        max: 1000,
        hue: 220,
        action: (p) => {
            period = p;
            sound();
        }
    });

    //!! Beep
    function sound() {
        mcu.beep(frequency, period);
    }

}
