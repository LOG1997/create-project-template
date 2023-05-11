// index.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import user from './modules/user';
import setting from './modules/setting';


export const rootReducer = combineReducers({
  user: user,
  setting: setting
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: []
};


const myPersistReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: myPersistReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false,
  }),
});

export const persistor = persistStore(store);
