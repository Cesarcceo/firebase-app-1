import { createUserWithEmailAndPassword } from "firebase/auth";
import { defineStore } from "pinia";
import { auth } from "../firebaseConfig";

export const useUserStore = defineStore('userStore', {
    state: () => ({
        userData: null
    }),
    actions: {
        async registeruser(email, password){
            try {
                const { user } = await createUserWithEmailAndPassword(auth, EmailAuthCredential, password) 
                console.log(user)               
            } catch (e) {
                console.log(e)
            }
        }
    }
})