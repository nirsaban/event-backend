import { firestore } from "firebase-admin";
import { CollectionReference } from "firebase-admin/firestore";

export class BaseRepository<Entity> {
  public db: CollectionReference<Entity>;

  constructor(protected collectionName: string) {
    this.db = firestore().collection(collectionName).withConverter(this.converter<Entity>());
  }

  private converter<T>() {
    return {
      toFirestore: (data: T) => data,
      fromFirestore: (snap: FirebaseFirestore.QueryDocumentSnapshot) => snap.data() as T,
    };
  }
}
