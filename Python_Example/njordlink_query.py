import asyncio
from pprint import pprint

from viam.rpc.dial import DialOptions, Credentials
from viam.app.viam_client import ViamClient

from dotenv import load_dotenv
import os


# Check if .env file exists and load it
if not os.path.exists(".env"):
    raise Exception("No .env file found")
load_dotenv()


# Connect to the Viam API
async def connect() -> ViamClient:
    dial_options = DialOptions(
        credentials=Credentials(
            type="api-key",
            payload=os.getenv("API_KEY_SECRET"),
        ),
        auth_entity=os.getenv("API_KEY_ID"),
    )
    return await ViamClient.create_from_dial_options(dial_options)


# Main function
async def main():
    viam_client = await connect()
    data_client = viam_client.data_client

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

    viam_client.close()


if __name__ == "__main__":
    asyncio.run(main())
