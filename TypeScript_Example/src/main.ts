import * as VIAM from "@viamrobotics/sdk";

const ORG_ID = import.meta.env.VITE_ORG_ID;
const API_KEY_ID = import.meta.env.VITE_API_KEY_ID;
const API_KEY_SECRET = import.meta.env.VITE_API_KEY_SECRET;
const HOST_ID = import.meta.env.VITE_HOST_ID;

async function connect(): Promise<VIAM.ViamClient> {
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

async function connectToLive(): Promise<VIAM.RobotClient> {
  const robot = await VIAM.createRobotClient({
    HOST_ID,
    credentials: {
      type: 'api-key',
      payload: API_KEY_SECRET,
      authEntity: API_KEY_ID,
    },
    signalingAddress: 'https://app.viam.com:443',
  });
  return robot;
}

const button = <HTMLButtonElement>document.getElementById("main-button");
const textElement = <HTMLParagraphElement>document.getElementById("text");

// this code gets historical data from the VIAM cloud
async function run(client: VIAM.ViamClient) {

  button.disabled = true;
  textElement.innerHTML = "waiting for data...";

  try {
    // MQL Query
    const query = [{ $limit: 2 }];
    const dataList = await client.dataClient.tabularDataByMQL(ORG_ID, query);

    // SQL Query (uncomment to use)
    /*
    const dataList = await client.dataClient.tabularDataBySQL(
      ORG_ID,
      "select * from readings limit 2"
    );
    */

    // Display the data
    textElement.innerHTML = JSON.stringify(dataList, null, 2);
  } catch (e){
    console.error(e);
    textElement.innerHTML = "there was an error.";
  } finally {
    button.disabled = false;
  }
}

// this code gets live data from the VIAM cloud
async function getLiveData(robotClient: VIAM.RobotClient) { // note that this requires a RobotClient and not a ViamClient

  button.disabled = true;
  textElement.innerHTML = "waiting for data...";

  try {
    const allPgnClient = new VIAM.SensorClient(robotClient, 'all-pgn');
    const allPgnValues = await allPgnClient.getReadings();
    textElement.innerHTML = JSON.stringify(allPgnValues, null, 2);
    button.disabled = false;
  } catch (e) {
    console.error(e);
    textElement.innerHTML = "there was an error.";
  } finally {
    button.disabled = false;
  }
}

async function main() {
  let client: VIAM.ViamClient;
  // let machine: VIAM.RobotClient;
  try {
    button.textContent = "Connecting...";
    client = await connect();
    // machine = await connectToLive();
    button.textContent = "Click for data";
  } catch (error) {
    button.textContent = "Unable to connect";
    console.error(error);
    return;
  }

  // Make the button execute the code
  button.addEventListener("click", async () => {
    await run(client);
    // await getLiveData(machine);
  });
  button.disabled = false;
}

main();
