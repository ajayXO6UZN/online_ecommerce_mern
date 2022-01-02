import React, { useState ,Fragment,useEffect} from 'react';
import './profile.css';
import bird from '../../assets/img/bird.png';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../actions/userAction';
import Loader from '../Loader/Loader';
import { useAlert } from "react-alert";

const initialValue = {
  password: '',
  confirmPassword: ''
}

const ResetPassword = ({ history, match }) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  var { loading, success, error } = useSelector((state) => state.forgot);

  const [user, setUser] = useState(initialValue);
  useEffect(() => {
    if (error) {
      alert.error(error);
     // dispatch(clearErrors());
    }

    if (success) {
      alert.success("Password Updated Successfully");

      history.push("/login");
    }
  }, [dispatch, error, alert, history, success]);

  const onValueChange = (e) => {
    console.log(e.target.value);
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleAddUserAddress = async () => {
    dispatch(resetPassword(match.params.token, user));
  }

  return (
    <>
      <div class="mainDiv">
        <div class="cardStyle">

          <img src={bird} id="signupLogo" />

          <h2 class="formTitle">
            Reset Password
          </h2>
          {loading ? (
                    <Loader />
                ) : (
                    <Fragment>
          <div class="inputDiv">
            <label class="inputLabel" for="password">New Password</label>
            <input type="password" onChange={(e) => onValueChange(e)} id="password" name="password" required />
          </div>

          <div class="inputDiv">
            <label class="inputLabel" for="confirmPassword">Confirm Password</label>
            <input type="password" onChange={(e) => onValueChange(e)} id="confirmPassword" name="confirmPassword" />
          </div>

          <div class="buttonWrapper">
            <button type="submit" id="submitButton" onClick={() => handleAddUserAddress()} class="submitButton pure-button pure-button-primary">
              Reset Password
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


export default ResetPassword