import asyncio

# using pymongo package (pip install pymongo)
import bson
from viam.rpc.dial import DialOptions, Credentials
from viam.app.viam_client import ViamClient


async def connect() -> ViamClient:
    dial_options = DialOptions(
        credentials=Credentials(
            type="api-key",
            payload="<API-KEY>",  # Replace with your machine's API key
        ),
        auth_entity="<API-KEY-ID>",  # Replace with your machine's API key ID
    )
    return await ViamClient.create_from_dial_options(dial_options)


async def main():
    viam_client = await connect()
    data_client = viam_client.data_client

    my_data = await data_client.tabular_data_by_mql(
        organization_id="<ORGANISATION-KEY-ID>",    # Replace with your Organisation key ID here and in the match line below
        mql_binary=[
            bson.encode(
                {"$match": {"organization_id": "<ORGANISATION-KEY-ID>"}}
            ),
            bson.encode({"$limit": 5}),
        ],
    )

    print(my_data)

    viam_client.close()


if __name__ == "__main__":
    asyncio.run(main())
