function main(mcu) {

    //!! Print message to the console window
    console.log("Example09 works!");

    //!! Container (Card) used to contain Blue and Green buttons
    const container = new Container({
        text: "LED Control Panel",
        style: "bg-dark text-info"
    });
    //!! Create grid layout
    const grid = new Grid({
        rows: 1,
        cols: 2,
        parent: container.id
    })
    //!! Bule button used to control LED0
    new Button({
        text: "START",
        style: "btn-success",
        parent: grid.getSlotId(0, 0),
        action: () => start()
    })

    //!! Green button used to control LED1
    new Button({
        text: "STOP",
        style: "btn-danger",
        parent: grid.getSlotId(0, 0),
        action: () => stop()
    })

    //!! Create leds
    let leds = [];
    let styles = ["led-red", "led-green", "led-yellow", "led-blue"];
    for (i = 0; i < styles.length; i++) {
        //!! Create leds
        leds.push(new LedIndicator({
            style: styles[i],
            parent: grid.getSlotId(0, 1)
        }))
    }


    //!! timer variable
    let timer = null;

    //!! LED index variable
    let index = 0;

    //!! START
    function start() {
        mcu.beep(3000, 50);
        if (timer) return;
        timer = setInterval(led_running, 200);
    }

    //!! STOP
    function stop() {
        clearInterval(timer);
        timer = null;
        mcu.beep(100, 100);
    }

    //!! LED controller
    function led_running() {
        leds.map(led => led.off());
        leds[leds.length - 1 - index].on();
        index = (index + 1) % leds.length;
    }
}
