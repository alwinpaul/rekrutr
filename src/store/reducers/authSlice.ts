import { createSlice } from '@reduxjs/toolkit'
import { validateLogin, signIn } from '../thunks/authThunks';


export interface authSliceInterface {
  tokenValid: Boolean;
  name: string;
  email: string;
  role: string;
  token: string;
}


const initialState: authSliceInterface = {
  tokenValid: false,
  name: "",
  email: localStorage.getItem('email') || "",
  role: "",
  token: localStorage.getItem('auth_token') || "",
};


export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(validateLogin.fulfilled, (state, action) => {
      state.tokenValid = action.payload;
    });

    builder.addCase(signIn.fulfilled, (state, action) => {
      if (action.payload.accessToken) {
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.role = action.payload.role;
        state.token = action.payload.accessToken;
        state.tokenValid = true;
        localStorage.setItem("auth_token", action.payload.accessToken)
        localStorage.setItem("email", action.payload.email)
      } else {
        state.tokenValid = false;
      }
    });

  },
});
export default authSlice.reducer;
// export const {  } = authSlice.actions