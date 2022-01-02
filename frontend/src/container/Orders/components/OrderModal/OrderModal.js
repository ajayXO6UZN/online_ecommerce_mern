import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useStyles from './orderDetails';
import { Box, Typography } from '@material-ui/core';
import bag from '../../../../assets/img/bag.jpeg'
import CloseIcon from '@material-ui/icons/Close';
import { FaRupeeSign } from "react-icons/fa";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { PromiseProvider } from 'mongoose';

export default function MaxWidthDialog(props) {


    const {
        open,
        handleClose,
        simpleHandleClose,
        setOrderProcessingStatus,
        orderProcessingStatus,
        oredrTotalPrice,
        oredrPhone,
        oredrAddress,
        oredrPaymentStatus,
        orderStatus,
        // orderItemsImage,
        orderItemsPrice,
        // orderItemsProductName,
        // orderItemsProductQuantity,
        // orderItemsProductPrice,
        orderItems,
        handleEditOrderClick
    } = props;
    const classes = useStyles(props);

    const [selectOpen, setSelectOpen] = React.useState(false);

    const handleSelectClose = () => {
        setSelectOpen(false);
    };

    const handleSelectOpen = () => {
        setSelectOpen(true);
    };

    const handleSelectChange = (event) => {
        setOrderProcessingStatus(event.target.value);
    };


    return (
        <React.Fragment>
            <Dialog
                fullWidth={true}
                maxWidth="md"
                open={open}
                onClose={handleClose}                             
                aria-labelledby="max-width-dialog-title"
            >

                <DialogContent>
                    <div style={{ display: 'flex' }}>
                        <div style={{ width: '606px', }}>
                            <Typography variant="h4" gutterBottom>
                                Shipping Info
                            </Typography>
                            <div style={{ paddingLeft: '28px' }}>
                                <Typography variant="h6" style={{ display: 'flex', alignItems: 'baseline' }} gutterBottom>
                                    Name:
                                    <Typography variant="subtitle1" style={{ marginLeft: '8px' }} gutterBottom>
                                        Abhisek singh
                                    </Typography>
                                </Typography>
                                <Typography variant="h6" style={{ display: 'flex', alignItems: 'baseline' }} gutterBottom>
                                    Phone:
                                    <Typography variant="subtitle1" style={{ marginLeft: '8px' }} gutterBottom>
                                        {oredrPhone}
                                    </Typography>
                                </Typography>
                                <Typography variant="h6" style={{ display: 'flex', alignItems: 'baseline' }} gutterBottom>
                                    Address:
                                    <Typography variant="subtitle1" style={{ marginLeft: '8px' }} gutterBottom>
                                        {oredrAddress} {/* h-77 doc op,Los Angles, UP,40001,IN */}
                                    </Typography>
                                </Typography>
                            </div>
                            <Typography variant="h4" gutterBottom>
                                Payment
                            </Typography>
                            <div style={{ paddingLeft: '28px' }}>
                                <Typography className={classes.paymentStatus} variant="h6" style={{ display: 'flex', alignItems: 'baseline' }} gutterBottom>
                                    {oredrPaymentStatus && oredrPaymentStatus == 'secceeded' ?
                                        "PAID"
                                        : "NOT PAID"
                                    } {/* Paid */}
                                </Typography>
                                <Typography variant="h6" style={{ display: 'flex', alignItems: 'baseline' }} gutterBottom>
                                    Amount :
                                    <Typography variant="subtitle1" style={{ marginLeft: '8px' }} gutterBottom>
                                        {oredrTotalPrice}
                                    </Typography>
                                </Typography>

                            </div>
                            <Typography variant="h4" gutterBottom>
                                Order Status
                            </Typography>
                            <div style={{ paddingLeft: '28px' }}>
                                <Typography variant="h6" style={{ display: 'flex', alignItems: 'baseline' }} gutterBottom className={classes.greenColor} >
                                    {orderStatus}
                                </Typography>
                            </div>
                            <Typography variant="h4" gutterBottom>
                                Your Cart Items:
                            </Typography>
                            {orderItems && orderItems.map((item, index) => (
                                <div className={classes.cartItems} index={index}>
                                    <Box className={classes.imgStyle}>
                                        <img className={classes.innerImage} src={bag} />
                                    </Box>
                                    <Box>
                                        <Typography variant="h6" gutterBottom>
                                            {item.name}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="subtitle1" gutterBottom>
                                            {item.quantity} X ₹{item.price}=₹{item.price * item.quantity}
                                        </Typography>
                                    </Box>
                                </div>
                            ))}

                        </div>
                        <div>
                            <Typography variant="h4" gutterBottom>
                                Process Order
                            </Typography>
                            <FormControl className={classes.formControl} >
                                <InputLabel id="demo-controlled-open-select-label">Process</InputLabel>
                                <Select
                                    labelId="demo-controlled-open-select-label"
                                    id="demo-controlled-open-select"
                                    open={selectOpen}
                                    onClose={handleSelectClose}
                                    onOpen={handleSelectOpen}
                                    value={orderProcessingStatus}
                                    onChange={handleSelectChange}
                                >
                                    {/* <MenuItem value="">
                                    <em>None</em>
                                </MenuItem> */}
                                    <MenuItem value={'admin'}>Shipping</MenuItem>
                                    <MenuItem value={'delivered'}>Delivered</MenuItem>
                                </Select>
                            </FormControl>
                            <Button variant="contained" onClick={handleEditOrderClick} className={classes.formControl} color="secondary">
                                PROCESS
                            </Button>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
