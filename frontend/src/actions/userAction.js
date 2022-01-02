import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    CLEAR_ERRORS,
} from "../constants/userConstants";
import axios from "../helpers/axios";
import { useHistory } from 'react-router-dom';
import { getAdminProducts } from "./productAction";

// Login
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };

        const res = await axios.post(
            `/api/admin/login`,
            { email, password },
            config
        );

        console.log(res.data.user)

        console.log(res.data.success)
        dispatch({ type: LOGIN_SUCCESS, payload: res.data.user, });



    } catch (error) {
        dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
    }
};

// Register
export const register = (userData) => async (dispatch) => {
    console.log(userData);
    try {
        dispatch({ type: REGISTER_USER_REQUEST });

        const config = {
            headers: { "Content-Type": "application/json" },
        };
        const { status, data } = await axios.post(`/api/admin/register`, userData, config);


        if (status == 201) {
            // console.log(user)
            dispatch(getAllUsers())

            dispatch({ type: REGISTER_USER_SUCCESS, payload: data });
        }
    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Load User
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST });

        const { data } = await axios.get(`/api/me`);
        console.log(data);

        dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
    }
};

// get All Users
export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_USERS_REQUEST });
        const { data } = await axios.get(`/api/admin/allUsers`);

        dispatch({ type: ALL_USERS_SUCCESS, payload: data.users });
    } catch (error) {
        dispatch({
            type: ALL_USERS_FAIL,
            payload: error.response.data.message
        });
    }
};

// Update Product
export const updateUser = (userData) => async (dispatch) => {
    try {
        console.log(userData)
        dispatch({ type: UPDATE_USER_REQUEST });

        const config = {
            headers: { "Content-Type": "application/json" },
        };

        const { status, data } = await axios.post(
            `/api/admin/updateUser`,
            userData,
            config
        );

        if (status == 201) {
            dispatch(getAllUsers())
            dispatch({
                type: UPDATE_USER_SUCCESS,
                payload: data.success,
            });
        }
    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};


// Logout User
export const logout = () => async (dispatch) => {

    try {
        const { success } = await axios.get(`/api/logout`);

        dispatch({ type: LOGOUT_SUCCESS });
    } catch (error) {
        dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
    }
};

export const deleteUser = (payload) => async (dispatch) => {
    { console.log(payload) }
    try {
        dispatch({ type: DELETE_USER_REQUEST });
        console.log(payload)
        const { status, data } = await axios.delete(`/api/admin/deleteUser`, {
            data: { payload },
        });

        if (status == 202) {
            dispatch(getAllUsers())
            dispatch(getAdminProducts())
            dispatch({
                type: DELETE_USER_SUCCESS,
                  payload: data.success,
            });
        }
    } catch (error) {
        dispatch({
            type: DELETE_USER_FAIL,
             payload: error.response.data.message,
        });
    }
};


// Forgot Password
export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch({ type: FORGOT_PASSWORD_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.post(`/api/password/forgot`, email, config);

        dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
    } catch (error) {
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: error.response.data.message,
        });
    }
};


// Reset Password
export const resetPassword = (token, passwords) => async (dispatch) => {
    try {
        console.log(passwords)
        dispatch({ type: RESET_PASSWORD_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.put(
            `/api/password/reset/${token}`,
            passwords,
            config
        );

        dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.success });
    } catch (error) {
        dispatch({
            type: RESET_PASSWORD_FAIL,
            payload: error.response.data.message,
        });
    }
};
