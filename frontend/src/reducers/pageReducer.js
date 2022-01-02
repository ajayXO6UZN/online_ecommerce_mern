import {
    CREATE_PAGE_REQUEST,
    CREATE_PAGE_SUCCESS,
    CREATE_PAGE_FAILURE,
    CREATE_SLIDER_REQUEST,
    CREATE_SLIDER_SUCCESS,
    CREATE_SLIDER_FAIL,
    GET_ALL_SLIDER_REQUEST,
    GET_ALL_SLIDER_SUCCESS,
    GET_ALL_SLIDER_FAIL
} from "../constants/pageConstants";

const initState = {

    loading: false,
    page: {},
    deals: []
}

export const pageReducer = (state = initState, action) => {
    switch (action.type) {
        case GET_ALL_SLIDER_REQUEST:
        case CREATE_PAGE_REQUEST:
        case CREATE_SLIDER_REQUEST:
            state = {
                ...state,
                loading: true,
                success: null
            }
            break;
        case CREATE_PAGE_SUCCESS:
        case CREATE_SLIDER_SUCCESS:
            state = {
                ...state,
                loading: false,
                success: action.payload
            }
            break;
        case GET_ALL_SLIDER_SUCCESS:
            state = {
                ...state,
                loading: false,
                deals: action.payload,
                error:null
            }
        case CREATE_PAGE_FAILURE:
        case CREATE_SLIDER_FAIL:

        case GET_ALL_SLIDER_FAIL:
            state = {
                ...state,
                loading: false,
               //error: action.payload,
               
            }
            break;
    }

    return state;
}