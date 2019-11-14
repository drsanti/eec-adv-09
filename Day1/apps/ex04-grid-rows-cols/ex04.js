function main(mcu) {
    //!! Print message to the console window
    console.log("Example04 works!");

    //!! Container (Card) used to contain Blue and Green buttons
    const container = new Container({
        text: "LED Control Panel",
        style: "bg-dark text-info"
    });

    const grid = new Grid({
        rows: 1,
        cols: 4,
        parent: container.id
    })

    //!! Bule button used to control LED0
    new Button({
        text: "Toggle LED0",
        style: "btn-info",
        parent: grid.getSlotId(0, 0),
        action: () => mcu.led_toggle(LED.ID0)
    })

    //!! Green button used to control LED1
    new Button({
        text: "Toggle LED1",
        style: "btn-success",
        parent: grid.getSlotId(0, 1),
        action: () => mcu.led_toggle(LED.ID1)
    })

    //!! Yellow button used to control LED2
    new Button({
        text: "Toggle LED2",
        style: "btn-warning",
        parent: grid.getSlotId(0, 2),
        action: () => mcu.led_toggle(LED.ID2)
    })

    //!! Dark-blue button used to control LED3
    new Button({
        text: "Toggle LED2",
        style: "btn-primary",
        parent: grid.getSlotId(0, 3),
        action: () => mcu.led_toggle(LED.ID3)
    })
}
