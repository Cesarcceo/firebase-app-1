import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { defineStore } from "pinia";
import { auth } from "../firebaseConfig";

export const useUserStore = defineStore('userStore', {
    state: () => ({
        userData: null,
        loadingUser: false
    }),
    actions: {
        async registeruser(email, password){
            this.loadingUser = true
            try {
                const { user } = await createUserWithEmailAndPassword(auth, email, password) 
                this.userData = {email: user.email, uid: user.uid}            
            } catch (e) {
                console.log(e)
            }finally{
                this.loadingUser = false
            }
        },
        async loginUser(email, password){
            this.loadingUser = true
            try {
                const {user} = await signInWithEmailAndPassword(auth, email, password)
                this.userData = { email: user.email, password: user.password }
            } catch (e) {
                console.log(e)
            } finally{ 
                this.loadingUser = false
            }
        },
        async logoutUser(){
            this.loadingUser = true
            try {
                await signOut(auth)
                this.userData = null
            } catch (e) {
                console.log(e)
            } finally {
                this.loadingUser = true
            }
        },
        currentUser(){
            return new Promise((resolve, reject) =>{
                onAuthStateChanged(auth, user =>{
                    if(user){
                        this.userData = {email: user.email, uid: user.uid}
                    }else{
                        this.userData = null
                    }
                    resolve(user)
                }, e => reject(e))
            })
        }
    }
})