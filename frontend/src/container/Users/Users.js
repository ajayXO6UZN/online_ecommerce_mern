import faker from 'faker';
import React, { useState, useEffect, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar,
    Grid,
    Typography,
    TablePagination,
    TableFooter,
    Box, Button, IconButton,
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Layout from '../../components/Layout/Layout';
import useStyles from './style';
import AddUser from './components/AddUser';
import { deleteUser, register, updateUser } from '../../actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from "react-alert";
import { generatePublicUrl } from '../../urlConfig';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Loader from '../Loader/Loader';


function Users() {
    const classes = useStyles();
    const alert = useAlert();

    const dispatch = useDispatch();

  //  const userError = useSelector((state) => state.user.error);
    var { users, error } = useSelector((state) => state.allUsers);
    var { loading,success,error, addUser } = useSelector((state) => state.addUser);
    //  const { loading } = useSelector((state) => state.profile);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const [open, setOpen] = React.useState(false);
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPass, setUserPass] = useState('');
    const [userGender, setGender] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [userStatus, setUserStatus] = useState('');
    const [userRole, setSelectRole] = useState('');
    const [emailChecked, setEmailChecked] = React.useState(false);
    const [userImageChange, setUserImageChange] = React.useState(false);
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("");

    const [editModalOpen, setEditModalOpen] = React.useState(false);
    const [userRow, setUserRow] = React.useState(false);
    const [userId, setUserId] = React.useState(false);


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    console.log(userName)

    const handleClickOpen = () => {
        setOpen(true);
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            // dispatch(clearErrors());
        }

        if (success) {
            alert.success("User done it Successfully");

             // dispatch({ type: NEW_PRODUCT_RESET });
        }
    }, [dispatch, alert, error, success]);



    const handleClose = () => {

        const form = new FormData();
        form.append('name', userName);
        form.append('email', userEmail);
        form.append('password', userPass);
        form.append('gender', userGender);
        form.append('phone', userPhone);
        form.append('role', userRole);
        form.append('status', userStatus);
        form.append('checked', emailChecked);
        form.append("avatar", avatar);
   
        dispatch(register(form));
        setOpen(false);

    };

    const handleEditClose = () => {
        console.log(userName)
        const form = new FormData();
        form.append('_id', userId);
        form.append('name', userName);
        form.append('email', userEmail);
        form.append('password', userPass);
        form.append('gender', userGender);
        form.append('phone', userPhone);
        form.append('role', userRole);
        form.append('status', userStatus);
        form.append('checked', emailChecked);
        form.append('change', userImageChange);
        form.append("avatar", avatar);

        dispatch(updateUser(form));
       // setUserImage('');
        setEditModalOpen(false);
    };


    const simpleHandleClose = () => {
        setEditModalOpen(false);
        setOpen(false)
    }

   

    const updateProfileDataChange = (e) => {
        const reader = new FileReader();
    console.log(reader)
   // setAvatarPreview("kk");
        reader.onload = () => {
          if (reader.readyState === 2) {
            setUserImageChange('change');
            setAvatarPreview(reader.result);
            setAvatar(reader.result);
          }
        };
    
        reader.readAsDataURL(e.target.files[0]);
      };


    const handleUpdateClickOpen = (row) => {
        console.log(row)
        setUserRow(row);
        setUserName(row.name);
        setUserEmail(row.email);
        setGender(row.gender);
        setUserPhone(row.phone);
        setUserStatus(row.status);
        setSelectRole(row.role);
      
        setEditModalOpen(true);
    };

    return (
        <>

            <Layout>

                <Box display="flex" p={1} flexWrap='wrap'>
                    <Box p={1} flexGrow={1} >
                        <Typography variant="h4" component="div">User Details</Typography>
                    </Box>

                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={handleClickOpen}
                        className={classes.addUser}
                        startIcon={<AddCircleIcon />}
                    >
                        Add
                    </Button>

                </Box>
                {loading ? (
                    <Loader />
                ) : (
                    <Fragment>
                        <TableContainer component={Paper} className={classes.tableContainer}>
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell className={classes.tableHeaderCell}>User Info</TableCell>
                                        <TableCell className={classes.tableHeaderCell}>Thumbnail</TableCell>
                                        <TableCell className={classes.tableHeaderCell}>Role</TableCell>
                                        <TableCell className={classes.tableHeaderCell}>Joining Date</TableCell>
                                        <TableCell className={classes.tableHeaderCell}>Status</TableCell>
                                        <TableCell className={classes.tableHeaderCell}>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                    {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (

                                        <TableRow key={row.name}>
                                            <TableCell>
                                                <Grid container>
                                                    <Grid item lg={2}>
                                                        <Avatar alt={row.name} src='.' className={classes.avatar} />
                                                    </Grid>
                                                    <Grid item lg={10}>
                                                        <Typography className={classes.name}>{row.name}</Typography>
                                                        <Typography color="textSecondary" variant="body2">{row.email}</Typography>
                                                        <Typography color="textSecondary" variant="body2">{row.phone}</Typography>
                                                    </Grid>
                                                </Grid>
                                            </TableCell>
                                            <TableCell>
                                                <Box className={classes.imgStyle}>{console.log(row)}
                                                    <img className={classes.innerImage} src={row.avatar && row.avatar.url} />
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                <Typography color="primary" variant="subtitle2">{row.role}</Typography>
                                                {/* <Typography color="textSecondary" variant="body2">{row.company}</Typography> */}
                                            </TableCell>
                                            <TableCell>{'2/31/2020'}</TableCell>
                                            <TableCell>
                                                <Typography
                                                    className={classes.status}
                                                    style={{
                                                        backgroundColor:
                                                            ((row.status === 'Active' && 'green') ||
                                                                (row.status === 'Pending' && 'blue') ||
                                                                (row.status === 'Blocked' && 'orange'))

                                                    }}
                                                >{row.status}</Typography>
                                            </TableCell>
                                            <TableCell >
                                                <div style={{ display: 'flex' }}>
                                                    <IconButton aria-label="edit" onClick={() => handleUpdateClickOpen(row)} className={classes.margin}>
                                                        <EditIcon fontSize="medium" />
                                                    </IconButton>
                                                    <IconButton aria-label="delete" onClick={() => {
                                                        const payload = {
                                                            userId: row._id,
                                                        };
                                                         dispatch(deleteUser(payload));
                                                    }} className={classes.margin}>
                                                        <DeleteIcon fontSize="medium" />
                                                    </IconButton>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                                <TableFooter>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 15]}
                                        component="div"
                                        count={users && users.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onChangePage={handleChangePage}
                                        onChangeRowsPerPage={handleChangeRowsPerPage}
                                    />
                                </TableFooter>
                            </Table>
                        </TableContainer>
                    </Fragment>
                )}
                <AddUser
                    open={open}
                    handleClose={handleClose}
                    handleTitle={'Add New User'}
                    handleUserImageChange={updateProfileDataChange}

                    selectedFiles={avatarPreview}
                    simpleHandleClose={simpleHandleClose}
                    setUserName={setUserName}
                    setUserEmail={setUserEmail}
                    setUserPass={setUserPass}
                    setGender={setGender}
                    setUserPhone={setUserPhone}
                    setUserStatus={setUserStatus}
                    setSelectRole={setSelectRole}
                    userRole={userRole}
                   
                    setEmailChecked={setEmailChecked}
                    emailChecked={emailChecked}
                />

                {/* EDIT USER */}
                <AddUser
                    open={editModalOpen}
                    handleClose={handleEditClose}
                    handleTitle={'Update User detail'}
                    handleUserImageChange={updateProfileDataChange}
                    userRow={userRow}
                    selectedFiles={avatarPreview}
                    simpleHandleClose={simpleHandleClose}
                    setUserName={setUserName}
                    setUserEmail={setUserEmail}
                    setUserPass={setUserPass}
                    setGender={setGender}
                    setUserPhone={setUserPhone}
                    setUserStatus={setUserStatus}
                    setSelectRole={setSelectRole}
                    userRole={userRole}
                  
                    setEmailChecked={setEmailChecked}
                    emailChecked={emailChecked}
                    setUserId={setUserId}
                    userStatus={userStatus}
                    userGender={userGender}
                />
                
            </Layout>


        </>
    );
}

export default Users;