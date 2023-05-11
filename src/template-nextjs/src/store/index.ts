import { configureStore,combineReducers } from '@reduxjs/toolkit';
import {persistStore,persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userSlice from './slice/userSlice'; 

export const rootReducer=combineReducers({
    user:userSlice
})

const persistConfig={
    key:'root',
    storage,
    blacklist:[]
}

const myPersistReducer=persistReducer(persistConfig,rootReducer)

export const store=configureStore({
    reducer:myPersistReducer,
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
        serializableCheck:false
    })
})


export const persistor=persistStore(store)