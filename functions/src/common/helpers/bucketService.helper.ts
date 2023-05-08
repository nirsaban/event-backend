import * as admin from "firebase-admin";
import { Storage, Bucket } from "@google-cloud/storage";

export class BucketServiceHelper {
  private bucket: Bucket = admin.storage().bucket();

  async uploadFile(fileObj: any): Promise<any> {
    return await new Promise<any>(async (resolve, reject) => {
      const { originalname, buffer } = fileObj;

      const blob = this.bucket.file(`${originalname.replace(/ /g, "_")}`);

      const blobStream = blob.createWriteStream({
        resumable: false,
      });

      blobStream.on("finish", () => {
        resolve(
          `https://storage.googleapis.com/${this.bucket.name}/${blob.name}`
        );
      });

      blobStream
        .on("error", (err) => {
          console.log(err);
          reject(`Unable to upload image, something went wrong`);
        })
        .end(buffer);
    });
  }
}
