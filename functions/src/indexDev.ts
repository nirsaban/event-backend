import "reflect-metadata";
import { EventsApi } from "./server";

let _appInstance: EventsApi;

const port = 4000;

if (!_appInstance) {
  console.log("index- " + __filename);
  _appInstance = new EventsApi();
  _appInstance
    .start(port)
    .then((port) => console.log(`server running on port ${port}`))
    .catch((err) => console.error(err));
}
