from time import sleep
from multiprocessing import Process


import websocket
try:
    import thread
except ImportError:
    import _thread as thread
import time
import json


AIot = None


class Worker():

    def __init__(self, name):
        self.cbk = None
        self.ws = None

    def on_message(self, res):
        print(f'on_message: {res}')
        pass

    def on_error(self, res):
        pass

    def on_close(self, res):
        pass

    # on open

    def on_open(self):
        # print(f'on_open:{self.ws}')
        def run():
            print(f'on_open:{self.ws}')

            for i in range(4):
                self.ws.send(f'psw:{i}:subscribe')

            if self.cbk:
                self.cbk(self.ws)

            while True:
                time.sleep(0.5)
                self.ws.send("led:0:inv")

            # done
            self.ws.close()
            print("thread terminating...")

        thread.start_new_thread(run, ())

    def start_ws(self, callback=None):

        # print('start_ws')
        # websocket.enableTrace(True)
        self.ws = websocket.WebSocketApp("ws://localhost:3998",
                                         on_message=self.on_message,
                                         on_error=self.on_error,
                                         on_close=self.on_close)
        self.ws.on_open = self.on_open
        self.cbk = callback
        self.ws.run_forever()

    # Functions
    # LED
    def led_on(self, id):
        self.ws.send(f'led:{id}:on')

    def led_off(self, id):
        self.ws.send(f'led:{id}:off')

    def led_inv(self, id):
        self.ws.send(f'led:{id}:inv')


def doit(ws):
    AIot = ws
    AIot.send("beep:5000:50")
    print(f'res: {AIot}')


def start():
    w1 = Worker('worker')
    w1.start_ws(doit)
    print(f'started!!')


if __name__ == '__main__':
    start()
