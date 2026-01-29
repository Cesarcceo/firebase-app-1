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
                const { user } = await createUserWithEmailAndPassword(auth, email, password) 
                this.userData = {email: user.email, uid: user.uid}            
            } catch (e) {
                console.log(e)
            }
        }
    }
})