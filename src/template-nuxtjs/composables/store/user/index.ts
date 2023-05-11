import { defineStore } from 'pinia';

const initalUserInfo = {
    name: '',
    age: 0,
}
export const useUserStore = defineStore('user', {
 
  state() {
    return {
      userInfo: initalUserInfo
    };
  },
  getters: {
    getUserInfo(state) {
      return state.userInfo;
    },
  },
  actions: {
    setuserInfo(data:any) {
      const resList = 
        data
      this.userInfo = resList;
    },
    resetUserInfo(){
        this.userInfo = initalUserInfo
    }
  },
  persist:true
});
