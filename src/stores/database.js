import { defineStore } from "pinia";
import { db } from "../firebaseConfig";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, where } from "firebase/firestore";
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
        },
        async reedUrl(id){
            try {
                const docRef = doc(db, 'urls', id)
                const docSnap = await getDoc(docRef)

                if(!docSnap.exists()){
                    throw new Error("don't exists this document")
                }
                if(docSnap.data().user !== auth.currentUser.uid){
                    throw new Error("you hasn't this document")
                }

                return docSnap.data().name
            } catch (e) {
                console.log(e)
            }
        },
        async removUrl(id){
            try {
                const docRef = doc(db, 'urls', id)
                const docSnap = await getDoc(docRef)
                if(!docSnap.exists()){
                    throw new Error("don't exists this document")
                }
                if(docSnap.data().user !== auth.currentUser.uid){
                    throw new Error("this document doesn't you")
                }
                await deleteDoc(docRef)
                this.documents = this.documents.filter(item => item.id !== id)
            } catch (e) {
                console.log(e)
            } finally {

            }
        }
    }
})