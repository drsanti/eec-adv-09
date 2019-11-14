function main(mcu) {
    //!! Print message to the console window
    console.log("Example03 works!");

    //!! Container (Card) used to contain Blue and Green buttons
    const container = new Container({
        text: "LED0 & LED1 Control Panel",
        style: "bg-danger text-dark"
    });

    //!! Bule button used to control LED0
    new Button({
        text: "Toggle LED0",
        style: "btn-info",
        parent: container.id,
        action: () => mcu.led_toggle(LED.ID0)
    });

    //!! Green button used to control LED0
    new Button({
        text: "Toggle LED1",
        style: "btn-success",
        parent: container.id,
        action: () => mcu.led_toggle(LED.ID1)
    });
}
