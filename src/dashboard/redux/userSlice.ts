import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  user: null,
  token: null,
  registerData: {
    username: '',
    email: '',
    password: '',
    divisionId: '',
    error: {message: '', type: ''},
  },
  loginData: {
    email: '',
    password: '',
    error: {message: '', type: ''},
  },
  forgotPwdData: {
    email: '',
    error: {message: ''},
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state:any, action) => {
      state[action.payload.type] = action.payload.data;
    },
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
    },
    setRegisterData: (state:any, action) => {
      const type = action.payload.type;
      if (type === 'reset') {
        state['registerData'] = {
          username: '',
          email: '',
          password: '',
          error: {message: '', type: ''},
        };
      } else {
        state['registerData'][action.payload.type] = action.payload.data;
      }
    },
    setLoginData: (state:any, action) => {
      const type = action.payload.type;

      if (type === 'reset') {
        state['loginData'] = {
          email: '',
          password: '',
          error: {message: '', type: ''},
        };
      } else {
        state['loginData'][action.payload.type] = action.payload.data;
      }
    },
    setForgotPwdData: (state:any, action) => {
      state['forgotPwdData'][action.payload.type] = action.payload.data;
    },
  },
});

export const selectUser = (state: any) => state.user;
export const selectUserData = (state: any) => state.user.user;
export const selectToken = (state: any) => state.user.token;

export const selectRegisterData = (state: any) => state.user.registerData;
export const selectLoginData = (state: any) => state.user.loginData;
export const selectForgotPwd = (state: any) => state.user.forgotPwdData;

export const {
  loginUser,
  logoutUser,
  setRegisterData,
  setLoginData,
  setForgotPwdData,
} = userSlice.actions;

export default userSlice.reducer;