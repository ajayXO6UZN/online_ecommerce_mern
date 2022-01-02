import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  newCategoryReducer
} from "./reducers/categoryReducer";
import {
  productsReducer,
  productReducer,

} from "./reducers/productReducer";

import {
  userReducer,
  allUsersReducer,
  profileReducer,
  addUserReducer,
  forgotPasswordReducer
} from "./reducers/userReducer";

import {
  allOrdersReducer,
  myOrdersReducer,
  newOrderReducer,
  orderDetailsReducer,
  orderReducer,
} from "./reducers/orderReducer";

import {
  pageReducer
} from "./reducers/pageReducer";



const reducer = combineReducers({
  allCategoryList: newCategoryReducer,
  products: productsReducer,
  product: productReducer,
  user: userReducer,
  allUsers: allUsersReducer,
  profile: profileReducer,
  allOrders: allOrdersReducer,
  order: orderReducer,
  page: pageReducer,
  addUser: addUserReducer,
  forgot: forgotPasswordReducer
});

const middleware = [thunk];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
