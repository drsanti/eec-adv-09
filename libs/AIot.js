function AIot() {

    this.adcReq_cbks = [null, null, null, null];
    this.adcSub_cbks = [null, null, null, null];
    this.pswSub_cbks = [null, null, null, null];

    this.led_timers = [null, null, null, null];

    this.timer = null;

    this.port = 3998;
    this.socket = null; //new WebSocket('ws://localhost:' + this.port + '/');

    return this;
}

AIot.prototype.start = function(callback) {

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

AIot.prototype.__process_server_message = function(json) {
    json = JSON.parse(json);
    if (json.tag == 'psw') {
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
                this.adcSub_cbks[i](json);
            }
        }
    }
}

AIot.prototype.adc_req = function(id, callback) {
    if (id >= 0 && id <= 3) {
        this.socket.send(`adc:${id}:?`);
        this.adcReq_cbks[id] = callback;
    }
    return this;
}

AIot.prototype.adc_get = function(id, callback) {
    this.adc_req(id, callback);
    return this;
}

AIot.prototype.adc_subscribe = function(id, callback) {
    if (id >= 0 && id <= 3) {
        this.adcSub_cbks[id] = callback;
    }
    return this;
}

AIot.prototype.adc_unsubscribe = function(id) {
    if (id >= 0 && id <= 3) {
        this.adcSub_cbks[id] = null;
    }
    return this;
}

AIot.prototype.psw_subscribe = function(id, callback) {
    if (id >= 0 && id <= 3) {
        this.socket.send(`psw:${id}:subscribe`);
        this.pswSub_cbks[id] = callback;
    }
    return this;
}

AIot.prototype.psw_unsubscribe = function(id) {
    if (id >= 0 && id <= 3) {
        this.socket.send(`psw:${id}:unsubscribe`);
        this.pswSub_cbks[id] = null;
    }
    return this;
}


AIot.prototype.beep = function(freq, period) {
    this.socket.send(`beep:${freq ? freq : 3500}:${period ? period : 50}`);
    return this;
}

AIot.prototype.led_on = function(id) {
    this.socket.send(`led:${id}:on`);
    return this;
}

AIot.prototype.led_off = function(id) {
    this.socket.send(`led:${id}:off`);
    return this;
}

AIot.prototype.led_inv = function(id) {
    this.socket.send(`led:${id}:inv`);
    return this;
}
AIot.prototype.led_toggle = function(id) {
    this.socket.send(`led:${id}:inv`);
    return this;
}

AIot.prototype.led_flash = function(id, period) {
    this.led_on(id);
    let tmr = setInterval(() => {
        this.led_off(id);
        clearInterval(tmr);
    }, period ? period : 10);
    return this;
}


AIot.prototype.start_sampler = function(interval) {
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

AIot.prototype.stop_sampler = function() {
    clearInterval(this.timer);
    this.timer = null;
}
//!!
//!! Helper functions
//!!

//!! ledx-on
AIot.prototype.led0_on = function() {
    this.led_on(0);
    return this;
}

AIot.prototype.led1_on = function() {
    this.led_on(1);
    return this;
}

AIot.prototype.led2_on = function() {
    this.led_on(2);
    return this;
}

AIot.prototype.led3_on = function() {
    this.led_on(3);
    return this;
}

//!! ledx-off
AIot.prototype.led0_off = function() {
    this.led_off(0);
    return this;
}

AIot.prototype.led1_off = function() {
    this.led_off(1);
    return this;
}

AIot.prototype.led2_off = function() {
    this.led_off(2);
    return this;
}

AIot.prototype.led3_off = function() {
    this.led_off(3);
    return this;
}

//!! ledx-inv
AIot.prototype.led0_inv = function() {
    this.led_inv(0);
    return this;
}

AIot.prototype.led1_inv = function() {
    this.led_inv(1);
    return this;
}

AIot.prototype.led2_inv = function() {
    this.led_inv(2);
    return this;
}

AIot.prototype.led3_inv = function() {
    this.led_inv(3);
    return this;
}

//!! ledx-toggle
AIot.prototype.led0_toggle = function() {
    this.led_inv(0);
    return this;
}
AIot.prototype.led1_toggle = function() {
    this.led_inv(1);
    return this;
}
AIot.prototype.led2_toggle = function() {
    this.led_inv(2);
    return this;
}
AIot.prototype.led3_toggle = function() {
    this.led_inv(3);
    return this;
}


//!! ledx-flash
AIot.prototype.led0_flash = function(period) {
    this.led_flash(0, period)
    return this;
}

AIot.prototype.led1_flash = function(period) {
    this.led_flash(1, period)
    return this;
}

AIot.prototype.led2_flash = function(period) {
    this.led_flash(2, period)
    return this;
}

AIot.prototype.led3_flash = function(period) {
    this.led_flash(3, period)
    return this;
}



AIot.prototype.repeat = function(count, period, eachCbk, endCbk) {
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

AIot.prototype.sequence = function(array, period, eachCbk, endCbk) {
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
AIot.prototype.endTicker = function(t) {
    clearInterval(t);
}
