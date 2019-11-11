

#
# pip install websocket_client
#

# import websocket
# try:
#     import thread
# except ImportError:
#     import _thread as thread
# import time
# import json


# # on message
# def on_message(ws, message):
#     data = json.loads(message)
#     print(data)
#     if data['tag'] == 'psw' and data['val'] == 'pressed':
#         ws.__callback(data)


# # on error
# def on_error(ws, error):
#     print(error)


# # on closse
# def on_close(ws):
#     print("### closed ###")


# # on open
# def on_open(ws):
#     # def run(*args):
#     for i in range(4):
#         ws.send(f'psw:{i}:subscribe')
#     # while True:
#     #     time.sleep(1)
#     #     ws.send("beep:1000:10")
#     #     time.sleep(1)
#     # ws.close()
#     print("thread terminating...")
#     # thread.start_new_thread(run, ())


# # start the loop
# def start_monitor(callback):
#     # websocket.enableTrace(True)
#     ws = websocket.WebSocketApp("ws://localhost:3998",
#                                 on_message=on_message,
#                                 on_error=on_error,
#                                 on_close=on_close)
#     ws.on_open = on_open

#     # assign a callback to ws object
#     ws.__callback = callback
#     # ws.run_forever()


# # def cbk(res):
# #     print(f'res:{res}')
# #
# # start_monitor(cbk)


# class WorkerA(Thread):

#     def __init__(self):
#         Thread.__init__(self)
#         self.run = True
#         self.cnt = 0

#     def strat(self):
#         while self.run:
#             self.cnt += 1
#             print(f'A-running: {self.cnt}')
#             sleep(500/1000)

#     def stop(self):
#         self.run = False

#     def check(self):
#         print(f'A-counter: {self.cnt}')


# class WorkerB(Thread):

#     def __init__(self):
#         Thread.__init__(self)
#         self.run = True
#         self.cnt = 0

#     def strat(self):
#         while self.run:
#             self.cnt += 1
#             print(f'B-running: {self.cnt}')
#             sleep(500/1000)

#     def stop(self):
#         self.run = False

#     def check(self):
#         print(f'B-counter: {self.cnt}')


# def loop2():
#     cnt = 0
#     while True:
#         cnt += 1
#         print(f'2-running: {cnt}')
#         sleep(200/1000)


# if __name__ == '__main__':
#     proc1 = Process(target=loop1)
#     proc1.start()

#     proc2 = Process(target=loop2)
#     proc2.start()


import worker


worker.start()

print('---------Hello------------')
