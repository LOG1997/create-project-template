export const wxRequest = ({
  url,
  method = 'GET',
  data = {},
}) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${baseUrl}${url}`,
      method,
      data: {
        ...data
      },
      timeout: 5000,
    success:(res)=>{
      console.log("res:",res)
    },
    fail:(err)=>{
      console.log("err:",err)
    },
    complete: (com) => {
      // console.log("完成请求");
    }
    })
  })
}