function main(mcu) {

    //!! Print message to the console window
    console.log("Example05 works!");



    //!! LED style
    let styles = ["led-red", "led-green", "led-yellow", "led-blue"];

    //!! Create leds and link them to the switches
    for (i = 0; i < styles.length; i++) {
        //!! Create leds
        let led = new LedIndicator({
            style: styles[i],
        })
        //!! subscribe to switches
        mcu.psw_sub(i, s => {
            mcu.beep((s.id + 1) * 1000);
            led.flash(200)
        });
    }
}
