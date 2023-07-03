import { createAsyncThunk } from "@reduxjs/toolkit";
import apiUrls from "../../common/apiUrls";
import { post, get } from "./../../utils/apiUtils";
import { AxiosError } from "axios";
import { signInInterface } from "../../common/interfaces/authInterfaces";


export const validateLogin = createAsyncThunk(
    "auth/validateLogin",
    async (email: string, thunkAPI) => {
        const requestData = {
            email: email
        }
        try {
            await post(apiUrls.VALIDATE_LOGIN, requestData);
            return true;
        } catch (error) {
            return false;
        }

    }
);

export const signIn = createAsyncThunk(
    "auth/signIn",
    async (signInData: signInInterface, thunkAPI) => {
        const requestData = {
            email: signInData.email,
            password: signInData.password
        }
        try {
            let response = await post(apiUrls.LOGIN, requestData);
            return response.data;
        } catch (error: any) {
            return error.response;
        }

    }
);