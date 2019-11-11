const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;
const COM = "COM3"
const port = new SerialPort(COM, {
    baudRate: 115200,
    parity: 'none',
    stopBits: 1,
    dataBits: 8,
    flowControl: false
}, function(err) {
    if (err) {
        console.log('error: ', err.message);
        port.close();
    }
});

console.info("Connected to " + COM);

const parser = new Readline({
    delimiter: '\n'
});
port.pipe(parser);


parser.on('data', function(data) {
    console.log('Mcu data:', data);
    adc_exec(data);
    psw_and_led_exec(data);
});


let adc_vals = [0, 0, 0, 0];
let adc_cbks = [null, null, null, null];


function adc_exec(data) {

    //!! adc:i:?
    data = data.replace('\r', '').replace('\n', '');
    if (data.includes('adc:')) {
        let ch = data[4];
        if (ch >= '0' && ch <= '3') {
            let id = Number(ch);
            let str = data.split(':');
            if (str.length == 3) {
                let val = Number(str[2]);

                //!! on read callback
                if (adc_cbks[id]) {
                    adc_cbks[id]({
                        status: 'ok',
                        tag: 'adc',
                        id: id,
                        val: val
                    });
                }

                //!! Update value
                adc_vals[id] = val;

            }
        }
    }
}


//!! for subscribtion callbacks
let psw_cbks = [null, null, null, null];

//!! For psw request callbacks
let psw_req_cbks = [null, null, null, null]


//!! For led request callbacks
let led_req_cbks = [null, null, null, null]

function psw_and_led_exec(data) {

    //!! psw:i:?
    if (data.includes('psw:')) {
        let sw = data[4]; // i
        if (sw >= '0' && sw <= '3') {
            let id = Number(sw);

            if (psw_cbks[id]) {
                psw_cbks[id]({
                    status: 'ok',
                    tag: 'psw',
                    id: id,
                    val: 'pressed'
                });
            }
            if (psw_req_cbks[id]) {

                psw_req_cbks[id]({
                    status: 'ok',
                    tag: 'psw',
                    id: id,
                    val: data[6]
                });

                //!! Reset it
                psw_req_cbks[id] = null;
            }
        }
    }

    if (data.includes('led:')) {
        let sid = data[4]; // i

        if (sid >= '0' && sid <= '3') {
            let id = Number(sid);
            if (led_req_cbks[id]) {

                led_req_cbks[id]({
                    status: 'ok',
                    tag: 'led',
                    id: id,
                    val: data[6]
                });

                //!! Reset it
                led_req_cbks[id] = null;
            }
        }
    }
}

function psw_subscribe(id, callback) {
    if (id >= 0 && id <= 3) {
        psw_cbks[id] = callback;
    }
}

function psw_unsubscribe(id, callback) {
    if (id >= 0 && id <= 3) {
        psw_cbks[id] = null;
    }
}



function gen_cmd(cmd) {
    return new Buffer.from(`${cmd}\r\n`, 'utf-8');
}

function led_on(id) {
    port.write(gen_cmd(`led:${id}:on`));
}

function led_off(id) {
    port.write(gen_cmd(`led:${id}:off`));
}

function led_inv(id) {
    port.write(gen_cmd(`led:${id}:inv`));
}

function led_get(id) {
    port.write(gen_cmd(`led:${id}:?`));
}


function beep(freq, period) {
    port.write(gen_cmd(`beep:${freq}:${period}`));
}

function adc_req(id, callback) {
    id = Number(id);

    if (id >= 0 && id <= 3) {
        port.write(gen_cmd(`adc:${id}:?`));
        //!! assign req callback
        if (callback) {
            adc_cbks[id] = callback;
        }
    }
}


function psw_req(id, callback) {
    id = Number(id);

    if (id >= 0 && id <= 3) {
        port.write(gen_cmd(`psw:${id}:?`));
        //!! assign req callback
        if (callback) {
            psw_req_cbks[id] = callback;
        }
    }
}

function led_req(id, callback) {
    id = Number(id);

    if (id >= 0 && id <= 3) {
        port.write(gen_cmd(`led:${id}:?`));
        //!! assign req callback
        if (callback) {
            led_req_cbks[id] = callback;
        }
    }
}

//!!
//!! Browser requests
//!!
function process_request(req, cbk) {

    //console.logconsole.log(`process_request: ${ req }`);

    //!! LED Control functions
    if (req.includes("led:")) {
        let sp = req.split(':');
        if (sp.length == 3) {
            let sid = sp[1];
            if (sid >= '0' && sid <= '3') {
                let id = Number(sid);
                let cmd = sp[2];
                if (cmd == 'on') {
                    led_on(id);
                    cbk({
                        status: 'ok',
                        tag: 'led',
                        id: id,
                        val: cmd
                    });
                    return true;
                } else if (cmd == 'off') {
                    led_off(id);
                    cbk({
                        status: 'ok',
                        tag: 'led',
                        id: id,
                        val: cmd
                    });
                    return true;
                } else if (cmd == 'inv') {
                    led_inv(id);
                    cbk({
                        status: 'ok',
                        tag: 'led',
                        id: id,
                        val: cmd
                    });
                    return true;
                } else if (cmd == '?') {
                    led_req(id, cbk);
                    return true;
                }
            }
        }
    }


    if (req.includes("adc:") && req.includes("?")) {
        var str = req;
        let sp = str.split(':');
        if (sp.length == 3) {
            let sid = sp[1];
            if (sid >= '0' && sid <= '3' && sp[2] == '?') {
                let id = Number(sid);
                adc_req(id, cbk);
                return true;
            }
        }
    }


    if (req.includes("beep:")) {
        let sp = req.split(':');
        if (sp.length == 3) {
            let freq = Number(sp[1]);
            let period = Number(sp[2]);
            beep(freq, period);
            cbk({
                status: 'ok',
                tag: 'beep',
                id: 0,
                freq: freq,
                period: period
            });
            //console.log(`Execute: ${req}`);
            return true;
        }
    }

    //!!
    //!! psw subscribe/unsubscribe
    //!! psw:i:?
    if (req.includes("psw:")) {
        let sp = req.split(':');

        if (sp.length == 3) {
            let id = Number(sp[1]);
            let cmd = sp[2]; //!! subscribe, unsubscribe
            if (cmd == 'subscribe' || cmd == 'unsubscribe') {
                psw_subscribe(id, (cmd == 'subscribe' ? cbk : null));
                cbk({
                    status: 'ok',
                    tag: 'psw',
                    id: id,
                    val: (cmd == 'subscribe' ? 'subscribed' : 'unsubscribed')
                });

                //console.log(`Execute: ${req}`);
                return true;
            } else if (cmd == '?') {
                psw_req(id, cbk);
                return true;
            }
        }
    }


    cbk({
        status: 'error'
    });
    return false
}
process.on('exit', () => {
    port.close();
});

module.exports.process_request = process_request;
