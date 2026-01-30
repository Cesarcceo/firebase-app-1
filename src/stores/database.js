import { defineStore } from "pinia";
import { db } from "../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth } from "../firebaseConfig";

export const useDatabaseStore = defineStore('database', {
    state: () => ({
        documents: []
    }),
    actions: {
        async getUrls(){
            try {
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

            }
        }
    }
})