import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
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
        },
        async loginUser(email, password){
            try {
                const {user} = await signInWithEmailAndPassword(auth, email, password)
                this.userData = { email: user.email, password: user.password }
            } catch (e) {
                console.log(e)
            }
        }
    }
})