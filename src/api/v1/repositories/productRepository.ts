import { db } from "../../../config/firebaseConfig";
import type { DocumentSnapshot } from "firebase-admin/firestore";

// CREATE
export async function createDocument<T>(
  collectionName: string,
  data: T
): Promise<T & { id: string }> {
  const docRef = await db
    .collection(collectionName)
    .add(data as Record<string, any>);

  return { ...data, id: docRef.id };
}

// GET ALL
export async function getAllDocuments<T>(
  collectionName: string
): Promise<(T & { id: string })[]> {
  const snapshot = await db.collection(collectionName).get();

  return snapshot.docs.map((doc: DocumentSnapshot) => ({
    id: doc.id,
    ...(doc.data() as T)
  }));
}

// GET BY ID
export async function getDocumentById<T>(
  collectionName: string,
  id: string
): Promise<(T & { id: string }) | null> {
  const doc = await db.collection(collectionName).doc(id).get();

  if (!doc.exists) return null;

  return {
    id: doc.id,
    ...(doc.data() as T)
  };
}

// UPDATE
export async function updateDocument<T>(
  collectionName: string,
  id: string,
  data: Partial<T>
): Promise<T & { id: string }> {
  await db
    .collection(collectionName)
    .doc(id)
    .update(data as Record<string, any>);

  const updated = await db.collection(collectionName).doc(id).get();

  return {
    id: updated.id,
    ...(updated.data() as T)
  };
}


// DELETE
export async function deleteDocument(
  collectionName: string,
  id: string
): Promise<void> {
  await db.collection(collectionName).doc(id).delete();
}