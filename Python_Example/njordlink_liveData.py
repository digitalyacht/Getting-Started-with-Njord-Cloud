import asyncio

from viam.robot.client import RobotClient
from viam.components.sensor import Sensor
from viam.components.gripper import Gripper
from viam.components.movement_sensor import MovementSensor
from viam.components.generic import Generic as GenericComponent
from viam.components.board import Board
from viam.services.generic import Generic as GenericService

from dotenv import load_dotenv
import os

# check if .env file exists and load it
if not os.path.exists(".env"):
    raise Exception("No .env file found")
load_dotenv()

# connect using .env file
async def connect():
    opts = RobotClient.Options.with_api_key(
        api_key=os.getenv("API_KEY_SECRET"),
        api_key_id=os.getenv("API_KEY_ID"),
    )
    return await RobotClient.at_address(os.getenv("MACHINE_ADDRESS"), opts)

# main loop
async def main():
    # we wait to connect to the machine before getting data
    async with await connect() as machine:

        # displays a list of sensors that a dev can use
        print('Resources:\n')
        print(machine.resource_names)
        
        # get all-pgn data
        all_pgn = Sensor.from_robot(machine, "all-pgn")
        all_pgn_return_value = await all_pgn.get_readings()
        print(f"\n\nall-pgn get_readings return value:\n{all_pgn_return_value}")

        # close the connection, this needs an await, in other cases it does not.
        await machine.close()


if __name__ == '__main__':
    asyncio.run(main())
