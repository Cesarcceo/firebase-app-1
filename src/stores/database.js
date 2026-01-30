import { defineStore } from "pinia";
import { db } from "../firebaseConfig";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { auth } from "../firebaseConfig";
import { nanoid } from "nanoid";

export const useDatabaseStore = defineStore('database', {
    state: () => ({
        documents: [],
        loadingDoc: false
    }),
    actions: {
        async getUrls(){
            try {
                this.loadingDoc = true
                const q = query(collection(db, 'urls'), where("user", "==", auth.currentUser.uid))
                const querySnapshot = await getDocs(q)
                querySnapshot.forEach(doc => {
                    console.log(doc.id, doc.data())
                    this.documents.push({
                        id: doc.id,
                        ...doc.data()
                    })
                })
            } catch (e) {
                console.log(e)
            } finally {
                this.loadingDoc = false
            }
        },
        async addUrl(name){
            try {
                const objectDoc = { 
                    name,
                    short: nanoid(6),
                    user: auth.currentUser.uid
                }
                const docRef = await addDoc(collection(db, "urls"), objectDoc)
                this.documents.push({
                    ...objectDoc,
                    id: docRef.id
                })
            } catch (e) {
                console.log(e)
            } finally {

            }
        }
    }
})