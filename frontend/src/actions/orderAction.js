import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    MY_ORDERS_FAIL,
    ALL_ORDERS_REQUEST,
    ALL_ORDERS_SUCCESS,
    ALL_ORDERS_FAIL,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_FAIL,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    CLEAR_ERRORS,
  } from "../constants/orderConstants";
  
  import axios from "../helpers/axios";

// Get All Orders (admin)
export const getAllOrders = () => async (dispatch) => {
    try {
      dispatch({ type: ALL_ORDERS_REQUEST });
  
      const { data } = await axios.get("/api/admin/orders");
  
      dispatch({ type: ALL_ORDERS_SUCCESS, payload: data.orders });
    } catch (error) {
      dispatch({
        type: ALL_ORDERS_FAIL,
        payload: error.response.data.message,
      });
    }
};

// // Update Order
// export const updateOrder = (update_Order) => async (dispatch) => {
//   try {
//     dispatch({ type: UPDATE_ORDER_REQUEST });
//     console.log('upppppppppppppppppppppppppppppppppppppp')
  
//     const { data } = await axios.post(
//       `/api/admin/order/update`,
//       update_Order,
      
//     );

//     dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data.success });
//   } catch (error) {
//     dispatch({
//       type: UPDATE_ORDER_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };

// Update Product
export const updateOrder = (update_Order) => async (dispatch) => {
  try {
      console.log(update_Order)
      dispatch({ type: UPDATE_ORDER_REQUEST });

      const config = {
          headers: { "Content-Type": "application/json" },
      };

      const { data } = await axios.post(
          `/api/admin/order/update`,
          update_Order,
          config
      );

      dispatch({
          type: UPDATE_ORDER_SUCCESS,
          payload: data.success,
      });
  } catch (error) {
      dispatch({
          type: UPDATE_ORDER_FAIL,
          payload: error.response.data.message,
      });
  }
};
