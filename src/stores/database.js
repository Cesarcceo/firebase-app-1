import { defineStore } from "pinia";
import { db } from "../firebaseConfig";
import { collection, getDocs, query } from "firebase/firestore";

export const useDatabaseStore = defineStore('database', {
    state: () => ({
        documents: []
    }),
    actions: {
        async getUrls(){
            try {
                const q = query(collection(db, 'urls'))
                const querySnapshot = await getDocs(q)
                querySnapshot.forEach(doc => {
                    console.log(doc.id, doc.data())
                })
            } catch (e) {
                console.log(e)
            } finally {

            }
        }
    }
})