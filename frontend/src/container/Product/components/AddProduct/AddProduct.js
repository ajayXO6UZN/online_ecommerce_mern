import React, { useState, useEffect } from 'react';
import Modal from '../../../../components/UI/Modal/Modal';
import { Button, TextField } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import DropdownTreeSelect from "react-dropdown-tree-select";
import 'react-dropdown-tree-select/dist/styles.css'
import PublishIcon from '@material-ui/icons/Publish';
import useStyles from './style';
import { generatePublicUrl } from '../../../../urlConfig';
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from 'react-redux';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const AddProduct = (props) => {
    const alert = useAlert();
    const classes = useStyles();
    const dispatch = useDispatch();

      const {deals} = useSelector((state) => state.page);


    const {
        open,
        handleClose,
        allCategories,
        setProductTitle,
        setProductBrand,
        setProductStock,
        setProductPrice,
        setProductComparePrice,
        setProductDescription,
        handleImageChange,
        setCategory,
        handleTitle,
        selectedFiles,
        productRow,
        setProductId,
        simpleHandleClose,
        productStatus,
        setProductStatus,
        productDeals,
        setProductDeals
    } = props;

    const [selectOpen, setSelectOpen] = React.useState(false);

    const handleSelectClose = () => {
        setSelectOpen(false);
    };

    const handleSelectOpen = () => {
        setSelectOpen(true);
    };


    const onChange = (currentNode, selectedNodes) => {
        console.log(setCategory(currentNode.value));
    };

    const handleSelectChange = (event) => {
        setProductDeals(event.target.value);
    };

    // useEffect(() => {
    //     if (error) {
    //       alert.error(error);
    //      // dispatch(clearErrors());
    //     }
    //    // dispatch(getProduct());
    //   }, [dispatch, error, alert]);

    const renderPhotos = (source) => {
        console.log("source: ", source);
        return source.map((photo) => {
            return <div className={classes.imageControl}>
                <img className={classes.mainImage} src={photo} alt="" key={photo} />
            </div>;
        });
    };
    console.log(productRow)
    return (
        <>
            <Modal
                open={open}
                handleClose={handleClose}
                simpleHandleClose={simpleHandleClose}
                handleTitle={handleTitle}
            //  size={size}
            >
                {productRow ?
                    <div>
                        {setProductId(productRow._id)}
                        <TextField
                            id="outlined-basic"
                            className={classes.textArea}
                            placeholder={productRow.name}
                            label='name'
                            onChange={(e) => setProductTitle(e.target.value)}
                            variant="outlined" />
                        <TextField
                            id="outlined-basic"
                            className={classes.inputSize}
                            placeholder={productRow.brand}
                            label='brand'
                            onChange={(e) => setProductBrand(e.target.value)}
                            variant="outlined" />
                        <TextField
                            id="outlined-basic"
                            className={classes.inputSize}
                            placeholder={productRow.Stock}
                            label='Stock'
                            onChange={(e) => setProductStock(e.target.value)}
                            variant="outlined" />

                        <TextField
                            id="outlined-basic"
                            className={classes.inputSize}
                            placeholder={productRow.price}
                            label='Price'
                            onChange={(e) => setProductPrice(e.target.value)}
                            variant="outlined" />
                        <TextField
                            id="outlined-basic"
                            className={classes.inputSize}
                            placeholder={productRow.comparePrice}
                            label='Compare Price'
                            onChange={(e) => setProductComparePrice(e.target.value)}
                            variant="outlined" />

                        <TextField
                            id="outlined-multiline-static"
                            placeholder={productRow.description}
                            label='Description'
                            multiline
                            rows={2}
                            className={classes.textArea}
                            onChange={(e) => setProductDescription(e.target.value)}
                            variant="outlined"
                        />
                             <FormControl className={classes.selectArea} >
                            <InputLabel id="demo-controlled-open-select-label">Deal Type</InputLabel>
                            <Select
                                labelId="demo-controlled-open-select-label"
                                id="demo-controlled-open-select"
                                open={selectOpen}
                                
                                onClose={handleSelectClose}
                                onOpen={handleSelectOpen}
                                value={productDeals ? productDeals : productRow.deal_type}
                                onChange={handleSelectChange}
                            >
                                {/* <MenuItem value="">
                                <em>None</em>
                            </MenuItem> */}
                            {deals && deals.map((item,i)=>(
                                <MenuItem key={i} value={item._id}>{item.type_of_deal}</MenuItem>
                            ))}
                                
                            </Select>
                        </FormControl>

                      
                        <DropdownTreeSelect data={allCategories} texts={{ placeholder: productRow.category }} onChange={onChange} keepTreeOnSearch />

                   
                        <FormControl component="fieldset" >
                            <FormLabel component="legend">Status</FormLabel>
                            <RadioGroup value={productStatus ? productStatus : productRow.status} onChange={(e) => setProductStatus(e.target.value)} aria-label="status" name="status" style={{ display: 'initial' }}>
                                <FormControlLabel value="Active" control={<Radio />} label="Active" />
                                <FormControlLabel value="Pending" control={<Radio />} label="Pending" />
                            </RadioGroup>
                        </FormControl>


                        <input
                            accept="image/*"
                            className={classes.input}
                            id="contained-button-file"
                            multiple
                            type="file"
                            onChange={handleImageChange}
                        />
                        {selectedFiles.length>0 ?
                            <div className={classes.imagePreview}>{renderPhotos(selectedFiles)}</div>
                            :
                            <div className={classes.imagePreview}>
                                {
                                    productRow.images && productRow.images.map((product, index) =>
                                        <div className={classes.imageControl}>
                                            <img className={classes.mainImage} src={product.url} alt="" key={index} />

                                        </div>
                                    )
                                }
                            </div>
                        }
                        <label htmlFor="contained-button-file">
                            <Button variant="contained" className={classes.PublishBtn} color="primary" component="span">
                                <PublishIcon className={classes.PublishIcon} />
                                Upload
                            </Button>
                        </label></div>
                    :
                    <div>
                        <TextField
                            id="outlined-basic"
                            className={classes.textArea}
                            label="Product Title"
                            required
                            onChange={(e) => setProductTitle(e.target.value)}
                            variant="outlined" />
                        <TextField
                            id="outlined-basic"
                            className={classes.inputSize}
                            label="Brand Name"
                            onChange={(e) => setProductBrand(e.target.value)}
                            variant="outlined" />
                        <TextField
                            id="outlined-basic"
                            className={classes.inputSize}
                            label="Stock"
                            onChange={(e) => setProductStock(e.target.value)}
                            variant="outlined" />

                        <TextField
                            id="outlined-basic"
                            className={classes.inputSize}
                            label="Price"
                            onChange={(e) => setProductPrice(e.target.value)}
                            variant="outlined" />
                        <TextField
                            id="outlined-basic"
                            className={classes.inputSize}
                            label="Compare at Price"
                            onChange={(e) => setProductComparePrice(e.target.value)}
                            variant="outlined" />

                        <TextField
                            id="outlined-multiline-static"
                            label="Multiline"
                            multiline
                            rows={2}
                            className={classes.textArea}
                            onChange={(e) => setProductDescription(e.target.value)}
                            variant="outlined"
                        />
                        <FormControl className={classes.selectArea} >
                            <InputLabel id="demo-controlled-open-select-label">Deal Type</InputLabel>
                            <Select
                                labelId="demo-controlled-open-select-label"
                                id="demo-controlled-open-select"
                                open={selectOpen}
                                
                                onClose={handleSelectClose}
                                onOpen={handleSelectOpen}
                                value={productDeals}
                                onChange={handleSelectChange}
                            >
                                {/* <MenuItem value="">
                                <em>None</em>
                            </MenuItem> */}
                            {deals && deals.map((item,i)=>(
                                <MenuItem key={i} value={item._id}>{item.type_of_deal}</MenuItem>
                            ))}
                                
                            </Select>
                        </FormControl>


                        <DropdownTreeSelect data={allCategories} texts={{ placeholder: 'Select Category' }} onChange={onChange} keepTreeOnSearch />


                        <input
                            accept="image/*"
                            className={classes.input}
                            id="contained-button-file"
                            multiple
                            type="file"
                            onChange={handleImageChange}
                        />

                        <div className={classes.imagePreview}>{renderPhotos(selectedFiles)}</div>


                        <label htmlFor="contained-button-file">
                            <Button variant="contained" className={classes.PublishBtn} color="primary" component="span">
                                <PublishIcon className={classes.PublishIcon} />
                                Upload
                            </Button>
                        </label></div>

                }
            </Modal>


        </>
    );
}

export default AddProduct






























