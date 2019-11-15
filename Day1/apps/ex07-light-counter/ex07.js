function main(mcu) {

    //!! Print message to the console window
    console.log("Example07 works!");


    //!! Create a gauge indicator
    var gauge1 = new Gauge({
        min: 0,
        max: 100,
        hue: 225
    });

    //!! Create led indicator
    let led = new LedIndicator({
        style: "led-red",
    })

    //!! Counter variable
    let counter = 0;
    gauge1.setValue(counter);
    mcu.led_write("0000");


    //!! Subscribe to ADC1, the light sensor
    mcu.adc_sub(ADC.ID1, ldr => {

        //!! Logic
        if (ldr.dir == "dec") {
            counter++;
            gauge1.setValue(counter);
            led.flash(100);
            mcu.led_flash(0);
            mcu.beep();
        }
    })
}
