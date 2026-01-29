import { defineStore } from "pinia";

export const useUserStore = defineStore('userStore', {
    state: () => ({
        userData: 'bluuweb@test.com'
    }),
    actions: {

    }
})