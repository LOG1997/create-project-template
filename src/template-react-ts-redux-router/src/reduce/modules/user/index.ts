//counter_slice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserInfo } from "@/api/user/user";
import { IUserInfo } from "@/types/user";
// 异步函数
export const asyncGetUserinfo = createAsyncThunk(
  "userSlice/asyncGetUserinfo",
  async () => {
    const { data }: { data: IUserInfo } = await getUserInfo({});
    return data;
  }
);
const initialUserinfo: IUserInfo = {
  user_name: "",
  user_id: "",
  user_nickname: "",
  user_avatar: "",
  user_email: "",
  user_phone: "",
  user_role: "",
  user_status: false,
};
const userSlice = createSlice({
  name: "user",
  //   初始值
  initialState: {
    userInfo: initialUserinfo,
  },

  //   方法
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    resetUserinfo: (state) => {
      // 初始化userInfo
      state.userInfo = initialUserinfo;
    },
  },
  //   异步处理
  extraReducers: (builder) => {
    builder
      .addCase(asyncGetUserinfo.fulfilled, (state, action) => {
        state.userInfo = action.payload;
      })
      .addCase(asyncGetUserinfo.rejected, (state, action) => {
        Promise.reject(action);
      });
  },
});
export const { setUserInfo, resetUserinfo } = userSlice.actions; // 暴露方法
export const userInfo = (state: any) => state.user; // 暴露数据
export default userSlice.reducer; // 导出reducer传给index.js
