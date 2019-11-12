const LED = {
    ID0: 0,
    ID1: 1,
    ID2: 2,
    ID3: 3,
}

const PSW = {
    PSW0: 0,
    PSW1: 1,
    PSW2: 2,
    PSW3: 3,
}

const ADC = {
    ADC0: 0,
    ADC1: 1,
    ADC2: 2,
    ADC3: 3,
}

function AIot() {


    this.port = 3998;


    this.socket = null;

    this.adc_vals = [0, 0, 0, 0];
    this.adc_delta = 50;

    this.adcReq_cbks = [null, null, null, null];
    this.ledReq_cbks = [null, null, null, null];
    this.pswReq_cbks = [null, null, null, null];


    this.adcSub_cbks = [null, null, null, null];
    this.pswSub_cbks = [null, null, null, null];


    this.timer = null;

}


AIot.prototype.__process_server_message = function (json) {

    json = JSON.parse(json);

    // console.log(json);


    //!! get
    if (json.tag == "psw" && json.type == "req") {
        let id = Number(json.id);
        if (this.pswReq_cbks[id]) {
            this.pswReq_cbks[id](json);
        }
    }
    //!! sub
    if (json.tag == "psw" && json.type == "sub") {
        let id = Number(json.id);
        if (this.pswSub_cbks[id]) {
            this.pswSub_cbks[id](json);
        }
    } else if (json.tag == "adc") {
        let id = Number(json.id);

        //!! request callback
        if (this.adcReq_cbks[id]) {
            this.adcReq_cbks[id](json);
        }

        //!! subscriber callbask
        for (let i = 0; i < this.adcSub_cbks.length; i++) {
            if (this.adcSub_cbks[i]) {
                if (this.adc_vals[i] > Number(json.val + this.adc_delta)) {
                    json.dir = 'dec';
                } else if (Number(json.val) > this.adc_vals[i] + this.adc_delta) {
                    json.dir = 'inc';
                } else {
                    json.dir = 'none';
                }
                this.adcSub_cbks[i](json);
                this.adc_vals[i] = Number(json.val);
            }
        }
    }

    //!! Response for led_get()
    else if (json.tag == 'led' && json.val == '0' || json.val == '1') {
        let id = Number(json.id);
        if (this.ledReq_cbks[id]) {
            this.ledReq_cbks[id](json);
        }
    }


}
AIot.prototype.set_adc_delta = function (delta) {
    this.adc_delta = delta;
}
AIot.prototype.start = function (callback) {

    return new Promise((resolve, reject) => {
        this.socket = new WebSocket('ws://localhost:' + this.port + '/');
        this.socket.onopen = () => {
            resolve(this);

            if (callback) {
                callback(this);
            }
            this.start_sampler(500);
        };

        this.socket.onmessage = (message) => {
            let data = message.data;
            this.__process_server_message(data)
        };
    });

}

AIot.prototype.start_sampler = function (interval) {
    interval = interval || interval;
    interval = interval < 100 ? 100 : interval;
    if (this.timer != null) return this;
    this.timer = setInterval(() => {
        for (let i = 0; i < this.adcSub_cbks.length; i++) {
            if (this.adcSub_cbks[i]) {
                this.adc_req(i);
            }
        }
    }, interval);
    return this;
}

AIot.prototype.stop_sampler = function () {
    clearInterval(this.timer);
    this.timer = null;
}



AIot.prototype.adc_req = function (id, callback) {
    if (id >= 0 && id <= 3) {
        this.socket.send(`adc:${id}:?`);
        this.adcReq_cbks[id] = callback;
    }
    return this;
}

AIot.prototype.led_req = function (id, callback) {
    if (id >= 0 && id <= 3) {
        this.socket.send(`led:${id}:?`);
        this.ledReq_cbks[id] = callback;
    }
    return this;
}

AIot.prototype.psw_req = function (id, callback) {
    if (id >= 0 && id <= 3) {
        this.socket.send(`psw:${id}:?`);
        this.pswReq_cbks[id] = callback;
        if (this.pswSub_cbks[id]) {
            console.warn(`The psw_subscribe(${id}) is cancelled. It is overwritten by psw_get(${id}).`);
            this.pswSub_cbks[id] = null;
        }
    }
    return this;
}


AIot.prototype.adc_get = function (id, callback) {
    this.adc_req(id, callback);
    return this;
}
AIot.prototype.led_get = function (id, callback) {
    this.led_req(id, callback);
    return this;
}
AIot.prototype.psw_get = function (id, callback) {
    this.psw_req(id, callback);
    return this;
}

AIot.prototype.adc_subscribe = function (id, callback) {
    if (id >= 0 && id <= 3) {
        this.adcSub_cbks[id] = callback;
    }
    return this;
}
AIot.prototype.adc_sub = function (id, callback) {
    return this.adc_subscribe(id, callback);
}

AIot.prototype.adc_unsubscribe = function (id) {
    if (id >= 0 && id <= 3) {
        this.adcSub_cbks[id] = null;
    }
    return this;
}
AIot.prototype.adc_unsub = function (id) {
    return this.adc_unsubscribe(id);
}

AIot.prototype.psw_subscribe = function (id, callback) {
    if (id >= 0 && id <= 3) {
        this.socket.send(`psw:${id}:subscribe`);
        this.pswSub_cbks[id] = callback;
    }
    return this;
}
AIot.prototype.psw_sub = function (id, callback) {
    return this.psw_subscribe(id, callback);
}

AIot.prototype.psw_unsubscribe = function (id) {
    if (id >= 0 && id <= 3) {
        this.socket.send(`psw:${id}:unsubscribe`);
        this.pswSub_cbks[id] = null;
    }
    return this;
}
AIot.prototype.psw_unsub = function (id) {
    return this.psw_unsubscribe(id);
}


AIot.prototype.beep = function (freq, period) {
    this.socket.send(`beep:${freq ? freq : 3500}:${period ? period : 50}`);
    return this;
}

AIot.prototype.led_on = function (id) {
    this.socket.send(`led:${id}:on`);
    return this;
}
AIot.prototype.led_set = function (id) {
    return this.led_on(id)
}

AIot.prototype.led_off = function (id) {
    this.socket.send(`led:${id}:off`);
    return this;
}
AIot.prototype.led_clr = function (id) {
    return this.led_off(id)
}

AIot.prototype.led_toggle = function (id) {
    this.socket.send(`led:${id}:inv`);
    return this;
}

AIot.prototype.led_inv = function (id) {
    return this.led_toggle(id);
}


AIot.prototype.led_flash = function (id, period) {
    this.led_on(id);
    let tmr = setInterval(() => {
        this.led_off(id);
        clearInterval(tmr);
    }, period ? period : 10);
    return this;
}
AIot.prototype.led_flash = function (id, period) {
    return this.led_flash(id, period);
}

AIot.prototype.led_write = function (data) {
    for (let i = 0; i < 4; i++) {
        if (data & 1) {
            this.led_set(i);
        } else {
            this.led_clr(i);
        }
    }
    return this;
}

AIot.prototype.repeat = function (count, period, eachCbk, endCbk) {
    let idx = 0;
    period = period || 500;
    period = period < 100 ? 100 : period;
    let t = setInterval(() => {
        eachCbk(idx, t);
        if (++idx >= count) {
            clearInterval(t);
            if (endCbk) endCbk(null);
        }
    }, period);
    return this;
}

AIot.prototype.sequence = function (array, period, eachCbk, endCbk) {
    let n = 0;
    period = period || 500;
    period = period < 100 ? 100 : period;
    let t = setInterval(() => {
        eachCbk(array[n], n, t);
        if (++n >= array.length) {
            clearInterval(t);
            if (endCbk) endCbk(null, null);
        }
    }, period);
    return this;
}
AIot.prototype.endTicker = function (t) {
    clearInterval(t);
}
