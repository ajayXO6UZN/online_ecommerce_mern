import React, { useState, useEffect, Fragment } from 'react';
import {
    Typography,
    Box,
    Button
} from '@material-ui/core';

import Layout from '../../components/Layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import DropdownTreeSelect from "react-dropdown-tree-select";
import TextField from '@material-ui/core/TextField';
import PublishIcon from '@material-ui/icons/Publish';
import useStyle from './style';
import { createPage, createSlider } from '../../actions/page.action';
import Loader from '../Loader/Loader';
import { useAlert } from "react-alert";

function Page() {
    // const classes = useStyles();
    const classes = useStyle();
    const alert = useAlert();
    const category = useSelector(state => state.allCategoryList);
    const { error, success, loading } = useSelector(state => state.page);

    const [categoryId, setCategory] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('')

    const [selectedFiles2, setSelectedFiles2] = useState([]);
    const [productImage, setProductImage] = useState([]);

    const [dealName, setDealName] = useState('');
    const [dealType, setDealType] = useState('')

    const [bannerImage, setBannerImage] = useState([]);

    const dispatch = useDispatch();

    const onChange = (currentNode, selectedNodes) => {
        console.log(setCategory(currentNode.value));
    };
    console.log(categoryId);

console.log(dealType)
    useEffect(() => {
        if (error) {
            alert.error(error);
            // dispatch(clearErrors());
        }

        if (success) {
            alert.success("Deal created Successfully");

            //  dispatch({ type: NEW_PRODUCT_RESET });
        }
    }, [dispatch, alert, error, success]);


    const handleImageChange = (e) => {
        // console.log(e.target.files[])

        if (e.target.files) {
            const allFiles = Array.from(e.target.files);

            setBannerImage(allFiles);


            const filesArray = Array.from(e.target.files).map((file) =>
                URL.createObjectURL(file)
            );

            // console.log("filesArray: ", filesArray);

            setSelectedFiles((prevImages) => prevImages.concat(filesArray));


            Array.from(e.target.files).map(
                (file) => URL.revokeObjectURL(file) // avoid memory leak
            );
        }
    };

    const handleImageChange2 = (e) => {
        // console.log(e.target.files[])

        if (e.target.files) {

            const allFiles = Array.from(e.target.files);

            setProductImage(allFiles);

            const filesArray = Array.from(e.target.files).map((file) =>
                URL.createObjectURL(file)
            );

            // console.log("filesArray: ", filesArray);

            setSelectedFiles2((prevImages) => prevImages.concat(filesArray));


            Array.from(e.target.files).map(
                (file) => URL.revokeObjectURL(file) // avoid memory leak
            );
        }
    };

    const renderCategories = (categories) => {
        let myCategories = [];
        for (let category of categories) {
            myCategories.push(
                {
                    label: category.label,
                    value: category._id,
                    children: category.children.length > 0 && renderCategories(category.children)
                }
            );
        }
        return myCategories;
    }

    const renderPhotos = (source) => {
        console.log("source: ", source);
        return source.map((photo) => {
            return <div className={classes.imageControl}>
                <img className={classes.mainImage} src={photo} alt="" key={photo} />
            </div>;
        });
    };

    const handleSubmitPage = () => {
        console.log(title, description, categoryId)
        const form = new FormData();
        form.append('title', title);
        form.append('description', description);
        form.append('category', categoryId);

        for (let pic of productImage) {
            form.append("products", pic);
        }
        for (let pic of bannerImage) {
            form.append("banners", pic);
        }

        dispatch(createPage(form));
        setCategory('');
        setProductImage('');
        setBannerImage('');

    };

    const handleSubmitDeal = () => {
        dispatch(createSlider(dealName, dealType ));
    };

    const categoryList = renderCategories(category.categories);

    return (
        <>
            <Layout>
                <div style={{ display: 'flex', margin: '59px' }}>
                    <div>
                        <Box display="flex" p={1} flexWrap='wrap'>
                            <Box p={1} flexGrow={1} >
                                <Typography variant="h4" component="div">Create New Page</Typography>
                            </Box>

                        </Box>

                        <Box className={classes.pageForm}>
                            <TextField className={classes.pageMargin} id="outlined-basic"
                                label="Page Title"
                                variant="outlined"
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <TextField className={classes.pageMargin} id="outlined-basic"
                                label="Page Description"
                                variant="outlined"
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <DropdownTreeSelect data={categoryList} texts={{ placeholder: 'Select' }} onChange={onChange} keepTreeOnSearch />


                            <input
                                // accept="image/*"
                                className={classes.input}
                                id="contained-button-file"
                                multiple
                                type="file"
                                onChange={handleImageChange}
                            />

                            <label htmlFor="contained-button-file">
                                <Button variant="outlined" className={classes.PublishBtn} color="primary" component="span">
                                    <PublishIcon className={classes.PublishIcon} />
                                    Bulk Banners
                                </Button>
                            </label>
                            <div className={classes.imagePreview}>{renderPhotos(selectedFiles)}</div>
                            <input
                                // accept="image/*"
                                className={classes.input}
                                id="contained-product-file"
                                multiple
                                type="file"
                                onChange={handleImageChange2}
                            />
                            <label htmlFor="contained-product-file">
                                <Button variant="outlined" className={classes.PublishBtn} color="primary" component="span">
                                    <PublishIcon className={classes.PublishIcon} />
                                    Bulk Products
                                </Button>
                            </label>
                            <div className={classes.imagePreview}>{renderPhotos(selectedFiles2)}</div>

                            <Button variant="contained" onClick={handleSubmitPage} style={{ marginTop: '20px' }} size='large' color="primary" href="#contained-buttons">
                                Submit
                            </Button>
                        </Box>


                    </div>
                    <div style={{ marginLeft: '59px' }}>
                        <Box display="flex" p={1} flexWrap='wrap'>
                            <Box p={1} flexGrow={1} >
                                <Typography variant="h4" component="div">Create New Deals</Typography>
                            </Box>

                        </Box>
                        {loading ? (
                                <Loader />
                            ) : (
                                <Fragment>
                        <Box className={classes.pageForm}>
                            <TextField className={classes.pageMargin} id="outlined-basic"
                                label="Name of the deal"
                                variant="outlined"
                                onChange={(e) => setDealName(e.target.value)}
                            />
                            <TextField className={classes.pageMargin} id="outlined-basic"
                                label="Type of deal"
                                variant="outlined"
                                onChange={(e) => setDealType(e.target.value)}
                            />
                     

                                <Button variant="contained" onClick={handleSubmitDeal} style={{ marginTop: '20px' }} size='large' color="primary" href="#contained-buttons">
                                    Submit
                                </Button>

                         
                        </Box>
                        </Fragment>
                        )}
                    </div>
                </div>
            </Layout>
        </>
    );
}

export default Page;