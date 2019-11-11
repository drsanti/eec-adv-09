# mcu_connector.py
# MCU functions used WebSockets
#
# Asst.Prof.Dr.Santi Nuratch
# Embedded Computing and Control Laboratory
# 11 November 2019

# Required:
#   - pip install websockets

import config
import asyncio
import websockets
import json
from time import sleep

# Sends and Receives data over WebSockets
# Connecting -> Sending -> Receiving -> Closing


async def mcu_socket(cmd):

    # Debugging flag
    db_cmd = False
    db_rvc = False

    # Websock Server
    uri = config.WSS_HOST + ":" + str(config.WSS_PORT)
    async with websockets.connect(uri) as websocket:
        await websocket.send(cmd)
        if db_cmd:
            print(f"> {cmd}")
        res = await websocket.recv()
        if db_rvc:
            print(f"< {res}")
        return res


def delay_ms(ms=100):
    sleep(ms/1000)
    return


# Sends command and wait till response data is returned
# This function convets MCU data to JSON data and returns to the caller
def send(cmd):
    return json.loads(asyncio.get_event_loop().run_until_complete(mcu_socket(f'{cmd}')))


def beep(freq=3500, period=100):
    return send(f'beep:{freq}:{period}')


def led_on(id):
    return send(f'led:{id}:on')


def led_off(id):
    return send(f'led:{id}:on')


def led_inv(id):
    return send(f'led:{id}:inv')


def adc_get(id):
    return send(f'adc:{id}:?')


def psw_get(id):
    return send(f'psw:{id}:?')  # send to websocket server


def led_get(id):
    # print(f'led_get{id}')
    return send(f'led:{id}:?')
