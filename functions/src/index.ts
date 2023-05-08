const functions = require("firebase-functions");
import { RuntimeOptions } from "firebase-functions/v1";
import { EventsApi } from "./server";

let _appInstance;
if (!_appInstance) {
  console.log("index- " + __filename);
  _appInstance = new EventsApi();
}

const runtimeOpts: RuntimeOptions = {
  timeoutSeconds: 45,
  memory: "512MB",
};

exports.api = functions
  .region("europe-west3")
  .runWith(runtimeOpts)
  .https.onRequest(_appInstance.export());
