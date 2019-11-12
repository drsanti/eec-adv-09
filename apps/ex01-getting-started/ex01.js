const application = (mcu) => {

    //!!****************************
    //!! P1: LED Control Functions *
    //!!****************************

    /*
    //!! P1.1: Turn on LED0
    mcu.led_set(LED.ID0);

    //!! P1.2 Turn off LED0
    mcu.led_clr(LED.ID0);

    //!! P1.3 Toggle LED0
    mcu.led_inv(LED.ID0);
    */

    /*
    ["link", "default", "primary", "secondary",
        "info", "success", "warning", "danger"]
        .map(c => new Button({ text: c, style: `btn-${c}` }));
    */


    //new Button({ text: "Toggle LED3", style: "btn-warning", action: function () { mcu.led_toggle(LED.ID3) } });
    //new Button({ text: "Toggle LED3", style: "btn-danger", action: () => mcu.led_toggle(LED.ID3) });


    // let b1_prop = {
    //     text: "Toggle LED0",
    //     style: "btn-default"
    // }

    // let button1 = new Button(b1_prop)

    // function toggle_led0() {
    //     mcu.led_inv(LED.ID0);
    // }

    // let freq = 1000;
    // let period = 500;

    // const callback = () => {
    //     mcu.beep(freq, period);
    //     mcu.led_inv(0);
    // };

    // new Button(text, className, parent, callback);

    // new Knob(200, 0, 100, 'knob', (v) => {
    //     freq = v * 50;
    //     mcu.beep(freq, period);
    // });

    //mcu.led_off(0);
    //mcu.led_get(0, v => console.log(v));

    // setInterval(() => {
    //     mcu.psw_get(0, v => console.log(v));
    // }, 1500);


    // mcu.psw_sub(0, v => console.log(v))
    // mcu.psw_sub(1, v => console.log(v))
    // mcu.psw_sub(2, v => console.log(v))
    // mcu.psw_sub(3, v => console.log(v))


    // mcu.adc_sub(1, v => {
    //     if (v.dir == 'inc') {
    //         mcu.led_on(0)
    //         mcu.led_on(1)
    //         mcu.led_on(2)
    //         mcu.led_on(3)
    //     } else if (v.dir == 'dec') {
    //         mcu.beep(4000, 100)
    //         mcu.led_off(0)
    //         mcu.led_off(1)
    //         mcu.led_off(2)
    //         mcu.led_off(3)
    //     }
    // });



    //!!
    //!!
    //!!
    /*
    new Button({
        text: "Toggle LED0",
        style: "btn-info",
        action: () => mcu.led_toggle(LED.ID0)
    });
    new Button({
        text: "Toggle LED1",
        style: "btn-success",
        action: () => mcu.led_toggle(LED.ID1)
    });
    new Button({
        text: "Toggle LED2",
        style: "btn-warning",
        action: () => mcu.led_toggle(LED.ID2)
    });
    new Button({
        text: "Toggle LED3",
        style: "btn-danger",
        action: () => mcu.led_toggle(LED.ID3)
    });
    */


    //!!
    //!!
    //!!
    /*
    var ctn1 = new Container({

    });

    var ctn2 = new Container({
        text: "Contaner/Card2"
    });

    var ctn3 = new Container({
        text: "Contaner/Card3",
        style: "bg-warning text-primary"
    });
    */

    /*
    var ctn1 = new Container({
        text: "LED0 & LED1 Control Panel",
        style: "bg-danger text-warning"
    });

    new Button({
        text: "Toggle LED0",
        style: "btn-info",
        parent: ctn1.id,
        action: () => mcu.led_toggle(LED.ID0)
    });
    new Button({
        text: "Toggle LED1",
        style: "btn-success",
        parent: ctn1.id,
        action: () => mcu.led_toggle(LED.ID1)
    });


    var ctn2 = new Container({
        text: "LED2 & LED3 Control Panel",
        style: "bg-success"
    });

    new Button({
        text: "Toggle LED2",
        style: "btn-warning",
        parent: ctn2.id,
        action: () => mcu.led_toggle(LED.ID2)
    });
    new Button({
        text: "Toggle LED3",
        style: "btn-danger",
        parent: ctn2.id,
        action: () => mcu.led_toggle(LED.ID3)
    });
    */

    //!!
    //!!
    //!!
    /*
    var soundH = 4000;
    var soundL = 1000;

    var ctn1 = new Container({
        text: "Beep Sound Control Panel",
        style: "bg-gray text-dark"
    });

    new Button({
        text: "High Frequency",
        style: "btn-danger",
        parent: ctn1.id,
        action: () => mcu.beep(soundH)
    });
    new Button({
        text: "Low Frequency",
        style: "btn-warning",
        parent: ctn1.id,
        action: () => mcu.beep(soundL)
    });
    */

    //!!
    //!!
    //!!
    /*
    var ti = setInterval(toggle, 500);

    function toggle() {
        mcu.led_toggle(LED.ID0);
    }
    */

    //!!
    //!!
    //!!
    /*
    mcu.led_on(LED.ID0);
    mcu.led_off(LED.ID1);
    mcu.led_off(LED.ID2);
    mcu.led_off(LED.ID3);

    var ti = setInterval(toggle, 500);

    function toggle() {
        mcu.led_toggle(LED.ID0);
        mcu.led_toggle(LED.ID3);
    }
    */

    //!!
    //!!
    //!!
    /*
    new Button({
        text: "START",
        style: "btn-success",
        action: action_start
    });
    new Button({
        text: "STOP",
        style: "btn-danger",
        action: action_stop
    });

    var ti;

    function action_start() {
        clearInterval(ti);
        ti = setInterval(toggle, 500);
    }

    function action_stop() {
        clearInterval(ti);
    }

    function toggle() {
        mcu.led_toggle(LED.ID0);
    }
    */

    //!!
    //!!
    //!!
new Button({
    text: "START",
    style: "btn-success",
    action: start
});

var to;

function start() {
    mcu.led_write(0);
    mcu.led_on(LED.ID3)
    setTimeout(stop, 2000);
}

function stop() {
    mcu.led_off(LED.ID3);
    clearTimeout(to);
}
}
