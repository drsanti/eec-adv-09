function main(mcu) {

    //!! Print message to the console window
    console.log("Example06 works!");


    //!! Create a gauge indicator
    var gauge1 = new Gauge({
        min: 0,
        max: 100,
        hue: 120
    });

    //!! Subscribe to ADC1, the light sensor
    mcu.adc_sub(ADC.ID1, adc => {
        gauge1.setValue(adc.val);

        //!! Get light value (intensity, 0-100%)
        var light = adc.val;

        //!! Logic
        if (light < 50) {
            mcu.led_write(15);
            mcu.beep();
        } else {
            mcu.led_write(0);
        }
    })
}
