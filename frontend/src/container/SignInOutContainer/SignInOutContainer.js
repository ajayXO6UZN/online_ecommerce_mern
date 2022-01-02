import React, { useState, useEffect } from 'react'
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Login from '../../components/UI/Login/Login'
import Signup from '../../components/UI/Signup/Signup'
import PropTypes from 'prop-types';
import { login, register } from '../../actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from "react-alert";
import { useHistory } from 'react-router-dom';

function TabPanel(props) {

    const history = useHistory();
    const dispatch = useDispatch();


    const { error, loading, isAuthenticated } = useSelector(
        (state) => state.user
    );

    useEffect(() => {
        // if (error) {
        //  alert.error(error);
        // // dispatch(clearErrors());
        // }

        if (isAuthenticated) {
            history.push('/');
        }
    }, [dispatch, error, alert, history, isAuthenticated]);


    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


const SignInOutContainer = (props) => {
    const alert = useAlert();

    const dispatch = useDispatch();

    const {error} = useSelector((state) => state.user);
    // const loginError = useSelector((state) => state.login.error);

    const [value, setValue] = useState(0);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('');
    const [phone, setPhone] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmError, setConfirmError] = useState('');

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    useEffect(() => {
        if (error) {
            alert.error(error);
            // dispatch(clearErrors());
        }

        if (confirmError) {
            alert.error(confirmError);
        }
        // dispatch(clearErrors());

    }, [dispatch, error, confirmError, alert]);

  //  console.log(loginEmail);
    const checkValidation = (e) => {
        const confPass = e.target.value;
        setConfirmPassword(confPass);
        if (password != confPass) {
            setConfirmError("confirm password should be match with password");
        } else {
            setConfirmError('');
        }
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const paperStyle = { width: 340, margin: "20px auto" }

  //  console.log(userError);
    const handleSubmit = () => {
        console.log('handle submit aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
        const form = new FormData();
        form.append('name', name);
        form.append('email', email);
        form.append('password', confirmPassword);
        form.append('gender', gender);
        form.append('phone', phone);

        dispatch(register(form));
    };

    const handleLoginSubmit = () => {
        dispatch(login(loginEmail, loginPassword));
    };




    return (
        <>
            <Paper style={paperStyle}>

                <Tabs
                    value={value}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={handleChange}
                    aria-label="disabled tabs example"
                >
                    <Tab label="Sign In"  {...a11yProps(0)} />

                    <Tab label="Sign Up"  {...a11yProps(0)} />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <Login
                        handleChange={handleChange}
                        setLoginEmail={setLoginEmail}
                        setLoginPassword={setLoginPassword}
                        handleLoginSubmit={handleLoginSubmit}
                    />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Signup
                        handleSubmit={handleSubmit}
                        setName={setName}
                        setEmail={setEmail}
                        setPassword={setPassword}
                        setGender={setGender}
                        setPhone={setPhone}
                        //  setConfirmPassword={setConfirmPassword}
                        checkValidation={checkValidation}
                    />
                </TabPanel>
            </Paper>

        </>
    )
}

export default SignInOutContainer;