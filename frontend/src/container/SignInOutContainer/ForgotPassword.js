import React,{useState,Fragment,useEffect} from 'react';
import './profile.css';
import bird from '../../assets/img/bird.png';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../../actions/userAction';
import Loader from '../Loader/Loader';
import { useAlert } from "react-alert";

const initialValue = {
  email:''
}

const ForgotPassword = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const [userEmail, setUserEmail] = useState(initialValue);
  var { loading,message, success, error } = useSelector((state) => state.forgot);

  useEffect(() => {
    if (error) {
        alert.error(error);
        // dispatch(clearErrors());
    }

    if (message) {
      alert.success(message);
    }

    // if (success) {
    //     alert.success("Product Updated Successfully");

    //       dispatch({ type: NEW_PRODUCT_RESET });
    // }
}, [dispatch, alert, error,message, success]);

  const onValueChange = (e) => {
    console.log(e.target.value);
    setUserEmail({ ...userEmail, [e.target.name]: e.target.value })
}

const handleAddUserAddress = async () => {
  dispatch(forgotPassword(userEmail));

}

  return (
    <>
      <div class="mainDiv">
        <div class="cardStyle">
         

            <img src={bird} id="signupLogo" />

            <h2 class="formTitle">
              Forgot Password
            </h2>
            {loading ? (
                    <Loader />
                ) : (
                    <Fragment>
            <div class="inputDiv">
              <label class="inputLabel" for="email">Enter Email</label>
              <input
               // value={email}
                onChange={(e) => onValueChange(e)} type="email" name='email' id="email" required />
            </div>

            <div class="buttonWrapper">
              <button type="submit" id="submitButton" onClick={() => handleAddUserAddress()} class="submitButton pure-button pure-button-primary">
                Send Email
                {/* <span>Continue</span>
                <span id="loader"></span> */}
              </button>
            </div>
            </Fragment>
                )}
         
        </div>
      </div>
    </>
  )
}


export default ForgotPassword