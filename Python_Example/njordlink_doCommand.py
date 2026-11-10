import asyncio
from pprint import pprint

from viam.rpc.dial import DialOptions, Credentials
from viam.app.viam_client import ViamClient

from dotenv import load_dotenv
import os

from viam.components.generic import Generic
from viam.robot.client import RobotClient


# Check if .env file exists and load it
if not os.path.exists(".env"):
    raise Exception("No .env file found")
load_dotenv()


# Connect to the Viam API
async def connect() -> ViamClient:
    print("connecting to client...")
    dial_options = DialOptions(
        credentials=Credentials(
            type="api-key",
            payload=os.getenv("API_KEY_SECRET"),
        ),
        auth_entity=os.getenv("API_KEY_ID"),
    )
    response = await ViamClient.create_from_dial_options(dial_options)
    print("connected to client!")
    return response

async def connectToRobot(api_key, api_key_id, robot_address):
    print("connecting to robot...")
    opts = RobotClient.Options.with_api_key( 
        api_key=api_key,
        api_key_id=api_key_id
    )
    response = await RobotClient.at_address(robot_address, opts) # entry here probably ends with `.viam.cloud`
    print("connected to robot!")
    return response


# Main function
async def main():
    # setup

    # viam_client = await connect()
    # data_client = viam_client.data_client

    robot_client = await connectToRobot( "<api_key>" , "<api_key_id>" , "<robot_address>" )

    try:
        # function exe
        # await query_data(data_client)
        await handle_switch_call(robot_client)
    except Exception as e:
        print("ERROR: function execution failed, if you don't an error output then uncomment pprint(e)")
        # pprint(e)

    # close client
    viam_client.close()

async def query_data(data_client):
    # MongoDB "MQL" query
    my_data = await data_client.tabular_data_by_mql(
        organization_id=os.getenv("ORG_ID"),
        # Modify the MQL query here:
        query=[{"$limit": 2}],
    )
    print("MQL query:")
    pprint(my_data)

    # SQL query
    my_data = await data_client.tabular_data_by_sql(
        organization_id=os.getenv("ORG_ID"),
        # Modify the SQL query here:
        sql_query="SELECT * FROM readings LIMIT 2",
    )
    print("\nSQL query:")
    pprint(my_data)

async def handle_switch_call(robot_client):
    generic_component = Generic.from_robot(robot=robot_client, name="send-Switch") # send-Switch may be different on your end
    command = {"cmd": "test", "data1": 500}

    switch_command = {
        "pgn": 127502,
        "src": 240,
        "fields" : {
            "Instance": 1,
            "Switch1": "On",
            "Switch2": "On",
            "Switch3": "On",
        }
    }

    result = await generic_component.do_command(switch_command)
    print("\nresult:")
    pprint(result)


if __name__ == "__main__":
    asyncio.run(main())
