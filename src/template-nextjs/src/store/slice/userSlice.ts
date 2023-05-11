import {createSlice} from '@reduxjs/toolkit';

const initialUserState = {
    name: '',
    email: '',
    token: '',
}

const userSilce=createSlice({
    name:'user',
    initialState:{
        userInfo:initialUserState
    },
    reducers:{
        setUserInfo:(state,action)=>{
            state.userInfo=action.payload
        },
        clearUserInfo:(state)=>{
            state.userInfo=initialUserState
        }
    }
})

export const {setUserInfo,clearUserInfo}=userSilce.actions
export default userSilce.reducer