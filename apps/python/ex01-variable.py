
import mcu_connector as mcu

from time import sleep

# print(mcu.adc_get(1))
# print(mcu.psw_get(1))
mcu.led_on(0)
print(mcu.led_get(2))

# print(mcu.adc_get(1))


# def psw_pressed(res):
#     if res[id] == 0:
#         mcu.led_inv(0)


i = 1
while i < 5000:
    i = i+1
    print(mcu.led_inv(3))
    # adc1 = mcu.adc_get(1)
    # print(f'adc1: {adc1}')
    # if adc1 < 400:
    #     mcu.beep(adc1*10, 500)
    print(f'adc1: {mcu.adc_get(1)}')
    mcu.delay_ms(1000)
