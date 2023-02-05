// index.ts
import { configureStore } from "@reduxjs/toolkit";
import user from "./modules/user";
import setting from "./modules/setting";

const store = configureStore({
  reducer: { user: user, setting: setting },
});
export default store;
