import * as admin from "firebase-admin";
var serviceAccount = require("./../myKey.json");
export let fireStore;
try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "events_gallery",
  });

  fireStore = admin.firestore();

  fireStore.settings({ ignoreUndefinedProperties: true });

  console.log("firebase connected successfully");
} catch (error) {
  console.log(error);
}
