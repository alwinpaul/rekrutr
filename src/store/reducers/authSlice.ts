import { createSlice } from '@reduxjs/toolkit'
import { validateLogin, signIn, signOut } from '../thunks/authThunks';


export interface authSliceInterface {
  tokenValid: Boolean;
  name: string;
  email: string;
  role: string;
  token: string;
}


const initialState: authSliceInterface = {
  tokenValid: false,
  name: localStorage.getItem('name') || "",
  email: localStorage.getItem('email') || "",
  role: localStorage.getItem('role') || "",
  token: localStorage.getItem('_aut-tt') || "",
};

const addUserToLocalStorage = (userData: any) => {
  localStorage.setItem("_aut-tt", userData.accessToken)
  localStorage.setItem("name", userData.name)
  localStorage.setItem("role", userData.role)
  localStorage.setItem("email", userData.email)
}

const clearUserFromLocalStorage = () => {
  localStorage.removeItem("_aut-tt")
  localStorage.removeItem("name")
  localStorage.removeItem("role")
  localStorage.removeItem("email")
}


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
        addUserToLocalStorage(action.payload)
        state.tokenValid = true;
      } else {
        state.tokenValid = false;
      }
    });

    builder.addCase(signOut.fulfilled, (state, action) => {
      clearUserFromLocalStorage()
      state.tokenValid = false;
    });

  },
});
export default authSlice.reducer;
// export const {  } = authSlice.actions