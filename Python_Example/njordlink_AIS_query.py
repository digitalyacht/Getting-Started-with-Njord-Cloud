# querying for AIS requires use of Sensor 

import os

import asyncio

from viam.robot.client import RobotClient
from viam.components.sensor import Sensor

async def connect():
    opts = RobotClient.Options.with_api_key( 
        api_key=os.getenv("API_KEY_ID"),
        api_key_id=os.getenv("API_KEY_SECRET")
    )
    return await RobotClient.at_address(os.getenv("ROBOT_ADDRESS"), opts)

async def main():
    print("connecting to VIAM...")
    machine = await connect()
    print("connected to VIAM!\n")

    # output resources available
    print('Resources:')
    print(machine.resource_names)
    print('')

    # get what the sensors are currently recording and output it
    all_pgn = Sensor.from_robot(machine, "all-pgn")
    all_pgn_return_value = await all_pgn.get_readings()
    print(f"all-pgn get_readings return value:\n{all_pgn_return_value}")
    
    # for loop that will query active data 30 times
    AIS_detected = {}
    for x in range(30):
        print("")
        current_connected_ais = []
        duplicate_data = []
        all_pgn_return_value = await all_pgn.get_readings()

        # for each PGN entry that the sensor client has given us
        for key in all_pgn_return_value.keys():

            # checking for specific PGNs
            if "129038" in key or "129039" in key: # AIS PGN
                vessel_id = all_pgn_return_value[key]["User ID"]

                # if "Time Stamp" has not changed, add entry to duplicate data for dev output
                if vessel_id in AIS_detected.keys() and AIS_detected[vessel_id]["Time Stamp"] == all_pgn_return_value[key]["Time Stamp"]:
                    duplicate_data.append(vessel_id)
                # set all data even if "Time Stamp" hasn't changed
                AIS_detected[vessel_id] = all_pgn_return_value[key] # note: AIS_detected could become too large if left to populate for too long
                # save how much work this iteration has done
                current_connected_ais.append(vessel_id)
        
        # provide iterative output
        print(f"Sensor Query iteration {x} connected to {current_connected_ais}")
        if len(duplicate_data): print(f"Sensor Query iteration {x} had duplicate data for {duplicate_data}")
    
    # final analysis output
    print(f"{len(AIS_detected)} unique vessels found.")
    print(AIS_detected.keys())
    
    # close & open connections as little as possible to reduce connection overhead
    print("Closing connection...")
    await machine.close()

if __name__ == '__main__':
    asyncio.run(main())