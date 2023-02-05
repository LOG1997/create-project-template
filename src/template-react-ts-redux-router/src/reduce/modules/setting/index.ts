//counter_slice.ts
import { createSlice } from "@reduxjs/toolkit";

const initialFullScreen = false;
const settingSlice = createSlice({
  name: "setting",
  //   初始值
  initialState: {
    setting: {
      fullscreen: initialFullScreen,
    },
  },

  //   方法
  reducers: {
    setFullscreen: (state, action) => {
      state.setting.fullscreen = action.payload;
    },
    resetFullscreen: (state) => {
      // 初始化userInfo
      state.setting.fullscreen = initialFullScreen;
    },
  },
});
export const { setFullscreen, resetFullscreen } = settingSlice.actions; // 暴露方法
export const fullscreen = (state: any) => state.setting.fullscreen; // 暴露数据
export default settingSlice.reducer; // 导出reducer传给index.js
