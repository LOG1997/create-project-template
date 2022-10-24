// index.js
// const app = getApp()
Page({
  data: {
    user:''
  },

  onLoad(){
    this.setData({
      user:'暂时没有用户'
    })
  },
  getBtn(e) {
    this.setData({
      user:'log'
    })
  },

 
});
