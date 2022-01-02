import faker from 'faker';
import React, { useState } from 'react';
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
    Box,
    Button, IconButton,
} from '@material-ui/core';
import Layout from '../../components/Layout/Layout';
import OrderModal from './components/OrderModal/OrderModal';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { updateOrder } from '../../actions/orderAction';
import { updateUser } from '../../actions/userAction';

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    tableContainer: {
        borderRadius: 15,
        margin: '10px 10px',
        maxWidth: 950
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.getContrastText(theme.palette.primary.dark)
    },
    avatar: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.getContrastText(theme.palette.primary.light)
    },
    name: {
        fontWeight: 'bold',
        color: theme.palette.secondary.dark
    },
    status: {
        fontWeight: 'bold',
        fontSize: '0.75rem',
        color: 'white',
        backgroundColor: 'grey',
        borderRadius: 8,
        padding: '3px 10px',
        display: 'inline-block'
    }
}));

// let USERS = [], STATUSES = ['Active', 'Pending', 'Blocked'];
// for (let i = 0; i < 14; i++) {
//     USERS[i] = {
//         name: faker.name.findName(),
//         email: faker.internet.email(),
//         phone: faker.phone.phoneNumber(),
//         jobTitle: faker.name.jobTitle(),
//         company: faker.company.companyName(),
//         joinDate: faker.date.past().toLocaleDateString('en-US'),
//         status: STATUSES[Math.floor(Math.random() * STATUSES.length)]
//     }
// }

function Orders() {
    const classes = useStyles();

    const dispatch = useDispatch();

    const { orders } = useSelector(state => state.allOrders);


    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const [open, setOpen] = React.useState(false);
    const [orderProcessingStatus, setOrderProcessingStatus] = useState('');

    const [orderId, setOrderId] = useState('');
    const [oredrPhone, setOrderPhone] = useState('');
    const [oredrAddress, setOrderAddress] = useState('');
    const [oredrPaymentStatus, setOrderPaymentStataus] = useState('');
    const [oredrTotalPrice, setOrderTotalPrice] = useState('');
    const [orderStatus, setOrderStatus] = useState('');
    const [orderItemsImage, setOrderItemsImage] = useState('');
    const [orderItemsPrice, setOrderItemsPrice] = useState('');
    const [orderItems, setOrderItems] = useState('');

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    //console.log(product && product.brand)
    const handleClose = () => {
        setOpen(false);
    };

    const simpleHandleClose = () => {
        // setEditModalOpen(false);
        setOpen(false)
    }

    const handleClickOpen = (row) => {
        setOrderId(row._id)
        setOrderTotalPrice(row.totalAmount)
        setOrderPhone(row.shippingInfo.phoneNo)
        setOrderAddress(row.shippingInfo.address)
        setOrderPaymentStataus(row.paymentInfo.status)
        setOrderStatus(row.orderStatus)
        setOrderItemsImage(row.orderItems[0].image)
        setOrderItemsPrice(row.orderItems[0].price)
        setOrderItems(row.orderItems)
        setOpen(true);
    };

    const handleEditOrderClick = () => {
   
        const form  = {'_id':orderId,'status':orderProcessingStatus}

        dispatch(updateOrder(form));
    }

    return (
        <Layout>

            <Box display="flex" p={1} flexWrap='wrap'>
                <Box p={1} flexGrow={1} >
                    <Typography variant="h4" component="div">Order Details</Typography>
                </Box>

            </Box>


            <TableContainer component={Paper} className={classes.tableContainer}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.tableHeaderCell}>Order Id</TableCell>
                            <TableCell className={classes.tableHeaderCell}>Status</TableCell>
                            <TableCell className={classes.tableHeaderCell}>Date</TableCell>
                            <TableCell className={classes.tableHeaderCell}>Item Quantity</TableCell>
                            <TableCell className={classes.tableHeaderCell}>Amount</TableCell>
                            <TableCell className={classes.tableHeaderCell}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders && orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <TableRow key={row._id}>
                                <TableCell>
                                    <Grid container>
                                        <Grid item lg={2}>
                                            <Avatar alt={row._id} src='.' className={classes.avatar} />
                                        </Grid>
                                        <Grid item lg={10}>
                                            <Typography className={classes.name}>{row._id}</Typography>
                                            {console.log(row)}
                                        </Grid>
                                    </Grid>
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        className={classes.status}
                                        style={{
                                            backgroundColor:
                                                ((row.orderStatus === 'Processing' && 'orange') ||
                                                    (row.orderStatus === 'Pending' && 'blue') ||
                                                    (row.orderStatus === 'Completed' && 'green'))
                                        }}
                                    >{row.orderStatus}</Typography>
                                </TableCell>

                                <TableCell>{'2/12/2021'}</TableCell>
                                <TableCell>
                                    <Typography color="primary" variant="subtitle2">{row.orderItems.length}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color="primary" variant="subtitle2">{row.totalPrice}</Typography>
                                </TableCell>
                                <TableCell >
                                    <div style={{ display: 'flex' }}>
                                        <IconButton aria-label="edit" onClick={() => handleClickOpen(row)} className={classes.margin}>
                                            <EditIcon fontSize="medium" />
                                        </IconButton>
                                        <IconButton aria-label="delete" onClick={() => {
                                            const payload = {
                                                productId: row._id,
                                            };

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
                            count={orders && orders.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </TableFooter>
                </Table>
            </TableContainer>
            <OrderModal
                open={open}
                handleClose={handleClose}
                simpleHandleClose={simpleHandleClose}
                setOrderProcessingStatus={setOrderProcessingStatus}
                orderProcessingStatus={orderProcessingStatus}
                oredrTotalPrice={oredrTotalPrice}
                oredrPhone={oredrPhone}
                oredrAddress={oredrAddress}
                oredrPaymentStatus={oredrPaymentStatus}
                orderStatus={orderStatus}
                // orderItemsImage={orderItemsImage}
                orderItemsPrice={orderItemsPrice}
                // orderItemsProductName={orderItemsProductName}
                // orderItemsProductQuantity={orderItemsProductQuantity}
                // orderItemsProductPrice={orderItemsProductPrice}
                orderItems={orderItems}
                handleEditOrderClick={handleEditOrderClick}
            />
        </Layout>

    );
}

export default Orders;