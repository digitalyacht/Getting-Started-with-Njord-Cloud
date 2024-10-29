import * as VIAM from "@viamrobotics/sdk";
import { BSON } from "bsonfy";
const ORG_ID = import.meta.env.VITE_ORG_ID;
const HOST = import.meta.env.VITE_HOST;
const API_KEY_ID = import.meta.env.VITE_API_KEY_ID;
const API_KEY_SECRET = import.meta.env.VITE_API_KEY_SECRET;

// Connect to the machine / Njordlink device api
async function mconnect(): Promise<VIAM.RobotClient> {
  const opts: VIAM.DialConf = {
    host: HOST,
    credentials: {
      type: "api-key",
      payload: API_KEY_SECRET,
      authEntity: API_KEY_ID,
    },
    signalingAddress: "https://app.viam.com:443",
    // Required for the SDK to connect to a Viam micro server
    disableSessions: true,
  };
  const machine = await VIAM.createRobotClient(opts);
  return machine;
}

// Connect to the Viam cloud API
async function cconnect(): Promise<VIAM.ViamClient> {
  const opts: VIAM.ViamClientOptions = {
    credentials: {
      type: "api-key",
      authEntity: API_KEY_ID,
      payload: API_KEY_SECRET,
    },
  };
  const client = await VIAM.createViamClient(opts);
  return client;
}

const mbutton = <HTMLButtonElement>document.getElementById("machine-button");
const cbutton = <HTMLButtonElement>document.getElementById("cloud-button");

// Read data from the machine / Njordlink device
async function mrun(client: VIAM.RobotClient) {
  try {
    mbutton.disabled = true;
    const mtextElement = <HTMLParagraphElement>document.getElementById("mtext");
    mtextElement.innerHTML = "waiting for data...";

    // nmea
    const nmeaClient = new VIAM.SensorClient(client, "nmea");
    const nmeaReturnValue = await nmeaClient.getReadings();
    console.log(nmeaReturnValue);

    mtextElement.innerHTML = JSON.stringify(nmeaReturnValue, null, 2);
  } finally {
    mbutton.disabled = false;
  }
}

// Read data from the Viam cloud
async function crun(client: VIAM.ViamClient) {
  try {
    cbutton.disabled = true;
    const ctextElement = <HTMLParagraphElement>document.getElementById("ctext");
    ctextElement.innerHTML = "waiting for data...";

    // MongoDB SQL query
    // const dataList = await client.dataClient.tabularDataBySQL(
    //   ORG_ID,
    //   "select * from readings limit 5"
    // );

    // MongoDB MQL aggregation pipeline
    const query = [
      {
        $limit: 5,
      },
    ];

    const bsonQuery = query.map((stage) => BSON.serialize(stage));
    const dataList = await client.dataClient.tabularDataByMQL(
      ORG_ID,
      bsonQuery
    );

    ctextElement.innerHTML = JSON.stringify(dataList, null, 2);
  } finally {
    cbutton.disabled = false;
  }
}

async function main() {
  let mclient: VIAM.RobotClient;
  let cclient: VIAM.ViamClient;

  try {
    mbutton.textContent = "Connecting...";
    mclient = await mconnect();
    mbutton.textContent = "Click for machine data";
  } catch (error) {
    mbutton.textContent = "Unable to connect";
    console.error(error);
    return;
  }

  mbutton.addEventListener("click", async () => {
    await mrun(mclient);
  });
  mbutton.disabled = false;

  try {
    cbutton.textContent = "Connecting...";
    cclient = await cconnect();
    cbutton.textContent = "Click for cloud data";
  } catch (error) {
    cbutton.textContent = "Unable to connect";
    console.error(error);
    return;
  }

  cbutton.addEventListener("click", async () => {
    await crun(cclient);
  });
  cbutton.disabled = false;
}

main();
