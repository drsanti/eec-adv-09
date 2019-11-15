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
    /*
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
    */

    //!!
    //!!
    //!!
    /*
    new Knob({
        min: 0,
        max: 3,
        action: led_action2
    });

    function led_action(val) {
        mcu.led_write(0);
        mcu.led_on(val);
    }

    function led_action2(val) {
        mcu.led_write(1 << val);
    }
    */

    //!!
    //!!
    //!!
    /*
    var period = 100;
    var knobF = new Knob({
        min: 500,
        max: 5000,
        action: beep_action
    });
    var knobP = new Knob({
        min: 100,
        max: 2000,
        hue: 70,
        action: time_action
    });

    function beep_action(freq) {
        mcu.beep(freq, period);
    }

    function time_action(time) {
        period = time;
    }
    */

    //!!
    //!!
    //!!
    /*
    mcu.psw_sub(PSW.ID0, psw0_action);
    mcu.psw_sub(PSW.ID1, psw1_action);


    function psw0_action() {
        mcu.beep(1000)
    }

    function psw1_action() {
        mcu.beep(4000)
    }
    */

    //!!
    //!!
    //!!
    /*
    mcu.psw_sub(PSW.ID2, psw2_action);
    mcu.psw_sub(PSW.ID3, psw3_action);


    function psw2_action() {
        mcu.led_toggle(LED.ID2)
    }

    function psw3_action() {
        mcu.led_toggle(LED.ID3)
    }
    */



    //!!
    //!!
    //!!
    /*
    var gauge1 = new Gauge({
        min: 0,
        max: 100,
        hue: 120
    });
    var gauge2 = new Gauge({
        hue: 60,
        useInline: false
    });

    mcu.adc_sub(ADC.ID0, adc => {
        gauge1.setValue(adc.val);
    })
    mcu.adc_sub(ADC.ID1, adc => {
        gauge2.setValue(adc.val);
    })
    */



    //!!
    //!!
    //!!
    /*
    var gauge1 = new Gauge({
        hue: 120
    });
    var gauge2 = new Gauge({
        hue: 60,
        useInline: false
    });

    let led0 = new LedIndicator({
        style: 'led-red'
    })
    let led1 = new LedIndicator({
        style: 'led-green'
    })
    let led2 = new LedIndicator({
        style: 'led-yellow'
    })
    let led3 = new LedIndicator({
        style: 'led-blue'
    })

    mcu.psw_sub(PSW.ID0, v => led3.flash(500));
    mcu.psw_sub(PSW.ID1, v => led2.flash(500));
    mcu.psw_sub(PSW.ID2, v => led1.flash(500));
    mcu.psw_sub(PSW.ID3, v => led0.flash(500));

    setInterval(() => {
        led0.flash(100);
        led1.flash(200);
        led2.flash(300);
        led3.flash(400);
        gauge1.setValue(Math.random() * 100);
        gauge2.setValue(Math.random() * 100);
    }, 500);
    */


    /*
    let led0 = new LedIndicator({
        style: 'led-red'
    })
    let led1 = new LedIndicator({
        style: 'led-green'
    })
    let led2 = new LedIndicator({
        style: 'led-yellow'
    })
    let led3 = new LedIndicator({
        style: 'led-blue'
    })

    mcu.psw_sub(PSW.ID0, () => led3.flash(500));
    mcu.psw_sub(PSW.ID1, () => led2.flash(500));
    mcu.psw_sub(PSW.ID2, () => led1.flash(500));
    mcu.psw_sub(PSW.ID3, () => led0.flash(500));
    */


    //!!
    //!!
    //!!
    // mcu.led_write([0, 0, 1, 1]);
    // mcu.led_write([0, 0, 0, 0])
    // mcu.led_write([1, 0])
    // mcu.led_write([1, 1, 0, 0, 0, 1, 0])
    //mcu.led_write(0x00)
    //mcu.led_write("0101")


    //!!
    //!!
    //!!
    var gauge = new Gauge({
        hue: 44
    })
    let led = new LedIndicator({
        style: 'led-red'
    })


    led.on();

    var counter = 0;
    mcu.adc_sub(ADC.ID1, light => {
        if (light.dir == "dec") {
            mcu.beep();
            mcu.led_flash(LED.ID0);
            led.flash(500)
            counter = counter + 1;
            gauge.setValue(counter);
        }
    })
}
