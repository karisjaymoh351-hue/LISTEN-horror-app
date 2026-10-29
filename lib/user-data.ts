import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "./firebase";
export async function isFavorite(uid:string,id:string){if(!db)return false;return (await getDoc(doc(db,"users",uid,"favorites",id))).exists();}
export async function addFavorite(uid:string,id:string){if(!db)throw new Error("Firebase is not configured");await setDoc(doc(db,"users",uid,"favorites",id),{storyId:id,createdAt:Date.now()});}
export async function removeFavorite(uid:string,id:string){if(!db)throw new Error("Firebase is not configured");await deleteDoc(doc(db,"users",uid,"favorites",id));}
export async function getFavoriteIds(uid:string){if(!db)return [];const snap=await getDocs(collection(db,"users",uid,"favorites"));return snap.docs.map(d=>d.id);}
