import './App.css';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Layout from './components/Layout/Layout';
import Test from './container/Test/Test';
import { getAllCategory } from './actions/categoryAction';
import { useDispatch, useSelector } from 'react-redux';
import Product from './container/Product/Product';
import Users from './container/Users/Users';
import { getAllProduct } from './actions/productAction';
import SignInOutContainer from './container/SignInOutContainer/SignInOutContainer';
import { getAllUsers, loadUser } from './actions/userAction';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Orders from './container/Orders/Orders';
import { getAllOrders } from './actions/orderAction';
import Page from './container/Page/Page';
import axios from './helpers/axios';
import Dashboard from './container/Dashboard/Dashboard';
import Loader from './container/Loader/Loader';
import Profile from './container/Profile/Profile';
import ForgotPassword from './container/SignInOutContainer/ForgotPassword';
import ResetPassword from './container/SignInOutContainer/ResetPassword';
import { getAllDeals } from './actions/page.action';


const useStyles = makeStyles((theme) => ({

}));

const App = () => {
  const dispatch = useDispatch();
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  const classes = useStyles();

  useEffect(() => {
    console.log('classssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss')
    dispatch(getAllProduct());
    dispatch(getAllCategory());
    dispatch(getAllUsers());
    dispatch(loadUser());
    dispatch(getAllOrders());
    dispatch(getAllDeals());
  }, []);

  console.log('apppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp')



  return (
    <Router>

      <Switch>

        <Route path="/login" component={SignInOutContainer} />
        <Route exact path="/password/reset/:token" component={ResetPassword} />
        <Route path="/forgot" component={ForgotPassword} />
        {/* <Route path="/loader" component={Loader} /> */}
        <ProtectedRoute path="/layout" component={Layout} />
        <ProtectedRoute path="/test" component={Test} />
        <ProtectedRoute path="/product" component={Product} />


        <ProtectedRoute path="/orders" component={Orders} />
        <ProtectedRoute path="/page" component={Page} />
        <ProtectedRoute exact path="/" component={Dashboard} />
        <ProtectedRoute path="/profile" component={Profile} />
        {user && user.role == 'admin' &&
          <ProtectedRoute path="/user" component={Users} />
        }



      </Switch>

    </Router>


  );
}

export default App;
