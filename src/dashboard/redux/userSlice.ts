import { PayloadAction, createSlice, current } from "@reduxjs/toolkit";
import { RootState } from "./store";
interface UserState {
  user: Entities.UserEntity | null;
  token: string | null;
  registerData: {
    username: string;
    email: string;
    password: string;
  };
  loginData: {
    email: string;
    password: string;
  };
  forgotPwdData: {
    email: string;
  };
}

type actionType<T> = {
  data?: T;
  type: string;
};

type registerType = {
  username: string;
  email: string;
  password: string;
};

type loginType = {
  email: string;
  password: string;
};

type forgotPwdType = {
  email: string;
};

const initialState: UserState = {
  user: null,
  token: null,
  registerData: {
    username: "",
    email: "",
    password: "",
    // error: {message: '', type: ''},
  },
  loginData: {
    email: "",
    password: "",
    // error: {message: '', type: ''},
  },
  forgotPwdData: {
    email: "",
    // error: {message: ''},
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state[action.payload.type as keyof typeof state] = action.payload.data;
    },
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
    },
    setUserData: (
      state,
      action: PayloadAction<actionType<Entities.UserEntity>>
    ) => {
      if(action.payload.data)
      state.user = action.payload.data;
    },
    setAccessToken: (state, action: PayloadAction<actionType<string>>) => {
      if(action.payload.data)
      state.token = action.payload.data;
    },
    setRegisterData: (
      state,
      action: PayloadAction<actionType<registerType>>
    ) => {
      const type = action.payload.type;
      if (type === "reset") {
        state["registerData"] = {
          username: "",
          email: "",
          password: "",
          // error: {message: '', type: ''},
        };
      } else {
        if(action.payload.data)
        state["registerData"] = action.payload.data;
      }
    },

    setLoginData: (state:any, action) => {
      const type = action.payload.type;

      if (type === "reset") {
        state["loginData"] = {
          email: "",
          password: "",
          // error: {message: '', type: ''},
        };
      } else {
        if(action.payload.data){
          console.log(state["loginData"]['email'])
          state["loginData"][type] = action.payload.data;
        }
      }
    },
    setForgotPwdData: (
      state,
      action: PayloadAction<actionType<forgotPwdType>>
    ) => {
      if(action.payload.data)
      state["forgotPwdData"] = action.payload.data;
    },
  },
});

export const selectUser = (state: RootState) => state.user;
export const selectUserData = (state: RootState) => state.user.user;
export const selectToken = (state: RootState) => state.user.token;

export const selectRegisterData = (state: RootState) => state.user.registerData;
export const selectLoginData = (state: RootState) => state.user.loginData;
export const selectForgotPwd = (state: RootState) => state.user.forgotPwdData;

export const {
  loginUser,
  logoutUser,
  setUserData,
  setAccessToken,
  setRegisterData,
  setLoginData,
  setForgotPwdData,
} = userSlice.actions;

export default userSlice.reducer;
