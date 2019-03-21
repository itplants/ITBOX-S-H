#!/usr/bin/env python3
""" Example for using the SGP30 with CircuitPython and the Adafruit library"""

import time
import datetime
import board
import busio
import adafruit_sgp30
#import thingspeak

fd = open('/home/pi/src/SGP30/sgp30log.txt', 'a')

channel_id = 555441 
write_key = 'P8QI4NB25SPR5PTM' # PUT YOUR WRITE KEY HERE

THINGSPEAK = 'P8QI4NB25SPR5PTM'

i2c = busio.I2C(board.SCL, board.SDA, frequency=100000)

# Create library object on our I2C port
sgp30 = adafruit_sgp30.Adafruit_SGP30(i2c)

print("SGP30 serial #", [hex(i) for i in sgp30.serial])

sgp30.iaq_init()
sgp30.set_iaq_baseline(0x8973, 0x8aae)

elapsed_sec = 0
#channel = thingspeak.Channel(id=channel_id,write_key=write_key)

while True:
    dt = datetime.datetime.now()
    dt = "{0:%Y-%m-%d %H:%M:%S}".format(dt)
    linedata = dt+",co2eq,%d,tvoc,%d" % (sgp30.co2eq, sgp30.tvoc)+'\n'
    fd.write(linedata)
    fd.flush()
    print(dt+" co2eq = %d ppm tvoc = %d ppb" % (sgp30.co2eq, sgp30.tvoc))

    '''
    try:
        sponse = channel.update({1:sgp30.co2eq, 2:sgp30.tvoc})
    except:
        print( "connection failed")
        continue
    '''

    time.sleep(1)
    elapsed_sec += 1
    if elapsed_sec > 10:
        elapsed_sec = 0
        print("**** Baseline values: co2eq = 0x%x, tvoc = 0x%x"
              % (sgp30.baseline_co2eq, sgp30.baseline_tvoc))
