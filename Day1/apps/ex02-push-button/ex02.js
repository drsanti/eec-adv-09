function main(mcu) {
    //!! Print message to the console window
    console.log('Example02 works!');

    //!! Blue button
    new Button({
        text: "Toggle LED0",
        style: "btn-info",
        action: () => mcu.led_toggle(LED.ID0)
    });

    //!! Ggreen button
    new Button({
        text: "Toggle LED1",
        style: "btn-success",
        action: () => mcu.led_toggle(LED.ID1)
    });

    //!! Yellow button
    new Button({
        text: "Toggle LED2",
        style: "btn-warning",
        action: () => mcu.led_toggle(LED.ID2)
    });

    //!! Red button
    new Button({
        text: "Toggle LED3",
        style: "btn-danger",
        action: () => mcu.led_toggle(LED.ID3)
    });
}
