import axios from "../helpers/axios";
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

export const createPage = (form) => {
    return async dispatch => {
        dispatch({ type: CREATE_PAGE_REQUEST });
        try{
            const res = await axios.post('/api/page/create', form);
            if(res.status === 201){
                dispatch({
                    type: CREATE_PAGE_SUCCESS,
                    payload: { page: res.data.page }
                });
            }else{
                dispatch({
                    type: CREATE_PAGE_FAILURE,
                    payload: { error: res.data.error }
                });
            }
        }catch(error){
            console.log(error)
        }
    }
}


export const createSlider = (name,type_of_deal) => async (dispatch) => {

    try {
      dispatch({ type: CREATE_SLIDER_REQUEST });
      const config = { headers: { "Content-Type": "application/json" } };

      const { data, status } = await axios.post("/api/productSlider", { name, type_of_deal },
            config);
      if (status == 201) {
        dispatch({
          type: CREATE_SLIDER_SUCCESS,
          payload: data.success,
  
        });
      }
    } catch (error) {
      dispatch({
        type: CREATE_SLIDER_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  export const getAllDeals = () => async (dispatch) => {

    try {
      dispatch({ type: GET_ALL_SLIDER_REQUEST });
      const config = { headers: { "Content-Type": "application/json" } };

      const { data, status } = await axios.get("/api/getDeals");
     console.log(data)
        dispatch({
          type: GET_ALL_SLIDER_SUCCESS,
          payload: data,
  
        });
      
    } catch (error) {
      dispatch({
        type: GET_ALL_SLIDER_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  